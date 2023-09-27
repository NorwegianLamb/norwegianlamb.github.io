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
    camera.position.set(0, 1.5, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
    renderer.setSize(div.clientWidth, div.clientHeight);
    renderer.shadowMap.enabled = true;  
    div.appendChild(renderer.domElement);
    // --------------------------------------------------------------------------- LIGHTS ---------------------------------------------------------------------------
    const ambientLight =  new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    //scene.add(ambientLight)

    const spotLight = new THREE.SpotLight(0xffffff, 10);
    spotLight.castShadow = true;
    spotLight.position.set(0,6.5,4); // X (DESTRA/SINISTRA), Y (SOPRA/SOTTO), Z (AVANTI/DIETRO)
    scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    scene.add( spotLightHelper );
    // --------------------------------------------------------------------------- GEOMETRY ---------------------------------------------------------------------------
    const planeGeometry = new THREE.PlaneGeometry(7, 7);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // , wireframe: true 
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(0, 0, 0);
    plane.receiveShadow = true;
    scene.add(plane);

    const wallGeometry = new THREE.BoxGeometry(0.25,3,7);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.set(-3.5, 1.5, 0);
    wall1.receiveShadow = true;
    scene.add(wall1);

    const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall2.position.set(+3.5, 1.5, 0);
    wall2.receiveShadow = true;
    scene.add(wall2);

    const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall3.position.set(0, 1.5, -3.5);
    wall3.rotation.y = Math.PI / 2;
    wall3.receiveShadow = true;
    scene.add(wall3);

    const boxGeometry = new THREE.BoxGeometry(1,1,1);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(0,0.5,0);
    box.receiveShadow = true;
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
      <nav>
      </nav>

      <main>
        <div id="rectangleView" className='rectangle'>
          <canvas id="render-canvas"/>
        </div>

        <div className='testingFlex'>
          <h1 className='dot-animation'></h1>
        </div>
      </main>

      <footer>
      </footer>
    </div>
  );
}

export default App;
