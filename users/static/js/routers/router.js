var Backbone 		= require('backbone'),
	//Handlebars 	= require('handlebars'),
	$ 				= require('jquery'),
	Product 		= require('../models/product'),
	Follower 		= require('../models/follower'),
	Gost 			= require('../models/gost'),
	Products 		= require('../collections/products'),
	Followers 		= require('../collections/followers'),
	ProductsView 	= require('../views/products'),
	OptionsView 	= require('../views/options'),	
	FollowersView 	= require('../views/followers');

module.exports = Backbone.Router.extend({
	routes: {
		"" 				: "user",
		"lonuevo" 		: "loNuevo",
		"siguiendo" 	: "siguiendo",
		"seguidores" 	: "seguidores",
		"popular" 		: "popular",
		"meinteresa" 	: "meInteresa",
		"lovendo" 		: "loVendo",
		"product/:name" : "product" 
	},

	initialize : function(){
		this.current = {};
		this.jsonData = {};
		/*this.product1 = new Product({
		    "model": "Iphone5",
		    "cover": "../static/img/ima3.jpg",
		    "price": "35,000",
		    "avatar" : "../static/img/persona1.png",
		    "short_description" : "Muy vacano",
		    "user" : "Carlos Sarante"
		});
		this.product2 = new Product({
		    "model": "Iphone5",
		    "cover": "../static/img/ima3.jpg",
		    "price": "35,000",
		    "avatar" : "../static/img/persona1.png",
		    "short_description" : "Muy vacano",
		    "user" : "Ramiro Fernandez"
		});*/
		this.products = new Products();
		this.productsView = new ProductsView({ collection : this.products });
		this.productsView.render();

        this.followers = new Followers();
        this.followersView = new FollowersView({ collection : this.followers});  
        this.followersView.render();

		this.optionsView = new OptionsView({ model : new Gost({}) });	

		Backbone.history.start();
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

		$.get( "/articles/new/1", function(data) {
			 	console.log( data );
			 	Backbone.app.products.reset();
			 	for (var x in data)
			 	{
			 		Backbone.app.products.add(new Product(data[x]));
			 	}
			})
			.done(function() {
				Backbone.app.productsView.render();
			})
			.fail(function() {
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

		$.get( "/articles/new/1", function(data) {
			 	console.log( data );
			 	Backbone.app.followers.reset();
			 	for (var x in data)
			 	{
			 		Backbone.app.followers.add(new Follower(data[x]));
			 	}
			})
			.done(function() {
				Backbone.app.followersView.render();
			})
			.fail(function() {
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

		$.get( "/articles/new/1", function(data) {
			 	console.log( data );
			 	Backbone.app.followers.reset();
			 	for (var x in data)
			 	{
			 		Backbone.app.followers.add(new Follower(data[x]));
			 	}
			})
			.done(function() {
				Backbone.app.followersView.render();
			})
			.fail(function() {
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

		$.get( "/articles/new/1", function(data) {
			 	console.log( data );
			 	Backbone.app.products.reset();
			 	for (var x in data)
			 	{
			 		Backbone.app.products.add(new Product(data[x]));
			 	}
			})
			.done(function() {
				Backbone.app.productsView.render();
			})
			.fail(function() {
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

		$.get( "/articles/new/1", function(data) {
			 	console.log( data );
			 	Backbone.app.products.reset();
			 	for (var x in data)
			 	{
			 		Backbone.app.products.add(new Product(data[x]));
			 	}
			})
			.done(function() {
				Backbone.app.productsView.render();
			})
			.fail(function() {
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

		$.get( "/articles/new/1", function(data) {
			 	console.log( data );
			 	Backbone.app.products.reset();
			 	for (var x in data)
			 	{
			 		Backbone.app.products.add(new Product(data[x]));
			 	}
			})
			.done(function() {
				Backbone.app.productsView.render();
			})
			.fail(function() {
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
});