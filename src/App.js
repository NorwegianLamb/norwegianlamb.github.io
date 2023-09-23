import { useEffect } from 'react';
import './App.css';

import * as THREE from 'three';

function App() {
  useEffect(() => {
    const canvas = document.getElementById('render-canvas')
    const div = document.getElementById('rectangleView');
    const scene = new THREE.Scene();
    //scene.background = new THREE.Color(0x212121);
    const camera = new THREE.PerspectiveCamera(
      50, // fov
      div.innerWidth / div.innerHeight, // ratio
      1, // near clipping plane
      1000 // far clipping plane
    );
    camera.position.set(0, 10, 100);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
    renderer.setSize(div.innerWidth, div.innerHeight);
    div.appendChild(renderer.domElement);

    const ambientLight =  new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight)

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0,0,0);
    scene.add(spotLight)

    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = () => {
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="App">
      <div id="rectangleView" className='rectangle'>
        <canvas id="render-canvas"/>
      </div>
    </div>
  );
}

export default App;
