import { Component } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

class App extends Component{
	componentDidMount() {
		let scene = new THREE.Scene();
		altidudecol =  new THREE.Color( 0, 0, 0 );
		scene.background = altidudecol
		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		let curraltitude = 0
		let renderer = renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		this.mount.appendChild( renderer.domElement );
		let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var clock = new THREE.Clock();
		camera.position.set(0,5,15);

		let loader = new STLLoader();
		let mesh;
		loader.load(
				'/cansat.stl',

				function (geometry) {
						geometry.scale(0.1,0.1,0.1)
						mesh = new THREE.Mesh(geometry, material)
						scene.add(mesh);

				},
				(xhr) => {
						console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
				},
				(error) => {
						console.log(error);
				}
		)

		let curpos = [0, 0, 0]
		let index = 0
		let change = 0
		function linearise(delta, curpos, axis, rotation){
			if(length(rotation) >= index) {
				diff = (rotation[index] - curpos[axis])*(Math.PI/180)
				change += (diff-change)*delta
				if(diff < 0.01) {
					index += 1
					change = 0 
					return 0
				}
				return diff-change
			}
			else {
				return 0 
			}
		}



		function animate() {
				requestAnimationFrame( animate );
				delta = clock.getDelta();
				if(mesh) {
					mesh.rotation.x = linearise(delta, curpos, 0, rotation)
					mesh.rotation.y = linearise(delta, curpos, 1, rotation)
					mesh.rotation.z = linearise(delta, curpos, 2, rotation)
				}
				if(curraltitude != altidude) {
					altidudecol = (0, 0, 500/altidude)
					scene.background = altidudecol
					curraltitude = altidude  
				}

				renderer.render( scene, camera );
		};

		animate();
	}

	render() {
		return (
			<div>
				 <div ref={ref => (this.mount = ref)} />
			</div>
		);
	}
}

export default App;
