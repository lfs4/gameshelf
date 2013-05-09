
var gameTitle = "";
var gameBoxArt="";
var gameConsole="";
var gameRating="";
var platforms = "";
var globalGameId="";
var gameDescription="";
var releaseDate="";

var fList;

var key = "94c33e2ba7510ff43054cc919984757e843f2fca";




function displayResults(data){
	console.log(data);
	$("#grid").empty();
	//document.getElementById("favList1").style.display = 'none';
	//document.getElementById("favList2").style.display = 'none';
	var results = data.results;
	//$('#gameBox').html(results[0].name + "<br>" + results[0].platforms[0].name);
	var i;
	var gameId;
	
	
	
	
	
	if(results.length == 0)
		$('#grid').append("<div class=\"alert alert-error\"><strong>I'M SORRY, BUT YOUR GAME IS IN A DIFFERENT SEARCH!!</strong></div>");
	
	var rowCount = results.length/3;
	var itemsPerRow = 3;
	
	for(var j = 0; j<rowCount; j++)
	{
		
		$('#grid').append("<div class=row id = row" + j +"> </div>");
		
	}
	var rowIndex = 0;
	var oldIndex =0;
	
		for(i =0; i<results.length ; i++)
		{
			var newImage = "";
	
			if(results[i].image == null)
			{
				newImage == "img/not_available.jpg";
				
			}
			else
			{
				newImage = results[i].image.small_url;
			}
			
				console.log("i = " +  i);
				console.log("old index "  + oldIndex);
				//console.log(rowIndex * itemsPerRow + itemsPerRow);
				
		
			if(i > oldIndex + itemsPerRow - 1)
			{
				rowIndex++;
				oldIndex = i;
			}
			gameId = results[i].id;
			name = results[i].name;
		$('#row' + rowIndex).append("<a href =#\/new  class=\"span4\" onClick = gameFunction(" + gameId +")<div class=\"btn\"><img class=\"img-rounded\" height = 300px width= 100% src=" + newImage + "></div>"+name+"</a>");			
		//$('#row' + rowIndex).appent("<p>" + name + "</p>");
			//	$('#grid').append( results[i].name  + "</div>");
	
		}
	}

function gameFunction(gameId){
	//gameView.render();
	
	//document.getElementById("favBtn").style.display = 'block';

	$.ajax({
		url: "http://www.giantbomb.com/api/game/" + gameId,
		type: "GET",
		data: {api_key: key, query: name, field_list: "name" + "," + "platforms" + "," + "genres" + "," + "image" + "," + "images" + ","+ "deck" + "," + "id" + "," + "original_release_date" + "," + "expected_release_year",  resources: "game", format: "jsonp",json_callback: "newGame"},
		dataType: "jsonp"
			
	});
	

}

function newGame(data){
	console.log(data);
	$('.carousel').carousel({});
	var results = data.results;
	var carouselPic;
	var carouselItems = "";
	var active;

	var i;

	
	$('#gameImage').append("<img class = \"img-rounded\" height = 200px src=" + results.image.small_url +  ">");
	$('#infoList').append( results.name +  "<br>");
	if(results.expected_release_year == null)
	{
		if(results.original_release_date !=null){
			var dateString = results.original_release_date.substr(0, [10]);
			dateString = "Released: " + dateString.substr(5,[2]) + "/" + dateString.substr(8,[2]) + "/" + dateString.substr(0,[4]);
			$('#infoList').append(dateString);
		}
		else{
			dateString = "Release Undetermined";
			$('#infoList').append(dateString);
		}
	}
	else{
			dateString = "Expected Release Year: " + results.expected_release_year;
			$('#infoList').append(dateString);
	}
	
	for (i =0; i< results.platforms.length; i++)
	{
		

		platforms += "<li>" + results.platforms[i].name + "</li>";
	}
	$('#platformList').append(platforms);
		
	
	for(var k=0; k<results.images.length; k++)
	{
		if(k == 0)
			active = "active item";
		else
			active = "item";
		
		
		carouselItems += "<div class = \" " + active + "\">";
		carouselItems += "<img class=\"img-rounded\"  src =" + results.images[k].medium_url + "></div>"
		
	}
	
	
	
	$('.carousel-inner').append(carouselItems);
	
	
	
	
	gameTitle = results.name;
	globalGameId = results.id;
	gameBoxArt=results.image.small_url;
	releaseDate = dateString;
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
/*Game = Backbone.Model.extend({
	defaults: {
		title: 'no Title',
		platform: 'virtual boy',
		release_year: 'the future',
		price: 0
	},
	initialize: function(){
		//alert("Game Created");
	}
});*/



HomeView = Backbone.View.extend({
	el: '.page',
	render: function(){
		var template = _.template($("#home_template").html(),{});
		this.$el.html(template);
		console.log("HomeView Rendered");
	},
	events: {
		"click #searchButton": "searchGame"
	},
	searchGame: function(event){
		//alert("Search for " + $("#searchInput").val());
		name = $("#searchInput").val();
		
		$.ajax({
			url: "http://www.giantbomb.com/api/search/",
			type: "GET",
			data: {api_key: key, query: name, field_list: "name" + "," + "platforms" + "," + "id" + "," + "image", format: "jsonp", resources: "game,id",json_callback: "this.displayResults"},
			dataType: "jsonp"
			
		});
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

FaveGameView = Backbone.View.extend({
	el:'.page',
	render: function(){
		var template = _.template($("#favorite_template").html(),{});
		this.$el.html(template);
	}
});

var homeView = new HomeView();
var gameView = new GameView();
var faveGameView = new FaveGameView();


var Router = Backbone.Router.extend({
	routes:{
		'': 'home',
		'new' : 'games', 
		'fave': 'favorites',
		'shelf': 'myShelf'

	}
});


var router = new Router();


//$(function(){

  

  /*function show(shown, hidden) {
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
    return false;
  }*/

//game model that will be saved in local storage  
  var Game = Backbone.Model.extend({
  
    // Default attributes for the todo item.
    defaults: function() {
	
      return {
	

        title: gameTitle,
        pic: gameBoxArt,
        console: gameConsole,
	release: releaseDate,
        description: gameDescription,
        //rating: gameRating,
        id: globalGameId,
        order: MyShelf.nextOrder(),
        done: false
      };
    },

    toggle: function() {
      this.save({done: !this.get("done")});
    }
    

  });

	//collection of favorite games, also saved in local storage
var Shelf = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Game,

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

  // global collection of favorites
  var MyShelf = new Shelf;

  // Todo Item View
  // --------------

  // this is the view for each item in the favorites list
  var ShelfItemView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "div",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle"   : "toggleDone",
      "click #fLink"   : "link",
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {  
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      
      this.$el.toggleClass('done', this.model.get('done'));
      
      this.$el.toggleClass('picture', this.model.get('picture'));
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

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    },
    
    link: function() {
	//alert("working button " + this.model.get("title"));
	$("#favoriteImage").empty();
	$("#favoriteInfoList").empty();
	$("#favoritePlatformList").empty();
	gameTitle = this.model.get("title");
	gameRelease = this.model.get("release");
	gameConsole = this.model.get("console");
	gameBoxArt = this.model.get("pic");
	gameDescription = this.model.get("description");

	$("#favoriteImage").append("<img id=\"fImage\" src=" + gameBoxArt +  ">");
	$('#favoriteInfoList').append( gameTitle + "<br>");
	$('#favoriteInfoList').append(gameRelease);
	
	$('#favoritePlatformList').append(gameConsole);
	
	
	
	

    }
    
  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
ShelfView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $(".page"),

    // Our template for the line of statistics at the bottom of the app.
   // shelfTemplate: _.template($('#shelfTemplate').html()),

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
      


    //  this.footer = this.$('footer');
      //this.main = $('#main');

      

    },
    showShelf: function(){
	//alert("shelf display");
	//this.input = this.$("#new-todo");
      //this.allCheckbox = this.$("#toggle-all")[0];
	this.listenTo(MyShelf, 'add', this.addOne);
	this.listenTo(MyShelf, 'reset', this.addAll);
	//this.listenTo(MyShelf, 'all', this.render);
	MyShelf.fetch();

    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      
      var template = _.template($("#shelfTemplate").html(),{});
      this.$el.html(template);
      console.log("Shelf View Rendered");
      
      this.showShelf();
      //var done = MyShelf.done().length;
      //var remaining = MyShelf.remaining().length;
	//this.main.show();
	//this.footer.show();
	//this.footer.html(this.shelfTemplate({done: done, remaining: remaining}));
      //this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new ShelfItemView({model: todo});
      this.$("#list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
	this.$("#list").empty();
      MyShelf.each(this.addOne, this);
    },
   /* displayList: function(){
	alert("butts");
	this.$("#list").append(view.render().el);
    },*/

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function() {
      MyShelf.each(function(todo){
          //alert(Faves.get("title"));
      }),
	
        MyShelf.create({pic: gameBoxArt, title: gameTitle/*, console: gameConsole, description: gameDescription, rating: gameRating, id: gameId*/});
	//console.log(gameTitle + " " + globalGameId);
	
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.invoke(MyShelf.done(), 'destroy');
      return false;
    },

    toggleAllComplete: function () {
      //var done = this.allCheckbox.checked;
      MyShelf.each(function (todo) { todo.save({'done': done}); });
    }

  });
  // Finally, we kick things off by creating the **App**.

//});
	var shelfView = new ShelfView();
	fList = shelfView;
function favPressed(){
	fList.createOnEnter();
};

router.on('route:home', function(){
	homeView.render();
});
router.on('route:games', function(){
	gameView.render();
});
router.on('route:favorites', function(){
	//myShelfView.render();
	//shelfView.render();
	//myShelfView.showShelf();
	//alert("shelf view");

});
router.on('route:myShelf', function(){
	shelfView.render();
	//shelfView.showShelf();
});
Backbone.history.start();