import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeGlobalTradeGlobeProps {
  reducedMotion: boolean;
}

export const ThreeGlobalTradeGlobe: React.FC<ThreeGlobalTradeGlobeProps> = ({ reducedMotion }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 460;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.6);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 6, 5);
    scene.add(dirLight);

    const redPoint = new THREE.PointLight(0xf50008, 2.8, 12);
    redPoint.position.set(-2, 2, 4);
    scene.add(redPoint);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 2.45;
    const coreGeo = new THREE.SphereGeometry(radius, 48, 48);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e1e,
      roughness: 0.78,
      metalness: 0.25,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    const gridGeo = new THREE.SphereGeometry(radius + 0.012, 32, 24);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x454545,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    globeGroup.add(new THREE.Mesh(gridGeo, gridMat));

    // Outer atmosphere rim ring
    const outerRingGeo = new THREE.RingGeometry(radius + 0.18, radius + 0.21, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xf50008,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    scene.add(outerRing);

    const latLonToVec3 = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.cos(theta)),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // India Origin Node
    const indiaVec = latLonToVec3(21.5, 78.5, radius + 0.03);
    const indiaDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.085, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xf50008 })
    );
    indiaDot.position.copy(indiaVec);
    globeGroup.add(indiaDot);

    const pulseRing = new THREE.Mesh(
      new THREE.RingGeometry(0.12, 0.22, 32),
      new THREE.MeshBasicMaterial({
        color: 0xf50008,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      })
    );
    pulseRing.position.copy(indiaVec);
    pulseRing.lookAt(indiaVec.clone().multiplyScalar(2));
    globeGroup.add(pulseRing);

    // Subtle animated trade corridors extending from India to global directions
    const vectors = [
      { lat: 51, lon: 10 },
      { lat: 41, lon: 19 },
      { lat: 36, lon: 139 },
      { lat: 1.3, lon: 103.8 },
      { lat: 24.5, lon: 54.4 },
      { lat: 40.7, lon: -74 },
      { lat: 34, lon: -118 },
      { lat: -23.5, lon: -46.6 },
      { lat: -33.8, lon: 151.2 },
      { lat: -4, lon: 39.6 },
    ];

    const pulses: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; offset: number }[] = [];

    vectors.forEach((coord, i) => {
      const destVec = latLonToVec3(coord.lat, coord.lon, radius + 0.03);
      const midVec = indiaVec.clone().add(destVec).multiplyScalar(0.5);
      const dist = indiaVec.distanceTo(destVec);
      midVec.normalize().multiplyScalar(radius + dist * 0.38);

      const curve = new THREE.QuadraticBezierCurve3(indiaVec, midVec, destVec);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
      const arcMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0xf50008 : 0xffffff,
        transparent: true,
        opacity: i % 2 === 0 ? 0.65 : 0.28,
      });
      globeGroup.add(new THREE.Line(arcGeo, arcMat));

      // Small end node
      const endDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      endDot.position.copy(destVec);
      globeGroup.add(endDot);

      // Travelling light bead along arc
      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xf50008 })
      );
      globeGroup.add(bead);
      pulses.push({ mesh: bead, curve, offset: i * 0.11 });
    });

    globeGroup.rotation.y = -2.35;
    globeGroup.rotation.x = 0.25;

    let dragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotVelY = 0.0025;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      setIsDragging(true);
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      globeGroup.rotation.y += dx * 0.006;
      globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x + dy * 0.005));
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      dragging = false;
      setIsDragging(false);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!reducedMotion) {
        if (!dragging) {
          globeGroup.rotation.y += rotVelY;
        }
        pulseRing.scale.setScalar(1 + Math.sin(t * 3) * 0.22);
        pulses.forEach((p) => {
          const progress = (t * 0.28 + p.offset) % 1;
          const pos = p.curve.getPoint(progress);
          p.mesh.position.copy(pos);
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center">
      <div
        ref={containerRef}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        title="Drag to rotate 3D Global Trade Globe"
      />
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-xs text-neutral-400">
        <div className="flex items-center gap-2 bg-[#1A1A1A]/85 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#F50008] animate-pulse" />
          <span className="text-white font-medium">Origin Point: India</span>
        </div>
        <span className="bg-[#1A1A1A]/85 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 hidden sm:inline-block">
          Interactive 3D Globe · Drag to Rotate
        </span>
      </div>
    </div>
  );
};
