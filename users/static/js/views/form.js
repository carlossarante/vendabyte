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
		'click .action.icon-share' : 'share',
	},

	template : _.template($("#form-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);	
		this.model.fetch({ 
			success: function(){
       			console.log('Recuperados ' + Backbone.app.products.length + ' productos');
    		}
    	});
    	console.log("EL MODEL FORM:", this.model.toJSON())
    	window.formu = this.model;
			
	},

	render : function(){
		var self = this;
		var device = this.model.toJSON();
		var html = this.template(device);
		this.$el.html(html);
		return this;
	},

	share : function(){
		alert("Se utilizara para compartir");
	},

	navigate : function (){
		Backbone.app.navigate("product/"+ this.model.get("name"),{trigger : true})
	}
});
