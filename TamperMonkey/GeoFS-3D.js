// ==/UserScript==
var objs;

//Get the model list
fetch('https://140444485-548498493367222598.preview.editmysite.com/uploads/1/4/0/4/140444485/custom_b_v2.json')
    .then(res => res.json())
    .then(data => objs = data)

! function(e) {
    //Spawning Function
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
        const modelInfo = [];
        modelInfo.push(model,position);
        modelArray.push(modelInfo);
        console.log("Spawned: "+name);
    }
    //Deleting Function
    function deleteModel(modelArray, index){
        var modelToDelete = modelArray[index];
        geofs.api.destroyModel(modelToDelete[0]);
        modelArray.pop(modelToDelete);
    }
    var o = setInterval(function() {
        window.geofs && geofs.aircraft && geofs.aircraft.instance && geofs.aircraft.instance.object3d && (clearInterval(o), function() {
            //Spawning all of the buildings in the List
            const loadedModels = [];
            for (var i = 0; i < objs.length; i++) {
                spawnModel(objs[i],loadedModels);
            }
            console.log(loadedModels);
        }())
    }, 100)
}();