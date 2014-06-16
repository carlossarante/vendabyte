var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	urlRoot : "/articles/api/devices/?format=json",

	submitForm : function(e) {
		var formData = new FormData(document.getElementById('articleUpload'));
		formData.append('csrfmiddlewaretoken',Backbone.app.csrftoken('csrftoken'));

		var request = new XMLHttpRequest();
		request.open("POST", "http://localhost:8000/articles/api/article/");
		request.onerror = function (argument) {
			alert("error");
		}
		request.onload = function (argument) {
			console.log("STATUS:",request.statusText);
			console.log("STATUS:",request.status);
			console.log("RESPONSE:",request.responseText);
			console.log("RESPONSE:",request.responseXML);
		}
		request.onloaden = function (argument) {
			alert("end");
		}
		window.request=request;
		request.send(formData);

	},

	fetchBrands : function(x){
		y = $(".brand-select");
		z = $(".model-select");
		y.html('<option value="" selected disabled="disabled" label="Seleccionar marca"></option>');
		z.html('<option value="" selected disabled="disabled" label="Seleccionar modelo"></option>');

		$.get("http://localhost:8000/articles/api/devices/?format=json&device_detail="+x.val(), function(data) {
			data[0].brand_set.forEach(function(argument) {
				y.append('<option value='+argument+' label='+argument+'></option>');
			})
		});
	},

	fetchModels : function(x){
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
});