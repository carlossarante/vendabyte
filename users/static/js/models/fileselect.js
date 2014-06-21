var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	images : [],
	icont: 0,

	sendImages : function(){
		var self = this;
		var formData2 = new FormData();
		if(self.images[self.icont])
		{
			formData2.append("article", this.attributes.articleLoaded.url);
		    formData2.append("art_img", self.images[self.icont],"1.jpg");
		    formData2.append('csrfmiddlewaretoken',Backbone.app.csrftoken('csrftoken'));

		    this.icont +=1;

		    var request = new XMLHttpRequest();
		    request.open("POST", window.location.origin+"/api/picture/");
		    request.onloadend = function(){	  
		    	console.log("RESPUESTAS Y STATUS PICTURES")
				console.log("STATUS:",request.statusText);
				console.log("STATUS:",request.status); 
			    self.sendImages();
	    	}
			request.send(formData2);   	    		
		}	
		else
		{
	    	self.images = [];
	    	self.icont = 0;
	    	self.unset("articleLoaded");	    	
		  	FileList.prototype.cont = 0;
	    	Backbone.app.fileSelectView.render();
	    	Backbone.app.products.reset();
	    	Backbone.app.products.fetch({ 
				success: function(){
	       			console.log('Recuperados ' + Backbone.app.products.length + ' productos');
	    		}
    		});
		}   		
	},	    
});