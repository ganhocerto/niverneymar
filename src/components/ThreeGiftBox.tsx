import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audioSynthesizer';

interface ThreeGiftBoxProps {
  onOpenStart: () => void;
  onOpened: () => void;
  disabled?: boolean;
}

export const ThreeGiftBox: React.FC<ThreeGiftBoxProps> = ({
  onOpenStart,
  onOpened,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpening, setIsOpening] = useState(false);
  const openStartedRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);

  const triggerOpen = useCallback(() => {
    if (openStartedRef.current || disabled) return;
    openStartedRef.current = true;
    setIsOpening(true);
    onOpenStart();
  }, [disabled, onOpenStart]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0103, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    // Clean perspective framing for a small, compact, grounded gift box
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 0.6, isMobile ? 6.2 : 5.4);
    camera.lookAt(0, -0.05, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Solid, Fully Opaque Physical Materials ---
    // Solid, rich ruby red box material (firm, opaque, physical)
    const solidRedBoxMaterial = new THREE.MeshStandardMaterial({
      color: 0x940D17,
      roughness: 0.32,
      metalness: 0.08,
      emissive: 0x1c0205,
      emissiveIntensity: 0.15,
    });

    // Solid dark obsidian ribbon
    const solidDarkRibbon = new THREE.MeshStandardMaterial({
      color: 0x17120E,
      roughness: 0.22,
      metalness: 0.82,
      emissive: 0x140E05,
      emissiveIntensity: 0.15,
    });

    // Solid polished gold center bead
    const solidGoldKnot = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      roughness: 0.18,
      metalness: 0.9,
      emissive: 0x362503,
      emissiveIntensity: 0.25,
    });

    // --- Main Small 3D Gift Box Group ---
    const giftGroup = new THREE.Group();
    giftGroup.position.y = -0.05;
    scene.add(giftGroup);

    // Small, compact, solid dimensions
    const boxW = 1.2;
    const boxH = 1.05;
    const boxD = 1.2;
    const ribbonW = 0.2;
    const ribbonThick = 0.012;

    // 1. Solid Box Base
    const baseGeom = new THREE.BoxGeometry(boxW, boxH, boxD);
    const baseMesh = new THREE.Mesh(baseGeom, solidRedBoxMaterial);
    baseMesh.position.y = -boxH / 2 + 0.35;
    giftGroup.add(baseMesh);

    // Solid Ribbons on Base (Z axis)
    const baseRibbonVGeom = new THREE.BoxGeometry(ribbonW, boxH + 0.002, boxD + ribbonThick * 2);
    const baseRibbonVMesh = new THREE.Mesh(baseRibbonVGeom, solidDarkRibbon);
    baseRibbonVMesh.position.copy(baseMesh.position);
    giftGroup.add(baseRibbonVMesh);

    // Solid Ribbons on Base (X axis)
    const baseRibbonHGeom = new THREE.BoxGeometry(boxW + ribbonThick * 2, boxH + 0.002, ribbonW);
    const baseRibbonHMesh = new THREE.Mesh(baseRibbonHGeom, solidDarkRibbon);
    baseRibbonHMesh.position.copy(baseMesh.position);
    giftGroup.add(baseRibbonHMesh);

    // 2. Solid Box Lid
    const lidGroup = new THREE.Group();
    const lidW = boxW + 0.08;
    const lidH = 0.24;
    const lidD = boxD + 0.08;
    const lidPosY = baseMesh.position.y + boxH / 2 + lidH / 2 - 0.025;
    lidGroup.position.set(0, lidPosY, 0);
    giftGroup.add(lidGroup);

    const lidGeom = new THREE.BoxGeometry(lidW, lidH, lidD);
    const lidMesh = new THREE.Mesh(lidGeom, solidRedBoxMaterial);
    lidGroup.add(lidMesh);

    // Solid Ribbons crossing the Lid
    const lidRibbonVGeom = new THREE.BoxGeometry(ribbonW, lidH + 0.002, lidD + ribbonThick * 2);
    const lidRibbonVMesh = new THREE.Mesh(lidRibbonVGeom, solidDarkRibbon);
    lidGroup.add(lidRibbonVMesh);

    const lidRibbonHGeom = new THREE.BoxGeometry(lidW + ribbonThick * 2, lidH + 0.002, ribbonW);
    const lidRibbonHMesh = new THREE.Mesh(lidRibbonHGeom, solidDarkRibbon);
    lidGroup.add(lidRibbonHMesh);

    // 3. Compact Solid Bow on Lid
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, lidH / 2 + 0.01, 0);
    lidGroup.add(bowGroup);

    // Center Gold Knot Bead
    const knotGeom = new THREE.SphereGeometry(0.12, 24, 24);
    const knotMesh = new THREE.Mesh(knotGeom, solidGoldKnot);
    knotMesh.position.y = 0.06;
    knotMesh.scale.set(1.1, 0.9, 1.1);
    bowGroup.add(knotMesh);

    // Small interlocking solid loops
    const createCurvedLoop = (angleY: number, tiltX: number = 0.46) => {
      const loopGeom = new THREE.TorusGeometry(0.2, 0.048, 16, 32, Math.PI * 1.55);
      const loopMesh = new THREE.Mesh(loopGeom, solidDarkRibbon);
      loopMesh.rotation.y = angleY;
      loopMesh.rotation.x = tiltX;
      loopMesh.position.set(Math.cos(angleY) * 0.09, 0.13, Math.sin(angleY) * 0.09);
      bowGroup.add(loopMesh);
      return loopMesh;
    };

    createCurvedLoop(0, 0.4);
    createCurvedLoop(Math.PI / 2, 0.4);
    createCurvedLoop(Math.PI, 0.4);
    createCurvedLoop((3 * Math.PI) / 2, 0.4);
    createCurvedLoop(Math.PI / 4, 0.52);
    createCurvedLoop((3 * Math.PI) / 4, 0.52);
    createCurvedLoop((5 * Math.PI) / 4, 0.52);
    createCurvedLoop((7 * Math.PI) / 4, 0.52);

    // 4. Firm Solid Contact Shadow underneath
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 8, 128, 128, 110);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.96)');
      grad.addColorStop(0.35, 'rgba(10, 1, 2, 0.65)');
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.18)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeom = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = baseMesh.position.y - boxH / 2 - 0.015;
    scene.add(shadowMesh);

    // 5. Internal Warm Golden Glow Light (for opening)
    const innerLight = new THREE.PointLight(0xFFA000, 0, 12, 2);
    innerLight.position.set(0, baseMesh.position.y + 0.2, 0);
    scene.add(innerLight);

    // 6. Subtle Ambient Micro-Sparkles
    const particleCount = 70;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    const redSparkle = new THREE.Color(0xFF334B);
    const goldSparkle = new THREE.Color(0xFFD54F);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 7;
      positions[i3 + 1] = (Math.random() - 0.5) * 5;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;

      const pickColor = Math.random() > 0.4 ? redSparkle : goldSparkle;
      colors[i3] = pickColor.r;
      colors[i3 + 1] = pickColor.g;
      colors[i3 + 2] = pickColor.b;

      particleSpeeds[i] = 0.2 + Math.random() * 0.4;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtxTexture = pCanvas.getContext('2d');
    if (pCtxTexture) {
      const pGrad = pCtxTexture.createRadialGradient(32, 32, 0, 32, 32, 30);
      pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      pGrad.addColorStop(0.35, 'rgba(255, 60, 80, 0.8)');
      pGrad.addColorStop(1, 'rgba(255, 20, 40, 0)');
      pCtxTexture.fillStyle = pGrad;
      pCtxTexture.fillRect(0, 0, 64, 64);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.1,
      map: pTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // --- Studio Lighting Architecture ---
    const ambientLight = new THREE.AmbientLight(0x2a060d, 1.8);
    scene.add(ambientLight);

    // Warm Directional Key Light
    const keyLight = new THREE.DirectionalLight(0xFFEADB, 2.6);
    keyLight.position.set(3.2, 5.2, 3.8);
    scene.add(keyLight);

    // Sharp Rim Highlight Light for clear 3D edges
    const rimLight = new THREE.PointLight(0xFF1744, 2.6, 10, 1.8);
    rimLight.position.set(-3.2, 2.8, -2.8);
    scene.add(rimLight);

    // Gentle roving specular point light
    const movingLight = new THREE.PointLight(0xFFC107, 1.2, 6, 2);
    movingLight.position.set(1.4, 2.2, 2.2);
    scene.add(movingLight);

    // --- Cursor & Touch Parallax ---
    const targetRotation = { x: 0.14, y: 0.38 };
    const currentRotation = { x: 0.14, y: 0.38 };

    const onPointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotation.y = 0.38 + normX * 0.28;
      targetRotation.x = 0.14 - normY * 0.14;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth) * 2 - 1;
        const normY = -(touch.clientY / window.innerHeight) * 2 + 1;
        targetRotation.y = 0.38 + normX * 0.28;
        targetRotation.x = 0.14 - normY * 0.14;
      }
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const mobile = w < 768;
      camera.aspect = w / h;
      camera.position.z = mobile ? 6.2 : 5.4;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Render Loop ---
    const startTime = performance.now();
    let openAnimationStartTime: number | null = null;
    let confettiLaunched = false;
    let openedCallbackFired = false;

    const animate = (timestamp: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsed = (timestamp - startTime) * 0.001;

      // Update ambient sparkles
      const posAttr = particleGeom.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3 + 1;
        posArray[idx] += 0.002 * particleSpeeds[i];
        if (posArray[idx] > 2.8) {
          posArray[idx] = -2.2;
        }
      }
      posAttr.needsUpdate = true;
      particleSystem.rotation.y = elapsed * 0.025;

      // Subtle moving specular light
      movingLight.position.x = Math.sin(elapsed * 1.1) * 2.8;
      movingLight.position.y = 1.8 + Math.cos(elapsed * 1.4) * 0.8;
      movingLight.position.z = Math.cos(elapsed * 1.1) * 2.8;

      // Slerp rotation
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;

      // --- Opening Animation ---
      if (openStartedRef.current) {
        if (openAnimationStartTime === null) {
          openAnimationStartTime = timestamp;
          soundEffects.playTouchChime();
        }

        const openProgress = (timestamp - openAnimationStartTime) / 1000;

        // 1. Gentle Anticipation
        if (openProgress < 0.35) {
          const shake = Math.sin(openProgress * 40) * 0.012 * (1 - openProgress / 0.35);
          giftGroup.position.x = shake;
          giftGroup.scale.set(1.01, 0.98 + Math.sin(openProgress * 20) * 0.02, 1.01);
        } else {
          giftGroup.position.x = 0;
          giftGroup.scale.set(1, 1, 1);
        }

        // 2. Lid Lifts Straight Up and Tilts Back smoothly
        if (openProgress >= 0.4) {
          if (openProgress >= 0.4 && openProgress < 0.45) {
            soundEffects.playLidOpen();
          }

          const lidProg = THREE.MathUtils.clamp((openProgress - 0.4) / 1.3, 0, 1);
          const easeLid = 1 - Math.pow(1 - lidProg, 3);

          lidGroup.position.y = lidPosY + easeLid * 2.4;
          lidGroup.position.z = -easeLid * 0.55;
          lidGroup.rotation.x = -easeLid * 0.45;

          // Warm golden light emerges from inside
          innerLight.intensity = easeLid * 14;
          ambientLight.intensity = 1.8 + easeLid * 1.2;
        }

        // 3. Elegant Confetti
        if (openProgress >= 0.95 && !confettiLaunched) {
          confettiLaunched = true;
          soundEffects.playConfettiBurst();

          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.52, x: 0.5 },
            colors: ['#D32F2F', '#FF1744', '#FFD54F', '#FFF9C4', '#FFFFFF'],
            ticks: 280,
            gravity: 0.75,
            scalar: 1.05,
            zIndex: 9999,
          });

          setTimeout(() => {
            confetti({
              particleCount: 45,
              spread: 60,
              origin: { y: 0.55, x: 0.4 },
              colors: ['#FF1744', '#FFD54F', '#FFFFFF'],
              gravity: 0.8,
              scalar: 0.85,
              zIndex: 9999,
            });
            confetti({
              particleCount: 45,
              spread: 60,
              origin: { y: 0.55, x: 0.6 },
              colors: ['#D32F2F', '#FFD54F', '#E2E8F0'],
              gravity: 0.8,
              scalar: 0.85,
              zIndex: 9999,
            });
          }, 280);
        }

        // 4. Complete Transition
        if (openProgress >= 2.2 && !openedCallbackFired) {
          openedCallbackFired = true;
          onOpened();
        }

        giftGroup.rotation.y = currentRotation.y + openProgress * 0.25;
      } else {
        // Idle Motion: gentle subtle breathing and floating
        const floatY = Math.sin(elapsed * 1.6) * 0.038;
        const subtleTilt = Math.sin(elapsed * 1.1) * 0.018;
        giftGroup.position.y = -0.05 + floatY;
        giftGroup.rotation.y = currentRotation.y + Math.sin(elapsed * 0.7) * 0.05;
        giftGroup.rotation.x = currentRotation.x + subtleTilt;

        shadowMesh.scale.setScalar(1 - floatY * 0.25);
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onOpened]);

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#070102] select-none touch-none py-12 px-4">
      {/* 3D Canvas (Clickable everywhere) */}
      <div
        ref={containerRef}
        onClick={triggerOpen}
        className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center transition-transform active:scale-[0.99] outline-none"
        style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
        title="Toque no presente para abrir"
      />

      {/* Atmospheric Dark Crimson Radial Glow Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_46%,rgba(142,12,22,0.48)_0%,rgba(65,5,10,0.65)_38%,#070102_78%)]" />

      {/* Top Header matching IMG_7599.png */}
      <div className="relative z-20 pointer-events-none flex flex-col items-center text-center max-w-sm mt-4 sm:mt-6">
        <h1
          className="font-editorial text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-snug tracking-wide"
          style={{
            textShadow: '0 0 25px rgba(255, 255, 255, 0.45), 0 0 45px rgba(220, 38, 38, 0.4)',
          }}
        >
          Uma surpresa especial espera por você...
        </h1>
      </div>

      {/* Center Spacer ensuring the compact 3D gift box is completely clear and beautiful */}
      <div className="flex-1 pointer-events-none" />

      {/* Bottom Button matching EXACTLY the screenshot pill button */}
      <div
        className={`relative z-20 flex flex-col items-center text-center mb-6 sm:mb-8 transition-all duration-700 ${
          isOpening ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'
        }`}
      >
        <button
          onClick={triggerOpen}
          className="group relative flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D32F2F] via-[#E53935] to-[#D32F2F] text-white text-base sm:text-lg font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            border: '2px solid #FFD54F',
            boxShadow: '0 0 35px rgba(229, 57, 53, 0.65), 0 0 15px rgba(255, 213, 79, 0.35)',
          }}
        >
          <span className="text-xl leading-none">❤️</span>
          <span className="font-sans font-semibold tracking-wide text-white drop-shadow-sm">
            Toque para abrir seu presente
          </span>
          <span className="text-xl leading-none text-[#FFD54F]">✨</span>
        </button>
      </div>
    </div>
  );
};
