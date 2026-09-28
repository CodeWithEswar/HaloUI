import * as THREE from "three"
import { createUniverseEnvironment } from "./universe-environment"

const vertexShader = `
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vPosition = position;
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}`

const noise = `
float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
float noise3(vec3 p) {
  vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),
    mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
    mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
    mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float terrain(vec3 p) {
  float n=0.0, a=0.5;
  for(int i=0;i<5;i++) { n+=a*noise3(p); p=p*2.04+vec3(3.1,1.7,9.2); a*=0.5; }
  return n;
}`

const fragmentShader = `
uniform vec3 tint;
uniform float seed;
uniform float daylight;
uniform float emphasis;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vView;
${noise}
void main() {
  vec3 p=normalize(vPosition);
  float continent=terrain(p*4.8+seed);
  float detail=terrain(p*70.0 + seed);
  float ridge=1.0-abs(terrain(p*18.0+continent*2.5)-0.5)*2.0;
  float rock=continent*0.65+detail*0.35;
  if(seed>20.0) rock=mix(rock,0.48+0.24*sin(p.y*31.0+continent*10.0),0.72);
  vec3 n=normalize(vNormal);
  vec3 dp1=dFdx(-vView),dp2=dFdy(-vView);
  vec3 r1=cross(dp2,n),r2=cross(n,dp1);
  float det=dot(dp1,r1);
  vec3 gradient=sign(det)*(dFdx(rock)*r1+dFdy(rock)*r2);
  n=normalize(abs(det)*n-gradient*0.035);
  vec3 view=normalize(vView);
  vec3 key=normalize(vec3(0.82,0.72,0.16));
  float light=max(dot(n,key),0.0);
  float rim=pow(1.0-max(dot(normalize(vNormal),view),0.0),4.8);
  float albedo=mix(0.012,0.5,smoothstep(0.28,0.69,rock));
  albedo+=pow(ridge,16.0)*detail*0.09;
  float core=1.0-step(4.0,seed);
  float gray=albedo*(mix(0.025,0.009,core)+pow(light,1.3)*2.4);
  gray+=pow(max(dot(reflect(-key,n),view),0.0),24.0)*detail*0.12;
  gray+=rim*(0.028+pow(max(dot(normalize(vNormal),key),0.0),2.0)*1.5);
  gray+=max(dot(n,normalize(vec3(-0.5,-1.0,0.2))),0.0)*0.009;
  gray=mix(gray,gray*0.94+0.01,daylight);
  gray+=emphasis*rim*0.15;
  gl_FragColor=vec4(vec3(gray),1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`
/** One canvas, with real DOM links projected onto the six component globes. */
export function mountUniverse(host: HTMLDivElement): () => void {
  const stage = host.parentElement
  if (!stage) return () => {}
  const links = Array.from(
    stage.querySelectorAll<HTMLAnchorElement>("[data-planet]")
  )
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0, 0)
  host.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-7, 7, 5, -5, 0.1, 100)
  camera.position.z = 15
  const geometry = new THREE.SphereGeometry(1, 64, 48)
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const finePointer = window.matchMedia("(pointer: fine)")
  let width = 1,
    height = 1,
    visible = true,
    lost = false,
    frame = 0,
    previous = 0,
    elapsed = 0
  const pointer = new THREE.Vector2(-10000, -10000)
  const parallax = new THREE.Vector2()
  let dark = document.documentElement.classList.contains("dark")

  function makePlanet(seed: number) {
    const group = new THREE.Group()
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        tint: { value: new THREE.Color(seed === 3 ? "#303030" : "#8b8b8b") },
        seed: { value: seed },
        daylight: { value: 0 },
        emphasis: { value: 0 },
      },
    })
    const globe = new THREE.Mesh(geometry, material)
    group.add(globe)
    const air = new THREE.Mesh(
      geometry,
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: `varying vec3 vNormal; varying vec3 vView;
      void main(){float f=pow(1.0-abs(dot(normalize(vNormal),normalize(vView))),4.5);
      float lit=0.2+0.8*max(dot(normalize(vNormal),normalize(vec3(0.8,0.8,0.2))),0.0);
      gl_FragColor=vec4(vec3(0.95),f*lit*0.35);}`,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
    air.scale.setScalar(1.035)
    group.add(air)
    scene.add(group)
    return { group, globe, material }
  }
  const coronaMaterial = new THREE.ShaderMaterial({
    uniforms: { strength: { value: 0.24 } },
    vertexShader: `varying vec2 p; void main(){p=position.xy;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `varying vec2 p; uniform float strength;
      void main(){float r=length(p);float edge=exp(-max(r-0.98,0.0)*19.0);
      float key=0.2+0.8*max(dot(normalize(p),normalize(vec2(0.7,0.8))),0.0);
      gl_FragColor=vec4(vec3(1.0),edge*key*strength*smoothstep(0.88,1.0,r)*(1.0-smoothstep(1.4,1.7,r)));}`,
    transparent: true,
    depthWrite: false,
  })
  const corona = new THREE.Mesh(
    new THREE.PlaneGeometry(3.5, 3.5),
    coronaMaterial
  )
  scene.add(corona)
  const core = makePlanet(3)
  const worlds = links.map((link, i) => ({
    ...makePlanet([7, 26, 12, 32, 16, 42][i]),
    link,
    offset: new THREE.Vector2(),
    velocity: new THREE.Vector2(),
    radius: 1,
    px: 0,
    py: 0,
  }))

  // A continuous accretion band with fine filaments and an orbiting highlight.
  const haloMaterial = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, ink: { value: 1 } },
    vertexShader: `varying vec2 p; void main(){p=position.xy; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `varying vec2 p; uniform float time; uniform float ink;
    void main(){
      float r=length(p); float a=atan(p.y,p.x);
      float band=exp(-pow((r-1.48)/0.17,2.0));
      float inner=exp(-pow((r-1.38)/0.009,2.0));
      float outer=exp(-pow((r-1.65)/0.004,2.0));
      float threads=pow(0.5+0.5*sin(r*390.0+sin(a*9.0)*0.5),14.0)*band;
      float light=pow(0.5+0.5*cos(a-time*0.035-0.6),6.0);
      float bloom=exp(-pow((r-1.38)/0.045,2.0));
      float breaks=0.55+0.45*sin(a*37.0+r*130.0)*sin(a*19.0-r*90.0);
      float alpha=band*(0.09+light*0.18)+threads*breaks*0.6+inner*(0.6+light*0.4)+bloom*(0.12+light*0.35)+outer*0.18;
      gl_FragColor=vec4(vec3(ink),alpha*(1.0-smoothstep(1.8,1.98,r)));
    }`,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), haloMaterial)
  halo.rotation.set(1.08, -0.22, -0.33)
  scene.add(halo)
  // A faint secondary inclination gives the halo a spatial intersection.
  const arcPoints = []
  for (let i = 0; i <= 240; i++) {
    const a = (i / 240) * Math.PI * 2
    arcPoints.push(new THREE.Vector3(Math.cos(a) * 1.79, Math.sin(a) * 1.79, 0))
  }
  const arc = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(arcPoints),
    new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    })
  )
  arc.rotation.set(1.3, 0.18, 0.44)
  scene.add(arc)

  let seed = 8741
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  const starPositions = [],
    starSizes = []
  for (let i = 0; i < 2400; i++) {
    starPositions.push(
      (random() - 0.5) * 38,
      (random() - 0.5) * 22,
      -4 - random() * 10
    )
    starSizes.push(random() > 0.97 ? 2.5 : 0.7 + random() * 0.7)
  }
  const starsGeometry = new THREE.BufferGeometry()
  starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starPositions, 3)
  )
  starsGeometry.setAttribute(
    "size",
    new THREE.Float32BufferAttribute(starSizes, 1)
  )
  const starsMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      ink: { value: 1 },
      dpr: { value: renderer.getPixelRatio() },
    },
    vertexShader: `attribute float size; uniform float dpr; varying float brightness;
      void main(){brightness=size/3.0;gl_PointSize=size*dpr;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `uniform float ink; uniform float time; varying float brightness;
      void main(){float r=length(gl_PointCoord-0.5);float a=1.0-smoothstep(0.0,0.5,r);
      gl_FragColor=vec4(vec3(ink),a*(0.25+brightness*0.5)*(0.85+0.15*sin(time*0.3+gl_FragCoord.x)));}`,
    transparent: true,
    depthWrite: false,
  })
  const stars = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(stars)
  const dustPositions = []
  for (let i = 0; i < 7200; i++) {
    const a = random() * Math.PI * 2,
      r = 1.31 + Math.pow(random(), 0.7) * 0.4
    dustPositions.push(
      Math.cos(a) * r,
      Math.sin(a) * r,
      (random() - 0.5) * 0.018
    )
  }
  const dustGeometry = new THREE.BufferGeometry()
  dustGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(dustPositions, 3)
  )
  const dustMaterial = new THREE.PointsMaterial({
    size: 0.011,
    color: 0xcccccc,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
  })
  const dust = new THREE.Points(dustGeometry, dustMaterial)
  halo.add(dust)
  const environment = createUniverseEnvironment(scene, halo)

  const desktop = [
    [0.28, 0.18],
    [0.76, 0.19],
    [0.88, 0.47],
    [0.76, 0.73],
    [0.26, 0.74],
    [0.11, 0.46],
  ]
  const mobile = [
    [0.25, 0.21],
    [0.74, 0.24],
    [0.84, 0.47],
    [0.72, 0.7],
    [0.27, 0.71],
    [0.15, 0.44],
  ]
  const projected = new THREE.Vector3()
  const positionWorlds = (dt: number) => {
    const compact = width < 760,
      anchors = compact ? mobile : desktop
    const scale = height / 10
    worlds.forEach((world, i) => {
      const [x, y] = anchors[i]
      const drift = motion.matches
        ? 0
        : Math.sin(elapsed * 0.13 + i * 1.8) * Math.min(width * 0.007, 9)
      const px = x * width + drift,
        py =
          y * height + (motion.matches ? 0 : Math.cos(elapsed * 0.11 + i) * 5)
      const dx = pointer.x - px,
        dy = pointer.y - py,
        distance = Math.hypot(dx, dy)
      const magnet =
        !motion.matches && finePointer.matches && distance < 130
          ? Math.pow(1 - distance / 130, 2) * 0.22
          : 0
      const tx = dx * magnet,
        ty = dy * magnet
      // Damped spring, in pixels: identical transform for the globe and its link.
      if (motion.matches) {
        world.offset.set(0, 0)
        world.velocity.set(0, 0)
      } else {
        world.velocity.x += (tx - world.offset.x) * 90 * dt
        world.velocity.y += (ty - world.offset.y) * 90 * dt
        world.velocity.multiplyScalar(Math.exp(-14 * dt))
        world.offset.addScaledVector(world.velocity, dt)
      }
      world.radius = compact
        ? 24 + [3, 0, 4, 1, 2, 0][i]
        : Math.min(height * 0.073, 66) + [5, -4, 2, -2, 7, -5][i]
      const hover =
        world.link === document.activeElement || distance < world.radius + 14
      const target = hover ? 1 : 0
      world.material.uniforms.emphasis.value = THREE.MathUtils.damp(
        world.material.uniforms.emphasis.value,
        target,
        7,
        dt || 1
      )
      const radius =
        world.radius * (1 + world.material.uniforms.emphasis.value * 0.055)
      world.group.scale.setScalar(radius / scale)
      world.group.position.set(
        (px + world.offset.x - width / 2) / scale,
        (height / 2 - py - world.offset.y) / scale,
        0.5
      )
      world.group.getWorldPosition(projected)
      projected.project(camera)
      world.px = (projected.x * 0.5 + 0.5) * width
      world.py = (-projected.y * 0.5 + 0.5) * height
      world.link.style.left = `${world.px}px`
      world.link.style.top = `${world.py}px`
      world.link.style.setProperty("--diameter", `${radius * 2}px`)
    })
  }
  const draw = () => {
    positionWorlds(0)
    renderer.render(scene, camera)
    host.dataset.ready = "true"
  }
  const resize = () => {
    const rect = host.getBoundingClientRect()
    width = Math.max(rect.width, 1)
    height = Math.max(rect.height, 1)
    renderer.setSize(width, height)
    const aspect = width / height
    camera.left = -5 * aspect
    camera.right = 5 * aspect
    camera.updateProjectionMatrix()
    const radius =
      Math.min(width * (width < 760 ? 0.245 : 0.255), height * 0.335) /
      (height / 10)
    core.group.scale.setScalar(radius)
    core.group.position.y = 0.3
    corona.scale.setScalar(radius)
    corona.position.set(0, 0.3, -4)
    halo.scale.setScalar(radius)
    halo.position.copy(core.group.position)
    arc.scale.setScalar(radius)
    arc.position.copy(core.group.position)
    environment.resize(width, height, radius)
    draw()
  }
  const tick = (time: number) => {
    frame = 0
    if (!visible || document.hidden || lost) return
    const dt = Math.min((time - previous) / 1000, 0.033)
    previous = time
    if (!motion.matches) {
      elapsed += dt
      core.globe.rotation.y += dt * 0.012
      worlds.forEach(
        (world, i) => (world.globe.rotation.y += dt * (0.025 + i * 0.004))
      )
      haloMaterial.uniforms.time.value = elapsed
      starsMaterial.uniforms.time.value = elapsed
      dust.rotation.z = elapsed * 0.015
      const active = pointer.x > -999
      parallax.x = THREE.MathUtils.damp(
        parallax.x,
        active ? (pointer.x / width - 0.5) * 0.08 : 0,
        3,
        dt
      )
      parallax.y = THREE.MathUtils.damp(
        parallax.y,
        active ? (pointer.y / height - 0.5) * 0.05 : 0,
        3,
        dt
      )
      halo.rotation.y = -0.22 + parallax.x
      halo.rotation.x = 1.08 + parallax.y
      stars.position.set(-parallax.x * 2, parallax.y * 2, 0)
      environment.update(elapsed, parallax.x, parallax.y)
    }
    positionWorlds(dt)
    renderer.render(scene, camera)
    host.dataset.ready = "true"
    if (!motion.matches) frame = requestAnimationFrame(tick)
  }
  const resume = () => {
    cancelAnimationFrame(frame)
    previous = performance.now()
    frame = requestAnimationFrame(tick)
  }
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch") return
    const rect = host.getBoundingClientRect()
    pointer.set(event.clientX - rect.left, event.clientY - rect.top)
  }
  const leave = () => pointer.set(-10000, -10000)
  const resetMotion = () => {
    if (motion.matches) {
      leave()
      parallax.set(0, 0)
      stars.position.set(0, 0, 0)
      halo.rotation.set(1.08, -0.22, -0.33)
      environment.update(elapsed, 0, 0)
    }
    resume()
  }
  const updateTheme = () => {
    dark = document.documentElement.classList.contains("dark")
    ;[core, ...worlds].forEach(
      (world) => (world.material.uniforms.daylight.value = dark ? 0 : 1)
    )
    environment.theme(dark)
    coronaMaterial.uniforms.strength.value = dark ? 0.55 : 0.08
    haloMaterial.uniforms.ink.value = dark ? 0.95 : 0.15
    starsMaterial.uniforms.ink.value = dark ? 0.9 : 0.25
    arc.material.color.set(dark ? 0xffffff : 0x333333)
    dustMaterial.color.set(dark ? 0xdddddd : 0x444444)
    if (!lost) draw()
  }
  const contextLost = (event: Event) => {
    event.preventDefault()
    lost = true
    cancelAnimationFrame(frame)
    delete host.dataset.ready
  }
  const contextRestored = () => {
    lost = false
    resize()
    resume()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(host)
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    resume()
  })
  intersection.observe(host)
  const themeObserver = new MutationObserver(updateTheme)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  stage.addEventListener("pointermove", move)
  stage.addEventListener("pointerleave", leave)
  stage.addEventListener("focusin", resume)
  stage.addEventListener("focusout", resume)
  document.addEventListener("visibilitychange", resume)
  motion.addEventListener("change", resetMotion)
  renderer.domElement.addEventListener("webglcontextlost", contextLost)
  renderer.domElement.addEventListener("webglcontextrestored", contextRestored)
  resize()
  updateTheme()
  resume()
  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    intersection.disconnect()
    themeObserver.disconnect()
    stage.removeEventListener("pointermove", move)
    stage.removeEventListener("pointerleave", leave)
    stage.removeEventListener("focusin", resume)
    stage.removeEventListener("focusout", resume)
    document.removeEventListener("visibilitychange", resume)
    motion.removeEventListener("change", resetMotion)
    renderer.domElement.removeEventListener("webglcontextlost", contextLost)
    renderer.domElement.removeEventListener(
      "webglcontextrestored",
      contextRestored
    )
    const geometries = new Set<THREE.BufferGeometry>()
    scene.traverse((object) => {
      if (
        object instanceof THREE.Mesh ||
        object instanceof THREE.Points ||
        object instanceof THREE.Line
      ) {
        if (object instanceof THREE.InstancedMesh) object.dispose()
        geometries.add(object.geometry)
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material]
        materials.forEach((material) => material.dispose())
      }
    })
    geometries.forEach((item) => item.dispose())
    environment.dispose()
    renderer.dispose()
    renderer.domElement.remove()
    delete host.dataset.ready
    worlds.forEach(({ link }) => {
      link.style.removeProperty("left")
      link.style.removeProperty("top")
      link.style.removeProperty("--diameter")
    })
  }
}
