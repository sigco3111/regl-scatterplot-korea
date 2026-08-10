#!/usr/bin/env python3
"""GitHub 공개 데이터 수집 (regl-scatterplot 한국어 데모용).
Python 버전 (순정 라이브러리만 사용)."""
import json
import os
import sys
import time
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime, timezone
from pathlib import Path

OUTPUT = Path(__file__).parent.parent / "data" / "github-repos.json"

# Read GITHUB_TOKEN from env (Actions auto-provides this; 5000 req/hr vs 10 unauth)
AUTH_TOKEN = os.environ.get("GITHUB_TOKEN", "").strip()
if AUTH_TOKEN:
    print(f"[auth] using token (5000 req/hr)", file=sys.stderr)
else:
    print("[auth] no token (unauth mode, 10 req/hr — will hit rate limit)", file=sys.stderr)

# Rate-limit retry config
RETRY_MAX = 3
RETRY_BACKOFF = [1.0, 2.0, 4.0]  # seconds to sleep before retry N (1, 2, 3)

def get_args():
    max_pages = 10  # default: 10 pages × 100/page = 1000 top repos
    query = "stars:>1000"
    for arg in sys.argv[1:]:
        if arg.startswith("--max-pages="):
            max_pages = int(arg.split("=")[1])
        elif arg.startswith("--query="):
            query = arg.split("=", 1)[1]
    return max_pages, query

def _build_request(url):
    headers = {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'regl-scatterplot-data',
    }
    if AUTH_TOKEN:
        headers['Authorization'] = f'Bearer {AUTH_TOKEN}'
    return urllib.request.Request(url, headers=headers)

def fetch_page(query, page, per_page=100):
    """Fetch a single page with retry/backoff on 403/429 (rate limit)."""
    url = f"https://api.github.com/search/repositories?q={urllib.parse.quote(query)}&sort=stars&order=desc&per_page={per_page}&page={page}"
    for attempt in range(RETRY_MAX + 1):
        try:
            with urllib.request.urlopen(_build_request(url), timeout=15) as resp:
                return json.loads(resp.read())
        except urllib.error.HTTPError as e:
            code = e.code
            body = ''
            try:
                body = e.read().decode('utf-8', errors='replace')[:200]
            except Exception:
                pass
            if code in (403, 429) and attempt < RETRY_MAX:
                wait = RETRY_BACKOFF[attempt]
                print(f"  [retry {attempt + 1}/{RETRY_MAX}] {code} (rate limited) — waiting {wait:.0f}s then retrying", file=sys.stderr)
                time.sleep(wait)
                continue
            return {'error': f'HTTP {code}', 'body': body}
        except Exception as e:
            return {'error': str(e)}
    return {'error': 'exhausted retries'}

def main():
    max_pages, query = get_args()
    per_page = 100
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    # 기존 데이터 이어받기
    all_repos = []
    seen = set()
    if OUTPUT.exists():
        try:
            payload = json.loads(OUTPUT.read_text())
            all_repos = payload.get('repos', [])
            seen = {r['full_name'] for r in all_repos}
            print(f"[collect-github] 이어받기: {len(all_repos)}개", file=sys.stderr)
        except Exception:
            pass

    new_count = 0
    total_count = None
    rate_limited = False

    for page in range(1, max_pages + 1):
        sys.stderr.write(f"  page {page}/{max_pages} ... ")
        sys.stderr.flush()
        result = fetch_page(query, page, per_page)

        if 'error' in result:
            print(f"FAIL: {result['error']}", file=sys.stderr)
            if '403' in str(result) or 'rate' in str(result).lower():
                rate_limited = True
                break
            continue

        if total_count is None:
            total_count = result.get('total_count', 0)
            print(f"total_count={total_count:,}", file=sys.stderr)
        else:
            print(f"{len(result.get('items', []))}개 받음", file=sys.stderr)

        for item in result.get('items', []):
            full_name = item.get('full_name', '')
            if full_name in seen:
                continue
            seen.add(full_name)
            all_repos.append({
                'owner': item.get('owner', {}).get('login', ''),
                'name': item.get('name', ''),
                'full_name': full_name,
                'x': item.get('stargazers_count', 0),
                'y': item.get('forks_count', 0),
                'lang': item.get('language'),
                'topics': item.get('topics', []),
                'archived': item.get('archived', False),
                'created_at': item.get('created_at', ''),
                'pushed_at': item.get('pushed_at', ''),
                'description': item.get('description'),
            })
            new_count += 1

        # 중간 저장 (압축)
        OUTPUT.write_text(json.dumps({
            'meta': {
                'query': query,
                'per_page': per_page,
                'max_pages': max_pages,
                'total_count': total_count,
                'updated_at': datetime.now(timezone.utc).strftime('%Y-%m-%d'),
                'repos_count': len(all_repos),
            },
            'repos': all_repos,
        }, separators=(',', ':')))

        time.sleep(1.5)  # rate limit 배려

    # 결과
    print(f"\n[collect-github] 완료: {new_count}개 신규, 총 {len(all_repos)}개")
    print(f"[collect-github] 저장: {OUTPUT}")
    print(f"[collect-github] 파일 크기: {OUTPUT.stat().st_size / 1024:.1f} KB")

    # 언어 분포
    lang_counts = {}
    for r in all_repos:
        lang = r.get('lang') or 'Unknown'
        lang_counts[lang] = lang_counts.get(lang, 0) + 1
    top = sorted(lang_counts.items(), key=lambda x: -x[1])[:10]
    print(f"\n[collect-github] Top 10 언어:")
    for lang, count in top:
        print(f"  {lang}: {count}")

    if rate_limited:
        print(f"\n[collect-github] ⚠️ rate limit 도달 — 다음 시간대에 재실행 권장")

if __name__ == '__main__':
    main()
