var Backbone    = require('backbone'),
    //Handlebars  = require('handlebars'),
    $           = require('jquery'),
    FollowerView = require('../views/follower');

module.exports = Backbone.View.extend({
      el: $(".followers-sect"),

      initialize: function () {
        this.listenTo(this.collection, "add", this.addOne, this);
        this.listenTo(this.collection, "reset", this.render, this);
      },

      render: function () {
        this.$el.empty();
        this.addAll();
      },

      addOne: function (follower) {
        var followerView = new FollowerView({ model : follower });
        this.$el.append(followerView.render().el);
      },

      addAll: function () {
        this.collection.forEach(this.addOne,this);
      }
});