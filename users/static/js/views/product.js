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
		var product = this.model.toJSON();
		var html = this.template(product);
		this.$el.html(html);
		var comment =this.model.get("comment_set");
		console.log("Funciona");
		/*this.comment1 = new Comment({
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
        });*/
        this.comments = new Comments();
        this.comments.url = "/articles/api/comment/";
        this.commentsView = new CommentsView({ collection : this.comments, el : this.$el.children('section').children('.comment-cont') });  
        for(var x in comment )
        {
        	this.comments.add(new Comment(comment[x])); 
        }          
        //this.commentsView.render();
		return this;
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

        x = {
            //"id": 3,
            "user": 1,
            "comment": this.$el.children('section').children('.comment-box').children('.comment-text').val(),
        	"date_posted":"25/04/2014",
        	"article": this.model.id,
        	"csrfmiddlewaretoken": Backbone.app.csrftoken('csrftoken'),
        };
        this.comments.add(new Comment(x));
        this.comment=_.last(this.comments.models);
        this.comment.unset("date_posted",{silent:"true"});
        this.comment.save();
	},
	
	notComment : function(){
		this.$el.children('section').children('.comment-box').css('display', 'none');
		this.$el.children('section').children('.comment-box').children('.comment-text').val("");
	},

	love : function(){
		alert("Se utilizara para añadir a favoritos");
		 this.comment3.set({"user" : "Pedro el Escamozo"});
	},

	navigate : function (){
		Backbone.app.navigate("product/"+ this.model.get("name"),{trigger : true})
	}
});
