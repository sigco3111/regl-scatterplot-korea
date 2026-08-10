# regl-scatterplot-korea

[flekschas/regl-scatterplot](https://github.com/flekschas/regl-scatterplot) 기반 **한국어 인터랙티브 산점도 데모** 모음.

## 🎯 데모

| 데모 | URL | 데이터 |
|---|---|---|
| **GitHub 13만 저장소** (예정) | Vercel 배포 예정 | GitHub 공개 데이터 (API 키 불요) |

## 📦 포함 내용

```
regl-scatterplot-korea/
├── examples/
│   └── github-130k/
│       ├── index.html          # 한국어 인터랙티브 데모
│       └── regl-scatterplot.esm.js   # 빌드된 라이브러리
├── scripts/
│   └── collect-github.py       # GitHub 공개 데이터 수집기 (API 키 불요)
├── data/
│   └── github-repos.json       # 수집된 GitHub 저장소 메타 (각 수집 시 갱신)
└── vercel.json                  # Vercel 빌드 설정 (자동으로 examples → docs 복사)
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
# 빌드 명령 (vercel.json):
#   npm run build && mkdir -p docs/github-130k/data
#   && cp examples/github-130k/* docs/github-130k/
#   && cp data/github-repos.json docs/github-130k/data/
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

## 🎨 인터랙션

- **드래그**: 평면 이동
- **휠/줌**: 확대/축소
- **라쏘 선택**: 마우스로 영역 긋기 → 해당 점들 하이라이트
- **호버**: 툴팁에 `stars/forks/lang/description` 표시

## 🔗 관련 링크

- 원본 라이브러리: https://github.com/flekschas/regl-scatterplot
- 라이브 데모: https://flekschas.github.io/regl-scatterplot/
- 학술 논문: https://doi.org/10.21105/joss.05275

## 📄 라이선스

원본 [regl-scatterplot](https://github.com/flekschas/regl-scatterplot) MIT 라이선스 하에 배포.
이 저장소는 한국어 예제 + 데이터 수집 스크립트 추가본.
