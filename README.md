# regl-scatterplot-korea 🇰🇷

[flekschas/regl-scatterplot](https://github.com/flekschas/regl-scatterplot) 기반 **한국어 인터랙티브 산점도 데모** 모음.

> 최대 수백만 개의 점을 WebGL로 부드럽게 렌더링하는 학술용 산점도 라이브러리를 한국어로 다룰 수 있도록 한글화 + GitHub 데이터 데모 추가.

## 🌐 라이브 데모 (Vercel)

| 데모 | URL | 비고 |
|---|---|---|
| **메인 (한글화)** | https://regl-scatterplot.vercel.app/ | 한글 UI + 조작 안내 |
| **Axes 예제** | https://regl-scatterplot.vercel.app/axes.html | D3 scale 동기화 |
| **Text Labels 예제** | https://regl-scatterplot.vercel.app/text-labels.html | 점 위에 라벨 표시 |
| **Connected Points 예제** | https://regl-scatterplot.vercel.app/connected-points.html | 점 사이 연결선 |
| **Dynamic Opacity 예제** | https://regl-scatterplot.vercel.app/dynamic-opacity.html | 투명도 동적 조절 |
| **GitHub 데이터 데모** | https://regl-scatterplot.vercel.app/github-130k/ | 공개 GitHub 저장소 100+개 |

## 🎯 한글화 내역

원본 flekschas/regl-scatterplot의 정적 데모 페이지들을 빌드 후처리 자동화로 한글화:

- `<html lang="ko">` 설정
- `<title>` 한국어 ("Regl 산점도 — {예제명} 예제 (한국어)")
- 메타 description 한국어
- 메인 페이지에 한글 nav + 조작 헬프 박스 추가
- 한글 폰트 패밀리 (Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic)
- GitHub Dark 테마 색상 (#0d1117 / #58a6ff)

빌드 시 `scripts/koreanize.sh`가 자동 실행 (멱등성 보장).

## 📦 포함 내용

```
regl-scatterplot-korea/
├── examples/
│   └── github-130k/
│       ├── index.html              # 한국어 인터랙티브 GitHub 데이터 데모
│       └── regl-scatterplot.esm.js # 빌드된 라이브러리
├── scripts/
│   ├── collect-github.py           # GitHub 공개 데이터 수집기 (API 키 불요)
│   └── koreanize.sh                # 빌드 후처리 한글화 스크립트
├── data/
│   └── github-repos.json           # 수집된 GitHub 저장소 메타
└── vercel.json                     # Vercel 빌드 설정 (한글화 + 예제 복사 통합)
```

## 🚀 빠른 시작

```bash
# 1) 의존성 설치
npm install regl-scatterplot

# 2) 데이터 갱신 (API 키 불요, 시간당 10 query 한도)
python3 scripts/collect-github.py --max-pages=1 --query="stars:>1000"

# 3) 로컬 서버
cd examples/github-130k
python3 -m http.server 8000
# → http://localhost:8000
```

## ☁️ Vercel 배포

```bash
vercel --prod
```

**`vercel.json` 빌드 명령**:
```bash
npm run build \
  && bash scripts/koreanize.sh \
  && mkdir -p docs/github-130k/data \
  && cp examples/github-130k/index.html examples/github-130k/regl-scatterplot.esm.js docs/github-130k/ \
  && cp data/github-repos.json docs/github-130k/data/
```

## 📊 데이터 수집 전략

GitHub 검색 API는 **비인증 사용자는 시간당 10 query** 까지만 사용 가능합니다.
13만 포인트를 모으려면 약 13시간 분산 작업이 필요합니다.

| 단계 | 명령 | 누적 |
|---|---|---|
| 1 | `python3 scripts/collect-github.py --max-pages=1 --query="stars:>1000"` | 100 |
| 2 | `--query="stars:100..1000"` | 200+ |
| ... | (시간당 1 query) | ... |
| 13+ | `--query="stars:1..10"` | 13만+ |

`scripts/collect-github.py`는 **이어받기** 지원 — 같은 `data/github-repos.json`에 누적 저장.

## 🎨 인터랙션 (모든 데모 공통)

- **드래그**: 평면 이동
- **휠/줌**: 확대/축소
- **라쏘 선택**: Shift + 드래그로 영역 긋기 → 해당 점들 하이라이트
- **호버**: 툴팁에 `stars/forks/lang/description` 표시 (GitHub 데이터 데모 한정)

## 🔗 관련 링크

- **원본 라이브러리**: https://github.com/flekschas/regl-scatterplot
- **원본 라이브 데모**: https://flekschas.github.io/regl-scatterplot/
- **JOSS 학술 논문**: https://doi.org/10.21105/joss.05275
- **이 저장소**: https://github.com/sigco3111/regl-scatterplot-korea

## 📄 라이선스

원본 [regl-scatterplot](https://github.com/flekschas/regl-scatterplot) MIT 라이선스 하에 배포.
이 저장소는 한국어 예제 + 데이터 수집 스크립트 추가본.
