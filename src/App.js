import { useEffect } from 'react';
import './App.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

function App() {
  useEffect(() => {
    // --------------------------------------------------------------- SCENE + CAMERA ---------------------------------------------------------------------------
    const canvas = document.getElementById('render-canvas');
    const div = document.getElementById('rectangleView');
    const scene = new THREE.Scene();
    //scene.background = new THREE.Color(0x101010);
    const camera = new THREE.PerspectiveCamera(
      50, // fov
      div.clientWidth / div.clientHeight, // ratio
      1, // near clipping plane
      1000 // far clipping plane
    );
    camera.position.set(0, 0, 69);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
    renderer.setSize(div.clientWidth, div.clientHeight);
    div.appendChild(renderer.domElement);
    // --------------------------------------------------------------------------- LIGHTS ---------------------------------------------------------------------------
    const ambientLight =  new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight)

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0,64,32);
    scene.add(spotLight)
    // --------------------------------------------------------------------------- GEOMETRY ---------------------------------------------------------------------------
    const boxGeo = new THREE.BoxGeometry(15, 15, 15);
    const boxMat = new THREE.MeshNormalMaterial(); // MeshBasicMaterial({ color: 0xffffff });
    const box = new THREE.Mesh(boxGeo, boxMat);
    scene.add(box);
    // -------------------------------------------------------------------- ORBIT/STATS/EVENTS ---------------------------------------------------------------------------
    const controls = new OrbitControls(camera, renderer.domElement)
    //const stats = Stats()
    //(div.appendChild(stats.dom)

    function onWindowResize() {
      camera.aspect = div.clientWidth / div.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(div.clientWidth, div.clientHeight);
    };
    window.addEventListener('resize', () => onWindowResize(), false);
    // --------------------------------------------------------------------------- ANIMATE ---------------------------------------------------------------------------
    const animate = () => {
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;
      //stats.update();
      controls.update();
      // ----
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------
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
