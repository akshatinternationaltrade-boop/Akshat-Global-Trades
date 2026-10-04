import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeHeroSceneProps {
  reducedMotion: boolean;
}

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({ reducedMotion }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x202020, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 11.5);

    // Three-point studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e6, 2.2);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa3b8cc, 0.9);
    fillLight.position.set(-7, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xf50008, 3.2, 18);
    rimLight.position.set(4, 2, -3);
    scene.add(rimLight);

    // Master groups
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const globeGroup = new THREE.Group();
    // Position globe slightly to the right on desktop, centered on mobile
    globeGroup.position.set(width > 900 ? 2.7 : 0, 0, -1.2);
    rootGroup.add(globeGroup);

    // 1. Subtle 3D World Globe
    const globeRadius = 3.1;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 48, 48);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x1c1c1c,
      roughness: 0.85,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // Wireframe latitude/longitude grid on globe
    const wireGeo = new THREE.SphereGeometry(globeRadius + 0.015, 28, 20);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3a3a3a,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Helper to convert lat/lon to 3D vector on sphere
    const latLonToVec3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // India origin point (approx 21.5° N, 78.5° E)
    const indiaPos = latLonToVec3(21.5, 78.5, globeRadius + 0.03);
    const originMarkerGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const originMarkerMat = new THREE.MeshBasicMaterial({ color: 0xf50008 });
    const originMarker = new THREE.Mesh(originMarkerGeo, originMarkerMat);
    originMarker.position.copy(indiaPos);
    globeGroup.add(originMarker);

    // Glowing halo ring around India origin
    const ringGeo = new THREE.RingGeometry(0.13, 0.22, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf50008,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.copy(indiaPos);
    ringMesh.lookAt(indiaPos.clone().multiplyScalar(2));
    globeGroup.add(ringMesh);

    // Trade route arcs from India to unnamed global vectors
    const targetCoords = [
      { lat: 48, lon: 12 },
      { lat: 35, lon: 138 },
      { lat: 1.3, lon: 103.8 },
      { lat: 25, lon: 55 },
      { lat: 40, lon: -74 },
      { lat: -33, lon: 151 },
      { lat: -1, lon: 37 },
    ];

    targetCoords.forEach((coord, idx) => {
      const endPos = latLonToVec3(coord.lat, coord.lon, globeRadius + 0.03);
      const midPos = indiaPos.clone().add(endPos).multiplyScalar(0.5);
      const distance = indiaPos.distanceTo(endPos);
      midPos.normalize().multiplyScalar(globeRadius + distance * 0.36);

      const curve = new THREE.QuadraticBezierCurve3(indiaPos, midPos, endPos);
      const points = curve.getPoints(44);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0xf50008 : 0xd99b52,
        transparent: true,
        opacity: idx % 2 === 0 ? 0.65 : 0.35,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);
    });

    // Rotate globe so India faces forward-left towards viewer
    globeGroup.rotation.y = -2.25;
    globeGroup.rotation.x = 0.22;

    // 2. 3D Botanical Spice Forms (Cumin, Coriander, Fennel, Turmeric, Red Chilli)
    const spiceGroup = new THREE.Group();
    rootGroup.add(spiceGroup);

    // Materials for realistic botanical spices
    const cuminMat = new THREE.MeshStandardMaterial({
      color: 0xb6864c,
      roughness: 0.65,
      metalness: 0.08,
    });
    const fennelMat = new THREE.MeshStandardMaterial({
      color: 0x6ea84f,
      roughness: 0.58,
      metalness: 0.05,
    });
    const corianderMat = new THREE.MeshStandardMaterial({
      color: 0xd4a659,
      roughness: 0.62,
      metalness: 0.08,
    });
    const turmericMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.5,
      metalness: 0.05,
      emissive: 0x3d2200,
      emissiveIntensity: 0.25,
    });
    const chilliMat = new THREE.MeshStandardMaterial({
      color: 0xd9040b,
      roughness: 0.32,
      metalness: 0.12,
    });

    // Reusable geometries
    const seedCapsuleGeo = new THREE.CapsuleGeometry(0.055, 0.22, 8, 12);
    const corianderSphereGeo = new THREE.IcosahedronGeometry(0.095, 2);
    const turmericNuggetGeo = new THREE.DodecahedronGeometry(0.13, 1);
    const chilliConeGeo = new THREE.ConeGeometry(0.085, 0.52, 12);

    interface FloatingSpice {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      rotSpeed: THREE.Vector3;
      floatSpeed: number;
      floatOffset: number;
    }

    const floatingSpices: FloatingSpice[] = [];
    const spiceMaterials = [cuminMat, fennelMat, corianderMat, turmericMat, chilliMat];

    for (let i = 0; i < 56; i++) {
      const typeIndex = i % 5;
      let geo: THREE.BufferGeometry = seedCapsuleGeo;
      if (typeIndex === 2) geo = corianderSphereGeo;
      if (typeIndex === 3) geo = turmericNuggetGeo;
      if (typeIndex === 4) geo = chilliConeGeo;

      const mesh = new THREE.Mesh(geo, spiceMaterials[typeIndex]);

      // Distribute across viewport with depth
      const angle = (i / 56) * Math.PI * 2;
      const radius = 1.8 + (i % 7) * 0.75;
      const x = Math.cos(angle) * radius * 1.35 + (width > 900 ? 0.6 : 0);
      const y = Math.sin(angle) * radius * 0.78 + ((i % 5) - 2) * 0.35;
      const z = ((i % 9) - 4) * 0.85;

      mesh.position.set(x, y, z);
      mesh.rotation.set(i * 0.7, i * 1.1, i * 0.4);

      if (typeIndex === 0 || typeIndex === 1) {
        // Elongated seed silhouette for Cumin & Fennel
        mesh.scale.set(0.75, 1.35, 0.75);
      }

      spiceGroup.add(mesh);
      floatingSpices.push({
        mesh,
        basePos: mesh.position.clone(),
        rotSpeed: new THREE.Vector3(
          ((i % 3) - 1) * 0.004,
          ((i % 5) - 2) * 0.004,
          ((i % 4) - 1.5) * 0.003
        ),
        floatSpeed: 0.4 + (i % 5) * 0.15,
        floatOffset: i * 0.5,
      });
    }

    // 3. Fine Spice Powder Particles (Turmeric & Chilli dust)
    const particleCount = 260;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorTurmeric = new THREE.Color(0xf59e0b);
    const colorRed = new THREE.Color(0xf50008);
    const colorCumin = new THREE.Color(0xd4a359);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 9;

      const c = i % 3 === 0 ? colorRed : i % 3 === 1 ? colorTurmeric : colorCumin;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleSystem);

    // Subtle pointer parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    const onPointerMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.65;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.45;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      globeGroup.position.x = newW > 900 ? 2.7 : 0;
    };
    window.addEventListener('resize', onResize);

    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        globeGroup.rotation.y = -2.25 + elapsed * 0.055;
        ringMesh.scale.setScalar(1 + Math.sin(elapsed * 2.5) * 0.18);

        floatingSpices.forEach((item) => {
          item.mesh.rotation.x += item.rotSpeed.x;
          item.mesh.rotation.y += item.rotSpeed.y;
          item.mesh.rotation.z += item.rotSpeed.z;
          item.mesh.position.y =
            item.basePos.y + Math.sin(elapsed * item.floatSpeed + item.floatOffset) * 0.18;
        });

        particleSystem.rotation.y = elapsed * 0.015;

        rootGroup.rotation.y += (targetMouseX - rootGroup.rotation.y) * 0.04;
        rootGroup.rotation.x += (targetMouseY - rootGroup.rotation.x) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.dispose();
    };
  }, [reducedMotion]);

  if (!webglSupported) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#202020] via-[#262626] to-[#1a1a1a]" />
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
