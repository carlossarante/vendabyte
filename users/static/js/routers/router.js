var Backbone 		= require('backbone'),
	//Handlebars 	= require('handlebars'),
	$ 				= require('jquery'),
	Product 		= require('../models/product'),
	Gost 			= require('../models/gost')
	Products 		= require('../collections/products'),
	ProductsView 	= require('../views/products'),
	OptionsView 	= require('../views/options');

module.exports = Backbone.Router.extend({
	routes: {
		"" : "user",
		"product/:name" : "product" 
	},

	initialize : function(){
		this.current = {};
		this.jsonData = {};
		this.product1 = new Product({
		    "product": "Iphone5",
		    "cover": "{% static 'img/ima3.jpg' %}",
		    "precio": "35,000",
		    "avatar" : "{% static 'img/persona1.png' %}",
		    "description" : "Muy vacano",
		    "user" : "Carlos Sarante"
		});
		this.product2 = new Product({
		    "product": "Iphone5",
		    "cover": "{% static 'img/ima3.jpg' %}",
		    "precio": "35,000",
		    "avatar" : "{% static 'img/persona1.png' %}",
		    "description" : "Muy vacano",
		    "user" : "Ramiro Fernandez"
		});
		this.products = new Products();
		this.productsView = new ProductsView({ collection : this.products });
		this.productsView.render();
		this.products.add(this.product2);
		this.products.add(this.product1);

		this.optionsView = new OptionsView({ model : new Gost({}) });	

		Backbone.history.start();
	},

	index : function(){
		console.log("Estoy en el index");
		this.fetchData();		
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
	},

	activeOpt : function(el){
		$(".options").removeClass('active');
		el.addClass('active');
	},

	product : function(name){
		console.log("Esto es un producto");
	},

	fetchData : function(){
		var self = this;

		return $.getJSON('data.json').then(function (data) {
      	self.jsonData = data;      	
      	console.log(data);
      	self.products.add( new Product(self.jsonData));

      	for (var name in data) {
	        if (data.hasOwnProperty(name)) {
	         // self.addAlbum(name, data[name]);
	        }
	    }
	});
		
	}
});