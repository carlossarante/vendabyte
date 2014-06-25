var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_ 			= require('underscore');
	//Comment = require('../models/comment'),
	//Comments = require('../collections/comments'),
	//CommentsView = require('../views/comments');

module.exports = Backbone.View.extend({
	el : $(".sign-in"),

	events : {
		'click .deco' : 'login',
	},

	template : _.template($("#fblogin-template").html()),

	initialize : function () {
		this.render();
	},

	render : function(){
		var self = this;
		//var picture = this.model.toJSON();
		var html = this.template();
		this.$el.html(html);
		return this;
	},		
	login : function(){
		Backbone.app.activeSession.login({
			before: function () {
				console.log('before login()')
			},
			after: function () {
				console.log('after login()')
      		}
        });
	},
});
