var Backbone 	= require('backbone'),
	//Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	Comment = require('../views/comment');

module.exports = Backbone.View.extend({
	

	initialize : function() {
		console.log(this.el);
		this.listenTo(this.collection, "add", this.addOne, this);
        this.listenTo(this.collection, "reset", this.render, this);
	},

	render : function(){
		this.$el.empty();
        this.addAll();
	},

	addOne: function (comment) {
	    var commentView = new Comment({ model : comment });
	    this.$el.prepend(commentView.render().el);
	},

    addAll: function () {
        this.collection.forEach(this.addOne,this);
    }
});