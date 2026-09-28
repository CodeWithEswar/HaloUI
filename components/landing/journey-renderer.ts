import * as THREE from "three"

/** The same scene changes from an armillary assembly into an open portal on scroll. */
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
  const ringMaterials = Array.from(
    { length: 4 },
    (_, i) =>
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: [0.52, 0.2, 0.13, 0.08][i],
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
  )
  materials.push(...ringMaterials)
  const rings = ringMaterials.map((material, i) => {
    const geometry = new THREE.TorusGeometry(
      [2, 2.42, 2.77, 3.04][i],
      i === 0 ? 0.012 : 0.005,
      6,
      240
    )
    geometries.push(geometry)
    const mesh = new THREE.Mesh(geometry, material)
    assembly.add(mesh)
    return mesh
  })
  rings[0].rotation.set(1.2, 0.35, 0.18)
  rings[1].rotation.set(0.32, 1.3, -0.55)
  rings[2].rotation.set(1.55, -0.4, 0.9)
  rings[3].rotation.set(0.75, 0.95, 0.45)
  const jewelGeometry = new THREE.IcosahedronGeometry(0.72, 2)
  geometries.push(jewelGeometry)
  const jewelMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x696969,
    metalness: 0.75,
    roughness: 0.24,
    flatShading: true,
    clearcoat: 0.8,
    clearcoatRoughness: 0.16,
  })
  materials.push(jewelMaterial)
  const jewel = new THREE.Mesh(jewelGeometry, jewelMaterial)
  assembly.add(jewel)
  scene.add(new THREE.AmbientLight(0xffffff, 0.28))
  const key = new THREE.PointLight(0xffffff, 21, 18)
  key.position.set(3, 3, 4)
  scene.add(key)
  const satelliteGeometry = new THREE.IcosahedronGeometry(0.065, 0)
  geometries.push(satelliteGeometry)
  const satelliteMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    metalness: 0.6,
    roughness: 0.4,
  })
  materials.push(satelliteMaterial)
  const satellites = new THREE.InstancedMesh(
    satelliteGeometry,
    satelliteMaterial,
    70
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
    dummy.position.set(Math.cos(a) * r, (random() - 0.5) * 1.4, Math.sin(a) * r)
    dummy.rotation.set(random() * 6, random() * 6, random() * 6)
    dummy.scale.setScalar(0.3 + random() * 1.6)
    dummy.updateMatrix()
    satellites.setMatrixAt(i, dummy.matrix)
  }
  const apertureMaterial = new THREE.ShaderMaterial({
    uniforms: { ink: { value: 1 }, time: { value: 0 }, opening: { value: 0 } },
    vertexShader: `varying vec2 v;void main(){v=uv*2.0-1.0;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `varying vec2 v;uniform float ink;uniform float time;uniform float opening;
      void main(){float r=length(v);float a=atan(v.y,v.x);
      float light=pow(.5+.5*cos(a-time*.08),8.0);
      float edge=exp(-pow((r-.57)/.016,2.0));
      float trail=exp(-pow((r-.66)/.12,2.0))*(.05+.16*light);
      float rays=pow(.5+.5*sin(a*100.0+r*250.0-time*.15),20.0)*trail;
      float alpha=(edge*(.34+.66*light)+trail+rays)*opening;
      gl_FragColor=vec4(vec3(ink),alpha);
    }`,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  materials.push(apertureMaterial)
  const apertureGeometry = new THREE.PlaneGeometry(8, 8)
  geometries.push(apertureGeometry)
  const aperture = new THREE.Mesh(apertureGeometry, apertureMaterial)
  portal.add(aperture)
  const fineRingGeometry = new THREE.TorusGeometry(2.28, 0.008, 4, 280)
  geometries.push(fineRingGeometry)
  const fineRingMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  materials.push(fineRingMaterial)
  portal.add(new THREE.Mesh(fineRingGeometry, fineRingMaterial))
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
    frame = 0,
    previous = 0,
    elapsed = 0,
    width = 1,
    height = 1,
    transition = 0,
    scrollProgress = 0
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const pointer = new THREE.Vector2()
  const targetPointer = new THREE.Vector2()
  const draw = () => renderer.render(scene, camera)
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
    const x = compact ? 0 : Math.min(camera.aspect * 2.35, 3.95)
    assembly.position.set(x, compact ? -1.8 : 0, 0)
    portal.position.set(x, compact ? 1.3 : 0, -0.3)
    assembly.scale.setScalar((compact ? 0.65 : 1) * (1 - blend * 0.18))
    portal.scale.setScalar(compact ? 0.72 : 1.15)
    jewel.scale.setScalar(1 - blend * 0.9)
    ringMaterials.forEach(
      (material, i) =>
        (material.opacity =
          [0.52, 0.2, 0.13, 0.08][i] * (1 - blend * 0.86) * (dark ? 1 : 0.48))
    )
    apertureMaterial.uniforms.opening.value = blend
    fineRingMaterial.opacity = blend * (dark ? 0.45 : 0.16)
    travelMaterial.opacity = blend * (dark ? 0.45 : 0.17)
    stars.position.set(-pointer.x * 0.25, pointer.y * 0.2, 0)
    assembly.rotation.set(pointer.y * 0.035, pointer.x * 0.06, elapsed * 0.017)
    portal.rotation.z = elapsed * 0.014
    apertureMaterial.uniforms.time.value = elapsed
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
    if (!visible || document.hidden) return
    const dt = Math.min((time - previous) / 1000, 0.04)
    previous = time
    if (!motion.matches) {
      elapsed += dt
      pointer.lerp(targetPointer, Math.min(1, dt * 2))
      jewel.rotation.x += dt * 0.08
      jewel.rotation.y += dt * 0.13
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
    starMaterial.color.set(dark ? 0xdddddd : 0x414141)
    starMaterial.opacity = dark ? 0.6 : 0.17
    jewelMaterial.color.set(dark ? 0x696969 : 0x555555)
    satelliteMaterial.color.set(dark ? 0xaaaaaa : 0x555555)
    key.intensity = dark ? 21 : 12
    updateScene(0)
    draw()
  }
  const onContextLost = (event: Event) => {
    event.preventDefault()
    cancelAnimationFrame(frame)
    visible = false
    delete host.dataset.ready
  }
  const onContextRestored = () => {
    visible = true
    resize()
    resume()
  }
  const onMotion = () => {
    if (motion.matches) {
      targetPointer.set(0, 0)
      pointer.set(0, 0)
      updateScene(0)
      draw()
    }
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
    satellites.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}
