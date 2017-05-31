function makeUI()
{
	recipes.sort(sortfunction)
	addRecipeNames(recipes, document.getElementById("mainBody"));
	addToHeader   (recipes, document.getElementById("header"))
	setUpHeader();	
}

function sortfunction(a, b)
{
	console.log("sortfunction");
	return a.name.localeCompare( b.name );
}

recipes.sort(function (a, b) // TODO remove?
{
	console.log("compairing "+a+" and "+b)
	return a.name.localeCompare(b.name);
}
);

function setUpHeader()
{
	var header = document.getElementById("header");
	header.setAttribute("style", "max-height:"+header.getBoundingClientRect().height+";");
}

function addRecipeNames(recipes, element)
{
	for(var i=0; i<recipes.length; i++)
	{
		recipeName = document.createElement("div");
		recipeName.setAttribute("id", recipes[i].name+"Title");
		recipeName.innerHTML = recipes[i].name;
		recipeName.classList.add('name');
		recipeName.setAttribute("onclick", 'toggleShow("'+recipes[i].name+'")');
		element.appendChild(recipeName);
		
		//console.log(recipeName.getBoundingClientRect().height);
		recipeName.setAttribute("style", "max-height:"+recipeName.getBoundingClientRect().height+";");
		
		thisBody = getRecipeBody(recipes[i])
		element.appendChild(thisBody);
		thisBody.setAttribute("style", "max-height:"+thisBody.getBoundingClientRect().height+";");
		thisBody.classList.add("hide");
		
	}
}

function getRecipeBody(recipe)
{
	var element = document.createElement("div");
	// add section title for steps ingredients
	{
		var sectionTitleDiv = document.createElement("div");
		sectionTitleDiv.className = "sectionTitle";
		sectionTitleDiv.innerHTML = "Ingredients";
		element.appendChild(sectionTitleDiv);
	}

	// add ingredients
	{
		var ingredientsDiv = document.createElement("div");
		ingredientsDiv.className = "body";

		for (var i = 0; i < recipe.ingredients.length; i++)
		{
			var ingDiv = document.createElement("div");
			ingDiv.innerHTML = recipe.ingredients[i];
			ingDiv.className = "body-element";
			ingredientsDiv.appendChild(ingDiv);
		}
		element.appendChild(ingredientsDiv);
	}

	// add break
	element.appendChild(document.createElement("br"));

	// add section title for steps
	{
		var sectionTitleDiv = document.createElement("div");
		sectionTitleDiv.className = "sectionTitle";
		sectionTitleDiv.innerHTML = "Steps";
		element.appendChild(sectionTitleDiv);
	}

	// add steps
	{
		var stepsDiv = document.createElement("div");
		stepsDiv.className = "body";

		for (var i = 0; i < recipe.steps.length; i++)
		{
			var sDiv = document.createElement("div");
			var num = i + 1;
			sDiv.innerHTML = num + ") " + recipe.steps[i];
			sDiv.className = "body-element";
			stepsDiv.appendChild(sDiv);
		}
		element.appendChild(stepsDiv);
	}
	element.setAttribute("id", recipe.name+"Content")
	element.classList.add("recipeBodyArea");
	console.log(element.getBoundingClientRect().height);
	//element.classList.add("hide");
	return element;
}

function addToHeader(recipesIn, element)
{
	var returnArr = [];

	for (var i = 0; i < recipesIn.length; i++) // get list of letters
	{
		var letterTemp = recipesIn[i].name[0].toUpperCase();

		if (!(returnArr.indexOf(letterTemp) > -1))
		{
			returnArr.push(letterTemp);
		}
	}

	for (var i = 0; i < returnArr.length; i++)
	{
		//TODO add letters and their link here
		var letter = document.createElement("a");
		letter.innerHTML = returnArr[i] + " ";
		letter.href = "#" + returnArr[i].toLowerCase() + "Section";
		element.appendChild(letter);
	}

	return returnArr //.sort();
}

function toggleShow(name)
{
	var title = document.getElementById(name+"Title");
	
	if(title.classList.contains("header"))
	{
		title.classList.remove("header");
		showMainList()
	}
	else{
		showRecipe(name, title)
	}
}

function showMainList()
{
	document.getElementById("header").classList.remove("hide");
	
	var elemArr = document.getElementById("mainBody").children;
	for(var i=0; i<elemArr.length; i++)
	{
		elemArr[i].classList.add("hide");
		elemArr[i].classList.remove("dark");
	}
	var nameList = document.getElementsByClassName("name")
	for(var i=0; i<nameList.length; i++)
	{
		nameList[i].classList.remove("hide");
	}
}

function showRecipe(name, title)
{
	var elemArr = document.getElementById("mainBody").children;
	var foundClicked = false;
	for(var i=0; i<elemArr.length; i++)
	{
		elemArr[i].classList.add("hide");
		if(!foundClicked && elemArr[i] == title)
		{
			foundClicked = true;
			
		}
		else if(!foundClicked)
		{
			elemArr[i].classList.add("dark");
		}
	}
	
	document.getElementById("header").classList.add("hide");
	
	title.classList.remove("hide");
	title.classList.add("header");
	document.getElementById(name+"Content").classList.remove("hide");
}




















