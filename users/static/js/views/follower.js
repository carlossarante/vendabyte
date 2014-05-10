var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_ 			= require('underscore'),
	Follower = require('../models/follower');
	

module.exports = Backbone.View.extend({
	tagName : 'li',
	className : 'follower-cont inline-block relative',

	events : {
		'click .action.icon-share' : 'share',
		'click .action.icon-bubble' : 'comment',
		'click .action.icon-heart' : 'love',
		'click .add-cart.absolute.icon-plus' : 'addCart'
	},

	template : _.template($("#follower-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);		
	},

	render : function(){
		var follower = this.model.toJSON();
		var html = this.template(follower);
		this.$el.html(html);

		return this;
	},

	share : function(){
		alert("Se utilizara para compartir");
	},

	addCart : function(){
		alert("Se utilizara para añadir al carrito");
	},

	comment : function(){
		alert("Se utilizara para comentar");
	},

	love : function(){
		alert("Se utilizara para añadir a favoritos");
	},

	navigate : function (){
		Backbone.app.navigate("product/"+ this.model.get("name"),{trigger : true})
	}
});
