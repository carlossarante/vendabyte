var Backbone = require('backbone'),
	Product	= require('../models/product');


module.exports = Backbone.Collection.extend({ 
	model : Product ,
  nextPage:"",
  prevPage:"",
	fetch:function(){
    var self = this;
    $.ajax({
      url: self.url,
      type: 'GET',
      statusCode: {
        200:function(data){            	
         	self.add(data.results);
          self.nextPage = data.next;
          self.prevPage = data.previous;
         	console.log('Recuperados ' + Backbone.app.products.length + ' productos');
        }
      }
    });
  },
});