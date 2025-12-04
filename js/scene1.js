window.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = function () {
        const scene = new BABYLON.Scene(engine);

        //For the camera movement 
        const camera = new BABYLON.ArcRotateCamera("camera",
            Math.PI / 2, Math.PI / 4, 4,
            new BABYLON.Vector3(0, 0, 0),
            scene
        );
        camera.attachControl(canvas, true);

        //lighTing for the Scenee 
        const light = new BABYLON.HemisphericLight("light",
            new BABYLON.Vector3(1, 1, 0),
            scene
        );
        light.intensity = 0.8;

        //Spheere and Box in Scene 
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1}, scene);
        sphere.position.x = -1.5;

        const box = BABYLON.MeshBuilder.CreateBox("box", {size: 1}, scene);
        box.position.x = 1.5;

        return scene;
    };

    const scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });
    
    window.addEventListener('resize', function () {
        engine.resize();
    });
});