var Backbone    = require('backbone'),
    //Handlebars  = require('handlebars'),
    $           = require('jquery'),
    ProductView = require('../views/product');

module.exports = Backbone.View.extend({
      el: $(".products"),

      initialize: function () {
        this.listenTo(this.collection, "add", this.addOne, this);
        this.listenTo(this.collection, "reset", this.render, this);
      },

      render: function () {
        this.$el.empty();
        this.addAll();
      },

      addOne: function (product) {
        var productView = new ProductView({ model : product });
        this.$el.append(productView.render().el);
      },

      addAll: function () {
        this.collection.forEach(this.addOne,this);
      }
});