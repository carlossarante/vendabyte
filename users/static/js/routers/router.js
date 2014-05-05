Vendabyte.Router = Backbone.Router.extend({
	routes: {
		"" : "index",
		"product/:name" : "product" 
	},

	initialize : function(){
		this.current = {};
		this.jsonData = {};
		this.product1 = new Vendabyte.Models.Product({
		    "product": "Iphone5",
		    "cover": "../static/img/ima3.jpg",
		    "precio": "35,000",
		    "avatar" : "../static/img/persona1.png",
		    "description" : "Muy vacano",
		    "user" : "Carlos Sarante"
		});
		this.product2 = new Vendabyte.Models.Product({
		    "product": "Iphone5",
		    "cover": "../static/img/ima3.jpg",
		    "precio": "35,000",
		    "avatar" : "../static/img/persona1.png",
		    "description" : "Muy vacano",
		    "user" : "Ramiro Fernandez"
		});
		//this.products = new Vendabyte.Collections.Products();
		//this.productsView = new Vendabyte.Views.ProductList({ collection : this.products });
		//this.productsView.render();
		//this.products.add(this.product2);
		//this.products.add(this.product1);


		

		Backbone.history.start();
	},

	index : function(){
		console.log("Estoy en el index");
		this.fetchData();		
	},

	product : function(name){
		console.log("Esto es un producto");
	},

	fetchData : function(){
		var self = this;

		return $.getJSON('data.json').then(function (data) {
      	self.jsonData = data;      	
      	console.log(data);
      	self.products.add( new Vendabyte.Models.Product(self.jsonData));

      	for (var name in data) {
	        if (data.hasOwnProperty(name)) {
	         // self.addAlbum(name, data[name]);
	        }
	    }
	});
		
	}
});