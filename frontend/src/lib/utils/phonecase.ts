import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ColladaLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

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
	scene.background = new THREE.Color('#dddddd');
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

	// const amLight = new THREE.AmbientLight('#ffffff', 2);
	// scene.add(amLight);

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

	// if (id !== 0) {
	// 	console.log('is not 0');
	// 	loader.load('PhoneCase.glb', function (gltf) {
	// 		mesh = gltf.scene.children[id];
	// 		console.log(gltf);
	// 		console.log(gltf.scene.children[id]);
	// 		const s = 65;
	// 		mesh.scale.set(s - 2, s, s);
	// 		// @ts-expect-error
	// 		mesh.material.emissive = new THREE.Color().setRGB(255, 255, 255);
	// 		// mesh.castShadow = false;
	// 		// mesh.receiveShadow = true;
	// 		mesh.position.set(-0.5, -1.3, 0);
	// 		mesh.rotation.x = -Math.PI / 2;
	// 		scene.add(mesh);
	// 	});
	// }

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

	//
	// const blocker = document.getElementById('blocker') as HTMLElement;
	// controls.addEventListener('start', function () {
	// 	blocker.style.display = '';
	// });
	// controls.addEventListener('end', function () {
	// 	blocker.style.display = 'none';
	// });

	//

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

// export function putStickers(decorate: string){
// 	scene.traverse((obj) => {
// 		// if (obj.name == 'Casewhite') {
// 		if (obj.type === "Mesh" && obj.name == 'Casewhite') {
// 			// console.log(obj)
// 			// @ts-expect-error
// 			obj.material.map = new THREE.TextureLoader().load(decorate)
// 		}
// 	});
// }
// export function putStickers(decorate) {
//     const textureLoader = new THREE.TextureLoader();
//     const texture = textureLoader.load(decorate, (tex) => {
//         // 텍스처 설정: 반복, 오프셋 등
//         tex.wrapS = THREE.RepeatWrapping;
//         tex.wrapT = THREE.RepeatWrapping;
//         tex.repeat.set(1, 1); // 텍스처 반복 횟수 조정
//         // tex.offset.set(0, 0); // 텍스처 위치 조정
// 		texture.offset.x = -4;
// 		tex.rotation = -Math.PI / 2; // 텍스처를 45도 회전
//     });

//     scene.traverse((obj) => {
//         if (obj.type === "Mesh" && obj.name === 'Casewhite') {
//             // 메쉬에 텍스처 적용
// 			// @ts-expect-error
//             obj.material.color.set(0xffffff);
//             // @ts-expect-error
//             obj.material.map = texture;

//             // 필요한 경우 메쉬의 다른 속성(예: roughness, metalness)도 조정할 수 있습니다.
//             // @ts-expect-error
//             obj.material.roughness = 1.0;
//             // @ts-expect-error
//             obj.material.metalness = 0.0;

//             // 메쉬의 물질을 업데이트
//             // @ts-expect-error
//             obj.material.needsUpdate = true;
//         }
//     });
// }

// export function putStickers(decorate:string) {
//     const textureLoader = new THREE.TextureLoader();
//     // const texture = textureLoader.load(decorate);
// 	const texture = textureLoader.load(decorate, (tex) => {
// 		        // 텍스처 설정: 반복, 오프셋 등
// 		        tex.wrapS = THREE.RepeatWrapping;
// 		        tex.wrapT = THREE.RepeatWrapping;
// 		        tex.repeat.set(1, 1); // 텍스처 반복 횟수 조정
// 		        tex.offset.set(-5, 0); // 텍스처 위치 조정
// 				tex.rotation = -Math.PI / 2; // 텍스처를 90도 회전
// 			});
//     scene.traverse((obj) => {
//         if (obj.type === "Mesh" && obj.name === 'Casewhite') {
//             // 새 재질 생성
//             const newMaterial = new THREE.MeshStandardMaterial({
//                 map: texture, // 텍스처 설정
//                 roughness: 1.0, // 거칠기
//                 metalness: 0.0 // 금속성
// 				transparent: true // 투명도 활성화 (중요)
//             });

//             // @ts-expect-error
//             obj.material = newMaterial; // 기존 재질을 새 재질로 대체
//         }
//     });
// }

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

// export function putStickers(decorate:string) {
//     const textureLoader = new THREE.TextureLoader();
//     const texture = textureLoader.load(decorate);

//     scene.traverse((obj) => {
//         if (obj.type === "Mesh" && obj.name === 'Casewhite') {
//             // 기존 메쉬의 색상을 저장
//             const originalColor = new THREE.Color();
//             // @ts-expect-error
//             originalColor.copy(obj.material.color);

//             // 새 재질 생성
//             const newMaterial = new THREE.MeshStandardMaterial({
//                 map: texture, // 텍스처 설정
//                 roughness: 1.0,
//                 metalness: 0.0,
//                 transparent: true, // 투명도 활성화
//                 alphaTest: 0.5 // 텍스처의 투명 부분 제거 (0.5는 임계값으로, 필요에 따라 조정 가능)
//             });

//             // @ts-expect-error
//             obj.material = newMaterial;

//             // 텍스처가 없는 부분에 원래 색상 적용
//             obj.material.onBeforeCompile = (shader:any) => {
//                 shader.fragmentShader = shader.fragmentShader.replace(
//                     'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
//                     `
//                     if ( diffuseColor.a < 0.5 ) {
//                         gl_FragColor = vec4( ${originalColor.r}, ${originalColor.g}, ${originalColor.b}, 1.0 );
//                     } else {
//                         gl_FragColor = vec4( outgoingLight, diffuseColor.a );
//                     }
//                     `
//                 );
//             };

//             // 메쉬의 물질 업데이트
//             // @ts-expect-error
//             obj.material.needsUpdate = true;
//         }
//     });
// }

// export function putStickers(decorate) {
//     const textureLoader = new THREE.TextureLoader();
//     const texture = textureLoader.load(decorate, (tex) => {
//         // 텍스처 설정: 반복, 오프셋 등
//         tex.wrapS = THREE.RepeatWrapping;
//         tex.wrapT = THREE.RepeatWrapping;
//         tex.repeat.set(15, 25); // 텍스처 크기 조정
//         tex.offset.set(0, 0); // 텍스처 위치 조정
//         tex.rotation = -Math.PI / 2; // 텍스처를 90도 회전
//     });

//     scene.traverse((obj) => {
//         if (obj.name === 'Casewhite') {
//             // 기존 메쉬의 색상을 저장
//             const originalColor = new THREE.Color();
//             // @ts-expect-error
//             originalColor.copy(obj.material.color);

//             // 새 재질 생성
//             const newMaterial = new THREE.MeshStandardMaterial({
//                 map: texture, // 텍스처 설정
//                 roughness: 1.0,
//                 metalness: 0.0,
//                 transparent: true, // 투명도 활성화
//                 alphaTest: 0.5 // 텍스처의 투명 부분 제거
//             });

//             // @ts-expect-error
//             obj.material = newMaterial;

//             // 텍스처가 없는 부분에 원래 색상 적용
//             obj.material.onBeforeCompile = (shader) => {
//                 shader.fragmentShader = shader.fragmentShader.replace(
//                     'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
//                     `
//                     if ( diffuseColor.a < 0.5 ) {
//                         gl_FragColor = vec4( ${originalColor.r}, ${originalColor.g}, ${originalColor.b}, 1.0 );
//                     } else {
//                         gl_FragColor = vec4( outgoingLight, diffuseColor.a );
//                     }
//                     `
//                 );
//             };

//             // 메쉬의 물질 업데이트
//             // @ts-expect-error
//             obj.material.needsUpdate = true;
//         }
//     });
// }
