# regl-scatterplot-korea 🇰🇷

<p align="right">
  <strong>🇰🇷 한국어</strong> · <a href="README.upstream.md">원본 영문 문서</a>
</p>

[flekschas/regl-scatterplot](https://github.com/flekschas/regl-scatterplot)의 전체 소스와 Git 이력을 기반으로 운영하는 한국어 클론 저장소입니다.

> WebGL 기반 고성능 산점도 라이브러리, 원본 예제와 테스트를 그대로 유지하면서 정적 데모 UI 한글화와 GitHub 저장소 데이터 예제를 추가했습니다. 업스트림으로 PR을 보내지 않고 독립 운영합니다.

## 🌐 라이브 데모

| 데모 | URL | 비고 |
|---|---|---|
| **통합 쇼케이스** | https://regl-scatterplot.vercel.app/ | 6개 데모를 한 페이지에 그리드 배치, 썸네일이 각 standalone demo의 핵심 기능을 그대로 재현 |
| **축 예제** | https://regl-scatterplot.vercel.app/axes.html | D3 scale 동기화 |
| **텍스트 라벨 예제** | https://regl-scatterplot.vercel.app/text-labels.html | 점 위에 라벨 표시 |
| **점 연결 예제** | https://regl-scatterplot.vercel.app/connected-points.html | 점 사이 연결선 |
| **동적 투명도 예제** | https://regl-scatterplot.vercel.app/dynamic-opacity.html | 투명도 동적 조절 |
| **GitHub 데이터 데모** | https://regl-scatterplot.vercel.app/github-130k/ | 공개 저장소 데이터 시각화 |

## 원본 대비 변경 사항

- `public/showcase.html` + `example/showcase.js` + `vite.config.mjs`
  - 6개 데모를 한 페이지에 보여주는 통합 쇼케이스 추가 (그리드 레이아웃, 모바일 단일 열, 데스크톱 2열)
  - Vite 멀티 페이지에 `showcase` 청크를 추가하고, `/` 경로에서 자동으로 쇼케이스로 이동
  - 각 카드는 자체 `<canvas>` + 전용 `createScatterplot` 인스턴스로 렌더링되어 `page.locator('[data-demo-card] canvas').count() === 6` 조건을 만족
  - 카드의 썸네일이 standalone demo와 시각적으로 일치하도록 다음 핵심 기능을 그대로 재현:
    - **축 표시**: d3-axis 오버레이 + 그리드 + tick 라벨 (`xScale [0, 42]`, `yScale [0, 4.2]`, `view` 이벤트에 동기화)
    - **점 연결선**: 9000 pts × 15 orbital clusters + `pointConnectionSize:2` + 카테고리별 연결선 색
    - **텍스트 라벨**: 10000 pts + `showLabelsOnHover:true` + per-point 라벨
    - **동적 투명도**: 100000 pts + `opacityBy:'density'`
    - **색상 인코딩**: 100000 pts + brush 라쏘 + gradient
    - **GitHub 데이터**: log 스케일 + 언어별 색 (pre-computed 배열 — 콜백은 normalize되어 깨지므로 회피)
- `example/menu.js`, `example/menu-ko.js`, `example/embedded.js`, `example/performance-mode.js`
  - Tweakpane 4에서 제거된 `view: 'text'` 블레이드를 readonly monitor 바인딩으로 교체 (Info 섹션이 동기 throw로 `setNumPoints`를 막던 문제 해결)
  - `embedded.js`/`performance-mode.js`에 존재하지 않는 DOM 요소 (`#example-*`, `#export`)에 대한 defensive null 가드 추가
- `scripts/koreanize.sh`
  - Vite 빌드가 생성한 `docs/*.html`의 언어·제목·설명·폰트를 한국어화
  - 빌드된 `menu-*.js`의 설정, 라쏘, 예제, 정보 메뉴를 한국어화 (35+ 문자열, 가장 긴 패턴 우선 정렬로 `Opacity`가 `Dynamic Opacity`를 갉아먹는 문제 방지)
  - `version`은 JS 속성 키에서는 건드리지 않고 `label:\`version\`` 정규식 컨텍스트에서만 `버전`으로 치환
  - `docs/index.html`을 redirect 페이지로 덮어쓰지 않음 — `index` 청크가 만든 standalone 색상 데모를 보존
- `scripts/sync-github-130k.mjs`
  - 개발 모드에서 `examples/github-130k/`를 `public/github-130k/`로 복사 (Vercel 빌드는 `docs/github-130k/`)
- `example/menu-ko.js`
  - 원본 메뉴 소스를 바탕으로 만든 한국어 참고 구현
- `examples/github-130k/`
  - Stars, Forks, 언어를 좌표와 색상으로 표시하는 한국어 인터랙티브 산점도
  - importmap으로 `pub-sub-es`/`regl`을 CDN에서 해결하고, `scatter.getCanvas()`를 현재 API인 `scatter.get('canvas')`로 갱신
- `scripts/collect-github.py`와 `data/github-repos.json`
  - API 키 없이 공개 GitHub 데이터를 수집하고 이어받아 저장
- `vercel.json`
  - 전체 라이브러리 빌드 → 한국어 후처리 → GitHub 데이터 데모 복사를 하나의 배포 명령으로 실행

## 저장소 구조

```text
regl-scatterplot-korea/
├── src/                         # 원본 라이브러리 소스
├── example/                     # 원본 예제 소스 + showcase.js + menu-ko.js
├── examples/github-130k/        # 추가한 GitHub 데이터 데모
├── public/
│   ├── index.html               # 단일 데모 템플릿 (`/`는 쇼케이스로 리다이렉트)
│   └── showcase.html            # 통합 쇼케이스 템플릿
├── data/github-repos.json       # 수집된 공개 저장소 데이터
├── scripts/
│   ├── collect-github.py        # 공개 데이터 수집기
│   ├── koreanize.sh             # 빌드 후 한국어화
│   └── sync-github-130k.mjs     # 개발 모드용 데모 동기화
├── tests/                       # 원본 테스트
├── qa/                          # Playwright 회귀 인프라 + 증거 (evidence/는 .gitignore)
├── README.upstream.md           # 원본 영문 README 보존본
└── vercel.json                  # Vercel 통합 빌드 설정
```

## 쇼케이스 검증

쇼케이스는 Playwright로 회귀 검증합니다 (`qa/showcase-checks.mjs`).

- 6개 카드가 모두 존재 (`page.locator('[data-demo-card]').count() === 6`)
- 6개 `<canvas>`가 모두 렌더되고 non-zero bounding box (`page.locator('[data-demo-card] canvas').count() === 6`)
- `pageerror` 0건, `console.error` 0건
- 모바일 뷰포트 (390×844)에서 카드가 단일 열로 배치되고 가로 overflow 없음

증거 스크린샷은 `qa/evidence/`에 보존됩니다 (gitignore 처리). 로컬에서 실행:

```bash
npm run start -- --port 4173 --host 127.0.0.1 &
node qa/showcase-checks.mjs
```

## 개발 환경

```bash
npm ci
npm run build
npm test
npm start
```

- Node.js 20 이상
- 개발 서버 기본 주소: `http://localhost:3000`
- `npm run build`는 라이브러리 `dist/`와 데모 `docs/`를 만듭니다.
- 한국어 배포 산출물을 로컬에서 그대로 만들려면 아래 배포 빌드 명령을 사용합니다.

## 한국어 배포 빌드

```bash
npm run build \
  && bash scripts/koreanize.sh \
  && mkdir -p docs/github-130k/data \
  && cp examples/github-130k/index.html examples/github-130k/regl-scatterplot.esm.js docs/github-130k/ \
  && cp data/github-repos.json docs/github-130k/data/
```

`vercel.json`도 같은 순서를 사용합니다. `docs/`는 생성물이라 Git에서 추적하지 않습니다.

## GitHub 데이터 갱신

```bash
python3 scripts/collect-github.py \
  --max-pages=1 \
  --query="stars:>1000"
```

GitHub 검색 API의 비인증 한도는 시간당 10회입니다. 스크립트는 `data/github-repos.json`을 읽어 중복을 제거한 뒤 새 결과를 누적합니다.

## 인터랙션

- **드래그**: 평면 이동
- **휠**: 확대·축소
- **Shift + 드래그**: 라쏘 선택
- **더블 클릭**: 선택 및 보기 초기화
- **GitHub 데이터 데모 호버**: 저장소명, Stars, Forks, 언어, 설명 표시

## 원격 구성

이 저장소를 클론한 뒤 업스트림 변경을 추적하려면 다음 구조를 권장합니다.

```bash
git remote -v
# origin    https://github.com/sigco3111/regl-scatterplot-korea.git
# upstream  https://github.com/flekschas/regl-scatterplot.git

git fetch upstream
```

업스트림 동기화 시 한국어 전용 파일과 `README.md` 충돌 여부를 먼저 확인합니다. 원본 README는 `README.upstream.md`에 보존합니다.

## 라이선스와 출처

- 원본 프로젝트: [flekschas/regl-scatterplot](https://github.com/flekschas/regl-scatterplot)
- 원저자: Fritz Lekschas 및 기여자
- 논문: [JOSS 10.21105/joss.05275](https://doi.org/10.21105/joss.05275)
- 라이선스: [MIT](LICENSE)
- 한국어 후처리, 한국어 메뉴, GitHub 데이터 데모: 이 저장소의 추가 작업

원본 저작권과 MIT 라이선스 고지를 그대로 유지합니다.
