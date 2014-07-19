var Backbone 	= require('backbone'),
	$ 			= require('jquery'),
	_ 			= require('underscore');

module.exports = Backbone.View.extend({
	el : $('.portada-cont'),

	events : {
	},

	template : _.template($("#cover-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);
	},

	render : function(){
		var cover = this.model.toJSON();
		var html = this.template(cover);
		this.$el.html(html);
		console.log("Notification render///////////////////");
		return this;
	},	
});
