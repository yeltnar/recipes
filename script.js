if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


var dataURL = "https://script.google.com/macros/s/AKfycbwYZZAn20GTy32-2j0pikNRBMOYDhz76vgxgckbexeQDDPH_3Q/exec?que=recipe&type=get"

var x = "this is a test";
var siteName = "Recipes";

var recipes = [];

reqListener ();

function reqListener () 
{
	var o = JSON.parse( `[{"name":"Burgers","ingredients":["1 lb gnd beef","salt and pepper or Tony's or steak seasoning","Worcheshire sauce"],"steps":["Form 3 patties","Season patties","add Worcheshire sauce","Cook, flipping every 5 minutes until charred brown with no blood coming out"]},{"name":"Camper's Stew","ingredients":["1 lb gnd beef","3-5 potatoes, peeled","1 can Veg-all","1 can lima beans","1 15 oz can whole kernel corn","46 oz can tomato juice","salt","pepper","dried onion"],"steps":["Brown gnd meet with salt, pepper and dried onion.","Add all other ingredients and boil until potatoes are done"]},{"name":"Fried Rice","ingredients":["1 lb ground beef","~2 cups of rice","1 chicken bouillon  cube","1/2 bag frozen veggies","2 eggs","soy sauce","sriracha sauce"],"steps":["Cook rice.","Brown ground meet.","Add in cooked rice.","Add all other ingredients","stir until eggs are cooked"]},{"name":"Goulash","ingredients":["2 lb gnd beef","1 small (or large for more food) package of macoroni","3T worcheshire sauce","46 oz tomato juice","onion","salt","peper"],"steps":["Cook macoroni","brown and drain meat","combine all ingredeants","Simmer about 15 min"]},{"name":"Spaghetti Sauce","ingredients":["1 lb gnd beef","1 8 oz can of tomato sauce (16 <span style='font-style: italic'>and</span> 8 when doubled)","1 Table Spoon (more or less) Minced onion","Garlic salt","peper","garlic powder","oregano "],"steps":["start to cook meat","mix the meat and tomato sauce well before the meat alone has a chance to start browning","add all other ingredients"]},{"name":"Strawberries","ingredients":["Strawberries"],"steps":["Cut strawberries up.","Depending on how many you have, pour ~1 cup sugar over them.","Let them sit out of the refrigerator.","Stir every 15 minutes or so until all sugar is dissolved","Refrigerate","Enjoy!"]}]` );
	console.log(o);
	recipes = o;
	makeUI()
}

// var oReq = new XMLHttpRequest();
// oReq.addEventListener("load", reqListener);
// oReq.open("GET", dataURL);
// oReq.send();
