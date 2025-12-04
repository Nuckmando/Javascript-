window.addEventListener('DOMContentLoaded', function () {

    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    function createScene() {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0.15, 0.15, 0.2);

        // for the scene camera 
        const camera = new BABYLON.ArcRotateCamera("camera",
            Math.PI / 2, Math.PI / 3, 12,
            new BABYLON.Vector3(0, 1, 0),
            scene);
        camera.attachControl(canvas, true);

        //for the scene lighting 
        const light = new BABYLON.SpotLight("spotLight",
            new BABYLON.Vector3(0, 10, 0),
            new BABYLON.Vector3(0, -1, 0),
            Math.PI / 3, 20,
            scene);
        light.intensity = 1.2;

        // ground texture 
        const ground = BABYLON.MeshBuilder.CreateGround("ground",
            { width: 12, height: 12 },
            scene);

        const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        groundMat.diffuseColor = new BABYLON.Color3(0.3, 0.5, 0.3);
        ground.material = groundMat;

        // Sphere with textire
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere",
            { diameter: 2 },
            scene);
        sphere.position.y = 1;
        sphere.position.x = -2;

        const sphereMat = new BABYLON.StandardMaterial("sphereMat", scene);
        sphereMat.diffuseTexture = new BABYLON.Texture(
            "https://playground.babylonjs.com/textures/earth.jpg",
            scene);
        sphere.material = sphereMat;

        //Box with color inbside 
        const box = BABYLON.MeshBuilder.CreateBox("box",
            { size: 2 },
            scene);
        box.position.y = 1;
        box.position.x = 2;

        const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
        boxMat.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);
        box.material = boxMat;

        //Rotation animation 
        scene.onBeforeRenderObservable.add(function () {
            box.rotation.y += 0.01;
            sphere.rotation.y += 0.005;
        });

        return scene;
    }

    const scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });

});
