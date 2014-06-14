var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_ 			= require('underscore');
	//Comment = require('../models/comment'),
	//Comments = require('../collections/comments'),
	//CommentsView = require('../views/comments');

module.exports = Backbone.View.extend({
	el : $(".upload-box"),

	events : {
		'click .radioBtn' : 'fetchBrands',
		'change .brand-select' : 'fetchModels',
		'click #submit' : 'submitForm',
	},

	template : _.template($("#form-template").html()),

	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);	
		this.model.fetch({ 
			success: function(){
       			console.log('Recuperados ' + Backbone.app.products.length + ' productos');
    		}
    	});
    	console.log("EL MODEL FORM:", this.model.toJSON())
    	window.formu = this.model;
			
	},

	render : function(){
		var self = this;
		var device = this.model.toJSON();
		var html = this.template(device);
		this.$el.html(html);
		return this;
	},
	submitForm : function(e) {
		alert();
		var formData = new FormData(document.getElementById('articleUpload'));
		formData.append('csrfmiddlewaretoken',Backbone.app.csrftoken('csrftoken'));

		var request = new XMLHttpRequest();
		request.open("POST", "http://localhost:8000/articles/api/article/");
		request.send(formData);
	},

	fetchBrands : function(e){
		x = $(e.currentTarget);
		y = $(".brand-select");
		z = $(".model-select");
		y.html('<option value="" selected disabled="disabled" label="Seleccionar marca"></option>');
		z.html('<option value="" selected disabled="disabled" label="Seleccionar modelo"></option>');

		$.get("http://localhost:8000/articles/api/devices/?format=json&device_detail="+x.val(), function(data) {
			data[0].brand_set.forEach(function(argument) {
				y.append('<option value='+argument+' label='+argument+'></option>');
			})
		});

		x.parent(".rbDeco").css({
			backgroundColor: 'green',
			color: 'white'
		});
	},
	fetchModels : function(e){
		x = $(e.currentTarget);
		y = $(".model-select");
		y.html('<option value="" selected disabled="disabled" label="Seleccionar modelo"></option>');

		$.get("http://localhost:8000/articles/api/brands/?format=json&brand="+x.val(), function(data) {
			data[0].brandmodel_set.forEach(function(modelo) {
				$.get("http://localhost:8000/articles/api/models/?format=json&model_name="+modelo, function(data) {
					y.append('<option value='+data[0].url+' label='+modelo+'></option>');
				});	
			});
					
		});


	},

	navigate : function (){
		Backbone.app.navigate("product/"+ this.model.get("name"),{trigger : true})
	}
});
