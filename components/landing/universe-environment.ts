import * as THREE from "three"

/** Batched scenery: two spiral galaxies, asteroid belts, and optical light blooms. */
export function createUniverseEnvironment(
  scene: THREE.Scene,
  halo: THREE.Mesh
) {
  let seed = 2026
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  const key = new THREE.DirectionalLight(0xffffff, 4)
  key.position.set(5, 6, 2)
  scene.add(key, new THREE.HemisphereLight(0xc4c4c4, 0x151515, 0.45))

  const galaxyMaterial = new THREE.ShaderMaterial({
    uniforms: { ink: { value: 0.9 }, strength: { value: 0.7 } },
    vertexShader: `varying vec2 p; void main(){p=uv*2.0-1.0;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `varying vec2 p; uniform float ink; uniform float strength;
      float hash(vec2 v){return fract(sin(dot(v,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 v){vec2 i=floor(v),f=fract(v);f=f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
      void main(){
        vec2 q=vec2(p.x,p.y*1.9);float r=length(q);float a=atan(q.y,q.x);
        float grain=noise(q*45.0)*0.5+noise(q*110.0)*0.3+noise(q*240.0)*0.2;
        float swirl=a*3.0+log(r+0.06)*8.0+grain*1.3;
        float arms=pow(0.5+0.5*sin(swirl),9.0);
        float haze=exp(-r*3.4)*(0.1+arms*grain*1.6);
        float nucleus=exp(-r*r*430.0)*0.95+exp(-r*r*55.0)*0.22;
        float edge=1.0-smoothstep(0.65,1.0,r);
        gl_FragColor=vec4(vec3(ink),(haze+nucleus)*edge*strength);
      }`,
    transparent: true,
    depthWrite: false,
  })
  const galaxyGeometry = new THREE.PlaneGeometry(2, 2)
  const galaxies = [
    new THREE.Mesh(galaxyGeometry, galaxyMaterial),
    new THREE.Mesh(galaxyGeometry, galaxyMaterial),
  ]
  galaxies.forEach((galaxy) => scene.add(galaxy))
  galaxies[0].rotation.z = -0.3
  galaxies[1].rotation.z = -0.48

  const rockGeometry = new THREE.SphereGeometry(1, 20, 14)
  const positions = rockGeometry.getAttribute("position")
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i),
      y = positions.getY(i),
      z = positions.getZ(i)
    const roughness =
      0.9 +
      0.12 * Math.sin(x * 4 + y * 3 + z * 7) +
      0.045 * Math.sin(x * 19 + y * 13 + z * 23)
    positions.setXYZ(i, x * roughness, y * roughness, z * roughness)
  }
  rockGeometry.computeVertexNormals()
  const rockMaterial = new THREE.MeshStandardMaterial({
    color: 0x383838,
    roughness: 0.98,
    metalness: 0.05,
    flatShading: false,
  })
  const rocks = new THREE.InstancedMesh(rockGeometry, rockMaterial, 240)
  const dummy = new THREE.Object3D()
  for (let i = 0; i < rocks.count; i++) {
    const angle = random() * Math.PI * 2,
      radius = 1.32 + random() * 0.4
    dummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      (random() - 0.5) * 0.08
    )
    dummy.rotation.set(random() * 6, random() * 6, random() * 6)
    const size = 0.004 + Math.pow(random(), 5) * 0.034
    dummy.scale.set(size, size * (0.65 + random() * 0.6), size)
    dummy.updateMatrix()
    rocks.setMatrixAt(i, dummy.matrix)
  }
  halo.add(rocks)

  const foreground = new THREE.InstancedMesh(rockGeometry, rockMaterial, 38)
  const foregroundSeeds = Array.from({ length: foreground.count }, () => [
    random(),
    random(),
    random(),
    random(),
  ])
  scene.add(foreground)

  // A small generated radial texture keeps glints soft without a full-screen bloom pass.
  const size = 64,
    pixels = new Uint8Array(size * size * 4)
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const dx = (x + 0.5 - size / 2) / (size / 2),
        dy = (y + 0.5 - size / 2) / (size / 2),
        r = Math.hypot(dx, dy)
      const glow = Math.exp(-r * r * 25) * 0.55 + Math.exp(-r * r * 180) * 0.45
      const index = (y * size + x) * 4
      pixels[index] = pixels[index + 1] = pixels[index + 2] = 255
      pixels[index + 3] = Math.round(glow * Math.max(0, 1 - r) * 255)
    }
  const glintTexture = new THREE.DataTexture(
    pixels,
    size,
    size,
    THREE.RGBAFormat
  )
  glintTexture.needsUpdate = true
  const glintMaterial = new THREE.SpriteMaterial({
    map: glintTexture,
    color: 0xffffff,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    opacity: 0.9,
  })
  const sun = new THREE.Sprite(glintMaterial)
  scene.add(sun)
  const glints = Array.from({ length: 9 }, (_, i) => {
    const sprite = new THREE.Sprite(glintMaterial)
    sprite.position.set(
      Math.cos(i * 0.71) * 1.43,
      Math.sin(i * 0.71) * 1.43,
      0.04
    )
    sprite.scale.setScalar(i % 3 === 0 ? 0.32 : 0.16)
    halo.add(sprite)
    return sprite
  })
  let coreRadius = 1
  return {
    resize(width: number, height: number, radius: number) {
      coreRadius = radius
      const aspect = width / height,
        compact = width < 760
      galaxies[0].position.set(aspect * 4.3, 3.35, -9)
      galaxies[1].position.set(-aspect * 4.2, -2.5, -9)
      galaxies[0].scale.setScalar(compact ? 1.6 : 2.5)
      galaxies[1].scale.setScalar(compact ? 1.8 : 2.8)
      sun.position.set(radius * 0.69, 0.3 + radius * 0.72, radius * 0.12)
      sun.scale.setScalar(radius * 0.9)
      foreground.visible = !compact
      foregroundSeeds.forEach(([a, b, c, d], i) => {
        const side = i % 2 === 0 ? -1 : 1
        dummy.position.set(
          side * (aspect * 3.8 + a * aspect * 1.5),
          -4.35 - b * 1.35,
          3 + c * 2
        )
        dummy.rotation.set(a * 6, b * 6, c * 6)
        dummy.scale.setScalar(0.08 + d * d * 0.42)
        dummy.updateMatrix()
        foreground.setMatrixAt(i, dummy.matrix)
      })
      foreground.instanceMatrix.needsUpdate = true
    },
    theme(dark: boolean) {
      galaxyMaterial.uniforms.ink.value = dark ? 0.88 : 0.12
      galaxyMaterial.uniforms.strength.value = dark ? 0.92 : 0.36
      glintMaterial.opacity = dark ? 0.9 : 0.36
      glintMaterial.color.set(dark ? 0xffffff : 0x555555)
      rockMaterial.color.set(dark ? 0x383838 : 0x626262)
    },
    update(time: number, px: number, py: number) {
      rocks.rotation.z = time * 0.007
      foreground.position.set(-px * 2, py * 2, 0)
      sun.scale.setScalar(coreRadius * (0.9 + Math.sin(time * 0.25) * 0.025))
      glints.forEach((glint, i) =>
        glint.scale.setScalar(
          (i % 3 === 0 ? 0.32 : 0.16) * (1 + Math.sin(time * 0.4 + i) * 0.08)
        )
      )
    },
    dispose() {
      glintTexture.dispose()
      glintMaterial.dispose()
    },
  }
}
