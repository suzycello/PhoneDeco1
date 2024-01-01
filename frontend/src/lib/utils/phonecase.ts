import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ColladaLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
export type PositionType = {
  x: number;
  y: number;
  z: number;
};

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
const mixers: any = [];
let controls: OrbitControls;
let stickerMesh: THREE.Mesh;
const clock = new THREE.Clock();

let mesh: THREE.Object3D;


export function loadAndTransformModel(id: number) {
   const loader = new GLTFLoader();

   loader.load('PhoneCase.glb', function (gltf) { // phone case 불러오기
      let mesh = gltf.scene.children[id];
      console.log(gltf);
      console.log(gltf.scene.children[id]);
      const s = 65;
      mesh.scale.set(s - 2, s, s);

      // @ts-expect-error
      mesh.material.emissive = new THREE.Color().setRGB(255, 255, 255);
      mesh.position.set(-0.5, -1.3, 0);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);
   });
   return true;
   // scene.add(new THREE.Mesh(new THREE.PlaneGeometry(100, 100))) // plane
}

function init(id: any) {
   const container = document.getElementsByClassName('canvas')[0];

   camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
   camera.position.set(0, 0, 250);

   scene = new THREE.Scene();
   // scene.background = new THREE.Color().setHSL(0.6, 0, 1);
   scene.background = new THREE.Color('#fcedf3');
   scene.fog = new THREE.Fog(scene.background, 1, 5000);

   // LIGHTS

   //

   const dirLight = new THREE.DirectionalLight(0xffffff, 1);
   dirLight.color.setHSL(0.1, 1, 0.95);
   dirLight.position.set(0, 0, 1); // 빛의 위치를 화면 위쪽, 사용자 쪽으로 설정
   const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
   hemiLight.color.setHSL(0.6, 1, 0.6);
   hemiLight.groundColor.setHSL(0.095, 1, 0.75);
   hemiLight.position.set(0, 50, 0);
   scene.add(hemiLight);
   scene.add(dirLight);

   dirLight.castShadow = false;

   dirLight.shadow.mapSize.width = 2048;
   dirLight.shadow.mapSize.height = 2048;

   const d = 50;

   dirLight.shadow.camera.left = -d;
   dirLight.shadow.camera.right = d;
   dirLight.shadow.camera.top = d;
   dirLight.shadow.camera.bottom = -d;

   dirLight.shadow.camera.far = 3500;
   dirLight.shadow.bias = -0.0001;

   const loader = new GLTFLoader();

   loader.load('PhoneCase.glb', function (gltf) {
      mesh = gltf.scene.children[0] as THREE.Object3D;
      // mesh.position.set(new THREE.Vector3(1,1,1)) //phone 위치??

      const s = 65;
      mesh.scale.set(s, s, s);

      // mesh.castShadow = false;
      // mesh.receiveShadow = false;
      mesh.position.set(0, 0, 0);
      mesh.rotation.set(Math.PI, 0, 0);
      scene.add(mesh); //phone 불러오기
      console.log(gltf);
      console.log(gltf.scene.children[0]);
   });

   // RENDERER

   renderer = new THREE.WebGLRenderer({ antialias: true });
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.domElement.id = 'canvas';
   container?.appendChild(renderer.domElement);
   renderer.shadowMap.enabled = false;

   // STATS

   controls = new OrbitControls(camera, renderer.domElement);
   // controls.enableZoom = false;
   // controls.enablePan = false;
   controls.rotateSpeed = 0.5;
   controls.enableDamping = true;

   // COLOR

   window.addEventListener('resize', onWindowResize);
}


function onWindowResize() {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();

   renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
   requestAnimationFrame(animate);

   controls.update();
   render();
   // mesh.rotation.z += 0.001;
}

function render() {
   renderer.render(scene, camera);
}

export function phonecase(id: any) {
   init(id);
   animate();
}

export function clearContext() {
   renderer.dispose();
}

export function showcase(color:string) {
   const loader = new GLTFLoader();

   loader.load('PhoneCase.glb', function (gltf) { // phone case 불러오기
      let mesh = gltf.scene.children[3];
      console.log(gltf);
      console.log(gltf.scene.children[3]);
      const s = 65;
      mesh.scale.set(s - 2, s, s);

      // @ts-expect-error
      mesh.material.emissive = new THREE.Color().setColorName(color);
      mesh.position.set(-0.5, -1.3, 0);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);
      
   });
}
export function changeColor(color: string) {
   scene.traverse((obj) => {
      if (obj.name == 'Casewhite') {
         console.log(color)
         // @ts-expect-error
         obj.material.emissive = new THREE.Color().setColorName(color);
      }
   });
}


export function putStickers(decorate: string) {
   scene.remove(stickerMesh)
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(decorate);

    const geometry = new THREE.PlaneGeometry(1, 1); // 평면 geometry
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });

    stickerMesh = new THREE.Mesh(geometry, material);

    // 크기 및 위치 조절
    const s = 30;
    stickerMesh.scale.set(s, s, 1);
    stickerMesh.position.set(0, -3, 2);

    scene.add(stickerMesh);
}