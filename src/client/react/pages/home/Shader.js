import { Mesh, OrthographicCamera,PerspectiveCamera,  PlaneBufferGeometry, Scene, ShaderMaterial, UniformsUtils, Vector2 } from 'three'
import { Pass } from '../../../../three/examples/jsm/postprocessing/Pass'

var WaterShader = {
  uniforms: {
    byp: { value: 0 }, //apply the glitch ?
    texture: { type: 't', value: null },
    time: { type: 'f', value: 0.0 },
    factor: { type: 'f', value: 0.0 },
    resolution: { type: 'v2', value: null }
  },

  vertexShader: `varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }`,

  fragmentShader: `
    uniform float time;
    uniform vec2 resolution;

    #define t time
    mat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}
    float map(vec3 p){
      p.xz*= m(2.5);p.xy*= m(.3) ;
      vec3 q = p*3.+t;
      return  p.x*p.y * length(p+vec3(sin(.1)))*log(length(p)) + sin(q.x+sin(q.z+sin(q.y)))*0.04 + 0.2  ;
    }


    void main(){  
      vec2 p = gl_FragCoord.xy/resolution.y/2.18 - vec2(0.55,-0.15) ;
    //p*=.7;
    //p.y*=.9;
    vec3 cl = vec3(0.025);
    float d = 5.5;
    for(int i=0; i<=5; i++) {
    vec3 p = vec3(1.,0.0,-7.) + normalize(vec3(p, 2.0))*d ;
        float rz = map(p);
    float f =  clamp((rz - map(p+.1))*0.5*cos(time*.1)*p.x, -.1, 1. );
        vec3 l = vec3(.6,0.1,.2) - vec3(2., 1.5, 2.)*f;
        cl = cl*l + (1.-smoothstep(0., 2.5, rz))*.7*l;
    d += min(rz, 1.0 );
  }
    gl_FragColor = vec4(cl, 1.) * .4;
}`
  }

var WaterPass = function(dt_size) {
  Pass.call(this)
  if (WaterShader === undefined) console.error('THREE.WaterPass relies on THREE.WaterShader')
  var shader = WaterShader
  this.uniforms = UniformsUtils.clone(shader.uniforms)
  if (dt_size === undefined) dt_size = 64

  let width
  if (window.innerWidth <= 800) {
    width = window.innerWidth/20
  } else {
    width = window.innerWidth
  }
  this.uniforms['resolution'].value = new Vector2(width, window.innerHeight*1)
  this.material = new ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  })
  this.camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000000 );
  this.camera.position.z = 1;
  this.scene = new Scene()
  this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null)
  this.quad.frustumCulled = false // Avoid getting clipped
  this.scene.add(this.quad)
  this.factor = 0
  this.time = 2275
}

WaterPass.prototype = Object.assign(Object.create(Pass.prototype), {
  constructor: WaterPass,

  render: function(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    const factor = Math.max(0, this.factor)
    this.uniforms['byp'].value = factor ? 0 : 1
    this.uniforms['texture'].value = readBuffer.texture
    this.uniforms['time'].value = this.time
    this.uniforms['factor'].value = this.factor
    this.time += 0.05
    this.quad.material = this.material
    if (this.renderToScreen) {
      renderer.setRenderTarget(null)
      renderer.render(this.scene, this.camera)
    } else {
      renderer.setRenderTarget(writeBuffer)
      if (this.clear) renderer.clear()
      renderer.render(this.scene, this.camera)
    }
  }
})

export { WaterPass }
