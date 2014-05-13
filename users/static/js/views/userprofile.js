var Backbone 	= require('backbone'),
	$ 			= require('jquery'),
	_ 			= require('underscore');

module.exports = Backbone.View.extend({
	el : $('.user-cont'),

	events : {
	},

	template : _.template($("#user-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);
	},

	render : function(){
		var product = this.model.toJSON();
		var html = this.template(product);
		this.$el.html(html);

		return this;
	},

	navigate : function (){
		Backbone.app.navigate("product/"+ this.model.get("name"),{trigger : true})
	}
});
