var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_ 			= require('underscore'),
	Follower = require('../models/follower');
	

module.exports = Backbone.View.extend({
	tagName : 'li',
	className : 'follower-cont inline-block relative',

	events : {
		"click .follow-user" : "follow",
	},

	template : _.template($("#follower-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);		
	},

	render : function(){
		var self = this;
		var follower = this.model.toJSON();
		var html = this.template(follower);
		this.$el.html(html);

		if(this.model.attributes.user_following)
		{
			self.$el.find('.follow-user').html("No seguir");
		}
		else
		{
			self.$el.find('.follow-user').html("Seguir");		
		}

		return this;
	},
	follow : function(){
		var self = this;

		if(this.model.attributes.user_following)
		{
			$.ajax({
			    url: window.location.origin + "/api/user/"+this.model.attributes.id +"/remove_follower/",
			    type: 'DELETE',
				statusCode: {
			    	200: function() {
			      		self.model.fetch();
			      		Backbone.app.userModel.fetch();	
			    	},	    	
			    	500: function() {
			    		alert("Error al sincronizar con el servidor");
			    	}
			 	}
			});
		}
		else
		{
			$.ajax({
			    url: window.location.origin + "/api/user/"+this.model.attributes.id +"/add_follower/",
			    type: 'POST',
				statusCode: {
			    	200: function() {
			    		self.model.fetch();
			    		Backbone.app.userModel.fetch();	
			    	},
			 	}
			});
		}			
	},
});
