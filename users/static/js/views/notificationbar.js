var Backbone 	= require('backbone'),
	$ 			= require('jquery'),
	_ 			= require('underscore');

module.exports = Backbone.View.extend({
	el : $('.header'),

	events : {
		"click .icon-bell":"notification",
		"click .icon-cog":"logout",
		"click .log-in":"login",
		"click .user-name":"perfil",
		"click .user-pict":"perfil",
		"click .logo-cont":"home",
	},

	template : _.template($("#notification-template").html()),

	initialize : function () {

		this.listenTo(this.model, "change", this.render, this);
	},

	render : function(){
		var notification = this.model.toJSON();
		/*this.model.set(this.model.attributes[0]);
		product = this.model.toJSON
		window.model = this.model;*/
		var html = this.template(notification);
		this.$el.html(html);
		console.log("Notification render///////////////////");
		return this;
	},
	home : function() {
		var url = "/users/"+this.model.attributes[0].username+"/";
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
		Backbone.app.formView.render();
		Backbone.app.fileSelectView.render();
		FileList.prototype.cont = 0;

		$(".horizontal-line").css('display', 'block');

		this.navigate(url);
	},

	perfil : function() {
		$("body").scrollTop(0);
		$(".horizontal-line").css('display', 'none');

		var url = "/users/"+this.model.attributes[0].username+"/profile/";
		//var url = "/users/osiris/";
		
		Backbone.app.formView.render();
		Backbone.app.fileSelectView.render();
		FileList.prototype.cont = 0;

		this.navigate(url);
	},

	notification : function(){
		console.log("Click Notification icon-bell");		
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
	logout : function(){
		Backbone.app.activeSession.logout({
			before: function () {
				console.log('before login()')
			},
			after: function () {
				console.log('after login()')
      		}
        });
        $.ajax({
		    url: window.location.origin + "/users/logout",
		    type: 'GET',
			statusCode: {
		    	200: function(data) {
		      		console.log('Sesion Cerrada',data);
		      		window.location.href = window.location.origin;
		    	},
		 	}
		});
	},
	navigate : function(url){
		Backbone.app.navigate(url,{trigger : true});
		
	},
});
