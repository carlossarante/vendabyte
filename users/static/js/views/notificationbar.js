var Backbone 	= require('backbone'),
	$ 			= require('jquery'),
	_ 			= require('underscore');

module.exports = Backbone.View.extend({
	el : $('.header'),

	events : {
		"click .icon-bell":"login",
		"click .log-in":"login",
		"click .user-name":"perfil",
		"click .logo-cont":"home",
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
	home : function() {
		var url = "/"+this.model.attributes[0].username+"/";
		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		var formulario=$('.upload-box');
		var perfil = $('.user-cont');
		var portada = $('.portada-cont');

		portada.addClass('none');
		perfil.addClass('none');
		products.removeClass('none');
		formulario.addClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.addClass('none');

		this.navigate(url);

	},

	perfil : function() {
		var url = "/"+this.model.attributes[0].username+"/";
		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		var formulario=$('.upload-box');
		var perfil = $('.user-cont');
		var portada = $('.portada-cont');

		portada.removeClass('none');
		perfil.removeClass('none');
		products.removeClass('none');
		formulario.addClass('none');
		fileBrowse.addClass('none');
		optionMenu.addClass('none');
		badgets.removeClass('none');
		followerSect.addClass('none');

		this.navigate(url);
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

	navigate : function (url){
		Backbone.app.navigate(url,{trigger : true})
	}
});
