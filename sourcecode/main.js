
var gameTitle = "";
var gameBoxArt="";
var gameConsole="";
var gameRating="";
var platforms = "";
var gameId="";
var gameDescription="";

var key = //[ API-key goes here	]
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
	document.getElementById("favList1").style.display = 'none';
	//document.getElementById("favList2").style.display = 'none';
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
	
	document.getElementById("favBtn").style.display = 'block';
	
	$.ajax({
		url: "http://www.giantbomb.com/api/game/" + gameId,
		type: "GET",
		data: {api_key: key, query: name, field_list: "name" + "," + "platforms" + "," + "genres" + "," + "image" + "," + "deck", resources: "game", format: "jsonp",json_callback: "newGame"},
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
	
	gameTitle = results.name;
	gameBoxArt=results.image.small_url;
	//gameRating="4.5";
	gameConsole = platforms;
	gameDescription=results.deck;
	platforms ="";


	//alert("this is a title" + ' ' + "LWH.jpg" + ' ' + "4.5" + ' ' + "PC, N64"  + ' ' + "216" + ' ' + "Good Game");

	
	//alert(gameTitle + ' ' + gameBoxArt + ' ' + gameRating + ' ' + platforms  + ' ' + gameId + ' ' + gameDescription);
	
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
		//alert("Game Created");
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


$(function(){

  

  function show(shown, hidden) {
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
    return false;
  }
  
  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  
  var Todo = Backbone.Model.extend({
  
    // Default attributes for the todo item.
    defaults: function() {
	
	//alert(gameTitle + ' ' + gameBoxArt + ' ' + gameRating + ' ' + platforms  + ' ' + gameId + ' ' + gameDescription);
	
      return {
	

        title: gameTitle,
        pic: gameBoxArt,
        console: gameConsole,
        description: gameDescription,
        //rating: gameRating,
        id: gameId,
        order: Todos.nextOrder(),
        done: false
      };
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }

  });

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,

    // Save all of the todo items under the `"todos-backbone"` namespace.
    localStorage: new Backbone.LocalStorage("todos-backbone"),

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.where({done: true});
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: 'order'

  });

  // Create our global collection of **Todos**.
  var Todos = new TodoList;

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle"   : "toggleDone",
      //"dblclick .view"  : "edit",
      //"click a.undo"    : "undo",
      //"click a.picture" : "updatePicture",
      //"click a.destroy" : "clear",
      //"click a.fLink"   : "link",
      "click #fLink"   : "link",
      //"keypress .edit"  : "updateOnEnter",
      //"blur .edit"      : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      //this.listenTo(this.model, 'change', this.render);
      //this.listenTo(this.model, 'undo', this.remove);
      //this.listenTo(this.model, 'updatePicture', this.remove);

      //this.listenTo(this.model, 'fLink', this.remove);      
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      
      this.$el.toggleClass('done', this.model.get('done'));
      
      //this.$el.toggleClass('picture', this.model.get('picture'));
      this.input = this.$('.edit');
      
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        
        this.model.save({last: this.model.get("title")});
        this.model.save({title: value});
        
        this.model.save({edited: true});
        
        this.$el.removeClass("editing");
      }
    },

    /*undo: function(){
      if(this.model.get("edited"))
      {
        this.model.save({edited: false})
        this.model.save({title: this.model.get("last")});
        this.model.save({last: ""});
      }
    },*/
    
    updatePicture: function(){
      
      this.model.save({pic: 'LWH.jpg'});
      
    },
    
    // If you hit `enter`, we're through editing the item.
    /*updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },*/

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    },
    
    link: function() {
	//alert("working button " + this.model.get("title"));
	
	gameTitle = this.model.get("title");
	gameConsole = this.model.get("console");
	gameBoxArt = this.model.get("pic");
	//gameRating = this.model.get("rating");
	gameDescription = this.model.get("description");

	gameView.render();
	
	$("#selectedGame").append( "<img height = 300px width = 200px  src = " + gameBoxArt + "><br>" + gameTitle + "<br>" + gameConsole +  "<br>" + gameDescription);
	
	
	//alert(gameBoxArt + " " + gameTitle + " " + gameConsole);
	
	//this.displayPage(gameTitle,gameBoxArt,gameConsole, gameRating, gameDescription)
    }/*,
    
    displayPage: function(t,b,c,r,d){
      document.getElementById("gameBoxArt").src = b;
      document.getElementById("gameTitle").innerHTML = t;
      document.getElementById("gameConsole").innerHTML = c;
      document.getElementById("gameRating").innerHTML = r;
      document.getElementById("gameDescription").innerHTML = d;
      
      
      document.getElementById("Page1").style.display = "none";
      document.getElementById("Page2").style.display = "block";
      
    }*/
    
  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click #favoriteButton":  "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
      
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      
      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];

      this.listenTo(Todos, 'add', this.addOne);
      this.listenTo(Todos, 'reset', this.addAll);
      this.listenTo(Todos, 'all', this.render);

      this.footer = this.$('footer');
      this.main = $('#main');

      Todos.fetch();
      //alert("picture update");
      //this.updatePicture;
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      
      var done = Todos.done().length;
      var remaining = Todos.remaining().length;

      //if (Todos.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      //} else {
        //this.main.hide();
        //this.footer.hide();
      //}
      this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      Todos.each(this.addOne, this);
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function() {
	
	//alert("pass");
	
        Todos.create({pic: gameBoxArt, title: gameTitle/*, console: gameConsole, description: gameDescription, rating: gameRating, id: gameId*/});
	
	/*this.model.save({pic: gameBoxArt});
	this.model.save({title: gameTitle});
	this.model.save({console: gameConsole});
	this.model.save({description: gameDescription});
	this.model.save({rating: gameRating});
	this.model.save({id: gameId});*/
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.invoke(Todos.done(), 'destroy');
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      Todos.each(function (todo) { todo.save({'done': done}); });
    }

  });
  // Finally, we kick things off by creating the **App**.
  var App = new AppView;
});

Backbone.history.start();
