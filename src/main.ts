import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

window.addEventListener('DOMContentLoaded', () => {
  const WebGLApp = new WebGL()
  WebGLApp.init()
  WebGLApp.render()
})

class WebGL {
  [x: string]: any;

  static get RENDER_PARAM() {
    return {
      clearColor: 0x232120,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  static get CAMERA_PARAM() {
    return {
      fovy: 45,
      aspect: window.innerWidth / window.innerHeight,
      near: 1.0,
      far: 100.0,
      x: 10.0,
      y: 10.0,
      z: 10.0,
      lookAt: new THREE.Vector3(0, 0, 0)
    }
  }

  static get DIRECTIONAL_LIGHT() {
    return {
      color: 0xffffff,
      intensity: 1,
      x: 0.0,
      y: 10.0,
      z: 10.0,
    }
  }

  static get AMBIENT_LIGHT() {
    return {
      color: 0xffffff,
      intensity: 1
    }
  }

  constructor() {
    this.renderer
    this.scene
    this.camera
    this.controls
    this.directionalLight
    this.ambientLight
    this.box

    this.controls
    this.axesHelper

    this.render = this.render.bind(this)
  }

  init() {
    // レンダラー
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color(WebGL.RENDER_PARAM.clearColor));
    this.renderer.setSize(WebGL.RENDER_PARAM.width, WebGL.RENDER_PARAM.height);
    const wrapper = document.querySelector('.webgl')
    wrapper?.appendChild(this.renderer.domElement)

    // シーン
    this.scene = new THREE.Scene();

    // カメラ
    this.camera = new THREE.PerspectiveCamera(
      WebGL.CAMERA_PARAM.fovy,
      WebGL.CAMERA_PARAM.aspect,
      WebGL.CAMERA_PARAM.near,
      WebGL.CAMERA_PARAM.far,
    );
    this.camera.position.set(
      WebGL.CAMERA_PARAM.x,
      WebGL.CAMERA_PARAM.y,
      WebGL.CAMERA_PARAM.z,
    )
    this.camera.lookAt(WebGL.CAMERA_PARAM.lookAt)

    // ディレクショナルライト
    this.directionalLight = new THREE.DirectionalLight(
      WebGL.DIRECTIONAL_LIGHT.color,
      WebGL.DIRECTIONAL_LIGHT.intensity,
    )
    this.directionalLight.position.set(
      WebGL.DIRECTIONAL_LIGHT.x,
      WebGL.DIRECTIONAL_LIGHT.y,
      WebGL.DIRECTIONAL_LIGHT.z
    )

    this.scene.add(this.directionalLight);

    // アンビエントライト
    this.ambientLight = new THREE.AmbientLight(
      WebGL.AMBIENT_LIGHT.color,
      WebGL.AMBIENT_LIGHT.intensity,
    )

    this.scene.add(this.ambientLight);

    // box メッシュ
    const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
    const boxMaterial = new THREE.MeshStandardMaterial({color: 0x6699FF, roughness:0.5});
    this.box = new THREE.Mesh(boxGeometry, boxMaterial);

    this.scene.add(this.box);

    // コントロール
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // ヘルパー
    this.axesHelper = new THREE.AxesHelper(5)
    this.scene.add(this.axesHelper)
  }

  render() {
    requestAnimationFrame(this.render)
    // コメントを外すと回転する
    // this.box.rotation.x += 0.01
    // this.box.rotation.y += 0.01
    this.renderer.render(this.scene, this.camera);
  }
}