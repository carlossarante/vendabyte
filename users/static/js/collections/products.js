var Backbone = require('backbone'),
	Product	= require('../models/product');


module.exports = Backbone.Collection.extend({ 
	model : Product ,
});