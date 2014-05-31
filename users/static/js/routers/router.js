var Backbone 		= require('backbone'),
	//Handlebars 	= require('handlebars'),
	$ 				= require('jquery'),
	Product 		= require('../models/product'),
	Follower 		= require('../models/follower'),
	Gost 			= require('../models/gost'),
	SessionModel 	= require('../models/sessionmodel'),
	UserModel 		= require('../models/user'),	
	Products 		= require('../collections/products'),
	Followers 		= require('../collections/followers'),
	ProductsView 	= require('../views/products'),
	OptionsView 	= require('../views/options'),	
	FollowersView 	= require('../views/followers'),
	UserProfileView = require('../views/userprofile'),
	NotificationsView = require('../views/notificationbar');

module.exports = Backbone.Router.extend({
	routes: {
		"" 				: "user",
		"lonuevo" 		: "loNuevo",
		"siguiendo" 	: "siguiendo",
		"seguidores" 	: "seguidores",
		"popular" 		: "popular",
		"meinteresa" 	: "meInteresa",
		"lovendo" 		: "loVendo",
		"me" 			: "user",
		"product/:name" : "product" 
	},

	initialize : function(){
		this.activeSession = new SessionModel();
      	console.log('authorized after create (should be false):', this.activeSession.isAuthorized());
		this.current = {};
		this.jsonData = {};


		this.userModel = new UserModel();
		//this.userModel.urlRoot = "/users/me/json";
		this.userProfileView = new UserProfileView({model: this.userModel});
		this.notificationsView = new NotificationsView({model : this.userModel});
		//this.userModel.set({"username" : "mao"});

		/*this.userModel.fetch({ 
			success: function(){
       			console.log("Usuario: "+Backbone.app.userModel);
    		}
    	});*/

		this.products = new Products();
		this.productsView = new ProductsView({ collection : this.products });
		this.productsView.render();

        this.followers = new Followers();
        this.followersView = new FollowersView({ collection : this.followers});  
        this.followersView.render();

		this.optionsView = new OptionsView({ model : new Gost({}) });	

		Backbone.history.start({ 
    		pushState: true, 
    		root: '/users/me'
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
		this.products.url = "/articles/list/popular/?format=json";
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
		this.followers.url = "./following/?format=json";
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
		this.followers.url = "./followers/json";
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
		this.products.url = "articles/list/popular/?format=json";
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
		this.products.url = "./articles/json";
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
		this.products.url = "./articles/json";
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
	            var cookie = jQuery.trim(cookies[i]);
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