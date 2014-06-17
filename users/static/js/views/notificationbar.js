var Backbone 	= require('backbone'),
	$ 			= require('jquery'),
	_ 			= require('underscore');

module.exports = Backbone.View.extend({
	el : $('.header'),

	events : {
		"click .icon-bell":"login",
		"click .log-in":"login",
	},

	template : _.template($("#notification-template").html()),

	initialize : function () {

		this.listenTo(this.model, "change", this.render, this);
	},

	render : function(){
		var product = this.model.toJSON();
		/*this.model.set(this.model.attributes[0]);
		product = this.model.toJSON
		window.model = this.model;*/
		var html = this.template(product);
		this.$el.html(html);
		console.log("Notification render///////////////////");
		return this;
	},

	notification : function(){
		console.log("Click Notification icon-bell");
		Backbone.app.activeSession.logout();
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

	navigate : function (){
		Backbone.app.navigate("users/",{trigger : true})
	}
});
