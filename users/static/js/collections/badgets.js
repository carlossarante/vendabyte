var Backbone = require('backbone'),
	Badget	= require('../models/badget');


module.exports = Backbone.Collection.extend({ 
	model : Badget,
});