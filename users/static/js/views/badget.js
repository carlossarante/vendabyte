var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	_ 			= require('underscore'),
	$ 			= require('jquery');

module.exports = Backbone.View.extend({
	tagName : 'li',
	className : 'badget',

	events : {

	},

	template : _.template($("#badgets-template").html()),

	initialize : function() {
		this.listenTo(this.model, "change", this.render, this);
	},

	render : function(){
		var badget = this.model.toJSON();
		var html = this.template(badget);
		this.$el.html(html);
		return this;
	}
});