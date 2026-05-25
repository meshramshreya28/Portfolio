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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, W / H, 0.1, 100);
    camera.position.set(0, 1.6, 5.8);
    camera.lookAt(0, 1.15, 0);

    /* ── Lights: bright, even, cartoon-friendly ── */
    scene.add(new THREE.AmbientLight(0xffffff, 2.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(3, 6, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff0f8, 1.4);
    fill.position.set(-4, 3, 4);
    scene.add(fill);
    const front = new THREE.DirectionalLight(0xffffff, 1.2);
    front.position.set(0, 1, 8);
    scene.add(front);
    const pinkL = new THREE.PointLight(0xf472b6, 1.2, 12);
    pinkL.position.set(-2, 3, 3);
    scene.add(pinkL);

    /* ── Meta-style flat smooth materials ── */
    // Skin: warm medium-bright wheatish
    const skin     = new THREE.MeshPhongMaterial({ color: 0xd4956a, shininess: 30, specular: 0x331100 });
    const skinHi   = new THREE.MeshPhongMaterial({ color: 0xe8aa80, shininess: 20 });

    // Hair: deep dark brown-black
    const hairM    = new THREE.MeshPhongMaterial({ color: 0x0d0510, shininess: 60, specular: 0x220033 });
    const hairHi   = new THREE.MeshPhongMaterial({ color: 0x1a0a28, shininess: 80, specular: 0x440066 });

    // Clothes
    const top      = new THREE.MeshPhongMaterial({ color: 0x6ba3c8, shininess: 20 });
    const topDark  = new THREE.MeshPhongMaterial({ color: 0x4d88aa, shininess: 15 });
    const pants    = new THREE.MeshPhongMaterial({ color: 0x1a1a2e, shininess: 10 });

    // Eyes
    const sclera   = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 80 });
    const irisM    = new THREE.MeshPhongMaterial({ color: 0x2d1200, shininess: 30 });
    const pupilM   = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const gleam    = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1 });
    const lashM    = new THREE.MeshPhongMaterial({ color: 0x050205 });
    const browM    = new THREE.MeshPhongMaterial({ color: 0x0d0510 });

    // Lips
    const lipM     = new THREE.MeshPhongMaterial({ color: 0xc45c72, shininess: 60, specular: 0xff88aa });

    // Blush
    const blushM   = new THREE.MeshPhongMaterial({ color: 0xf4a0a0, transparent: true, opacity: 0.45 });

    // Clear glasses
    const frameM   = new THREE.MeshPhongMaterial({ color: 0xc8b8a8, shininess: 80, specular: 0xffffff, transparent: true, opacity: 0.85 });
    const lensM    = new THREE.MeshPhongMaterial({ color: 0xd0eeff, transparent: true, opacity: 0.18, shininess: 200, specular: 0xffffff });

    // Gold
    const goldM    = new THREE.MeshPhongMaterial({ color: 0xd4a520, shininess: 120, specular: 0xffdd88 });

    const avatar = new THREE.Group();
    scene.add(avatar);

    /* ══════════════ HEAD ══════════════ */
    const headG = new THREE.Group();
    headG.position.set(0, 1.72, 0);
    avatar.add(headG);

    // Head shape — rounder Meta style
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.44, 128, 128), skin);
    head.scale.set(1.0, 1.08, 0.94);
    headG.add(head);

    // Forehead bump
    const forehead = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 32), skin);
    forehead.position.set(0, 0.18, 0.12);
    forehead.scale.set(0.9, 0.6, 0.7);
    headG.add(forehead);

    // Jaw softening
    const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 32), skin);
    jaw.position.set(0, -0.32, 0.05);
    jaw.scale.set(0.86, 0.58, 0.78);
    headG.add(jaw);

    /* ── Blush circles ── */
    [-0.28, 0.28].forEach(x => {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), blushM);
      b.position.set(x, -0.04, 0.37);
      b.scale.set(1, 0.4, 0.3);
      headG.add(b);
    });

    /* ── Eyes — big Meta style ── */
    [[-0.155, 1], [0.155, -1]].forEach(([x, s]) => {
      // Eye socket slight indent
      const socket = new THREE.Mesh(new THREE.SphereGeometry(0.11, 32, 32), skinHi);
      socket.position.set(x, 0.1, 0.34);
      socket.scale.set(1.0, 0.75, 0.55);
      headG.add(socket);

      // White
      const ew = new THREE.Mesh(new THREE.SphereGeometry(0.092, 32, 32), sclera);
      ew.position.set(x, 0.1, 0.365);
      ew.scale.set(1.05, 0.78, 0.68);
      headG.add(ew);

      // Iris — big and expressive
      const ir = new THREE.Mesh(new THREE.SphereGeometry(0.062, 32, 32), irisM);
      ir.position.set(x, 0.1, 0.418);
      headG.add(ir);

      // Pupil
      const pu = new THREE.Mesh(new THREE.SphereGeometry(0.032, 16, 16), pupilM);
      pu.position.set(x, 0.1, 0.448);
      headG.add(pu);

      // Highlight sparkle
      const g1 = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), gleam);
      g1.position.set(x + 0.022, 0.12, 0.462);
      headG.add(g1);
      const g2 = new THREE.Mesh(new THREE.SphereGeometry(0.008, 8, 8), gleam);
      g2.position.set(x - 0.018, 0.09, 0.460);
      headG.add(g2);

      // Thick upper lash
      const lash = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.022, 0.01), lashM);
      lash.position.set(x, 0.155, 0.412);
      lash.rotation.z = s * 0.05;
      headG.add(lash);

      // Lash flick ends
      [-1, 1].forEach(end => {
        const flick = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.016, 0.008), lashM);
        flick.position.set(x + end * 0.105, 0.143, 0.41);
        flick.rotation.z = end * s * 0.45;
        headG.add(flick);
      });
    });

    /* ── Eyebrows — soft arched ── */
    [[-0.155, 0.07], [0.155, -0.07]].forEach(([x, rz]) => {
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.026, 0.01), browM);
      brow.position.set(x, 0.258, 0.395);
      brow.rotation.z = rz;
      headG.add(brow);
    });

    /* ── Nose — cute button ── */
    const noseTip = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 16), skin);
    noseTip.position.set(0, -0.065, 0.445);
    noseTip.scale.set(1.1, 0.72, 0.85);
    headG.add(noseTip);

    /* ── Lips — full Meta style smile ── */
    const upLip = new THREE.Mesh(new THREE.SphereGeometry(0.075, 32, 16), lipM);
    upLip.position.set(0, -0.194, 0.425);
    upLip.scale.set(1.1, 0.40, 0.56);
    headG.add(upLip);

    const loLip = new THREE.Mesh(new THREE.SphereGeometry(0.075, 32, 16), lipM);
    loLip.position.set(0, -0.252, 0.425);
    loLip.scale.set(1.0, 0.48, 0.56);
    headG.add(loLip);

    // Smile corners — pulled up for cute smile
    [-0.076, 0.076].forEach(x => {
      const c = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), lipM);
      c.position.set(x, -0.228, 0.418);
      c.scale.set(1, 0.7, 0.8);
      headG.add(c);
    });

    /* ── Ears ── */
    [-0.44, 0.44].forEach(x => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), skin);
      ear.position.set(x, 0.05, 0.0);
      ear.scale.set(0.52, 0.72, 0.44);
      headG.add(ear);

      // Gold hoop
      const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.008, 10, 24), goldM);
      hoop.position.set(x, -0.14, 0.0);
      hoop.rotation.y = Math.PI / 2;
      headG.add(hoop);
    });

    /* ── Glasses — clear cat-eye Meta style ── */
    [[-0.158, true], [0.158, false]].forEach(([x]) => {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.012, 12, 48), frameM);
      rim.position.set(x, 0.1, 0.398);
      rim.scale.set(1.12, 0.86, 1);
      headG.add(rim);

      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.088, 48), lensM);
      lens.position.set(x, 0.1, 0.402);
      lens.scale.set(1.12, 0.86, 1);
      headG.add(lens);
    });

    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.182, 10), frameM);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.1, 0.398);
    headG.add(bridge);

    [-1, 1].forEach(s => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.01, 0.01), frameM);
      arm.position.set(s * 0.34, 0.1, 0.3);
      arm.rotation.y = s * 0.55;
      headG.add(arm);
    });

    /* ══════════════ HAIR ══════════════ */
    // Cap / top dome — very smooth
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.46, 128, 128, 0, Math.PI * 2, 0, Math.PI * 0.53),
      hairM
    );
    hairCap.scale.set(1.07, 1.11, 1.04);
    headG.add(hairCap);

    // Hair volume sides
    [-1, 1].forEach(s => {
      const vol = new THREE.Mesh(new THREE.SphereGeometry(0.34, 48, 48, 0, Math.PI, 0, Math.PI * 0.85), hairM);
      vol.position.set(s * 0.26, -0.08, -0.06);
      vol.scale.set(0.72, 1.08, 0.68);
      headG.add(vol);
    });

    // Front face-framing curtain pieces
    [-1, 1].forEach(s => {
      const curtain = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), hairM);
      curtain.position.set(s * 0.32, 0.08, 0.25);
      curtain.scale.set(0.5, 1.6, 0.55);
      headG.add(curtain);
    });

    // Middle part highlight
    const midPart = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.05, 0.25), hairHi);
    midPart.position.set(0, 0.43, 0.18);
    headG.add(midPart);

    // Long flowing back hair
    for (let i = -2; i <= 2; i++) {
      const strand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1 - Math.abs(i) * 0.01, 0.06, 1.8, 16, 1, true),
        hairM
      );
      strand.position.set(i * 0.14, -0.75, -0.1 - Math.abs(i) * 0.03);
      strand.rotation.z = i * 0.04;
      strand.rotation.x = i % 2 === 0 ? 0.04 : -0.04;
      headG.add(strand);
    }

    /* ── Gold necklace ── */
    const chainGeo = new THREE.TorusGeometry(0.13, 0.005, 8, 48, Math.PI);
    const chain = new THREE.Mesh(chainGeo, goldM);
    chain.position.set(0, -0.14, 0.26);
    chain.rotation.x = 0.55;
    headG.add(chain);
    const pendant = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 8), goldM);
    pendant.position.set(0, -0.25, 0.3);
    headG.add(pendant);

    /* ══════════════ NECK ══════════════ */
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.28, 24), skin);
    neck.position.set(0, 1.26, 0.0);
    avatar.add(neck);

    /* ══════════════ BODY ══════════════ */
    // Torso
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.74, 32), top);
    torso.position.set(0, 0.74, 0);
    avatar.add(torso);

    // Chest curve
    const chest = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5), top);
    chest.position.set(0, 0.92, 0.1);
    chest.scale.set(1, 0.55, 0.72);
    chest.rotation.x = -0.2;
    avatar.add(chest);

    // Collar V
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.18, 20), top);
    collar.position.set(0, 1.1, 0.06);
    collar.rotation.x = -0.12;
    avatar.add(collar);

    // Skin at neck opening
    const neckOpen = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), skin);
    neckOpen.position.set(0, 1.06, 0.14);
    neckOpen.scale.set(0.9, 0.55, 0.6);
    avatar.add(neckOpen);

    /* ── Shoulders (smooth rounded Meta style) ── */
    [-0.38, 0.38].forEach(x => {
      const sh = new THREE.Mesh(new THREE.SphereGeometry(0.19, 32, 32), top);
      sh.position.set(x, 1.01, 0);
      sh.scale.set(1, 0.82, 0.88);
      avatar.add(sh);
    });

    /* ── Arms ── */
    [-1, 1].forEach(s => {
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.108, 0.54, 20), top);
      upper.position.set(s * 0.48, 0.73, 0.02);
      upper.rotation.z = s * -0.16;
      avatar.add(upper);

      const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.108, 0.095, 0.44, 20), top);
      lower.position.set(s * 0.56, 0.36, 0.03);
      lower.rotation.z = s * -0.1;
      avatar.add(lower);

      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.098, 0.098, 0.06, 20), topDark);
      cuff.position.set(s * 0.59, 0.14, 0.04);
      avatar.add(cuff);

      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), skin);
      hand.position.set(s * 0.615, 0.04, 0.04);
      hand.scale.set(0.88, 0.74, 0.7);
      avatar.add(hand);

      // Thumb
      const thumb = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), skin);
      thumb.position.set(s * 0.66, 0.08, 0.06);
      thumb.scale.set(0.6, 0.8, 0.6);
      avatar.add(thumb);
    });

    /* ── Lower body / hips ── */
    const hip = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.26, 24), pants);
    hip.position.set(0, 0.26, 0);
    avatar.add(hip);

    /* ══════════════ PARTICLES ══════════════ */
    const cnt = 220;
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
      const r = 1.05 + Math.random() * 1.55;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      ps[i*3]   = r * Math.sin(ph) * Math.cos(th);
      ps[i*3+1] = r * Math.sin(ph) * Math.sin(th) + 1.1;
      ps[i*3+2] = r * Math.cos(ph);
      const c = pal[i % pal.length];
      pc[i*3] = c.r; pc[i*3+1] = c.g; pc[i*3+2] = c.b;
    }
    pG.setAttribute("position", new THREE.BufferAttribute(ps, 3));
    pG.setAttribute("color",    new THREE.BufferAttribute(pc, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true });
    const particles = new THREE.Points(pG, pMat);
    scene.add(particles);

    /* ══════════════ MOUSE + ANIMATE ══════════════ */
    let mx = 0, my = 0;
    const onMove = e => {
      const r = mount.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      my = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let t = 0, rafId;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      t += 0.013;

      avatar.position.y = Math.sin(t * 0.7) * 0.065;
      headG.rotation.y  = THREE.MathUtils.lerp(headG.rotation.y, mx * 0.28, 0.06);
      headG.rotation.x  = THREE.MathUtils.lerp(headG.rotation.x, -my * 0.16, 0.06);
      avatar.rotation.y = THREE.MathUtils.lerp(avatar.rotation.y, mx * 0.05, 0.04);

      particles.rotation.y = t * 0.055;
      particles.rotation.x = Math.sin(t * 0.25) * 0.12;

      pinkL.intensity = 1.0 + Math.sin(t * 1.1) * 0.3;

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