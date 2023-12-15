
// Option 2: Import just the parts you need.
import { useState } from 'react';
import {
    BackSide, Fog, HemisphereLight,
    Scene, PerspectiveCamera, AmbientLight, PointLightHelper, WebGLRenderer, PointLight,
    SphereGeometry, MeshPhongMaterial, Mesh, PlaneGeometry, Color, PCFSoftShadowMap, Raycaster, Vector2, Vector3, RectAreaLight, AxesHelper
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new Scene();
const camera = new PerspectiveCamera();
scene.background = new Color(0xf6f6f6);
scene.fog = new Fog( 0xa0a0a0, 40, 100 );
const globalLight = new AmbientLight(0x8e8e8e);
scene.add(globalLight);
const light = new PointLight(0xffffff, 1, 100);
light.castShadow = true;


const hemiLight = new HemisphereLight( 0xffffff, 0xe5e5e5, 3 );
hemiLight.position.set( 0, 20, 0 );
scene.add( hemiLight );

const helper = new PointLightHelper(light, 2);
scene.add(light);
scene.add(helper);
light.intensity = 1;
light.position.set(0, 0, 1).normalize();
const renderer = new WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);
let resizeObeserver;

export let inputShapes = {
    get() {
        return this.store;
    },
    add(shape_name) {
        this.store.push(shape_name);
    },
    clear() {
        this.store = [];
    },
    store:[]
};

export let inputCoords = {
    get() {
        return this.store;
    },
    add(coord) {
        this.store.push(coord);
    },
    clear() {
        this.store = [];
    },
    store:[]
};

const Colours = {
    "A": 0x680000,
    "B": 0xA30052,
    "C": 0x533242,
    "D": 0x000082,
    "E": 0xCCCC00,
    "F": 0xF1D7E4,
    "G": 0xE5D5DD,
    "H": 0x8DFF8D,
    "I": 0xEF975C,
    "J": 0x338533,
    "K": 0xFFBD5C,
    "L": 0xBDEEFF,
    "M": 0xfff8f0,
    "N": 0xFFC0CB,
    "O": 0x7f6065,
    "P": 0xa3c4bd,
    "Q": 0xe1f0ed,
    "R": 0xdad2b6,
    "S": 0xb6ccc5,
    "T": 0x714E8E,
    "U": 0xc6b8d1,
    "V": 0x8e714e,
    "W": 0xaeae44,
    "X": 0x516649,
    "Y": 0xcd92a3,
    "Z": 0xb3de84,
}

export function initScene(canvas) {
    //const axesHelper = new AxesHelper( 5 );
    //scene.add( axesHelper );
    camera.fov = 30;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.near = 0.6;
    camera.far = 300;
    camera.position.z = 25;
    camera.position.x = -30
    camera.position.y = 14;
    camera.addEventListener('onCameraChange', (e) => {
        console.log('change');
    })
    renderer.setSize(canvas.clientWidth, canvas.clientWidth);
    resizeObeserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientWidth);
        })
    });
    resizeObeserver.observe(canvas);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxDistance = 300;

    controls.target = new Vector3(6, 3.8, 6);
    controls.maxPolarAngle = Math.PI / 2;

    function arrayCoordsFromWorldCoords(x, y, height) {
        let layer = Math.round((height - 1) / Math.sqrt(2));
        let x_index;
        let y_index;
        if (layer % 2 === 1) {
            x_index = (x - 1 - 1 * layer) / 2;
            y_index = (y - 1 - 1 * layer) / 2;
        }
        else {
            x_index = (x - 1 - 1 * layer) / 2;
            y_index = (y - 1 - 1 * layer) / 2;
        }
        return [x_index, y_index, layer];
    }

    function setInput (shape, coord) {
        if (!(inputShapes.get().includes(shape))) {
            // Add shape if not already added
            inputShapes.add(shape);
            // Add array for shape coords
            inputCoords.add(new Array(coord));
        }
        else {
            // Add coordinate
            inputCoords.get()[inputShapes.get().indexOf(shape)].push(coord);
        }                    
    }

    const raycaster = new Raycaster();
    const pointer = new Vector2();
    function onClick(event) {
        pointer.x = ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1;
        pointer.y = - ((event.clientY - canvas.offsetTop) / canvas.clientHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        let shape = document.getElementById("inputShape").value
        if (shape === "") {
            // If no input shape, abort.
            return;
        }
        const intersects = raycaster.intersectObjects(scene.children);
        for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.visible === true) {
                // Get only visibile objects
                if (intersects[i].object.name[0] === "s") {
                    // Get only sphere's
                    if (intersects[i].object.material.color.equals(new Color(0x0000ffff))) {
                        // Get only empty spheres (colour = black)
                        intersects[i].object.material.color.set(Colours[shape]);
                        let coord = arrayCoordsFromWorldCoords(intersects[i].object.position.x, intersects[i].object.position.z, intersects[i].object.position.y);
                        setInput(shape, coord);
                        console.log(inputShapes.get());
                        console.log(inputCoords.get());
                        break;
                    }
                }
            }
        }
    }

    window.addEventListener('click', onClick);

    function animate() {        
        renderer.render(scene, camera);
        controls.update();
        requestAnimationFrame(animate);
    }

    canvas.appendChild(renderer.domElement);

    // create a ground
    const meshfloor = new Mesh(
        new PlaneGeometry(100, 100, 25, 25),
        // new PlaneGeometry(130, 130, 10, 10),
        new MeshPhongMaterial({
            transparent: true,
            opacity: 1,
            depthTest: true,
            alphaTest: true,
            color: 0x0000ffff,
            emissive: 0x000000,
            specular: 0xa49d9d,
            wireframe: true,
            vertexColors:true,
            shininess: 80.9,
            side: BackSide,
            flatShading: true
        })
    )
    meshfloor.rotation.x -= Math.PI / 2;
    // The ground is also set up to receive light sources
    meshfloor.receiveShadow = true;

    // Add all created objects to the scene
    scene.add(meshfloor);
    light.position.set(37, 40, 37);

    animate();
}

function createSphere(x, y, z, color, radius, segs) {
    console.log("create sphere: radius: ", radius, " segs: ", segs)
    let mat = new MeshPhongMaterial({
        color: color,
        specular: color,
        shininess: 99,
        // specular: 0xb4a2a2,
        // flatShading: true,
    });
    mat.castShadow = true;
    mat.receiveShadow = true;
    let sphere = new Mesh(new SphereGeometry(radius, segs, segs), mat);
    sphere.position.set(x, z, y);
    sphere.castShadow = false;
    sphere.receiveShadow = false;
    sphere.name = ["s", x, y, z].join(",");
    return sphere;
}

function disposeSphere(instance) {
    scene.remove(instance);
    instance.material.dispose();
    instance.dispose();
}

export default class {
    createSphere(x, y, z, color, radius = 1, segs = 15) {
        return createSphere(x, y, z, color, radius, segs);
    }

    disposeSphere(sphere) {
        disposeSphere(sphere);
    }

    add(obj) {
        scene.add(obj);
    }

    init(dom) {
        initScene(dom);
    }

    dispose() {
        resizeObeserver.disconnect();
        // cancelAnimationFrame();
        // requestAnimationFrame shim & fallback
        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();
    }
};
