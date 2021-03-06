import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./glsl/vertex.glsl";
import fragmentShader from "./glsl/fragment.glsl";
import img from "../assets/mannequin.webp";
import img2 from "../assets/mannequin2.jpg";

class Gl {
  constructor() {
    this.scene = new THREE.Scene();

    this.aspectRatio = window.innerWidth / window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      2
    );

    // this.cameraHelper = new THREE.CameraHelper(this.camera);
    // this.scene.add(this.cameraHelper);

    this.camera.position.z = 0.42;
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#app"),
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x1b1118, 1);

    this.clock = new THREE.Clock();

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.onResize();
  }

  init() {
    this.createMesh();
    this.addEvents();
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(0.4, 0.6, 32, 32);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(img) }
      },
      // wireframe: true,
      side: THREE.DoubleSide
    });

    console.log(this.material.uniforms.uTexture.value);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
    this.mesh.position.x = 0.2;
    if (screen.width <= 699) {
      this.mesh.position.x = 0;
    }
  }

  addEvents() {
    window.requestAnimationFrame(this.run.bind(this));
    window.addEventListener("resize", this.onResize.bind(this), false);
    window.addEventListener("click", onBtnCLick);
  }


  run() {
    requestAnimationFrame(this.run.bind(this));
    this.render();
  }
  

  render() {
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(w, h);
  }
}

export default Gl;
