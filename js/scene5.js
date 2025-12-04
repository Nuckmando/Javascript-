window.addEventListener("DOMContentLoaded", function () {

    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

   // first scene forest 
    function createSceneA() {
        var scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.ArcRotateCamera("camA",
            Math.PI / 2, Math.PI / 3, 12,
            new BABYLON.Vector3(0, 1, 0), scene);
        camera.attachControl(canvas, true);

        var light = new BABYLON.HemisphericLight("lightA",
            new BABYLON.Vector3(1, 1, 0), scene);

        //the ground
        var ground = BABYLON.MeshBuilder.CreateGround("groundA",
            { width: 20, height: 20 }, scene);
        var gMat = new BABYLON.StandardMaterial("gMatA", scene);
        gMat.diffuseTexture = new BABYLON.Texture("textures/floor.png", scene);
        ground.material = gMat;

        // object like tree 
        var trunk = BABYLON.MeshBuilder.CreateCylinder("trunk",
            { height: 2, diameter: 0.4 }, scene);
        trunk.position.y = 1;
        var tMat = new BABYLON.StandardMaterial("tMat", scene);
        tMat.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0);
        trunk.material = tMat;

        var leaves = BABYLON.MeshBuilder.CreateSphere("leaves",
            { diameter: 2 }, scene);
        leaves.position.y = 2.5;
        var lMat = new BABYLON.StandardMaterial("lMat", scene);
        lMat.diffuseColor = new BABYLON.Color3(0, 0.5, 0);
        leaves.material = lMat;

        return scene;
    }

    // second scene 
    function createSceneB() {
        var scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.ArcRotateCamera("camB",
            Math.PI / 2, Math.PI / 3, 12,
            new BABYLON.Vector3(0, 1, 0), scene);
        camera.attachControl(canvas, true);

        var light = new BABYLON.PointLight("lightB",
            new BABYLON.Vector3(0, 5, 0), scene);
        light.diffuse = new BABYLON.Color3(1, 0.3, 0);

        //colored ground 
        var ground = BABYLON.MeshBuilder.CreateGround("groundB",
            { width: 20, height: 20 }, scene);
        var lavaMat = new BABYLON.StandardMaterial("lavaMat", scene);
        lavaMat.diffuseColor = new BABYLON.Color3(1, 0.2, 0);
        lavaMat.emissiveColor = new BABYLON.Color3(1, 0.2, 0);
        ground.material = lavaMat;

        //rock object 
        var rock = BABYLON.MeshBuilder.CreateSphere("rock",
            { diameter: 3 }, scene);
        rock.position.y = 1.5;
        var rockMat = new BABYLON.StandardMaterial("rockMat", scene);
        rockMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        rock.material = rockMat;

        return scene;
    }

   
    var sceneA = createSceneA();
    var sceneB = createSceneB();

    var currentScene = sceneA;

   //switch buttons 
    var ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, sceneA);

    var switchBtn = BABYLON.GUI.Button.CreateSimpleButton("switch", "Switch Scene");
    switchBtn.width = "160px";
    switchBtn.height = "50px";
    switchBtn.color = "white";
    switchBtn.background = "black";
    switchBtn.top = "20px";
    ui.addControl(switchBtn);

    switchBtn.onPointerUpObservable.add(() => {
        if (currentScene === sceneA) {
            currentScene = sceneB;
        } else {
            currentScene = sceneA;
        }
    });

    
    engine.runRenderLoop(function () {
        currentScene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
    });

});