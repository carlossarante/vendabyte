var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_ 			= require('underscore'),
	Follower = require('../models/follower');
	

module.exports = Backbone.View.extend({
	tagName : 'li',
	className : 'follower-cont inline-block relative',

	events : {
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
});
