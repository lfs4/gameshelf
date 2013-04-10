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
		var game = new Game({title: "halo", platform: "xbox", release_year: 2001, price: 100});
		var title = game.get("title");
		var platform = game.get("platform");
		var year = game.get("release_year");
		var price = game.get("price")

		var dataString = "Title: " + title + "<br>" + "Platform: " + platform +  "<br>" + "Year: " + year + "<br>" + "Price: " + price; 

		$('#gameBox').html(dataString);

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

var Router = Backbone.Router.extend({
	routes:{
		'': 'home',
		'new' : 'games', 
		'favePage': 'favorites'
	}
});



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
