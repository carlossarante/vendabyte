var Backbone = require('backbone'),
	Product	= require('../models/product');


module.exports = Backbone.Collection.extend({ 
	model : Product ,
	fetch:function(){
        var self = this;
        $.ajax({
          url: self.url,
          type: 'GET',
          statusCode: {
            200:function(data){            	
              	self.add(data.results);
             	console.log('Recuperados ' + Backbone.app.products.length + ' productos');
             }
          }
        });
     },
});