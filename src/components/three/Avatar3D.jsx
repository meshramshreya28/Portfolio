import { useEffect, useRef } from "react";
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
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 1.55, 5.2);
    camera.lookAt(0, 1.2, 0);

    /* ── Lights — bright and warm ── */
    scene.add(new THREE.AmbientLight(0xfff8f0, 1.8));

    const key = new THREE.DirectionalLight(0xfff5e0, 3.0);
    key.position.set(2, 5, 4);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffeedd, 1.8);
    fill.position.set(-3, 3, 3);
    scene.add(fill);

    const front = new THREE.DirectionalLight(0xffffff, 1.5);
    front.position.set(0, 2, 6);
    scene.add(front);

    const pink  = new THREE.PointLight(0xf472b6, 1.5, 10);
    pink.position.set(-2, 2, 2);
    scene.add(pink);

    const cyan  = new THREE.PointLight(0x22d3ee, 1.0, 8);
    cyan.position.set(2, 0, 3);
    scene.add(cyan);

    /* ── Materials matching Shreya ── */
    // Warm medium-bright skin — wheatish Indian tone
    const skin      = new THREE.MeshToonMaterial({ color: 0xe8b89a });
    const skinLight = new THREE.MeshToonMaterial({ color: 0xf0c8a8 });
    const skinShad  = new THREE.MeshToonMaterial({ color: 0xd4a080 });

    // Dark brown-black wavy hair
    const hair      = new THREE.MeshToonMaterial({ color: 0x0f0810 });
    const hairSheen = new THREE.MeshToonMaterial({ color: 0x1e0f2e });

    // Light blue cardigan (her actual top)
    const cardigan  = new THREE.MeshToonMaterial({ color: 0x7eb8d4 });
    const cardiganD = new THREE.MeshToonMaterial({ color: 0x5e9ab8 });

    // Black pants
    const pants     = new THREE.MeshToonMaterial({ color: 0x111118 });

    // Eyes — dark brown
    const eyeWhite  = new THREE.MeshToonMaterial({ color: 0xffffff });
    const iris      = new THREE.MeshToonMaterial({ color: 0x3d1f0a });
    const pupilM    = new THREE.MeshToonMaterial({ color: 0x050302 });
    const white     = new THREE.MeshToonMaterial({ color: 0xffffff });
    const lashM     = new THREE.MeshToonMaterial({ color: 0x0a0508 });

    // Lips — natural pink
    const lip       = new THREE.MeshToonMaterial({ color: 0xd4788a });

    // Clear glasses frames
    const glassFrame= new THREE.MeshStandardMaterial({ color: 0xd4c4b0, transparent: true, opacity: 0.7, metalness: 0.3, roughness: 0.4 });
    const glassLens = new THREE.MeshStandardMaterial({ color: 0xc8e8f8, transparent: true, opacity: 0.15, metalness: 0.0, roughness: 0.0 });

    // Gold jewellery
    const gold      = new THREE.MeshStandardMaterial({ color: 0xd4a017, emissive: 0xb8860b, emissiveIntensity: 0.3, metalness: 1, roughness: 0.2 });

    const avatar = new THREE.Group();
    scene.add(avatar);

    /* ───── HEAD GROUP ───── */
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.7, 0);
    avatar.add(headGroup);

    // Face — slightly oval, softer
    const face = new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 64), skin);
    face.scale.set(0.98, 1.1, 0.9);
    headGroup.add(face);

    // Soft jaw
    const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 32), skin);
    jaw.position.set(0, -0.3, 0.05);
    jaw.scale.set(0.88, 0.62, 0.82);
    headGroup.add(jaw);

    /* ── Eyes (dark brown like hers) ── */
    [[-0.15, 1], [0.15, -1]].forEach(([x, side]) => {
      // white
      const ew = new THREE.Mesh(new THREE.SphereGeometry(0.078, 32, 32), eyeWhite);
      ew.position.set(x, 0.1, 0.37);
      ew.scale.set(1.05, 0.76, 0.72);
      headGroup.add(ew);

      // iris — dark brown
      const ir = new THREE.Mesh(new THREE.SphereGeometry(0.052, 32, 32), iris);
      ir.position.set(x, 0.1, 0.415);
      headGroup.add(ir);

      // pupil
      const pu = new THREE.Mesh(new THREE.SphereGeometry(0.026, 16, 16), pupilM);
      pu.position.set(x, 0.1, 0.445);
      headGroup.add(pu);

      // catch light
      const hi = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 8), white);
      hi.position.set(x + 0.018, 0.12, 0.458);
      headGroup.add(hi);

      // lash bar
      const lb = new THREE.Mesh(new THREE.BoxGeometry(0.175, 0.016, 0.008), lashM);
      lb.position.set(x, 0.148, 0.405);
      lb.rotation.z = side * 0.06;
      headGroup.add(lb);
    });

    /* ── Eyebrows — slightly thick, natural ── */
    [[-0.15, 0.06], [0.15, -0.06]].forEach(([x, rz]) => {
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.024, 0.008), lashM);
      brow.position.set(x, 0.24, 0.39);
      brow.rotation.z = rz;
      headGroup.add(brow);
    });

    /* ── Nose ── */
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 16), skinShad);
    nose.position.set(0, -0.06, 0.43);
    nose.scale.set(1, 0.65, 0.8);
    headGroup.add(nose);

    /* ── Smile / lips ── */
    const upper = new THREE.Mesh(new THREE.SphereGeometry(0.068, 24, 16), lip);
    upper.position.set(0, -0.195, 0.415);
    upper.scale.set(1, 0.38, 0.52);
    headGroup.add(upper);

    const lower = new THREE.Mesh(new THREE.SphereGeometry(0.068, 24, 16), lip);
    lower.position.set(0, -0.248, 0.415);
    lower.scale.set(0.92, 0.45, 0.52);
    headGroup.add(lower);

    // smile corners
    [-0.07, 0.07].forEach((x) => {
      const corner = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), lip);
      corner.position.set(x, -0.23, 0.41);
      headGroup.add(corner);
    });

    /* ── Ears ── */
    [-0.43, 0.43].forEach((x) => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.095, 20, 20), skin);
      ear.position.set(x, 0.04, 0.0);
      ear.scale.set(0.5, 0.68, 0.42);
      headGroup.add(ear);

      // Gold hoop earring
      const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.007, 8, 20), gold);
      hoop.position.set(x, -0.14, 0.02);
      hoop.rotation.y = Math.PI / 2;
      headGroup.add(hoop);
    });

    /* ── Clear glasses (like hers — cat-eye/round clear frames) ── */
    [[-0.155, 1], [0.155, -1]].forEach(([x]) => {
      // lens shape — slightly cat-eye
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.094, 0.011, 10, 40), glassFrame);
      rim.position.set(x, 0.1, 0.395);
      rim.scale.set(1.1, 0.88, 1);
      headGroup.add(rim);

      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.082, 32), glassLens);
      lens.position.set(x, 0.1, 0.400);
      lens.scale.set(1.1, 0.88, 1);
      headGroup.add(lens);
    });

    // bridge
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.175, 8), glassFrame);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.1, 0.395);
    headGroup.add(bridge);

    // arms
    [-1, 1].forEach((s) => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.3, 8), glassFrame);
      arm.rotation.z = Math.PI / 2;
      arm.rotation.y = s * 0.55;
      arm.position.set(s * 0.33, 0.1, 0.28);
      headGroup.add(arm);
    });

    /* ── Hair (long dark wavy — like hers) ── */
    // Top dome
    const hairTop = new THREE.Mesh(
      new THREE.SphereGeometry(0.455, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.54),
      hair
    );
    hairTop.scale.set(1.06, 1.1, 1.03);
    headGroup.add(hairTop);

    // Side volumes — fuller cheek-framing hair
    [-1, 1].forEach((s) => {
      const side = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.75),
        hair
      );
      side.position.set(s * 0.3, -0.1, -0.04);
      side.scale.set(0.7, 1.05, 0.65);
      headGroup.add(side);

      // front face-framing strand
      const strand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.03, 0.55, 12),
        hair
      );
      strand.position.set(s * 0.36, 0.1, 0.26);
      strand.rotation.x = 0.3;
      strand.rotation.z = s * -0.25;
      headGroup.add(strand);
    });

    // Centre part / top
    const part = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.38), hairSheen);
    part.position.set(0, 0.44, 0.12);
    headGroup.add(part);

    // Long back hair — wavy
    for (let i = -1; i <= 1; i++) {
      const wave = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16 - Math.abs(i) * 0.02, 0.1, 1.6, 16, 1, true),
        hair
      );
      wave.position.set(i * 0.18, -0.7, -0.08);
      wave.rotation.z = i * 0.06;
      headGroup.add(wave);
    }

    /* ── Gold necklace ── */
    const chain = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.005, 6, 40, Math.PI), gold);
    chain.position.set(0, -0.15, 0.28);
    chain.rotation.x = 0.5;
    headGroup.add(chain);

    const pendant = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 8), gold);
    pendant.position.set(0, -0.26, 0.32);
    headGroup.add(pendant);

    /* ───── NECK ───── */
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.28, 20), skin);
    neck.position.set(0, 1.25, 0);
    avatar.add(neck);

    /* ───── BODY — light blue cardigan ───── */
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.25, 0.72, 24), cardigan);
    torso.position.set(0, 0.75, 0);
    avatar.add(torso);

    // V-neck opening
    const vneck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.15, 12), skinLight);
    vneck.position.set(0, 1.08, 0.1);
    vneck.rotation.x = -0.2;
    avatar.add(vneck);

    // Cardigan collar/lapels
    [-1, 1].forEach((s) => {
      const lapel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.28, 0.04), cardiganD);
      lapel.position.set(s * 0.08, 1.0, 0.22);
      lapel.rotation.z = s * 0.25;
      lapel.rotation.x = -0.15;
      avatar.add(lapel);
    });

    // Buttons
    [1.08, 0.88, 0.68, 0.5].forEach((y) => {
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), white);
      btn.position.set(0, y, 0.28);
      avatar.add(btn);
    });

    /* ── Shoulders ── */
    [-0.36, 0.36].forEach((x) => {
      const sh = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 24), cardigan);
      sh.position.set(x, 1.0, 0);
      sh.scale.set(1, 0.85, 0.92);
      avatar.add(sh);
    });

    /* ── Arms — long sleeves ── */
    [-1, 1].forEach((s) => {
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.52, 16), cardigan);
      upper.position.set(s * 0.47, 0.74, 0.02);
      upper.rotation.z = s * -0.16;
      avatar.add(upper);

      const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.088, 0.44, 16), cardigan);
      lower.position.set(s * 0.55, 0.38, 0.03);
      lower.rotation.z = s * -0.1;
      avatar.add(lower);

      // cuff
      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.092, 0.055, 16), cardiganD);
      cuff.position.set(s * 0.58, 0.16, 0.04);
      avatar.add(cuff);

      // hand
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.098, 20, 20), skin);
      hand.position.set(s * 0.60, 0.06, 0.04);
      hand.scale.set(0.9, 0.76, 0.7);
      avatar.add(hand);
    });

    /* ── Pants (black, just visible at bottom) ── */
    const waist = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.24, 0.22, 20), pants);
    waist.position.set(0, 0.27, 0);
    avatar.add(waist);

    /* ── Floating particles ── */
    const count = 200;
    const pGeo  = new THREE.BufferGeometry();
    const pos   = new Float32Array(count * 3);
    const col   = new Float32Array(count * 3);
    const palette = [
      new THREE.Color(0xf472b6),
      new THREE.Color(0xa78bfa),
      new THREE.Color(0x22d3ee),
      new THREE.Color(0x4ade80),
      new THREE.Color(0xfbbf24),
    ];
    for (let i = 0; i < count; i++) {
      const r     = 1.1 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta) + 1.1;
      pos[i*3+2] = r * Math.cos(phi);
      const c = palette[i % palette.length];
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* ── Mouse ── */
    let mx = 0, my = 0;
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      my = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    /* ── Animate ── */
    let t = 0, rafId;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      t += 0.013;

      avatar.position.y = Math.sin(t * 0.7) * 0.06;

      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, mx * 0.25, 0.06);
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -my * 0.15, 0.06);

      avatar.rotation.y = THREE.MathUtils.lerp(avatar.rotation.y, mx * 0.05, 0.04);

      particles.rotation.y = t * 0.055;
      particles.rotation.x = Math.sin(t * 0.25) * 0.12;

      pink.intensity  = 1.2 + Math.sin(t * 1.0) * 0.4;
      cyan.intensity  = 0.8 + Math.sin(t * 1.3 + 1) * 0.3;

      renderer.render(scene, camera);
    };
    tick();

    /* ── Resize ── */
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