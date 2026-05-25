import { useEffect, useRef } from "react";
import * as THREE from "three";

const Avatar3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 1.2, 4.5);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pink   = new THREE.PointLight(0xf472b6, 3, 10);
    pink.position.set(-2, 3, 2);
    scene.add(pink);
    const violet = new THREE.PointLight(0xa78bfa, 3, 10);
    violet.position.set(2, 2, 2);
    scene.add(violet);
    const cyan   = new THREE.PointLight(0x22d3ee, 2, 8);
    cyan.position.set(0, -1, 3);
    scene.add(cyan);

    /* ── Materials ── */
    const skinMat   = new THREE.MeshStandardMaterial({ color: 0xf5c5a3, roughness: 0.6, metalness: 0.1 });
    const hairMat   = new THREE.MeshStandardMaterial({ color: 0x1a0a2e, roughness: 0.8 });
    const bodyMat   = new THREE.MeshStandardMaterial({ color: 0x1a0a2e, roughness: 0.5, metalness: 0.3 });
    const clothMat  = new THREE.MeshStandardMaterial({ color: 0xa78bfa, roughness: 0.6, metalness: 0.1 });
    const eyeMat    = new THREE.MeshStandardMaterial({ color: 0xa78bfa, emissive: 0xa78bfa, emissiveIntensity: 0.8 });
    const lipMat    = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 });
    const glassMat  = new THREE.MeshStandardMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.3, metalness: 1, roughness: 0 });

    /* ── Avatar group ── */
    const avatar = new THREE.Group();
    scene.add(avatar);

    /* Head */
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 32), skinMat);
    head.position.set(0, 1.62, 0);
    head.scale.set(1, 1.08, 0.95);
    avatar.add(head);

    /* Eyes */
    [-0.14, 0.14].forEach((x) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), eyeMat);
      eye.position.set(x, 1.68, 0.37);
      avatar.add(eye);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), new THREE.MeshBasicMaterial({ color: 0x0a0010 }));
      pupil.position.set(x, 1.68, 0.42);
      avatar.add(pupil);
    });

    /* Glasses */
    [-0.14, 0.14].forEach((x) => {
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(0.1, 0.012, 8, 24),
        glassMat
      );
      rim.position.set(x, 1.68, 0.38);
      avatar.add(rim);
    });
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.14, 8), glassMat);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 1.68, 0.38);
    avatar.add(bridge);

    /* Nose */
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), skinMat);
    nose.position.set(0, 1.56, 0.42);
    nose.scale.set(1, 0.7, 1);
    avatar.add(nose);

    /* Lips */
    const lip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), lipMat);
    lip.position.set(0, 1.46, 0.40);
    lip.scale.set(1, 0.4, 0.6);
    avatar.add(lip);

    /* Ears */
    [-0.43, 0.43].forEach((x) => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), skinMat);
      ear.position.set(x, 1.62, 0);
      ear.scale.set(0.5, 0.7, 0.5);
      avatar.add(ear);
    });

    /* Hair — top */
    const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55), hairMat);
    hairTop.position.set(0, 1.62, 0);
    hairTop.scale.set(1.05, 1.1, 1.02);
    avatar.add(hairTop);

    /* Hair — long back */
    const hairBack = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.15, 1.1, 16, 1, true), hairMat);
    hairBack.position.set(0, 1.1, -0.1);
    avatar.add(hairBack);

    /* Hair bangs */
    for (let i = -2; i <= 2; i++) {
      const bang = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.03, 0.35, 8),
        hairMat
      );
      bang.position.set(i * 0.1, 1.9, 0.3);
      bang.rotation.x = 0.4;
      bang.rotation.z = i * 0.1;
      avatar.add(bang);
    }

    /* Neck */
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.22, 16), skinMat);
    neck.position.set(0, 1.18, 0);
    avatar.add(neck);

    /* Body / torso */
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.7, 16), bodyMat);
    torso.position.set(0, 0.72, 0);
    avatar.add(torso);

    /* Hoodie / jacket */
    const jacket = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.65, 16), clothMat);
    jacket.position.set(0, 0.73, 0);
    avatar.add(jacket);

    /* Collar */
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.04, 8, 20), clothMat);
    collar.position.set(0, 1.05, 0);
    collar.rotation.x = 0.3;
    avatar.add(collar);

    /* Shoulders */
    [-0.38, 0.38].forEach((x) => {
      const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), clothMat);
      shoulder.position.set(x, 0.98, 0);
      avatar.add(shoulder);
    });

    /* Arms */
    [-0.48, 0.48].forEach((x) => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.6, 12), clothMat);
      arm.position.set(x, 0.7, 0);
      arm.rotation.z = x > 0 ? -0.2 : 0.2;
      avatar.add(arm);

      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), skinMat);
      hand.position.set(x > 0 ? 0.52 : -0.52, 0.38, 0);
      hand.scale.set(1, 0.85, 0.75);
      avatar.add(hand);
    });

    /* Floating particles around avatar */
    const particleGeo = new THREE.BufferGeometry();
    const count = 120;
    const positions = new Float32Array(count * 3);
    const pColors   = new Float32Array(count * 3);
    const palette   = [
      new THREE.Color(0xf472b6),
      new THREE.Color(0xa78bfa),
      new THREE.Color(0x22d3ee),
      new THREE.Color(0x4ade80),
    ];
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 1;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color",    new THREE.BufferAttribute(pColors,   3));
    const particleMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.8 });
    const particles   = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* ── Mouse tracking ── */
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── Animation ── */
    let t = 0;
    const animate = () => {
      t += 0.016;
      const id = requestAnimationFrame(animate);
      animate._id = id;

      /* Floating bob */
      avatar.position.y = Math.sin(t * 0.8) * 0.08;

      /* Head follows mouse */
      head.rotation.y = mouseX * 0.25;
      head.rotation.x = -mouseY * 0.15;

      /* Subtle body sway */
      avatar.rotation.y = mouseX * 0.08 + Math.sin(t * 0.5) * 0.03;

      /* Spin particles */
      particles.rotation.y = t * 0.08;
      particles.rotation.x = t * 0.03;

      /* Pulsing lights */
      pink.intensity   = 2.5 + Math.sin(t * 1.2) * 0.8;
      violet.intensity = 2.5 + Math.sin(t * 0.9 + 1) * 0.8;
      cyan.intensity   = 1.8 + Math.sin(t * 1.5 + 2) * 0.6;

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animate._id);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: "420px" }}
    />
  );
};

export default Avatar3D;