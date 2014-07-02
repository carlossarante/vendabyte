var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_ 			= require('underscore');
	//Comment = require('../models/comment'),
	//Comments = require('../collections/comments'),
	//CommentsView = require('../views/comments');

module.exports = Backbone.View.extend({
	el : $(".upload-box"),

	events : {
		'click .radioBtn' : 'handleBrands',
		'change .brand-select' : 'handleModels',
		'click #submit' : 'handleSubmit',
	},

	template : _.template($("#form-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);	
		this.model.fetch({ 
			success: function(){
       			console.log('Recuperados ' + Backbone.app.products.length + ' productos');
    		}
    	});
	},

	render : function(){
		var self = this;
		var device = this.model.toJSON();
		var html = this.template(device);
		this.$el.html(html);
		return this;
	},
	handleSubmit : function(e) {
		this.model.submitForm();		
	},

	handleBrands : function(e){
		x = $(e.currentTarget);
		y = $(".rbDeco");

		y.css({
			backgroundColor: 'white',
			color: "rgb(148,158,147)",
		});
		
		this.model.fetchBrands(x);

		x.parent(".rbDeco").css({
			backgroundColor: "rgb(79,216,0)",
			color: 'white'
		});
	},
	
	handleModels : function(e){
		x = $(e.currentTarget);
		
		this.model.fetchModels(x);
	},

	navigate : function (){
		Backbone.app.navigate("product/"+ this.model.get("name"),{trigger : true})
	}
});
