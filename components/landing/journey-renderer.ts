import * as THREE from "three"

/** A shared star field carries the scroll journey from a galaxy to a lit world. */
export function mountJourney(host: HTMLDivElement): () => void {
  const stage = host.closest<HTMLElement>("[data-journey]")
  const finale = stage?.querySelector<HTMLElement>("[data-journey-finale]")
  if (!stage || !finale) return () => {}
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    })
  } catch {
    return () => {}
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.4))
  renderer.setClearColor(0, 0)
  host.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 70)
  camera.position.z = 14
  const assembly = new THREE.Group()
  scene.add(assembly)
  const portal = new THREE.Group()
  scene.add(portal)
  const materials: THREE.Material[] = []
  const geometries: THREE.BufferGeometry[] = []
  let dark = document.documentElement.classList.contains("dark")
  // Noise breaks up the dust lanes without repeating geometric contour lines.
  const cloudNoise = `
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
    float fbm(vec2 p){float n=0.0,w=.5;mat2 m=mat2(.8,.6,-.6,.8);
      for(int i=0;i<5;i++){n+=w*noise(p);p=m*p*2.03+7.1;w*=.5;}return n;}
  `
  const discMaterial = new THREE.ShaderMaterial({
    uniforms: {
      ink: { value: 1 },
      time: { value: 0 },
      visibility: { value: 1 },
    },
    vertexShader: `varying vec2 p;void main(){p=uv*2.0-1.0;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `varying vec2 p;uniform float ink;uniform float time;uniform float visibility;
      ${cloudNoise}
      void main(){float r=length(p);if(r>=.96)discard;
        float a=atan(p.y,p.x)+time*.012;
        float grain=fbm(p*24.0);
        float winding=a-5.4*log(r+.13);
        float arms=pow(.5+.5*sin(winding*2.0+grain*2.8),3.0);
        float dust=fbm(p*11.0+vec2(grain));
        float lanes=smoothstep(.28,.72,dust);
        float envelope=exp(-r*3.8)*(1.0-smoothstep(.58,.96,r));
        float core=exp(-r*r*210.0);
        float haze=exp(-r*r*14.0)*.13;
        float alpha=(arms*lanes*envelope*2.4+core*.92+haze)*visibility;
        gl_FragColor=vec4(vec3(ink),clamp(alpha,0.0,.96));
      }`,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.NormalBlending,
  })
  materials.push(discMaterial)
  const discGeometry = new THREE.PlaneGeometry(8, 8)
  geometries.push(discGeometry)
  const disc = new THREE.Mesh(discGeometry, discMaterial)
  assembly.add(disc)
  scene.add(new THREE.AmbientLight(0xffffff, 0.23))
  const key = new THREE.PointLight(0xffffff, 16, 18)
  key.position.set(3, 3, 4)
  scene.add(key)
  const satelliteGeometry = new THREE.SphereGeometry(0.065, 16, 12)
  const rockPositions = satelliteGeometry.getAttribute("position")
  for (let i = 0; i < rockPositions.count; i++) {
    const x = rockPositions.getX(i),
      y = rockPositions.getY(i),
      z = rockPositions.getZ(i)
    const relief =
      1 +
      0.12 * Math.sin(x * 83 + y * 61) * Math.cos(z * 97) +
      0.06 * Math.sin(y * 179 + z * 113)
    rockPositions.setXYZ(i, x * relief, y * relief * 0.78, z * relief)
  }
  satelliteGeometry.computeVertexNormals()
  geometries.push(satelliteGeometry)
  const satelliteMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    metalness: 0.05,
    roughness: 0.96,
    transparent: true,
  })
  materials.push(satelliteMaterial)
  const satellites = new THREE.InstancedMesh(
    satelliteGeometry,
    satelliteMaterial,
    24
  )
  assembly.add(satellites)
  const dummy = new THREE.Object3D()
  let seed = 5219
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  for (let i = 0; i < satellites.count; i++) {
    const a = random() * Math.PI * 2,
      r = 2 + random() * 1.2
    dummy.position.set(Math.cos(a) * r, Math.sin(a) * r, (random() - 0.5) * 0.4)
    dummy.rotation.set(random() * 6, random() * 6, random() * 6)
    dummy.scale.setScalar(0.25 + random() * 0.65)
    dummy.updateMatrix()
    satellites.setMatrixAt(i, dummy.matrix)
  }
  const dustPositions: number[] = []
  const dustColors: number[] = []
  for (let i = 0; i < 5200; i++) {
    const radius = 0.18 + Math.pow(random(), 0.7) * 3.3
    const angle =
      (i % 2) * Math.PI +
      Math.log(radius / 4 + 0.13) * 5.4 +
      (random() - 0.5) * (1.2 + radius * 0.15)
    dustPositions.push(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      (random() - 0.5) * 0.15
    )
    const shade = 0.3 + Math.pow(random(), 2) * 0.7
    dustColors.push(shade, shade, shade)
  }
  const dustGeometry = new THREE.BufferGeometry()
  dustGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(dustPositions, 3)
  )
  dustGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(dustColors, 3)
  )
  geometries.push(dustGeometry)
  const spriteCanvas = document.createElement("canvas")
  spriteCanvas.width = spriteCanvas.height = 32
  const spriteContext = spriteCanvas.getContext("2d")!
  const glow = spriteContext.createRadialGradient(16, 16, 0, 16, 16, 16)
  glow.addColorStop(0, "rgba(255,255,255,1)")
  glow.addColorStop(0.2, "rgba(255,255,255,.7)")
  glow.addColorStop(0.55, "rgba(255,255,255,.12)")
  glow.addColorStop(1, "rgba(255,255,255,0)")
  spriteContext.fillStyle = glow
  spriteContext.fillRect(0, 0, 32, 32)
  const particleMap = new THREE.CanvasTexture(spriteCanvas)
  const dustMaterial = new THREE.PointsMaterial({
    map: particleMap,
    size: 0.037,
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
  })
  materials.push(dustMaterial)
  assembly.add(new THREE.Points(dustGeometry, dustMaterial))
  const apertureMaterial = new THREE.ShaderMaterial({
    uniforms: { ink: { value: 1 }, time: { value: 0 }, opening: { value: 0 } },
    vertexShader: `varying vec2 v;void main(){v=uv*2.0-1.0;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `varying vec2 v;uniform float ink;uniform float time;uniform float opening;
      ${cloudNoise}
      void main(){float r=length(v);if(r>=.95)discard;float a=atan(v.y,v.x);
      float light=pow(.5+.5*cos(a-1.9),5.0);
      float cloud=fbm(v*19.0+time*.008);
      float edge=exp(-pow((r-.47)/.006,2.0))*(.08+light*.8);
      float corona=exp(-max(r-.47,0.0)*18.0)*smoothstep(.467,.49,r);
      float alpha=(edge+corona*(.1+cloud*.25)*(.3+light)) * (1.0-smoothstep(.72,.95,r))*opening;
      gl_FragColor=vec4(vec3(ink),alpha);
    }`,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.NormalBlending,
  })
  materials.push(apertureMaterial)
  const apertureGeometry = new THREE.PlaneGeometry(8, 8)
  geometries.push(apertureGeometry)
  const aperture = new THREE.Mesh(apertureGeometry, apertureMaterial)
  aperture.renderOrder = 2
  portal.add(aperture)
  const worldGeometry = new THREE.SphereGeometry(1.86, 64, 40)
  geometries.push(worldGeometry)
  const worldMaterial = new THREE.ShaderMaterial({
    uniforms: { daylight: { value: dark ? 0 : 1 }, presence: { value: 0 } },
    vertexShader: `varying vec3 point;varying vec3 surfaceNormal;
      void main(){point=normalize(position);surfaceNormal=normalize(normalMatrix*normal);
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `varying vec3 point;varying vec3 surfaceNormal;
      uniform float daylight;uniform float presence;
      ${cloudNoise}
      float terrain(vec3 q){vec3 w=pow(abs(q),vec3(4.0));w/=w.x+w.y+w.z;
        return fbm(q.yz*8.0)*w.x+fbm(q.xz*8.0+17.0)*w.y+fbm(q.xy*8.0+31.0)*w.z;}
      void main(){vec3 q=normalize(point);vec3 n=normalize(surfaceNormal);
        float land=terrain(q);
        float detail=noise(q.xy*130.0+q.z*41.0);
        float rock=mix(.23,.72,smoothstep(.23,.75,land));
        rock*=.85+detail*.2;
        for(int i=0;i<9;i++){
          float f=float(i);
          vec3 center=normalize(vec3(sin(f*7.13+1.0),cos(f*4.71+2.0),sin(f*9.31+.3)));
          float d=length(q-center),radius=.065+hash(vec2(f,4.0))*.14;
          float basin=1.0-smoothstep(radius*.65,radius,d);
          float rim=exp(-pow((d-radius)/.018,2.0));
          rock=rock*(1.0-basin*.34)+rim*.055;
        }
        float sun=dot(n,normalize(vec3(-.65,.75,.85)));
        float diffuse=smoothstep(-.16,.85,sun);
        float ambient=mix(.045,.2,daylight);
        float value=rock*(ambient+diffuse*.98);
        float rim=pow(1.0-max(n.z,0.0),4.0)*smoothstep(-.1,.7,sun);
        value+=rim*mix(.2,.075,daylight);
        gl_FragColor=vec4(vec3(value),presence);
      }`,
    transparent: true,
    depthWrite: true,
  })
  materials.push(worldMaterial)
  const world = new THREE.Mesh(worldGeometry, worldMaterial)
  world.renderOrder = 1
  portal.add(world)
  const starsData = []
  for (let i = 0; i < 1500; i++)
    starsData.push(
      (random() - 0.5) * 28,
      (random() - 0.5) * 17,
      -2 - random() * 17
    )
  const starsGeometry = new THREE.BufferGeometry()
  starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starsData, 3)
  )
  geometries.push(starsGeometry)
  const starMaterial = new THREE.PointsMaterial({
    map: particleMap,
    size: 0.015,
    color: 0xffffff,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  })
  materials.push(starMaterial)
  const stars = new THREE.Points(starsGeometry, starMaterial)
  scene.add(stars)
  // One buffer holds the travel streaks; only its coordinates change per frame.
  const travelData = new Float32Array(330 * 3)
  const travelSpeed = new Float32Array(330)
  for (let i = 0; i < 330; i++) {
    const a = random() * Math.PI * 2,
      r = 0.9 + random() * 3.8
    travelData[i * 3] = Math.cos(a) * r
    travelData[i * 3 + 1] = Math.sin(a) * r
    travelData[i * 3 + 2] = -2 - random() * 12
    travelSpeed[i] = 0.25 + random() * 1.2
  }
  const travelGeometry = new THREE.BufferGeometry()
  travelGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(travelData, 3)
  )
  geometries.push(travelGeometry)
  const travelMaterial = new THREE.PointsMaterial({
    map: particleMap,
    size: 0.026,
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  })
  materials.push(travelMaterial)
  const travel = new THREE.Points(travelGeometry, travelMaterial)
  portal.add(travel)
  let visible = true,
    lost = false,
    frame = 0,
    previous = 0,
    elapsed = 0,
    width = 1,
    height = 1,
    transition = 0,
    scrollProgress = 0,
    journeyProgress = 0
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const pointer = new THREE.Vector2()
  const targetPointer = new THREE.Vector2()
  const draw = () => {
    if (!visible || lost) return
    renderer.render(scene, camera)
    host.dataset.ready = "true"
  }
  const resize = () => {
    const rect = host.getBoundingClientRect()
    width = Math.max(1, rect.width)
    height = Math.max(1, rect.height)
    camera.aspect = width / height
    camera.position.z = width < 640 ? 17 : 14
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    updateScroll()
    draw()
  }
  const updateScroll = () => {
    const rect = finale.getBoundingClientRect()
    const desired = THREE.MathUtils.clamp(
      1 - (rect.top - height * 0.82) / (height * 0.9),
      0,
      1
    )
    scrollProgress = desired
    const journeyRect = stage.getBoundingClientRect()
    journeyProgress = motion.matches
      ? 0
      : THREE.MathUtils.clamp(
          -journeyRect.top / Math.max(1, journeyRect.height - height),
          0,
          1
        )
    if (!motion.matches) {
      stage.style.setProperty(
        "--journey-shift",
        `${(-60 * journeyProgress).toFixed(1)}px`
      )
      stage.style.setProperty(
        "--journey-near-shift",
        `${(-28 * journeyProgress).toFixed(1)}px`
      )
    }
    if (motion.matches) {
      transition = desired
      updateScene(0)
      draw()
    }
  }
  const updateScene = (dt: number) => {
    transition = motion.matches
      ? scrollProgress
      : THREE.MathUtils.damp(transition, scrollProgress, 2.4, dt)
    const blend = transition * transition * (3 - 2 * transition),
      compact = width < 640
    const x = compact ? 0 : Math.min(camera.aspect * 2.1, 3.65)
    assembly.position.set(x, (compact ? -1.8 : 0) + journeyProgress * 0.6, 0)
    portal.position.set(x, (compact ? 1.3 : 0) - blend * 0.3, -0.3)
    camera.position.z = compact ? 17 - blend * 1.1 : 14 - blend * 1.4
    assembly.scale.setScalar((compact ? 0.65 : 1) * (1 - blend * 0.18))
    portal.scale.setScalar(compact ? 0.72 : 1.02)
    discMaterial.uniforms.visibility.value = 1 - blend
    satelliteMaterial.opacity = (1 - blend) * 0.65
    dustMaterial.opacity = (1 - blend) * (dark ? 0.48 : 0.3)
    apertureMaterial.uniforms.opening.value = blend
    worldMaterial.uniforms.presence.value = blend
    world.visible = blend > 0.001
    world.rotation.set(0.12, elapsed * 0.014, -0.15)
    travelMaterial.opacity = blend * (dark ? 0.2 : 0.12)
    stars.position.set(
      -pointer.x * 0.25,
      pointer.y * 0.2 + journeyProgress * 1.7,
      journeyProgress * 0.7
    )
    assembly.rotation.set(
      0.82 + pointer.y * 0.025,
      -0.18 + pointer.x * 0.035,
      -0.32 + elapsed * 0.006 + journeyProgress * 0.08
    )
    portal.rotation.z = 0
    apertureMaterial.uniforms.time.value = elapsed
    discMaterial.uniforms.time.value = elapsed
    if (!motion.matches && blend > 0.01) {
      const attribute = travelGeometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute
      for (let i = 0; i < travelSpeed.length; i++) {
        const z = attribute.getZ(i) + dt * travelSpeed[i] * (0.25 + blend * 1.4)
        attribute.setZ(i, z > 3 ? -12 : z)
      }
      attribute.needsUpdate = true
    }
  }
  const tick = (time: number) => {
    frame = 0
    if (!visible || lost || document.hidden) return
    const dt = Math.min((time - previous) / 1000, 0.04)
    previous = time
    if (!motion.matches) {
      elapsed += dt
      pointer.lerp(targetPointer, Math.min(1, dt * 2))
    }
    updateScene(dt)
    draw()
    if (!motion.matches) frame = requestAnimationFrame(tick)
  }
  const resume = () => {
    cancelAnimationFrame(frame)
    previous = performance.now()
    frame = requestAnimationFrame(tick)
  }
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType === "touch" || motion.matches) return
    targetPointer.set(
      (event.clientX / width - 0.5) * 2,
      (event.clientY / height - 0.5) * 2
    )
  }
  const onLeave = () => targetPointer.set(0, 0)
  const onTheme = () => {
    dark = document.documentElement.classList.contains("dark")
    apertureMaterial.uniforms.ink.value = dark ? 0.94 : 0.16
    worldMaterial.uniforms.daylight.value = dark ? 0 : 1
    discMaterial.uniforms.ink.value = dark ? 0.94 : 0.17
    starMaterial.color.set(dark ? 0xdddddd : 0x414141)
    starMaterial.opacity = dark ? 0.6 : 0.17
    dustMaterial.color.set(dark ? 0xffffff : 0x363636)
    travelMaterial.color.set(dark ? 0xffffff : 0x363636)
    satelliteMaterial.color.set(dark ? 0xaaaaaa : 0x555555)
    key.intensity = dark ? 16 : 10
    updateScene(0)
    draw()
  }
  const onContextLost = (event: Event) => {
    event.preventDefault()
    cancelAnimationFrame(frame)
    lost = true
    delete host.dataset.ready
  }
  const onContextRestored = () => {
    lost = false
    resize()
    resume()
  }
  const onMotion = () => {
    if (motion.matches) {
      targetPointer.set(0, 0)
      pointer.set(0, 0)
      stage.style.removeProperty("--journey-shift")
      stage.style.removeProperty("--journey-near-shift")
      updateScroll()
    } else updateScroll()
    resume()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(host)
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    resume()
  })
  intersection.observe(host)
  const themeObserver = new MutationObserver(onTheme)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  window.addEventListener("scroll", updateScroll, { passive: true })
  window.addEventListener("pointermove", onPointer, { passive: true })
  window.addEventListener("pointerleave", onLeave)
  document.addEventListener("visibilitychange", resume)
  motion.addEventListener("change", onMotion)
  renderer.domElement.addEventListener("webglcontextlost", onContextLost)
  renderer.domElement.addEventListener(
    "webglcontextrestored",
    onContextRestored
  )
  resize()
  onTheme()
  resume()
  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    intersection.disconnect()
    themeObserver.disconnect()
    window.removeEventListener("scroll", updateScroll)
    window.removeEventListener("pointermove", onPointer)
    window.removeEventListener("pointerleave", onLeave)
    document.removeEventListener("visibilitychange", resume)
    motion.removeEventListener("change", onMotion)
    geometries.forEach((geometry) => geometry.dispose())
    materials.forEach((material) => material.dispose())
    renderer.domElement.removeEventListener("webglcontextlost", onContextLost)
    renderer.domElement.removeEventListener(
      "webglcontextrestored",
      onContextRestored
    )
    delete host.dataset.ready
    stage.style.removeProperty("--journey-shift")
    stage.style.removeProperty("--journey-near-shift")
    satellites.dispose()
    particleMap.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}
