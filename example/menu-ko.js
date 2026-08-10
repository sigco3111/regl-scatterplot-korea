// 한국어 fork — flekschas/regl-scatterplot (MIT)
import { Pane } from 'tweakpane';

import { LinkPlugin } from './tweakpane-link-plugin';
import { saveAsPng } from './utils';

const DEFAULT_PARAMS = {
  numPoints: 100000,
  pointSize: 2,
  opacity: 0.33,
  opacityByDensity: false,
  lassoInit: 'longPress',
  lassoType: 'freeform',
  lassoBrushSize: 24,
};

const set = (scatterplot, keyValuePairs) => {
  if (Array.isArray(scatterplot)) {
    for (const s of scatterplot) {
      s.set(keyValuePairs);
    }
  } else {
    scatterplot.set(keyValuePairs);
  }
}

export function createMenu({
  scatterplot,
  setNumPoints,
  setPointSize,
  setOpacity,
  opacityChangesDisabled,
}) {
  let init = false;

  const refScatterplot = Array.isArray(scatterplot)
    ? scatterplot[0]
    : scatterplot;

  const params = {
    ...DEFAULT_PARAMS,
    numPoints: 0,
    pointSize: Array.isArray(refScatterplot.get('pointSize'))
      ? refScatterplot.get('pointSize')[0]
      : refScatterplot.get('pointSize'),
    opacity: refScatterplot.get('opacity'),
    opacityByDensity: refScatterplot.get('opacityBy') === 'density',
    lassoType: refScatterplot.get('lassoType'),
    lassoBrushSize: refScatterplot.get('lassoBrushSize'),
  };
  const initialParams = { ...params };

  const pane = new Pane({
    title: '설정',
    container: document.getElementById('controls'),
  });
  pane.registerPlugin({ id: 'link', plugins: [LinkPlugin] });

  const settings = pane.addFolder({ title: '설정값' });

  const numPoints = settings.addBinding(
    params,
    'numPoints',
    { label: '점 개수', min: 1000, step: 1000, max: 2000000 }
  );
  numPoints.disabled = true;
  if (setNumPoints) {
    numPoints.on('change', ({ last, value }) => {
      if (init && last) setNumPoints(value);
    });
  }

  const pointSize = settings.addBinding(
    params, 'pointSize', { label: '점 크기', min: 1, max: 32, step: 1 }
  );
  pointSize.disabled = Array.isArray(refScatterplot.get('pointSize'));
  pointSize.on('change', ({ value }) => {
    if (setPointSize) {
      setPointSize(value);
    } else {
      set(scatterplot, { pointSize: value });
    }
  });

  const opacity = settings.addBinding(
    params,
    'opacity',
    { label: '투명도', min: 0.01, max: 1, step: 0.01 }
  );
  opacity.disabled = params.opacityByDensity || Boolean(opacityChangesDisabled);
  opacity.on('change', ({ value }) => {
    if (setOpacity) {
      setOpacity(value);
    } else {
      set(scatterplot, { opacity: value });
    }
  });

  const opacityByDensity = settings.addBinding(
    params,
    'opacityByDensity',
    { label: '동적 투명도' }
  );
  opacityByDensity.disabled = Boolean(opacityChangesDisabled);
  opacityByDensity.on('change', ({ value }) => {
    set(scatterplot, { opacityBy: value ? 'density' : null });
    opacity.disabled = value;
  });

  const lassoInit = settings.addBinding(
    params,
    'lassoInit',
    {
      label: '라쏘 시작 방식',
      options: {
        '길게 누르기': 'longPress',
        '클릭 시작 버튼': 'clickInitiator'
      }
    }
  );
  lassoInit.on('change', ({ value }) => {
    switch (value) {
      case 'longPress': {
        set(scatterplot, {
          lassoInitiator: false,
          lassoOnLongPress: true,
        });
        break;
      }
      case 'clickInitiator': {
        set(scatterplot, {
          lassoInitiator: true,
          lassoOnLongPress: false,
        });
        break;
      }
    }
  });

  const lassoType = settings.addBinding(
    params,
    'lassoType',
    {
      label: '라쏘 종류',
      options: {
        '자유형': 'freeform',
        '브러시': 'brush',
        '사각형': 'rectangle',
      }
    }
  );
  lassoType.on('change', ({ value }) => {
    switch (value) {
      case 'freeform': {
        set(scatterplot, { lassoType: 'freeform' });
        break;
      }
      case 'brush': {
        set(scatterplot, { lassoType: 'brush' });
        break;
      }
      case 'rectangle': {
        set(scatterplot, { lassoType: 'rectangle' });
        break;
      }
    }
    lassoBrushSize.hidden = value !== 'brush';
  });

  const lassoBrushSize = settings.addBinding(
    params,
    'lassoBrushSize',
    { label: '브러시 크기', min: 1, max: 256, step: 1 }
  );
  lassoBrushSize.hidden = params.lassoType !== 'brush';
  lassoBrushSize.on('change', ({ value }) => {
    set(scatterplot, { lassoBrushSize: value });
  });

  const reset = settings.addButton({ title: '초기화' });
  reset.on('click', () => {
    for (const [key, value] of Object.entries(initialParams)) {
      params[key] = value;
    }
    pane.refresh();
  })

  const examples = pane.addFolder({ title: '예제 목록' });

  const pathname = window.location.pathname.slice(1);

  examples.addBlade({
    view: 'link',
    label: '색상 인코딩',
    link: 'index.html',
    active: pathname === '' || pathname === 'index.html',
  });

  examples.addBlade({
    view: 'link',
    label: '크기 및 투명도 인코딩',
    link: 'size-encoding.html',
    active: pathname === 'size-encoding.html',
  });

  examples.addBlade({
    view: 'link',
    label: '동적 투명도',
    link: 'dynamic-opacity.html',
    active: pathname === 'dynamic-opacity.html',
  });

  examples.addBlade({
    view: 'link',
    label: '축 표시',
    link: 'axes.html',
    active: pathname === 'axes.html',
  });

  examples.addBlade({
    view: 'link',
    label: '텍스트 라벨',
    link: 'text-labels.html',
    active: pathname === 'text-labels.html',
  });

  examples.addBlade({
    view: 'link',
    label: '주석',
    link: 'annotations.html',
    active: pathname === 'annotations.html',
  });

  examples.addBlade({
    view: 'link',
    label: '프로그래밍 라쏘',
    link: 'programmatic-lasso.html',
    active: pathname === 'programmatic-lasso.html',
  });

  examples.addBlade({
    view: 'link',
    label: '다중 인스턴스',
    link: 'multiple-instances.html',
    active: pathname === 'multiple-instances.html',
  });

  examples.addBlade({
    view: 'link',
    label: '전환 애니메이션',
    link: 'transition.html',
    active: pathname === 'transition.html',
  });

  examples.addBlade({
    view: 'link',
    label: '점 연결선',
    link: 'connected-points.html',
    active: pathname === 'connected-points.html',
  });

  examples.addBlade({
    view: 'link',
    label: '선분별 점 연결',
    link: 'connected-points-by-segments.html',
    active: pathname === 'connected-points-by-segments.html',
  });

  examples.addBlade({
    view: 'link',
    label: '배경 이미지',
    link: 'texture-background.html',
    active: pathname === 'texture-background.html',
  });

  examples.addBlade({
    view: 'link',
    label: '성능 모드 (2000만 점)',
    link: 'performance-mode.html',
    active: pathname === 'performance-mode.html',
  });

  const info = pane.addFolder({ title: '정보', expanded: false });

  // Tweakpane 4 removed the built-in `view: 'text'` blade. Use a readonly
  // monitor binding so menu initialization never throws synchronously,
  // which would otherwise block the rest of the demo entry script.
  info.addBinding(
    { version: refScatterplot.get('version') },
    'version',
    { readonly: true, label: '버전' }
  );

  const download = pane.addButton({ title: 'PNG로 다운로드' });
  download.on('click', () => {
    saveAsPng(scatterplot);
  });

  const sourceCode = pane.addButton({ title: '소스 코드 보기' });
  sourceCode.on('click', () => {
    window.open(
      'https://github.com/flekschas/regl-scatterplot', '_blank'
    ).focus();
  });

  refScatterplot.subscribe('draw', () => {
    params.numPoints = refScatterplot.get('points').length;
    initialParams.numPoints = params.numPoints;
    if (setNumPoints) numPoints.disabled = false;
    pane.refresh();
    init = true;
  }, 1);
}

export default createMenu;
