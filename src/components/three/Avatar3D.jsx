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
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 1.5, 5.5);
    camera.lookAt(0, 1.2, 0);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const keyLight = new THREE.DirectionalLight(0xfff5ee, 2.5);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf472b6, 1.2);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa78bfa, 1.5);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    const bottomLight = new THREE.PointLight(0x22d3ee, 1.0, 8);
    bottomLight.position.set(0, -1, 2);
    scene.add(bottomLight);

    /* ── Materials ── */
    const skin     = new THREE.MeshToonMaterial({ color: 0xffcba4 });
    const skinDark = new THREE.MeshToonMaterial({ color: 0xf0b090 });
    const hair     = new THREE.MeshToonMaterial({ color: 0x1a0535 });
    const hoodie   = new THREE.MeshToonMaterial({ color: 0x7c3aed });
    const hoodieL  = new THREE.MeshToonMaterial({ color: 0x6d28d9 });
    const white    = new THREE.MeshToonMaterial({ color: 0xffffff });
    const eyeWhite = new THREE.MeshToonMaterial({ color: 0xffffff });
    const iris     = new THREE.MeshToonMaterial({ color: 0x7c3aed, emissive: 0x4c1d95, emissiveIntensity: 0.5 });
    const pupil    = new THREE.MeshToonMaterial({ color: 0x0a0010 });
    const lash     = new THREE.MeshToonMaterial({ color: 0x0a0010 });
    const lip      = new THREE.MeshToonMaterial({ color: 0xf472b6, emissive: 0xbe185d, emissiveIntensity: 0.3 });
    const blush    = new THREE.MeshToonMaterial({ color: 0xfca5a5, transparent: true, opacity: 0.5 });
    const glass    = new THREE.MeshStandardMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.25, metalness: 1, roughness: 0 });
    const glassRim = new THREE.MeshToonMaterial({ color: 0x22d3ee });
    const earring  = new THREE.MeshStandardMaterial({ color: 0xf472b6, emissive: 0xf472b6, emissiveIntensity: 0.6, metalness: 1 });

    const avatar = new THREE.Group();
    scene.add(avatar);

    /* ───── HEAD ───── */
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.72, 0);
    avatar.add(headGroup);

    // Face shape — slightly wider/rounder
    const face = new THREE.Mesh(new THREE.SphereGeometry(0.44, 64, 64), skin);
    face.scale.set(1.0, 1.12, 0.92);
    headGroup.add(face);

    // Jaw / chin softening
    const chin = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), skin);
    chin.position.set(0, -0.32, 0.06);
    chin.scale.set(0.85, 0.6, 0.85);
    headGroup.add(chin);

    /* ── Eyes ── */
    [[-0.16, true], [0.16, false]].forEach(([x]) => {
      // white
      const ew = new THREE.Mesh(new THREE.SphereGeometry(0.082, 32, 32), eyeWhite);
      ew.position.set(x, 0.08, 0.37);
      ew.scale.set(1, 0.78, 0.7);
      headGroup.add(ew);

      // iris
      const ir = new THREE.Mesh(new THREE.SphereGeometry(0.055, 32, 32), iris);
      ir.position.set(x, 0.08, 0.42);
      headGroup.add(ir);

      // pupil
      const pu = new THREE.Mesh(new THREE.SphereGeometry(0.028, 16, 16), pupil);
      pu.position.set(x, 0.08, 0.455);
      headGroup.add(pu);

      // highlight
      const hi = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), white);
      hi.position.set(x + 0.02, 0.1, 0.468);
      headGroup.add(hi);

      // upper lash
      const lashMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.018, 0.01), lash);
      lashMesh.position.set(x, 0.146, 0.41);
      lashMesh.rotation.z = x < 0 ? 0.08 : -0.08;
      headGroup.add(lashMesh);

      // lash corners
      [-1, 1].forEach((side) => {
        const corner = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.014, 0.01), lash);
        corner.position.set(x + side * 0.1, 0.13, 0.41);
        corner.rotation.z = side * (x < 0 ? 0.4 : -0.4);
        headGroup.add(corner);
      });

      // blush
      const bl = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), blush);
      bl.position.set(x * 1.4, -0.06, 0.35);
      bl.scale.set(1, 0.5, 0.4);
      headGroup.add(bl);
    });

    /* ── Eyebrows ── */
    [[-0.16, -0.05], [0.16, 0.05]].forEach(([x, rz]) => {
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.022, 0.01), lash);
      brow.position.set(x, 0.22, 0.40);
      brow.rotation.z = rz;
      headGroup.add(brow);
    });

    /* ── Nose ── */
    const noseTip = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), skinDark);
    noseTip.position.set(0, -0.08, 0.44);
    noseTip.scale.set(1, 0.7, 0.8);
    headGroup.add(noseTip);

    /* ── Mouth ── */
    const upperLip = new THREE.Mesh(new THREE.SphereGeometry(0.072, 24, 16), lip);
    upperLip.position.set(0, -0.2, 0.42);
    upperLip.scale.set(1, 0.38, 0.55);
    headGroup.add(upperLip);

    const lowerLip = new THREE.Mesh(new THREE.SphereGeometry(0.072, 24, 16), lip);
    lowerLip.position.set(0, -0.255, 0.42);
    lowerLip.scale.set(0.9, 0.42, 0.55);
    headGroup.add(lowerLip);

    /* ── Ears + earrings ── */
    [-0.45, 0.45].forEach((x) => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 20), skin);
      ear.position.set(x, 0.0, 0.0);
      ear.scale.set(0.52, 0.72, 0.45);
      headGroup.add(ear);

      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), earring);
      drop.position.set(x, -0.16, 0.0);
      headGroup.add(drop);
    });

    /* ── Glasses ── */
    [[-0.16, true], [0.16, false]].forEach(([x]) => {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.098, 0.013, 12, 36), glassRim);
      rim.position.set(x, 0.08, 0.39);
      headGroup.add(rim);

      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.085, 32), glass);
      lens.position.set(x, 0.08, 0.40);
      headGroup.add(lens);
    });

    // bridge
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.18, 8), glassRim);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.08, 0.39);
    headGroup.add(bridge);

    // arms of glasses
    [-1, 1].forEach((side) => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.22, 8), glassRim);
      arm.rotation.z = Math.PI / 2;
      arm.rotation.y = side * 0.5;
      arm.position.set(side * 0.32, 0.08, 0.28);
      headGroup.add(arm);
    });

    /* ── Hair ── */
    // top dome
    const hairDome = new THREE.Mesh(new THREE.SphereGeometry(0.47, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.52), hair);
    hairDome.scale.set(1.06, 1.12, 1.04);
    headGroup.add(hairDome);

    // side swoops
    [-1, 1].forEach((side) => {
      const swoop = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.7), hair);
      swoop.position.set(side * 0.32, -0.08, -0.05);
      swoop.scale.set(0.65, 1.0, 0.6);
      headGroup.add(swoop);
    });

    // bangs — individual strands
    for (let i = -3; i <= 3; i++) {
      const strand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045 - Math.abs(i) * 0.004, 0.02, 0.42, 12),
        hair
      );
      strand.position.set(i * 0.1, 0.32, 0.32);
      strand.rotation.x = 0.55 + Math.abs(i) * 0.06;
      strand.rotation.z = i * 0.04;
      headGroup.add(strand);
    }

    // long hair back
    const hairBack = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.22, 1.4, 24, 1, true),
      hair
    );
    hairBack.position.set(0, -0.55, -0.08);
    headGroup.add(hairBack);

    // hair highlight streak
    const streak = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.01), new THREE.MeshToonMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.6 }));
    streak.position.set(0.12, 0.3, 0.39);
    streak.rotation.z = -0.3;
    headGroup.add(streak);

    /* ───── NECK ───── */
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.26, 20), skin);
    neck.position.set(0, 1.26, 0);
    avatar.add(neck);

    /* ───── BODY ───── */
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.75, 24), hoodie);
    torso.position.set(0, 0.76, 0);
    avatar.add(torso);

    // hoodie pocket
    const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.02), hoodieL);
    pocket.position.set(0, 0.58, 0.28);
    pocket.rotation.x = -0.1;
    avatar.add(pocket);

    // hoodie zip line
    const zip = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.5, 0.02), hoodieL);
    zip.position.set(0, 0.82, 0.29);
    avatar.add(zip);

    // collar
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.05, 12, 28), hoodie);
    collar.position.set(0, 1.12, 0.04);
    collar.rotation.x = 0.25;
    avatar.add(collar);

    /* ── Shoulders ── */
    [-0.38, 0.38].forEach((x) => {
      const sh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), hoodie);
      sh.position.set(x, 1.02, 0);
      sh.scale.set(1, 0.85, 0.9);
      avatar.add(sh);
    });

    /* ── Arms ── */
    [-1, 1].forEach((side) => {
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.1, 0.55, 16), hoodie);
      upper.position.set(side * 0.49, 0.75, 0.02);
      upper.rotation.z = side * -0.18;
      avatar.add(upper);

      const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.42, 16), hoodie);
      lower.position.set(side * 0.56, 0.38, 0.04);
      lower.rotation.z = side * -0.12;
      avatar.add(lower);

      // cuff
      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 16), hoodieL);
      cuff.position.set(side * 0.60, 0.17, 0.05);
      avatar.add(cuff);

      // hand
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 20), skin);
      hand.position.set(side * 0.62, 0.08, 0.05);
      hand.scale.set(0.92, 0.78, 0.72);
      avatar.add(hand);
    });

    /* ── Floating particles ── */
    const count = 180;
    const pGeo  = new THREE.BufferGeometry();
    const pos   = new Float32Array(count * 3);
    const col   = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const palette = [
      new THREE.Color(0xf472b6),
      new THREE.Color(0xa78bfa),
      new THREE.Color(0x22d3ee),
      new THREE.Color(0x4ade80),
      new THREE.Color(0xfbbf24),
    ];
    for (let i = 0; i < count; i++) {
      const r     = 1.0 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta) + 1.1;
      pos[i*3+2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
      sizes[i] = 0.02 + Math.random() * 0.05;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true });
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
      t += 0.014;

      // float
      avatar.position.y = Math.sin(t * 0.7) * 0.07;

      // head follows mouse smoothly
      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, mx * 0.28, 0.06);
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -my * 0.18, 0.06);

      // body slight sway
      avatar.rotation.y = THREE.MathUtils.lerp(avatar.rotation.y, mx * 0.06, 0.04);

      // particles orbit
      particles.rotation.y = t * 0.06;
      particles.rotation.x = Math.sin(t * 0.3) * 0.15;

      // pulsing lights
      fillLight.intensity = 1.0 + Math.sin(t * 1.1) * 0.4;
      rimLight.intensity  = 1.2 + Math.sin(t * 0.8 + 1) * 0.4;
      bottomLight.intensity = 0.8 + Math.sin(t * 1.4 + 2) * 0.3;

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