var Backbone = require('backbone'),
	Comment	= require('../models/comment');

module.exports = Backbone.Collection.extend({ model : Comment});