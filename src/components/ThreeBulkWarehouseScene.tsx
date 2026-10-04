import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBulkWarehouseSceneProps {
  selectedBagSize: '15 KG' | '25 KG' | '40 KG' | '50 KG';
  reducedMotion: boolean;
}

export const ThreeBulkWarehouseScene: React.FC<ThreeBulkWarehouseSceneProps> = ({
  selectedBagSize,
  reducedMotion,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 360;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(4.5, 3.2, 5.4);
    camera.lookAt(0, 0.6, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff5e4, 2.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const redAccentLight = new THREE.PointLight(0xf50008, 2.6, 12);
    redAccentLight.position.set(-3, 2.5, 3);
    scene.add(redAccentLight);

    const group = new THREE.Group();
    scene.add(group);

    // Industrial Export Pallet Base
    const palletMat = new THREE.MeshStandardMaterial({
      color: 0x2f2b26,
      roughness: 0.85,
      metalness: 0.15,
    });
    const palletBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.22, 2.6), palletMat);
    palletBase.position.y = -0.5;
    group.add(palletBase);

    // Floor Grid
    const gridHelper = new THREE.GridHelper(9, 18, 0xf50008, 0x333333);
    gridHelper.position.y = -0.62;
    group.add(gridHelper);

    // Determine bag scale & stack count from selectedBagSize
    const sizeConfig = {
      '15 KG': { scaleY: 0.75, scaleXZ: 0.82, layers: 4 },
      '25 KG': { scaleY: 0.9, scaleXZ: 0.9, layers: 4 },
      '40 KG': { scaleY: 1.05, scaleXZ: 0.98, layers: 3 },
      '50 KG': { scaleY: 1.2, scaleXZ: 1.04, layers: 3 },
    }[selectedBagSize];

    // PP Woven Bag Material
    const bagMat = new THREE.MeshStandardMaterial({
      color: 0xe8e4dc,
      roughness: 0.68,
      metalness: 0.08,
    });

    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xf50008 });

    // Create stacked PP bags on the pallet
    const bagWidth = 1.25 * sizeConfig.scaleXZ;
    const bagHeight = 0.34 * sizeConfig.scaleY;
    const bagDepth = 0.92 * sizeConfig.scaleXZ;

    for (let layer = 0; layer < sizeConfig.layers; layer++) {
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
          const bagGroup = new THREE.Group();

          // Slight organic pillowing using rounded box / cylinder blend
          const bagGeo = new THREE.BoxGeometry(bagWidth, bagHeight, bagDepth, 4, 2, 4);
          const posAttr = bagGeo.attributes.position;
          for (let i = 0; i < posAttr.count; i++) {
            const vx = posAttr.getX(i);
            const vy = posAttr.getY(i);
            const vz = posAttr.getZ(i);
            // Soften corners slightly to resemble filled PP woven spice sacks
            const factor = 1 - 0.08 * (Math.abs(vx) / (bagWidth / 2)) * (Math.abs(vz) / (bagDepth / 2));
            posAttr.setY(i, vy * factor);
          }
          bagGeo.computeVertexNormals();

          const bagMesh = new THREE.Mesh(bagGeo, bagMat);
          bagGroup.add(bagMesh);

          // Brand red stitch stripe along top face of bag
          const stripeGeo = new THREE.BoxGeometry(bagWidth * 0.7, 0.015, 0.08);
          const stripeMesh = new THREE.Mesh(stripeGeo, stripeMat);
          stripeMesh.position.y = bagHeight / 2 + 0.005;
          bagGroup.add(stripeMesh);

          const xOffset = (col - 0.5) * (bagWidth + 0.08);
          const zOffset = (row - 0.5) * (bagDepth + 0.08);
          const yOffset = -0.38 + (layer + 0.5) * (bagHeight + 0.02);

          bagGroup.position.set(xOffset, yOffset, zOffset);
          // Alternate rotation slightly per layer like real warehouse cross-stacking
          if (layer % 2 === 1) {
            bagGroup.rotation.y = 0.03;
          }
          group.add(bagGroup);
        }
      }
    }

    // Subtle bounding wireframe frame representing container/pallet volume
    const boundGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(3.3, 2.2, 2.7));
    const boundLine = new THREE.LineSegments(
      boundGeo,
      new THREE.LineBasicMaterial({ color: 0xf50008, transparent: true, opacity: 0.28 })
    );
    boundLine.position.y = 0.5;
    group.add(boundLine);

    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (!reducedMotion) {
        group.rotation.y = Math.sin(t * 0.45) * 0.35 + 0.25;
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 460;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [selectedBagSize, reducedMotion]);

  return (
    <div className="relative w-full h-[320px] sm:h-[360px] rounded-xl overflow-hidden bg-[#1B1B1B] border border-white/10">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#242424]/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-xs">
        <span className="w-2 h-2 rounded-full bg-[#F50008]" />
        <span className="font-mono text-white font-semibold tabular-nums">{selectedBagSize} PP BAG CONFIGURATION</span>
      </div>
      <div className="absolute bottom-4 right-4 bg-[#242424]/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-xs text-neutral-300 font-mono tabular-nums">
        MOQ: 500 KG – 1 TON
      </div>
    </div>
  );
};
