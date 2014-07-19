var Backbone 		= require('backbone'),
	$ 				= require('jquery'),
	Gost 			= require('../models/gost'),
	SessionModel 	= require('../models/sessionmodel'),
	UserModel 		= require('../models/user'),		
	FileSelectModel = require('../models/fileselect')
	Products 		= require('../collections/products'),
	ProductsView 	= require('../views/homeproducts'),
	NotificationsView = require('../views/notificationbar'),
	FileSelectView = require('../views/homefileselect'),
	FBLoginView = require('../views/homefblogin');

module.exports = Backbone.Router.extend({
	routes: {
		""				: "user",
		":users/"		: "user",
		"lonuevo" 		: "loNuevo",
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
		//this.userProfileView = new UserProfileView({model: this.userModel});
		this.notificationsView = new NotificationsView({model : this.userModel});
		//this.userModel.fetch({ 
		//	success: function(){
       	//		console.log("Usuario: "+Backbone.app.userModel);
    	//	}
    	//});
    	
    	this.fbLoginView = new FBLoginView();

		this.products = new Products();
		this.productsView = new ProductsView({ collection : this.products });
		//this.productsView.render();

       // this.followers = new Followers();
        //this.followersView = new FollowersView({ collection : this.followers});  
        //this.followersView.render();

	//	this.optionsView = new OptionsView({ model : new Gost({}) });

		this.fileSelectModel = new FileSelectModel({});	
		this.fileSelectView = new FileSelectView({model: this.fileSelectModel });

	//	this.formView = new FormView({ model : new FormModel({}) });
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
		this.products.url = "/api/article/?format=json";
		this.products.fetch(/*{ 
			success: function(){
       			console.log('Recuperados ' + Backbone.app.products.length + ' productos');
    		}
    	}*/);
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