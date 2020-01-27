var material;
var scene;
var mesh;
var banana;
var view = document.getElementById("stlviewer");

function STLViewerEnable(classname) {
    var models = document.getElementsByClassName(classname);
    for (var i = 0; i < models.length; i++) {
        STLViewer(models[i], models[i].getAttribute("data-src"));
    }
}

function STLViewer(elem, model) {

    if (!WEBGL.isWebGLAvailable()) {
        elem.appendChild(WEBGL.getWebGLErrorMessage());
        return;
    }

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    var camera = new THREE.PerspectiveCamera(70, elem.clientWidth / elem.clientHeight, 1, 1000);
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    elem.appendChild(renderer.domElement);

    window.addEventListener('resize', function () {
        renderer.setSize(elem.clientWidth, elem.clientHeight);
        camera.aspect = elem.clientWidth / elem.clientHeight;
        camera.updateProjectionMatrix();
    }, false);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.05;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = .75;

    scene = new THREE.Scene();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x080820, 1.5));

    (new THREE.STLLoader()).load(model, function (geometry) {
        material = new THREE.MeshPhongMaterial({ color: 0x00003C, specular: 100, shininess: 100 });
        
		mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Compute the middle
        var middle = new THREE.Vector3();
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(middle);

        // Center it
		mesh.rotation.set( - Math.PI / 2, 0, 0 );
        mesh.position.x = -1 * middle.x;
        mesh.position.y = -1 * middle.y;
        mesh.position.z = -1 * middle.z;

        // Pull the camera away as needed
        var largestDimension = Math.max(geometry.boundingBox.max.x,
            geometry.boundingBox.max.y, geometry.boundingBox.max.z)
        camera.position.z = largestDimension * 2;
		banana = geometry;

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }; animate();

    });
}

function resetMesh(){
	scene.remove(mesh);
	mesh = new THREE.Mesh(banana, material);

	// Compute the middle
	var middle = new THREE.Vector3();
	banana.computeBoundingBox();
	banana.boundingBox.getCenter(middle);

	// Center it
	mesh.rotation.set( - Math.PI / 2, 0, 0 );
	mesh.position.x = -1 * middle.x;
	mesh.position.y = -1 * middle.y;
	mesh.position.z = -1 * middle.z;
	scene.add(mesh);
}
window.addEventListener("load", function () {
var openFile = function (file) {
	var reader = new FileReader();
	reader.addEventListener("load", function (ev) {
		var buffer = ev.target.result;
		banana = loadStl(buffer);
		resetMesh();
	}, false);
	reader.readAsArrayBuffer(file);
};

// file input button
var input = document.getElementById("file");
input.addEventListener("change", function (ev) {
	var file = ev.target.files[0];
	openFile(file);
}, false);


view.addEventListener("dragover", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	ev.dataTransfer.dropEffect = "copy";
}, false);
view.addEventListener("drop", function (ev) {
	ev.stopPropagation();
	ev.preventDefault();
	var file = ev.dataTransfer.files[0];
	openFile(file);
}, false);

}, false);

