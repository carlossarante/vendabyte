var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	urlRoot : window.location.origin+"/api/comment/",
	
	url : function() {
		return this.urlRoot+this.id+"/";
	},
});