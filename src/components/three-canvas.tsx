"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ModuleNode = {
  label: string;
  active: boolean;
  position: THREE.Vector3;
};

// The MVP modules orbit the shared Core as solid, lit gems; modules still
// waiting to be switched on render as faint wireframe ghosts — a literal
// picture of "liga e desliga módulos conforme o negócio cresce".
const MODULES: ModuleNode[] = [
  { label: "Cardápio Digital", active: true, position: new THREE.Vector3(6.2, 1.6, -1.5) },
  { label: "PDV", active: true, position: new THREE.Vector3(-5.6, -1.8, 1.2) },
  { label: "Estoque", active: false, position: new THREE.Vector3(3.2, -4.2, -3) },
  { label: "Financeiro", active: false, position: new THREE.Vector3(-3.6, 4.4, -2.4) },
  { label: "Fiscal", active: false, position: new THREE.Vector3(0.6, 0.4, -6.5) },
];

export function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Core: the shared database every module reads and writes to.
    const coreGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xf2a93b,
      emissive: 0xb8611a,
      emissiveIntensity: 0.65,
      flatShading: true,
      roughness: 0.35,
      metalness: 0.1,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const coreGlow = new THREE.PointLight(0xf2a93b, 40, 30);
    coreGlow.position.set(0, 0, 0);
    group.add(coreGlow);

    const rim = new THREE.DirectionalLight(0x6fae8f, 1.1);
    rim.position.set(-8, 6, 6);
    scene.add(rim);

    const ambient = new THREE.AmbientLight(0x3a2f28, 1.4);
    scene.add(ambient);

    // Module nodes, connected to the core with thin glowing spokes.
    const nodeMeshes: { mesh: THREE.Mesh; base: THREE.Vector3; speed: number }[] = [];
    const lineMaterialActive = new THREE.LineBasicMaterial({
      color: 0x6fae8f,
      transparent: true,
      opacity: 0.55,
    });
    const lineMaterialGhost = new THREE.LineBasicMaterial({
      color: 0x7c7267,
      transparent: true,
      opacity: 0.22,
    });

    MODULES.forEach((mod, i) => {
      const geometry = new THREE.IcosahedronGeometry(mod.active ? 0.85 : 0.7, 0);
      const material = mod.active
        ? new THREE.MeshStandardMaterial({
            color: 0x2f9e6e,
            emissive: 0x0f4a34,
            emissiveIntensity: 0.5,
            flatShading: true,
            roughness: 0.4,
          })
        : new THREE.MeshBasicMaterial({
            color: 0x9a8f80,
            wireframe: true,
            transparent: true,
            opacity: 0.35,
          });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(mod.position);
      group.add(mesh);
      nodeMeshes.push({ mesh, base: mod.position.clone(), speed: 0.4 + i * 0.07 });

      const points = [new THREE.Vector3(0, 0, 0), mod.position];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, mod.active ? lineMaterialActive : lineMaterialGhost);
      group.add(line);
    });

    // Mouse parallax (fast, local) composed with scroll-driven camera travel (slow, global).
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetMouseX = (event.clientX - windowHalfX) * 0.0012;
      targetMouseY = (event.clientY - windowHalfY) * 0.0012;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let scrollProgress = 0;
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Scroll drives a slow orbit + dolly so the whole scene keeps evolving
      // as you move through the page, not just while the cursor moves.
      group.rotation.y = t * 0.06 + scrollProgress * Math.PI * 0.6 + mouseX * 1.4;
      group.rotation.x = mouseY * 0.6 + Math.sin(t * 0.15) * 0.05;
      camera.position.z = 20 - scrollProgress * 6;
      camera.position.y = scrollProgress * -3;
      camera.lookAt(0, 0, 0);

      core.rotation.x = t * 0.1;
      core.rotation.y = t * 0.14;

      nodeMeshes.forEach(({ mesh, base, speed }) => {
        mesh.rotation.x = t * speed;
        mesh.rotation.y = t * speed * 0.8;
        mesh.position.y = base.y + Math.sin(t * 0.6 + base.x) * 0.35;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      coreGeometry.dispose();
      coreMaterial.dispose();
      lineMaterialActive.dispose();
      lineMaterialGhost.dispose();
      nodeMeshes.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
