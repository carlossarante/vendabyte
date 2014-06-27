var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_ 			= require('underscore');
	//Comment = require('../models/comment'),
	//Comments = require('../collections/comments'),
	//CommentsView = require('../views/comments');

module.exports = Backbone.View.extend({
	el : $(".file-browse"),

	events : {
		'change #dropIn' : 'login',
		'change #selectIn' : 'login',
	},

	template : _.template($("#fileSelect-template").html()),

	initialize : function () {
		this.render();
	},

	render : function(){
		var self = this;
		var picture = this.model.toJSON();
		var html = this.template(picture);
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
