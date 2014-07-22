var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	urlRoot : window.location.origin+"/api/user/",

	url : function() {
		return this.urlRoot+this.id+"/";
	},
});