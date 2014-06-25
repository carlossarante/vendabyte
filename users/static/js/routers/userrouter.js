var Backbone 		= require('backbone'),
	//Handlebars 	= require('handlebars'),
	$ 				= require('jquery'),
	Follower 		= require('../models/follower'),
	Gost 			= require('../models/gost'),
	FormModel		= require('../models/form'),
	//SessionModel 	= require('../models/sessionmodel'),
	UserModel 		= require('../models/user'),		
	FileSelectModel = require('../models/fileselect')
	Products 		= require('../collections/products'),
	//Badgets 		= require('../collections/badgets'),
	Followers 		= require('../collections/followers'),
	ProductsView 	= require('../views/products'),
	//BadgetsView 	= require('../views/badgets'),
	OptionsView 	= require('../views/options'),	
	FollowersView 	= require('../views/followers'),
	UserProfileView = require('../views/userprofile'),
	NotificationsView = require('../views/notificationbar'),
	FileSelectView = require('../views/fileselect'),
	FormView 		= require('../views/form');

module.exports = Backbone.Router.extend({
	routes: {
		":users/"		: "user",
		"lonuevo" 		: "loNuevo",
		"siguiendo" 	: "siguiendo",
		"seguidores" 	: "seguidores",
		"popular" 		: "popular",
		"meinteresa" 	: "meInteresa",
		"lovendo" 		: "loVendo",
		//"me" 			: "user",
		"product/:name" : "product" 
	},

	initialize : function(){
		this.activeSession = new SessionModel();
      	console.log('authorized after create (should be false):', this.activeSession.isAuthorized());
		this.current = {};
		this.jsonData = {};

		this.userModel = new UserModel();
		this.userModel.urlRoot = "/api/user/?list=me&format=json";
		this.userProfileView = new UserProfileView({model: this.userModel});
		this.notificationsView = new NotificationsView({model : this.userModel});
		this.userModel.fetch({ 
			success: function(){
       			console.log("Usuario: "+Backbone.app.userModel);
    		}
    	});

		this.products = new Products();
		this.productsView = new ProductsView({ collection : this.products });
		//this.productsView.render();

        this.followers = new Followers();
        this.followersView = new FollowersView({ collection : this.followers});  
        //this.followersView.render();

		this.optionsView = new OptionsView({ model : new Gost({}) });

		this.fileSelectModel = new FileSelectModel({});	
		this.fileSelectView = new FileSelectView({model: this.fileSelectModel });

		this.formView = new FormView({ model : new FormModel({}) });
		//this.formView.render();

		Backbone.history.start({ 
    		pushState: true, 
    		root: ''
		});
	},

	index : function(){
		console.log("Estoy en el index");
		//this.fetchData();		
	},

	loNuevo : function(){
		var itemMenu = $('#newest');
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.removeClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.addClass('none');	

		this.products.reset();
		this.products.url = "/api/article/?format=json&list=new";
		this.products.fetch({ 
			success: function(){
       			console.log('Recuperados ' + Backbone.app.products.length + ' productos');
    		}
    	});
	},

	siguiendo : function(){
		var itemMenu = $('#following');
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.addClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.removeClass('none');

		this.followers.reset();
		this.followers.url = "/api/user/?list=following&format=json";
		this.followers.fetch({ 
			success: function(){
       			console.log('Recuperados ' + Backbone.app.followers.length + ' personas a quienes sigues');
    		}
    	});
	},

	seguidores : function(){
		var itemMenu = $('#followers');
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.addClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.removeClass('none');

		this.followers.reset();
		this.followers.url = "/api/user/?list=followers&format=json";
		this.followers.fetch({ 
			success: function(){
       			console.log('Recuperados ' + Backbone.app.followers.length + ' seguidores');
    		}
    	});
	},

	popular : function(){
		var itemMenu = $('#popular');
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.removeClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.addClass('none');

		this.products.reset();
		this.products.url = "/api/article/?format=json&list=popular";
		this.products.fetch({ 
			success: function(){
       			console.log('Recuperados ' + Backbone.app.products.length + ' articulos');
    		}
    	});
	},

	meInteresa : function(){
		var itemMenu = $('#interesting');
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.removeClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.addClass('none');

		this.products.reset();
		this.products.url = "/api/article/?format=json&list=interesting";
		this.products.fetch({ 
			success: function(){
       			console.log('Recuperados ' + Backbone.app.products.length + ' articulos');
    		}
    	});

	},

	loVendo : function(){
		var itemMenu = $('#selling');
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.removeClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.addClass('none');

		this.products.reset();
		this.products.url = "/api/article/?format=json&list=selling";
		this.products.fetch({ 
			success: function(){
       			console.log('Recuperados ' + Backbone.app.products.length + ' articulos');
    		}
    	});
	},

	user : function(){
		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var item = $("#newest");
		this.activeOpt(item);

		products.removeClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');

		this.loNuevo();
		console.log("ENTRE A USERS JJSJJSJSJSJJ");
	},

	activeOpt : function(el){
		$(".options").removeClass('active');
		el.addClass('active');
	},

	fetchData : function(){
		var self = this;

		return $.getJSON('data.json').then(function (data) {
	      	self.jsonData = data;
	      	self.products.add( new Product(self.jsonData));
		});		
	},

	csrftoken : function(name){
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = $.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	},


	/*function() {
    
	    cookieValue = $(".options-menu").children("input").val();
	    
	    return cookieValue;
	},*/
});