main();

window.onload = function(){
	notify("Loading data...", 1000, 40)
}
document.onkeydown = function (e)
{
	if (e.altKey)
	{
		switch (e.code)
		{
		case "KeyN":
			//Statements executed when the result of expression matches value1
			console.log("got it!");
			console.log(e.code);
			newRecipe()
			break;
		case "KeyS":
			//Statements executed when the result of expression matches value1
			console.log("got it!");
			console.log(e.code);
			saveRemoteData();
			break;
		case "KeyD":
			//Statements executed when the result of expression matches value1
			console.log("got it!");
			console.log(e.code);
			deleteRecipePrompt();
			break;
		case "KeyB":
			//Statements executed when the result of expression matches value1
			console.log("got it!");
			console.log(e.code);
			moveToMainView();
			break;
		default:
			//Statements executed when none of the values match the value of the expression
			break;
		}
	}
}

//TODO add new recipe to ui after make it

var recipes = [];
var currentRecipe;
var lengthShown = {
	"ingredients":0,
	"steps":0
};

function main()
{
	console.log("in main")
	var dataURL = "https://script.google.com/macros/s/AKfycbwYZZAn20GTy32-2j0pikNRBMOYDhz76vgxgckbexeQDDPH_3Q/exec?que=recipe&type=get"

	var siteName = "Recipes";


	function reqListener()
	{
		var o = JSON.parse(this.responseText);
		console.log(o);
		recipes = o;
		
		recipes.sort(sortfunction);
		
		makeUI()
		//TODO remove
		//document.getElementById("BurgersTitle").click();
	}

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", dataURL);
	oReq.send();
	
		
}

function sortfunction(a, b)
{
	return a.name.localeCompare( b.name );
}

function makeUI()
{
	addRecipeNames(recipes, document.getElementById("recipeNames"));
	//addToHeader   (recipes, document.getElementById("header"))
	//setUpHeader();	
}
function addRecipeNames(recipes, element)
{
	for(var i=0; i<recipes.length; i++)
	{	
		var recipe = getSingleRecipe(recipes[i], i);
		element.appendChild( recipe );
	}
}

function getSingleRecipe(recipe, order)
{
	var recipeName = document.createElement("div");
	recipeName.setAttribute("id", recipe.name+"Title");
	recipeName.innerHTML = recipe.name;
	recipeName.name = recipe.name;
	recipeName.classList.add('name');
	recipeName.style.order = order;
	recipeName.setAttribute("onclick", 'editRecipe(this.name)');		
	//recipeName.style.maxHeight = recipeName.getBoundingClientRect().height;
	
	return recipeName;
}

function newRecipe()
{
	var recipeName = prompt("Please enter the recipe name", "");
	if (recipeName != null && recipeName != "") 
	{
		console.log("got good name; "+recipeName)
		editRecipe(recipeName);
		notSaved();	
	}
	//console.log("recipeName is "+recipeName)
	
}

function editRecipe(name)
{	
	console.log("editing " +name);
	
	currentRecipe = getRecipeByName(name);	

	if(currentRecipe == undefined)
	{
		currentRecipe = {
			"ingredients":[""],
			"name":name,
			"steps":[""]
		};
		recipes.push(currentRecipe);
	}
	
		
	document.getElementById("currentRecipeTitle").value = name;
	
	recipeNames.classList.add("hide")
	backArrow.classList.remove("hide")
	editDiv.classList.remove("hide")
	newButton.classList.add("hide")
	deleteButton.classList.remove("hide")
		
	
	if(currentRecipe !== undefined)
	{
		lengthShown.ingredients = currentRecipe.ingredients.length;
		lengthShown.steps = currentRecipe.steps.length;
	}
	else
	{
		lengthShown.ingredients = 0;
		lengthShown.steps = 0;
	}
	
	setEditBody( currentRecipe );
	
}

function moveToMainView()
{
	var editSteps = document.getElementsByClassName("editStep")
	gEditsteps = editSteps;
	for(var i=0; i < editSteps.length; i++)
	{
		toggleClass(editSteps[i], "hide" );
	}
		
	recipeNames.classList.remove("hide")
	backArrow.classList.add("hide")
	editDiv.classList.add("hide")
	newButton.classList.remove("hide")
	deleteButton.classList.add("hide")	
		
	recipes.sort(sortfunction);
	updateRecipes();
}

function updateRecipes()
{
	for(var i=0; i<recipes.length; i++)
	{
		var ele = document.getElementById( recipes[i].name+"Title" )
		
		if( ele != undefined)
		{
			ele.style.order = i;
		}
		else
		{
			ele = getSingleRecipe(recipes[i], i);
			recipeNames.appendChild( ele );
		}
	}
}

function getRecipeByName(name)
{
	for( var k in recipes )
	{
		if(recipes[k].name === name)
		{
			return recipes[k];
		}
	}
}

function addButton(elementClicked)
{
	var sectionStr = undefined;
	
	if(elementClicked.id == "ingredientsButton")
	{
		sectionStr = "ingredients";
	}
	else if(elementClicked.id == "stepsButton")
	{
		sectionStr = "steps";		
	} 
	
	console.log("elementClicked is...")
	console.log(elementClicked)
	console.log("sectionStr is "+sectionStr)
		
	elemantName = sectionStr + lengthShown[sectionStr]++;
	
	return addOrShow(elemantName, "", document.getElementById(sectionStr))
}

function setEditBody(recipe)
{	
	if(recipe != undefined)
	{
		addParts("ingredients", recipe.ingredients);	
		addParts("steps", recipe.steps);
	}
	
	function addParts(elemantBaseName, sourceArray)
	{
		var toAddTo = document.getElementById(elemantBaseName);
		
		var setFocus = true;
		
		var count = 0; 
		
		for(var k in sourceArray)
		{
			tmp = addOrShow(elemantBaseName+k, sourceArray[k], toAddTo, count);
			
			if( setFocus && elemantBaseName=="ingredients" )
			{
				tmp.focus();
				setFocus = false;
			}
			count++;
		}
	}
}

function addOrShow(elemantName, value, toAddTo, place)
{		
	var e = document.getElementById( elemantName );	
	
	if( e != undefined)  // the element already exsists 
	{
		e.value = value;
		e.classList.remove('hide');
	}
	else // the element does not already exsist
	{
		e = document.createElement("input");
		e.id = elemantName;
		e.value = value;
		e.onkeyup = inputChange;
		e.onkeydown = inputKeyDown;
		e.classList.add("editStep")
		toAddTo.appendChild(e)
	}
	
	return e;
	
	function inputKeyDown(e)
	{
		//console.log(e);
		if( e.keyIdentifier === "Enter" )
		{
			var id = e.path[0].id;
			
			var stringForFocus = id.replace( (new RegExp(/[0-9]+/)), "");
			
			console.log("id is "+id);
			console.log("stringForFocus is "+stringForFocus);
			
			var numForFocus = parseInt( id.split(stringForFocus)[1] ) +1; // add one to get the next textbox
			
			var nextElement = document.getElementById( stringForFocus + numForFocus );
			
			console.log(stringForFocus + numForFocus);
			console.log(nextElement);
			
			if( nextElement != undefined && !nextElement.classList.contains("hide")  )
			{
				nextElement;
			}
			if( nextElement == undefined )
			{
				var o = {"id":stringForFocus+"Button"}
				var e = addButton(o);
				e.focus();
			}
		}
		else if( e.code=="Tab" )
		{
			//alert("moving on")
		}
	}
	
}

var notifyProcess = undefined;
function stopNotify()
{
	if( notifyProcess !== undefined )
	{
		clearTimeout(notifyProcess);
		notifications.style.height = 0;
	}
}

function notify(msg, time, extraHeight)
{
	extraHeight = extraHeight || 0;
	notificationInner.innerHTML = msg
	notifications.style.height = notificationInner.getBoundingClientRect().height + extraHeight;
		
	notifyProcess = setTimeout(function()
	{
		notifications.style.height = 0;
		notifyProcess = undefined;
	}, time)
}

//start of helper funcitons?
function removeAllChildren(e)
{
	console.log( e.children )
	for(var i = e.children.length-1; i>0; i--)
	{
		e.children[i].classList.add("hide");
	}
}

function toggleClass(e, className)
{
	if( (typeof e) == "number" || (typeof e) == "string" || (typeof e) == "function")
	{
		return;
	}
	
	if(e.classList.contains(className))
	{
		e.classList.remove(className);
	}
	else
	{
		e.classList.add(className);
	}
}