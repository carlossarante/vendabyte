var Backbone 	= require('backbone'),
	Handlebars 	= require('handlebars'),
	$ 			= require('jquery'),
	_ 			= require('underscore');
	//Comment = require('../models/comment'),
	//Comments = require('../collections/comments'),
	//CommentsView = require('../views/comments');

module.exports = Backbone.View.extend({
	el : $(".file-browse"),

	events : {
		'change #dropIn' : 'handleFileSelect',
		'change #selectIn' : 'handleFileSelect',
	},

	template : _.template($("#fileSelect-template").html()),

	initialize : function () {
		this.render();
	},

	render : function(){
		var self = this;
		var picture = this.model.toJSON();
		var html = this.template(picture);
		this.$el.html(html);
		return this;
	},	
	handleFileSelect: function(evt) {
		var self = this;
		var filesIn = evt.target.files;
		var el = $(evt.currentTarget);
		var inputId = el.attr('id');
		var articleForm = $('#articleUpload');

		articleForm.removeClass('none');
		//loadBtn = $(".load-button");
		//dropArea= $("#deco");
		readerIn = new FileReader(); //FileReader object

		if (!filesIn[0].type.match('image.*')) {
			alert("Solo se permiten archivos de imagen");
			return;
		} 
		if(filesIn.cont <5)
		{   
			FileList.prototype.cont += 1;
		}
		else{
		  	alert("Solo puede elegir 5 fotos");
		  	return;
		}     

		readerIn.onload = function (e){
			var tempImg = new Image();
			tempImg.src = readerIn.result;
			readerOut = new FileReader();

			tempImg.onload = function() {
			    var MAX_WIDTH = 600;
			    var MAX_HEIGHT = 800;
			    var totalW = tempImg.width;
			    var totalH = tempImg.height;
			    var x,y,newW,newH;
			    if (totalW > totalH) {
			        if (totalW > MAX_WIDTH) {
			        	y=0;
			        	newW = 3*totalH/4;
			        	newH = totalH;
			        	x=(totalW-newW)/2;
			        }
			    } else {
			        if (totalH > MAX_HEIGHT) {
			        	x=0;
			        	newH = 4*totalW/3;
			        	newW = totalW;
			        	y=(totalH-newH)/2;
			        }
			    }
			    var canvas = document.createElement('canvas');
			    canvas.width = MAX_WIDTH;
			    canvas.height = MAX_HEIGHT;
			    var ctx = canvas.getContext("2d");
			    ctx.drawImage(this,x,y,newW,newH,0,0,MAX_WIDTH,MAX_HEIGHT);
			    var dataURL = canvas.toDataURL("image/jpeg");
			    
			    var blob = self.dataURItoBlob(dataURL);
			    readerOut.readAsDataURL(blob);	
			    self.model.images.push(blob);		

			    //self.sendImages();    
			}

			readerOut.onload = function(e) {
				$("#thumbnail"+filesIn.cont).find('img').attr({
			    	src: ''+e.target.result,
			    });
			}
		  	/*$("#thumbnail"+filesIn.cont).find('img').attr({
		    	src: ''+e.target.result,
		  	});*/
		}
		readerIn.readAsDataURL(filesIn[0]);
	},
	dataURItoBlob :	function(dataURI) {
	    // convert base64 to raw binary data held in a string
	    // doesn't handle URLEncoded DataURIs
	    var byteString = atob(dataURI.split(',')[1]);
	   /* var byteString;
	    if (dataURI.split(',')[0].indexOf('base64') >= 0)
	        byteString = atob(dataURI.split(',')[1]);
	    else
	        byteString = unescape(dataURI.split(',')[1]);*/

	    // separate out the mime component
	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	    // write the bytes of the string to an ArrayBuffer
	    var ab = new ArrayBuffer(byteString.length);
	    var ia = new Uint8Array(ab);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }
	    // write the ArrayBuffer to a blob, and you're done
	    var blob = new Blob([ab],{"type":mimeString});
	    return blob
	},
	navigate : function (){
		Backbone.app.navigate("product/"+ this.model.get("name"),{trigger : true})
	},

	
});
