var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_ 			= require('underscore');
	//Comment = require('../models/comment'),
	//Comments = require('../collections/comments'),
	//CommentsView = require('../views/comments');

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
	},

	theNew : function(h){

		Backbone.app.navigate("lonuevo",{trigger : true});
		//$(h.currentTarget).css('display', 'none');
		//$.get('http://localhost:8000/articles/brands/samsung/', function(data){console.log(data)});	
	},

	following : function(h){
		Backbone.app.navigate("siguiendo",{trigger : true});
		
	},
	followers : function(h){
		Backbone.app.navigate("seguidores",{trigger : true});
		
	},
	popular : function(h){
		//console.log(Backbone.app.activeSession.isAuthorized());
		Backbone.app.navigate("popular",{trigger : true});
		
	},
	interesting : function(h){		
		Backbone.app.navigate("meinteresa",{trigger : true});
		
	},
	selling : function(h){
		Backbone.app.navigate("lovendo",{trigger : true});
		
	},

	navigate : function (){
		Backbone.app.navigate("product/"+ this.model.get("name"),{trigger : true});
	}
});
