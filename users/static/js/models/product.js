var Backbone = require('backbone'); 

module.exports = Backbone.Model.extend({
	urlRoot : window.location.protocol+"//"+window.location.host+"/api/article/",
});