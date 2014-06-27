var Backbone = require('backbone'); 

module.exports = Backbone.Model.extend({
	urlRoot : window.location.origin+"/api/article/",

	url : function() {
		return this.urlRoot+this.id+"/";
	},

	fetchModel:function(vista){
		var self = this;
		$.ajax({
			    url: this.attributes.model,
			    type: 'GET',
				statusCode: {
			    	200: function(data) {
			    		self.attributes.model=data;
			    		console.log(self.attributes.model);
			    		vista.render();
			    	},	    	
			    	500: function() {
			    		alert("Error al sincronizar con el servidor");
			    	}
			 	}
			});
	}
});