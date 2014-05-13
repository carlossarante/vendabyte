var Backbone = require('backbone'),
	Router = require('./routers/router'),
	$ = require('jquery');
	Backbone.$ = $;

$(function(){
  Backbone.app = new Router();
});

(function (d) {
        var js, id = 'facebook-jssdk',
          ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
      }(document));

      window.fbAsyncInit = function () {
        FB.init({
          appId: '212602532249853',
          channelUrl: '//your/path/to/channel.php',
          status: true, // check login status
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: true // parse XFBML
        });

        FB.getLoginStatus(function (response) {
          console.log('FB resp:', response, response.status);
          /* Bind event handler only after Facebook SDK had a nice cup of coffee */
          $('#btnLogin').on('click', function () {
            window.activeSession.login({
              before: function () {
                console.log('before login()')
              },
              after: function () {
                console.log('after login()')
              }
            });
          });
        });

      };