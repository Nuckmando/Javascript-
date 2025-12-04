// Scene 3 – Physics and Falling Spheres

function createScene() {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    const scene = new BABYLON.Scene(engine);

    //Camera Movement 
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 3,
        15,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    // Lighting 
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(1, 1, 0),
        scene
    );

    //Enableing Physics 
    scene.enablePhysics(
        new BABYLON.Vector3(0, -9.81, 0),
        new BABYLON.CannonJSPlugin()
    );

    //Ground 
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 10, height: 10 },
        scene
    );

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.3 },
        scene
    );

    //makeing spheres 
    for (let i = 0; i < 10; i++) {
        const sphere = BABYLON.MeshBuilder.CreateSphere(
            "sphere" + i,
            { diameter: 1 },
            scene
        );

        sphere.position = new BABYLON.Vector3(
            (Math.random() * 6) - 3,
            5 + i,
            (Math.random() * 6) - 3
        );

        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
            sphere,
            BABYLON.PhysicsImpostor.SphereImpostor,
            { mass: 1, restitution: 0.4 },
            scene
        );
    }

    //Rendering the Loop 
    engine.runRenderLoop(function () {
        scene.render();
    });

    return scene;
}

createScene();