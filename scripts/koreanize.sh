#!/usr/bin/env bash
# 빌드 후처리 — 한글화 자동화
# vite 빌드 후 docs/를 한 번 더 한글화
set -e

cd "$(dirname "$0")/.."

echo "🔄 한글화 빌드 후처리 시작..."

# 1) 모든 HTML의 <html lang="en"> → ko, <title> → 한국어
for page in index axes text-labels connected-points dynamic-opacity annotations multiple-instances programmatic-lasso performance-mode size-encoding embedded transition connected-points-by-segments texture-background; do
  if [ -f "docs/${page}.html" ]; then
    sed -i.bak \
      -e 's|<html lang="en">|<html lang="ko">|' \
      -e "s|<title>Regl Scatterplot</title>|<title>Regl 산점도 — ${page} 예제 (한국어)</title>|" \
      -e 's|content="Scalable WebGL-based Scatterplot for millions of points build with Regl"|content="Regl 기반 WebGL 산점도 — 한국어 데모"|' \
      -e 's|<meta name="author" content="Fritz Lekschas" />|<meta name="author" content="Fritz Lekschas (원작), sigco3111 (한국어)" />|' \
      "docs/${page}.html"
    rm -f "docs/${page}.html.bak"
  fi
done

# 1-b) 쇼케이스 페이지는 자체 한국어 메타 사용 — 누락 시 한국어 메타만 보강
if [ -f "docs/showcase.html" ]; then
  sed -i.bak \
    -e 's|<html lang="en">|<html lang="ko">|' \
    -e 's|content="Scalable WebGL-based Scatterplot for millions of points build with Regl"|content="Regl 기반 WebGL 산점도 한국어 통합 쇼케이스"|' \
    -e 's|<meta name="author" content="Fritz Lekschas" />|<meta name="author" content="Fritz Lekschas (원작), sigco3111 (한국어)" />|' \
    docs/showcase.html
  rm -f docs/showcase.html.bak
fi

# 2) 모든 HTML에 한글 폰트 패밀리 주입
for page in $(ls docs/*.html 2>/dev/null); do
  if ! grep -q "Noto Sans KR" "$page"; then
    sed -i.bak 's|font-family: sans-serif;|font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;|g' "$page"
    rm -f "$page.bak"
  fi
done

# 3) index.html의 <h1>Regl Scatterplot</h1> → 한국어 (원본 h1 보존)
if [ -f "docs/index.html" ]; then
  sed -i.bak 's|<h1>Regl Scatterplot</h1>|<h1>Regl 산점도 — 한국어 데모</h1>|' docs/index.html
  rm -f docs/index.html.bak
fi

# 4) 배포된 정적 사이트에서 / 이 쇼케이스를 가리키도록 redirect로 덮어쓰기
if [ -f "docs/showcase.html" ]; then
  cat > docs/index.html <<'HTML'
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>Regl 산점도 — 한국어 통합 쇼케이스</title>
    <meta name="description" content="Regl 기반 WebGL 산점도 한국어 데모 6종을 한 페이지에서 탐색하세요." />
    <meta name="author" content="Fritz Lekschas (원작), sigco3111 (한국어)" />
    <link rel="canonical" href="./showcase.html" />
    <meta http-equiv="refresh" content="0; url=./showcase.html" />
    <script>location.replace('./showcase.html');</script>
    <style>
      html, body { margin: 0; padding: 0; height: 100%; background: #050810; color: #e6edf3;
        font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif; }
      .wrap { display: flex; align-items: center; justify-content: center; height: 100%; }
      a { color: #58a6ff; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <p>통합 쇼케이스로 이동 중... <a href="./showcase.html">여기를 클릭</a>하세요.</p>
    </div>
  </body>
</html>
HTML
fi

# 4) menu-*.js 자동 한글화 (백틱 형식 + 큰따옴표 형식 모두)
MENU_JS=$(ls docs/assets/menu-*.js 2>/dev/null | head -1)
if [ -n "$MENU_JS" ]; then
  python3 - <<PYEOF
from pathlib import Path
import sys

menu_path = "$MENU_JS"
content = Path(menu_path).read_text()

# 백틱 + 큰따옴표 + 작은따옴표 모두 처리
replacements = [
    # 폴더 타이틀
    ("\`Settings\`", "\`설정값\`"),
    ("\`Examples\`", "\`예제 목록\`"),
    ("\`Info\`", "\`정보\`"),
    ("\`Reset\`", "\`초기화\`"),
    # 라벨
    ("\`Num Points\`", "\`점 개수\`"),
    ("\`Point Size\`", "\`점 크기\`"),
    ("\`Opacity\`", "\`투명도\`"),
    ("\`Dynamic Opacity\`", "\`동적 투명도\`"),
    ("\`Lasso Init\`", "\`라쏘 시작 방식\`"),
    ("\`Lasso Type\`", "\`라쏘 종류\`"),
    ("\`Brush Size\`", "\`브러시 크기\`"),
    ("\`Color Encoding\`", "\`색상 인코딩\`"),
    ("\`Size & Opacity Encoding\`", "\`크기 및 투명도 인코딩\`"),
    ("\`Axes\`", "\`축 표시\`"),
    ("\`Text Labels\`", "\`텍스트 라벨\`"),
    ("\`Annotations\`", "\`주석\`"),
    ("\`Programmatic Lasso\`", "\`프로그래밍 라쏘\`"),
    ("\`Multiple Instances\`", "\`다중 인스턴스\`"),
    ("\`Transition\`", "\`전환 애니메이션\`"),
    ("\`Point Connections\`", "\`점 연결선\`"),
    ("\`Point Connections by Line Segments\`", "\`선분별 점 연결\`"),
    ("\`Background Image\`", "\`배경 이미지\`"),
    ("\`Performance Mode (20M Points)\`", "\`성능 모드 (2000만 점)\`"),
    ("\`version\`", "\`버전\`"),
    ("\`Download as PNG\`", "\`PNG로 다운로드\`"),
    ("\`Source Code\`", "\`소스 코드 보기\`"),
    # 라쏘 옵션 (작은따옴표 + 큰따옴표)
    ('"On Long Press"', '"길게 누르기"'),
    ('"Via Click Initiator"', '"클릭 시작 버튼"'),
    ("'On Long Press'", "'길게 누르기'"),
    ("'Via Click Initiator'", "'클릭 시작 버튼'"),
    ("'Freeform'", "'자유형'"),
    ("'Brush'", "'브러시'"),
    ("'Rectangle'", "'사각형'"),
]

total = 0
for old, new in replacements:
    if old in content:
        n = content.count(old)
        content = content.replace(old, new)
        total += n

Path(menu_path).write_text(content)
print(f"  ✓ {menu_path}: {total}개 영문 → 한국어")
PYEOF
fi

echo "✅ 한글화 빌드 후처리 완료"
