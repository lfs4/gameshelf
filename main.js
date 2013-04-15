
var gameTitle = "";
var gameBoxArt="";
var gameConsole="";
var gameRating="";
var platforms = "";
var gameId="";
var gameDescription="";

var key = "94c33e2ba7510ff43054cc919984757e843f2fca";
$(document).ready(function(){

	$("#searchButton").click(function(){

		//var plat = $("input#platform").val();
		name = $("input#game").val();
		//alert(name);
		//function fetchGame(callback){
		$.ajax({
			url: "http://www.giantbomb.com/api/search/",
			type: "GET",
			data: {api_key: key, query: name, field_list: "name" + "," + "platforms" + "," + "id" + "," + "image", format: "jsonp", resources: "game,id",json_callback: "gamer"},
			dataType: "jsonp"
			
		});
	//}

	});

});


function gamer(data){
	console.log(data);
	$("#gameBox").empty();
	document.getElementById("favoritesBox").style.display = 'none';
	var results = data.results;
	//$('#gameBox').html(results[0].name + "<br>" + results[0].platforms[0].name);
	var i;

	for(i =0; i<results.length ; i++)
	{
		$('#gameBox').append("<img height = 25px width = 25px src=" + results[i].image.small_url +  ">");
		$('#gameBox').append(results[i].name );
		gameId = results[i].id;
		
		/*for(var j = 0; j<results[i].platforms.length; j++){
			//$('#gameBox').append(results[i].platforms[j].name +  "<br>");
			platforms += results[i].platforms[j].name + "<br>";
		}
		$('#gameBox').append(platforms);
		platforms = "";*/
		$('#gameBox').append("<button onClick = gameFunction(" + gameId + ")>Go to Game</button><br>");
		
	}
}





function gameFunction(gameId){
	gameView.render();
	
	$.ajax({
		url: "http://www.giantbomb.com/api/game/" + gameId,
		type: "GET",
		data: {api_key: key, query: name, field_list: "name" + "," + "platforms" + "," + "genres" + "," + "image", resources: "game", format: "jsonp",json_callback: "newGame"},
		dataType: "jsonp"
			
	});
	
}

function newGame(data){
	console.log(data);
	var results = data.results;
	var i;
	
	$('#selectedGame').append("<img height = 300 width = 200 src=" + results.image.small_url +  "><br>");
	$('#selectedGame').append(results.name + "<br>");
	
	
	for (i =0; i< results.platforms.length; i++)
	{
		platforms += results.platforms[i].name + "<br>";
	}
	
	$('#selectedGame').append(platforms);
	platforms = "";
	
	/*for(i =0; i<results.length; i++)
	{
		$('#selectedGame').append("<img src=" + results[i].image.medium_url +  "><br>");
		$('#selectedGame').append(results[i].name + "<br>" + "Platforms: <br>" );
		
		for(var j = 0; j<results[i].platforms.length; j++){
			//$('#gameBox').append(results[i].platforms[j].name +  "<br>");
			platforms += results[i].platforms[j].name + "<br>";
		}
		$('#selectedGame').append(platforms);
		platforms = "";
		
	}*/
	
}
Game = Backbone.Model.extend({
	defaults: {
		title: 'no Title',
		platform: 'virtual boy',
		release_year: 'the future',
		price: 0
	},
	initialize: function(){
		alert("Game Created");
	}
});


HomeView = Backbone.View.extend({
	el: '.page',
	render: function(){
		var template = _.template($("#home_template").html(),{});
		this.$el.html(template);
	}
});

GameView = Backbone.View.extend({
	el: '.page',
	render: function(){
		var template = _.template($("#game_template").html(), {});
		this.$el.html(template);
	},
	events: {
		'submit .searchForm' : 'saveGame'
	},
	saveGame: function(ev){
		$(ev.currentTarget);
	} 

});

FavoritesView = Backbone.View.extend({
	el:'.page',
	render: function(){
		var template = _.template($("#favorite_template").html(),{});
		this.$el.html(template);
	}
});

var homeView = new HomeView();
var gameView = new GameView();
var favoritesView = new FavoritesView();
//var newGames = new Games();

var Router = Backbone.Router.extend({
	routes:{
		'': 'home',
		'new' : 'games', 
		'favePage': 'favorites'
	}
});

//console.log(newGames);

var router = new Router();
router.on('route:home', function(){
	homeView.render();
});
router.on('route:games', function(){
	gameView.render();
});
router.on('route:favorites', function(){
	favoritesView.render();
});

Backbone.history.start();
