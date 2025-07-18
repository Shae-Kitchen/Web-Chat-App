/* import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;

// Camera
const camera = new THREE.PerspectiveCamera(100, width / height, 0.01, 10);
camera.position.z = 1.5;

// Scene
const scene = new THREE.Scene();

let hemisphereLight: THREE.HemisphereLight;
let shadowLight: THREE.DirectionalLight;
let light2: THREE.DirectionalLight;
let light3: THREE.DirectionalLight;


// Cube
///const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
//const geometry = new THREE.IcosahedronGeometry( 3.0, 2// Replace this line:
// const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

// With this:
const geometry = new THREE.IcosahedronGeometry(0.3, 2); ;
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Animation loop
function animate(time: number) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

 */