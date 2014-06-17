var Backbone    = require('backbone'),
    //Handlebars  = require('handlebars'),
    $           = require('jquery'),
    BadgetView = require('../views/badget');

module.exports = Backbone.View.extend({
      el: $(".badgets-cont"),

      initialize: function () {
        this.listenTo(this.collection, "add", this.addOne, this);
        this.listenTo(this.collection, "reset", this.render, this);
      },

      render: function () {
        this.$el.empty();
        this.$el.html('<span class="badget-tittle">Mis Badgets</span>');
        this.addAll();
      },

      addOne: function (badget) {
        var badgetView = new BadgetView({ model : badget });
        this.$el.append(badgetView.render().el);
      },

      addAll: function () {
        this.collection.forEach(this.addOne,this);
      }
});