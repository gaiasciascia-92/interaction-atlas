// Preview "WebGL Displacement Hover" — kind: webgl. Three.js arriva per
// import() dinamico dentro il modulo, mai importato staticamente nel telaio
// (MOTION_PRINCIPLES.md §4). destroy() ferma il render loop e dispone
// geometrie/materiali/texture/renderer (COMPONENT_RULES.md, MOTION_PRINCIPLES.md §4).
import type * as ThreeNS from 'three';
import type { PreviewModule } from '../types/preview';
import './webgl-displacement-hover.css';

// Placeholder procedurali: nessuna fotografia reale è ancora disponibile
// (V3/Playground). Due gradienti generati dalla palette del prodotto al
// posto di due immagini, e una mappa di rumore al posto di una mappa di
// displacement disegnata a mano.
const PHOTO_A_STOPS: [number, string][] = [
  [0, '#1E1B1C'],
  [1, '#5C5D8D'],
];
const PHOTO_B_STOPS: [number, string][] = [
  [0, '#5C5D8D'],
  [1, '#FFA630'],
];

interface Controls {
  start(): void;
  stop(): void;
  dispose(): void;
}

let stageEl: HTMLElement | null = null;
let controls: Controls | null = null;

function makeGradientTexture(THREE: typeof ThreeNS, stops: [number, string][], size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  for (const [stop, color] of stops) gradient.addColorStop(stop, color);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function makeNoiseTexture(THREE: typeof ThreeNS, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const imageData = ctx.createImageData(size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = Math.random() * 255;
    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = value;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

async function attach(el: HTMLElement, reducedMotion: boolean): Promise<void> {
  const THREE = await import('three');
  if (stageEl !== el) return; // destroy() è già passato mentre Three caricava

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const textureA = makeGradientTexture(THREE, PHOTO_A_STOPS);
  const textureB = makeGradientTexture(THREE, PHOTO_B_STOPS);
  const displacement = makeNoiseTexture(THREE);

  const uniforms = {
    uTextureA: { value: textureA },
    uTextureB: { value: textureB },
    uDisplacement: { value: displacement },
    uProgress: { value: 0 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTextureA;
      uniform sampler2D uTextureB;
      uniform sampler2D uDisplacement;
      uniform float uProgress;
      varying vec2 vUv;
      void main() {
        vec4 disp = texture2D(uDisplacement, vUv);
        vec2 uvA = vUv + disp.rg * uProgress * 0.35;
        vec2 uvB = vUv - disp.rg * (1.0 - uProgress) * 0.35;
        vec4 colorA = texture2D(uTextureA, uvA);
        vec4 colorB = texture2D(uTextureB, uvB);
        gl_FragColor = mix(colorA, colorB, uProgress);
      }
    `,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function resize() {
    const { width, height } = el.getBoundingClientRect();
    renderer.setSize(width, height, false);
  }
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(el);

  let targetProgress = 0;
  let rafId = 0;

  function renderFrame() {
    uniforms.uProgress.value += (targetProgress - uniforms.uProgress.value) * 0.08;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(renderFrame);
  }

  const onEnter = () => {
    targetProgress = 1;
  };
  const onLeave = () => {
    targetProgress = 0;
  };

  controls = {
    start() {
      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointerleave', onLeave);
      if (!rafId) rafId = requestAnimationFrame(renderFrame);
    },
    stop() {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(rafId);
      rafId = 0;
    },
    dispose() {
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      textureA.dispose();
      textureB.dispose();
      displacement.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };

  if (reducedMotion) {
    renderer.render(scene, camera); // un solo frame statico, nessun loop (MOTION_PRINCIPLES.md §6)
  } else {
    controls.start();
  }
}

const webglDisplacementHover: PreviewModule = {
  mount(el, opts) {
    stageEl = el;
    el.classList.add('stage');
    void attach(el, opts?.reducedMotion ?? false);
  },

  destroy() {
    controls?.stop();
    controls?.dispose();
    controls = null;
    stageEl?.classList.remove('stage');
    stageEl?.replaceChildren();
    stageEl = null;
  },

  pause() {
    controls?.stop();
  },

  resume() {
    controls?.start();
  },
};

export default webglDisplacementHover;
