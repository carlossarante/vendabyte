var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery');

module.exports = Backbone.View.extend({
	tagName : 'article',
	className : 'comment',

	events : {

	},

	template : Handlebars.compile($("#comment-template").html()),

	initialize : function() {
		this.listenTo(this.model, "change", this.render, this);
	},

	render : function(){
		var comment = this.model.toJSON();
		var html = this.template(comment);
		this.$el.html(html);
		return this;
	}
});