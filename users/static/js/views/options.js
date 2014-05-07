var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_  			= require('underscore'),
	Comment = require('../models/comment'),
	Comments = require('../collections/comments'),
	CommentsView = require('../views/comments');

module.exports = Backbone.View.extend({
	el : $(".options-menu"),

	events : {
		'click #newest' 	: 'theNew',
		'click #following' 	: 'following',
		'click #followers' 	: 'followers',
		'click #popular' 	: 'popular',
		'click #interesting': 'interesting',
		'click #selling' 	: 'selling',

	},

	template : _.template($("#product-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);
		
	},

	render : function(){
		/*var product = this.model.toJSON();
		var html = this.template(product);
		this.$el.html(html);

		this.comment1 = new Comment({
            "avatar" : "../static/img/persona1.png",
            "comment" : "Este es el mejor celular que he tendio chico",
            "user" : "Carlos Sarante",
            "date" : "25/5/2014"
        });
        this.comment2 = new Comment({
            "avatar" : "../static/img/persona.jpg",
            "comment" : "Puede ser posible",
            "user" : "Ramiro Fernandez",
            "date" : "26/5/2014"
        });
        this.comments = new Comments();
        this.commentsView = new CommentsView({ collection : this.comments, el : this.$el.children('section').children('.comment-cont') });  
        this.comments.add(this.comment1); 
        this.comments.add(this.comment2);    
        //this.commentsView.render();
		return this;*/
	},

	theNew : function(h){
		var itemMenu = $(h.currentTarget);
		this.activeOpt(itemMenu);
		//$(h.currentTarget).css('display', 'none');
		//$.get('http://localhost:8000/articles/brands/samsung/', function(data){console.log(data)});
		
		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.removeClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.addClass('none');

		$.get( "http://localhost:8000/articles/brands/samsung/", function() {
			  alert( "success" );
			})
			  .done(function() {
			    alert( "second success" );
			  })
			  .fail(function() {
			    alert( "error" );
			  })
			  .always(function() {
			    alert( "finished" );
			  });
 
			// Perform other work here ...
			 
			// Set another completion function for the request above
			jquery.always(function() {
			  alert( "second finished" );
			});
					console.log("hola señores");
	},

	following : function(h){
		var itemMenu = $(h.currentTarget);
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.addClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.removeClass('none');
	},
	followers : function(h){
		var itemMenu = $(h.currentTarget);
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.addClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.removeClass('none');
	},
	popular : function(h){
		var itemMenu = $(h.currentTarget);
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.removeClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.addClass('none');
	},
	interesting : function(h){
		var itemMenu = $(h.currentTarget);
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.removeClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.addClass('none');
	},
	selling : function(h){
		var itemMenu = $(h.currentTarget);
		this.activeOpt(itemMenu);

		var products = $('.products')
		var fileBrowse = $('.file-browse');
		var optionMenu = $('.options-menu');
		var badgets = $('.badgets-cont');
		var followerSect = $('.followers-sect');
		
		products.removeClass('none');
		fileBrowse.removeClass('none');
		optionMenu.removeClass('none');
		badgets.addClass('none');
		followerSect.addClass('none');
	},

	activeOpt : function(el){
		$(".options").removeClass('active');
		el.addClass('active');
	},

	navigate : function (){
		Backbone.app.navigate("product/"+ this.model.get("name"),{trigger : true});
	}
});
