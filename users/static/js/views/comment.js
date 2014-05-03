Vendabyte.Views.Comment = Backbone.View.extend({
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