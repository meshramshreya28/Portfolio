import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Avatar3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 4);

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const pinkL  = new THREE.PointLight(0xf472b6, 6, 8);
    pinkL.position.set(-2, 2, 2);
    scene.add(pinkL);
    const violetL = new THREE.PointLight(0xa78bfa, 6, 8);
    violetL.position.set(2, -1, 2);
    scene.add(violetL);
    const cyanL  = new THREE.PointLight(0x22d3ee, 4, 8);
    cyanL.position.set(0, 2, -2);
    scene.add(cyanL);

    /* ── Central glowing orb ── */
    const orbGeo  = new THREE.IcosahedronGeometry(0.7, 4);
    const orbMat  = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0x0a0010,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    /* Outer wireframe ring */
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true, transparent: true, opacity: 0.15 });
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 4), wireMat);
    scene.add(wire);

    /* Glow sprite */
    const spriteMat = new THREE.SpriteMaterial({
      map: (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 128;
        const ctx = c.getContext("2d");
        const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        g.addColorStop(0,   "rgba(167,139,250,0.6)");
        g.addColorStop(0.4, "rgba(244,114,182,0.3)");
        g.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(c);
      })(),
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Sprite(spriteMat);
    glow.scale.set(3.5, 3.5, 1);
    scene.add(glow);

    /* Floating ring 1 */
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.012, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.5 })
    );
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    /* Floating ring 2 */
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.008, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.35 })
    );
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    scene.add(ring2);

    /* Floating ring 3 */
    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.007, 8, 60),
      new THREE.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.3 })
    );
    ring3.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;
    scene.add(ring3);

    /* Particles */
    const cnt = 300;
    const pG  = new THREE.BufferGeometry();
    const ps  = new Float32Array(cnt * 3);
    const pc  = new Float32Array(cnt * 3);
    const pal = [
      new THREE.Color(0xf472b6),
      new THREE.Color(0xa78bfa),
      new THREE.Color(0x22d3ee),
      new THREE.Color(0x4ade80),
      new THREE.Color(0xfbbf24),
    ];
    for (let i = 0; i < cnt; i++) {
      const r  = 1.5 + Math.random() * 1.2;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      ps[i*3]   = r * Math.sin(ph) * Math.cos(th);
      ps[i*3+1] = r * Math.sin(ph) * Math.sin(th);
      ps[i*3+2] = r * Math.cos(ph);
      const c = pal[i % pal.length];
      pc[i*3] = c.r; pc[i*3+1] = c.g; pc[i*3+2] = c.b;
    }
    pG.setAttribute("position", new THREE.BufferAttribute(ps, 3));
    pG.setAttribute("color",    new THREE.BufferAttribute(pc, 3));
    const particles = new THREE.Points(pG, new THREE.PointsMaterial({
      size: 0.05, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    }));
    scene.add(particles);

    /* SM text texture on orb face */
    const textCanvas = document.createElement("canvas");
    textCanvas.width = textCanvas.height = 512;
    const tc = textCanvas.getContext("2d");
    tc.fillStyle = "transparent";
    tc.clearRect(0, 0, 512, 512);
    tc.font = "bold 200px 'Space Grotesk', sans-serif";
    tc.textAlign = "center";
    tc.textBaseline = "middle";
    tc.fillStyle = "#ede8df";
    tc.fillText("SM", 256, 256);
    const textTex = new THREE.CanvasTexture(textCanvas);
    const textPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.8),
      new THREE.MeshBasicMaterial({ map: textTex, transparent: true, opacity: 0.9, depthWrite: false })
    );
    textPlane.position.z = 0.72;
    scene.add(textPlane);

    /* Mouse */
    let mx = 0, my = 0;
    const onMove = e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    /* Animate */
    let t = 0, rafId;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      t += 0.012;

      orb.rotation.y = t * 0.3;
      orb.rotation.x = t * 0.15;
      wire.rotation.y = -t * 0.2;
      wire.rotation.z =  t * 0.1;

      ring1.rotation.z = t * 0.4;
      ring2.rotation.y = t * 0.3;
      ring3.rotation.x = t * 0.5;

      particles.rotation.y = t * 0.06;
      particles.rotation.x = Math.sin(t * 0.3) * 0.15;

      // mouse parallax
      scene.rotation.y = THREE.MathUtils.lerp(scene.rotation.y, mx * 0.2, 0.04);
      scene.rotation.x = THREE.MathUtils.lerp(scene.rotation.x, -my * 0.1, 0.04);

      // pulse lights
      pinkL.intensity   = 5 + Math.sin(t * 1.1) * 2;
      violetL.intensity = 5 + Math.sin(t * 0.9 + 1) * 2;
      cyanL.intensity   = 3 + Math.sin(t * 1.4 + 2) * 1.5;

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" style={{ minHeight: "460px" }} />;
};

export default Avatar3D;