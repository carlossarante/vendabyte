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

		if(this.model.attributes.liked)
		{
			this.$el.find('.icon-heart').css('color', 'red');
		}
		else
		{
			this.$el.find('.icon-heart').css('color', 'white');
		}
		if(this.model.attributes.interested)
		{
			this.$el.find('.interest').css('background-color', 'red');
		}
		else
		{
			this.$el.find('.interest').css('background-color', 'white');
		}
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
		
		if(this.model.attributes.interested)
		{
			$.ajax({
			    url: this.model.url()+"delete_interesting/",
			    type: 'DELETE',
				statusCode: {
			    	200: function() {
			      		self.$el.find('.interest').css('background-color', 'white');
			      		self.model.fetch();
			    	},	    	
			    	500: function() {
			    		alert("Error al sincronizar con el servidor");
			    	}
			 	}
			});
		}
		else
		{
			$.ajax({
			    url: window.location.origin + "/api/interesting/",
			    type: 'POST',
			    data:{article : this.model.url()},
				statusCode: {
			    	201: function() {
			      		self.$el.find('.interest').css('background-color', 'red');
			      		self.model.fetch();
			    	},
			    	409: function() {
			    		self.model.fetch();
			    	},
			    	500: function() {
			    		alert("Error al sincronizar con el servidor");
			    	}
			 	}
			});
		}
	},

	share : function(){
		alert("Se utilizara para compartir");
	},

	addCart : function(){
		alert("Se utilizara para añadir al carrito");
	},

	comment : function(){
		if (this.$el.children('section').children('.comment-box').css('display')==="none") {
			this.$el.children('section').children('.comment-box').css('display', 'block');
		}
		else{
			this.$el.children('section').children('.comment-box').css('display', 'none');
		}		
	},
	
	addComment : function(){
		var x;
		var time=new Date();

        x = {
            "user": Backbone.app.userModel.attributes[0],
            "comment": this.$el.children('section').children('.comment-box').children('.comment-text').val(),
        	"date_posted": time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear(),
        	"article": this.model.url(),
        };

        this.comments.add(new Comment(x));
        this.comment=_.last(this.comments.models);
        this.comment.unset("date_posted",{silent:"true"});
        this.comment.unset("user",{silent:"true"});
        this.comment.save(/*{
        	wait : true,
        	success: function(){
       			console.log("COMENTARIO GUARDADOOOOOOOO "+Backbone.app.userModel);
    		},
    		error: function(){
       			console.log("COMENTARIO NOOO GUARDADOOOOOOOO "+Backbone.app.userModel);
    		}
        }*/);
	},
	
	notComment : function(){
		this.$el.children('section').children('.comment-box').css('display', 'none');
		this.$el.children('section').children('.comment-box').children('.comment-text').val("");
	},

	love : function(){
		var self = this;
		
		if(this.model.attributes.liked)
		{
			$.ajax({
			    url: this.model.url()+"delete_like/",
			    type: 'DELETE',
				statusCode: {
			    	200: function() {
			      		self.$el.find('.icon-heart').css('color', 'white');
			      		self.model.fetch();
			    	},	    	
			    	500: function() {
			    		alert("Error al sincronizar con el servidor");
			    	}
			 	}
			});
		}
		else
		{
			$.ajax({
			    url: window.location.origin + "/api/likes/",
			    type: 'POST',
			    data:{article : this.model.url()},
				statusCode: {
			    	201: function() {
			      		self.$el.find('.icon-heart').css('color', 'red');
			      		self.model.fetch();
			    	},
			    	409: function() {
			    		self.model.fetch();
			    	},
			    	500: function() {
			    		alert("Error al sincronizar con el servidor");
			    	}
			 	}
			});
		}		
	},

	navigate : function (){
		Backbone.app.navigate("product/"+ this.model.get("name"),{trigger : true})
	}
});
