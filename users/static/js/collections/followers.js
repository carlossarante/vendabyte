var Backbone = require('backbone'),
	Follower = require('../models/follower');

module.exports = Backbone.Collection.extend({
	model : Follower ,
});