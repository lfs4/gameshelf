
var gameTitle = "";
var gameBoxArt="";
var gameConsole="";
var gameRating="";
var platforms = "";
var globalGameId="";
var gameDescription="";
var releaseDate="";
var publishers="";
var videos 
var scrollable="";
var carousel="";
var carouselNav = "<a class = \"carousel-control left\" href=\"#favePicCarousel\" data-slide=\"prev\">&lsaquo;</a>" + 
		    "<a class = \"carousel-control right\" href=\"#favePicCarousel\" data-slide=\"next\">&rsaquo;</a>";
		    
var carouselNav1 = "<a class = \"carousel-control left\" href=\"#picCarousel\" data-slide=\"prev\">&lsaquo;</a>" + 
		    "<a class = \"carousel-control right\" href=\"#picCarousel\" data-slide=\"next\">&rsaquo;</a>";
		


var fList;

var key = "94c33e2ba7510ff43054cc919984757e843f2fca";


$("#searchBar").bind('keypress', function(e){
	if(e.which ===13){
		name = $("#searchBar").val();
	
		$.ajax({
			url: "http://www.giantbomb.com/api/search/",
			type: "GET",
			data: {api_key: key, query: name, field_list: "name" + "," + "platforms" + "," + "id" + "," + "image", format: "jsonp", resources: "game,id",json_callback: "this.displayResults"},
			dataType: "jsonp"
			
		});
	}
	
})


$('#searchButton').click(function(){
	name = $("#searchBar").val();
	
	$.ajax({
		url: "http://www.giantbomb.com/api/search/",
		type: "GET",
		data: {api_key: key, query: name, field_list: "name" + "," + "platforms" + "," + "id" + "," + "image", format: "jsonp", resources: "game,id",json_callback: "this.displayResults"},
		dataType: "jsonp"
		
	});
});

/*$('#searchBar').keypress(function(event){
	name = $("#searchBar").val();
	if(event.keycode == 13){
		alert("as;ldkjflaksdjhf");
		$.ajax({
		url: "http://www.giantbomb.com/api/search/",
		type: "GET",
		data: {api_key: key, query: name, field_list: "name" + "," + "platforms" + "," + "id" + "," + "image", format: "jsonp", resources: "game,id",json_callback: "this.displayResults"},
		dataType: "jsonp"
		
	});
	}
	
});*/


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
				newImage = "img/not_available.jpg";
				
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
			name ="<div id=\"gameName\" class=\"btn btn-inverse\">" +  results[i].name + "</div>";
		$('#row' + rowIndex).append("<a href =#\/new  class=\"span4\" onClick = gameFunction(" + gameId +")<div class=\"btn\"><img id=\"searchedImage\" class=\"img-rounded\" src=" + newImage + "></div>"+name+"</a>");			
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
		data: {api_key: key, query: name, field_list: "name" + "," + "platforms" + "," + "genres" + "," + "image" + ","
		+ "images" + ","+ "deck" + "," + "id" + "," + "original_release_date" + "," + "videos" + "," + "publishers" 
		+ "," + "expected_release_year",  resources: "game", format: "jsonp",json_callback: "newGame"},
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
	
	var image;
	
	if(results.image == null)
		image = "img/not_available.jpg";
	else
		image = results.image.small_url;

	

	var i;

	$('#infoList').append("<button class = \"btn btn-inverse\" id=\"favoriteButton\" >Favorite</button>");
	$('#gameImage').append("<img class = \"img-rounded\" id=\"selectedImage\"  src=" + image +  ">");
	$('#infoList').append("<p>" + results.name +  "</p>");
	if(results.expected_release_year == null)
	{
		if(results.original_release_date !=null){
			var dateString = results.original_release_date.substr(0, [10]);
			dateString = "Released: " + dateString.substr(5,[2]) + "/" + dateString.substr(8,[2]) + "/" + dateString.substr(0,[4]);
			$('#infoList').append("<p>" + dateString + "</p>");
		}
		else{
			dateString = "Release Undetermined";
			$('#infoList').append("<p>" + dateString + "</p>");
		}
	}
	else{
			dateString = "Expected Release Year: " + results.expected_release_year;
			$('#infoList').append("<p>" + dateString + "</p>");
	}
	$('#infoList').append("<p>" + results.deck + "</p>");
	for (i =0; i< results.platforms.length; i++)
	{
		

		platforms += "<li>" + results.platforms[i].name + "</li>";
	}
	$('#infoList').append("<p>Platforms: </p>");
	$('#platformList').append(platforms);
		
	
	
	
	for(var k=0; k<results.images.length; k++)
	{
		if(k == 0)
			active = "active item";
		else
			active = "item";

		
		carouselItems += "<div  class = \" " + active + "\">";
		carouselItems += "<img id=\"carouselItem\" src =" + results.images[k].medium_url + "></div>";
		
	}

	
	
	$('.carousel-inner').append(carouselItems);
	
	if(results.images.length > 1){
		$('#picCarousel').append(carouselNav1);
		scrollable = true;
	}
	else if (results.images.length <= 1)
		scrollable = false;

	
	
	gameTitle = results.name;
	carousel = carouselItems;
	globalGameId = results.id;
	gameBoxArt=image;
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
		//console.log("HomeView Rendered");
	}
	/*events: {
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
	}*/
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

SearchView = Backbone.View.extend({
	el: '.page',
	render: function(){
		var template =_.template($("#search_template").html(),{});
		this.$el.html(template);
		console.log("searchViewRendered");
	}
});

var homeView = new HomeView();
var gameView = new GameView();
//var faveGameView = new FaveGameView();
var searchView = new SearchView();


var Router = Backbone.Router.extend({
	routes:{
		'': 'home',
		'new' : 'games', 
		'shelf': 'myShelf'
		,'search': 'searchview'

	}
});

var router = new Router();

router.on('route:home', function(){
	homeView.render();
});
router.on('route:games', function(){
	gameView.render();
});
router.on('route:searchview', function(){
	searchView.render();

});
router.on('route:myShelf', function(){
	shelfView.render();
	//shelfView.showShelf();
});





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
	screenShots: carousel,
	nav: scrollable,
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
    localStorage: new Backbone.LocalStorage("gameshelf"),
    
    done: function() {
      return this.where({done: true});
    },

    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },


    comparator: 'order'

  });

  // global collection of favorites
  var MyShelf = new Shelf;


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
	//if($(window).width() < 960)
		$('html, body').animate({ scrollTop: 0 }, 'slow');

		
		
		
		
	

	$("#favoriteImage").empty();
	$("#favoriteInfoList").empty();
	$("#favoritePlatformList").empty();
	//$('.carousel-inner').empty();
	$("#favePicCarousel").html("<div class = \"carousel-inner\"></div>");
	gameTitle = this.model.get("title");
	gameRelease = this.model.get("release");
	gameConsole = this.model.get("console");
	gameBoxArt = this.model.get("pic");
	gameDescription = this.model.get("description");
	screens = this.model.get("screenShots");
	var carouselNavcheck = this.model.get("nav");

	$("#favoriteImage").append("<img id=\"fImage\" src=" + gameBoxArt +  ">");
	$('#favoriteInfoList').append( gameTitle);
	$('#favoriteInfoList').append("<p>"+ gameRelease + "</p>");
	$('#favoriteInfoList').append("<p>" + gameDescription + "</p>");
	$('#favoriteInfoList').append("<p>Platforms: </p>");
	$('#favoritePlatformList').append(gameConsole);
	
	$('.carousel-inner').append(screens);
	
	if(carouselNavcheck == true){
		//alert("my life sucks");
		$('#favePicCarousel').append(carouselNav);
	}

	
	

    }
    
  });


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

    addOne: function(todo) {
      var view = new ShelfItemView({model: todo});
      this.$("#list").append(view.render().el);
    },


    addAll: function() {
	this.$("#list").empty();
      MyShelf.each(this.addOne, this);
    },

    createOnEnter: function() {
	if(gameTitle != ""){
	MyShelf.each(function(todo){
	    //alert(Faves.get("title"));
	}),
	  MyShelf.create({pic: gameBoxArt, title: gameTitle/*, console: gameConsole, description: gameDescription, rating: gameRating, id: gameId*/});
	  //console.log(gameTitle + " " + globalGameId);
	}
	else if(gameTitle == "")
		alert("There is no game present");
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


//});
	var shelfView = new ShelfView();
	fList = shelfView;



Backbone.history.start();