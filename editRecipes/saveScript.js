var dataURL = "https://script.google.com/macros/s/AKfycbwYZZAn20GTy32-2j0pikNRBMOYDhz76vgxgckbexeQDDPH_3Q/exec?que=recipe&type=set";
var saved = true;

function writeData(data)
{	
	data = JSON.stringify(data);
	data = encodeURIComponent(data);	
	
	function reqListener()
	{
		console.log("request return is ...");
		console.log(this.responseText);
		unsavedData.classList.add("hide");
		notify("saved", 3000, 40);
	}

	//*/
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", dataURL + "&data=" + data);
	oReq.send();
	/*/
	console.log("would have saved...");
	console.log( JSON.parse( decodeURIComponent(data) ) );
	//*/
}

function saveRemoteData()
{
	
	for(var i=0; i<recipes.length; i++)
	{
		recipes[i] = removeBlanks("ingredients", recipes[i])
		recipes[i] = removeBlanks("steps", recipes[i])
	}
	
	writeData(recipes)
	
	saved = true;
	
	function removeBlanks(key, arr)
	{
		var listToRemove = [];
		for(var j = arr[key].length-1; j>=0; j--)
		{
			if( arr[key][j] == "" )
			{
				listToRemove.push(j);
			}
		}
		for( var k in listToRemove )
		{
			arr[key].splice( listToRemove[k], 1 )
		}
		
		
		return arr;
	}
}

function titleInputChange(e)
{
	if(e.value !== currentRecipe.name)
	{
		currentRecipe.name = e.value;
		notSaved();		
	}
}

function inputChange(e)
{
	var str = this.id;
	
	
	var key = str.replace( (new RegExp(/[0-9]+/)), "")
	var num = str.replace( key, "" );
	
	//console.log("key is "+key+"\nnum is "+num +"\nstr is "+str);
		
	if(this.value !== currentRecipe[key][num])
	{
		currentRecipe[key][num] = this.value;
		notSaved();
	}
}

function notSaved()
{
	saved = false;
	if( unsavedData.classList.contains("hide") )
	{
		unsavedData.classList.remove("hide");
	}
}

function deleteRecipePrompt()
{
	var r = confirm("Delete?");
	if (r == true) 
	{
		deleteRecipe();
	} 
	
	function deleteRecipe()
	{
		console.log("Deleting");
		
		for(var k=0; k<recipes.length; k++)
		{
			if(recipes[k] === currentRecipe)
			{
				recipes.splice(k, 1);
				var titleElement = document.getElementById(currentRecipe.name+"Title");
				try{
					titleElement.parentElement.removeChild(titleElement);
				}catch(e){}
				notify("'"+currentRecipe.name+"' was deleted\nClick save to save the change.", 5000, notificationX.getBoundingClientRect().height)
				moveToMainView();
				notSaved();
				return;
			}
		}
	}
}



















