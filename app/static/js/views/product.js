Vendabyte.Views.Product = Backbone.View.extend({
	tagName : 'article',
	className : 'product',

	events : {
		'click .action.icon-share' : 'share',
		'click .action.icon-bubble' : 'comment',
		'click .action.icon-heart' : 'love',
		'click .add-cart.absolute.icon-plus' : 'addCart'
	},

	template : Handlebars.compile($("#product-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);
		
	},

	render : function(){
		var product = this.model.toJSON();
		var html = this.template(product);
		this.$el.html(html);

		this.comment1 = new Vendabyte.Models.Comment({
            "avatar" : "../static/img/persona1.png",
            "comment" : "Este es el mejor celular que he tendio chico",
            "user" : "Carlos Sarante",
            "date" : "25/5/2014"
        });
        this.comment2 = new Vendabyte.Models.Comment({
            "avatar" : "../static/img/persona.jpg",
            "comment" : "Puede ser posible",
            "user" : "Ramiro Fernandez",
            "date" : "26/5/2014"
        });
        this.comments = new Vendabyte.Collections.Comments();
        this.commentsView = new Vendabyte.Views.CommentList({ collection : this.comments, el : this.$el.children('section').children('.comment-cont') });  
        this.comments.add(this.comment1); 
        this.comments.add(this.comment2);    
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
		alert("Se utilizara para comentar");
		this.comment3 = new Vendabyte.Models.Comment({
            "avatar" : "img/persona1.jpg",
            "comment" : "Este es el mejor celular que he tendio chico",
            "user" : "Osiris Perez",
            "date" : "25/5/2014"
        });
        this.comments.add(this.comment3);
	},

	love : function(){
		alert("Se utilizara para añadir a favoritos");
		 this.comment3.set({"user" : "Pedro el Escamozo"});
	},

	navigate : function (){
		Vendabyte.app.navigate("product/"+ this.model.get("name"),{trigger : true})
	}
});
