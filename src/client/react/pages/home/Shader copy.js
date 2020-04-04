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
        p.xz*= m(2.5);p.xy*= m(0.3) ;
        vec3 q = p*3.0+t;
        return  p.x*p.y * length(p+vec3(sin(.1)))*log(length(p)/2.) + sin(q.x+log(q.z+sin(q.y)))*0.08 - 1.  ;
    }

    

    void main(){  
      vec2 p = gl_FragCoord.xy/resolution.y - vec2(1.2,0.0) ;
      //p*=.7;
      //p.y*=.9;
      vec3 cl = vec3(0.025);
      float d = 5.5;
      for(int i=0; i<=5; i++) {
      vec3 p = vec3(2.,.1,-7.) + normalize(vec3(p, 2.0))*d ;
          float rz = map(p);
      float f =  clamp((rz - map(p+.1))*.5*cos(time*0.05)*p.x, -.1, 1. );
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
  this.uniforms['resolution'].value = new Vector2(window.innerWidth*1, window.innerHeight*1)
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
  this.time = 0
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
