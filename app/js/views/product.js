Vendabyte.Views.Product = Backbone.View.extend({
	tagName : 'article',
	className : 'product',
	
	events : {
		'click' : 'navigate'
	},

	template : Handlebars.compile($("#product-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);
	},

	render : function(){
		var product = this.model.toJSON();
		var html = this.template(product);
		this.$el.html(html);
		return this;
	},

	navigate : function (){
		Vendabyte.app.navigate("product/"+ this.model.get("name"),{trigger : true})
	}
});
