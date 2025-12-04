function createScene() {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    const scene = new BABYLON.Scene(engine);

    //Camera 
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 3,
        12,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    //Lighting 
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(1, 1, 0),
        scene
    );

    //Skybox from textures folder 
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 100 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMat", scene);

    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.disableLighting = true;

    skybox.material = skyboxMaterial;

    //Ground fomr texture folder 
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 30, height: 30 },
        scene
    );

    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseTexture = new BABYLON.Texture("textures/floor.png", scene);
    ground.material = groundMat;

    //cube from texture folder 
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.y = 0.5;

    const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
    boxMat.diffuseTexture = new BABYLON.Texture("textures/cubehouse.png", scene);
    box.material = boxMat;

    // wasd movement 
    const input = { w: false, s: false, a: false, d: false };

    window.addEventListener("keydown", function(evt) {
        if (evt.key === "w") input.w = true;
        if (evt.key === "s") input.s = true;
        if (evt.key === "a") input.a = true;
        if (evt.key === "d") input.d = true;
    });

    window.addEventListener("keyup", function(evt) {
        if (evt.key === "w") input.w = false;
        if (evt.key === "s") input.s = false;
        if (evt.key === "a") input.a = false;
        if (evt.key === "d") input.d = false;
    });

    scene.onBeforeRenderObservable.add(() => {
        if (input.w) box.position.z -= 0.05;
        if (input.s) box.position.z += 0.05;
        if (input.a) box.position.x -= 0.05;
        if (input.d) box.position.x += 0.05;
    });

    engine.runRenderLoop(() => {
        scene.render();
    });

    return scene;
}

createScene();