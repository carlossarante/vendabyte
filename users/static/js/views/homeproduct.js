var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_ 			= require('underscore'),
	Comment = require('../models/comment'),
	Comments = require('../collections/comments'),
	CommentsView = require('../views/comments');

module.exports = Backbone.View.extend({
	tagName : 'article',
	className : 'product',

	events : {

		'click .interest' : 'interested',
		'click .action.icon-share' : 'share',
		'click .action.icon-bubble' : 'comment',
		'click .action.icon-heart' : 'love',
		'click .add-cart.absolute.icon-plus' : 'addCart',
		'click .acept' : 'addComment',
		'click .decline' : 'notComment',
	},

	template : _.template($("#product-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);				
	},

	render : function(){
		var self = this;
		var product = this.model.toJSON();
		var html = this.template(product);
		this.$el.html(html);
		var comment =this.model.get("comment_set");


        this.comments = new Comments();
        this.commentsView = new CommentsView({ collection : this.comments, el : this.$el.children('section').children('.comment-cont') });  
        for(var x in comment )
        {
        	/*$.get(comment[x], function(data) {
        		comment[x] = data;
        		console.log("COMMENTARIOS OBJECT : ", comment[x]);
        		self.comments.add(new Comment(comment[x]));
        	});*/
        	self.comments.add(new Comment(comment[x]));        	 
        }         
        //this.commentsView.render();

		return this;
	},

	interested : function(){
		var self = this;
		this.login();
	},

	share : function(){
		this.login();
	},

	addCart : function(){
		this.login();
	},

	comment : function(){
		this.login();	
	},

	love : function(){
		var self = this;
		this.login();	
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
});
