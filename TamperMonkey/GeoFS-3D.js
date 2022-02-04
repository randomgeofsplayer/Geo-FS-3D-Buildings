// ==UserScript==
// @name         Geo-FS Builidings
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  3D buildings for Geo-FS
// @author       Eco, AF267, Elon, GT
// @match http://*/geofs.php*
// @match https://*/geofs.php*
// @run-at document-end
// @version 0.2
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==
var objs;

//Get the model list
fetch('https://raw.githubusercontent.com/TotallyRealElonMusk/Geo-FS-3D-Buildings/main/TamperMonkey/CustomBuildings.json?token=GHSAT0AAAAAABQ3NN4S7KTB4ANY5A56AWDOYP5OROA')
    .then(res => res.json())
    .then(data => objs = data)
    .then(() => console.log(objs))

! function(e) {
    function spawnModel(modelJson, modelArray){
        var name = modelJson.name;
        var url = modelJson.url;
        var position = modelJson.position;
        var rotation = modelJson.rotation;
        var scale = modelJson.scale;

        //Check if all of the values are valid or if any need to be set to defaults
        if (url == null){
            console.log("Failed to Spawn, No url provided")
            return
        }
        if (position == null){
            console.log("Failed")
            return "Failed To Spawn, No position provided";
        }
        if (scale == null){
            scale = [1,1,1];
        }
        if (rotation == null){
            rotation = [0,0,0];
        }
        //Loading the model and adding it to the list of loaded models
        var model = geofs.api.loadModel(url);
        geofs.api.setModelPositionOrientationAndScale(model,position,rotation,scale);

        //Adding the model and position to a list
        const modelInfo = [,];
        modelInfo.push(model,position);
        modelArray.push(modelInfo);
        console.log("Spawned: "+name+" at: "+position);
    }
    var o = setInterval(function() {
        window.geofs && geofs.aircraft && geofs.aircraft.instance && geofs.aircraft.instance.object3d && (clearInterval(o), function() {

            //Spawning all of the buildings in the List
            const loadedModels = [ , ];
            for (var i = 0; i < objs.length; i++) {
                spawnModel(objs[i],loadedModels);
            }

        }())
    }, 100)
}();