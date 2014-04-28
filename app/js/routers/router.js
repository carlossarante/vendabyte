Vendabyte.Router = Backbone.Router.extend({
	routes: {
		"" : "index",
		"product/:name" : "product" 
	},

	initialize : function(){
		this.current = {};
		this.jsonData = {};
		this.products = new Vendabyte.Collections.Products();
		this.product = new Vendabyte.Models.Product({
		    "product": "Iphone5",
		    "cover": "img/ima3.jpg",
		    "precio": "35,000",
		    "avatar" : "img/persona.jpg",
		    "description" : "Muy vacano",
		    "user" : "Osiris Perez",
		});
		this.vista = new Vendabyte.Views.Product({ model : this.product })
	
		Backbone.history.start();
	},


	index : function(){
		console.log("Estoy en el index");
	},

	product : function(name){
		console.log("Esto es un producto");
	}
});