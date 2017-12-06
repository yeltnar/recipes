if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
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

function reqListener () 
{
	var o = JSON.parse( this.responseText );
	console.log(o);
	recipes = o;
	makeUI()
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", dataURL);
oReq.send();
