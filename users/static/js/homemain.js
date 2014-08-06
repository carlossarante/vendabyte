var Backbone = require('backbone'),
    $ = require('jquery'),
	  Router = require('./routers/homerouter');
	  Backbone.$ = $;

    //window.$ = $;
    //window.jQuery = $;

$(function(){
  Backbone.app = new Router();
  window.vendabyte = Backbone.app;

  //SCROLL INFINITO //////////////////////////////
  var element = $(".offers-sect");
  element.scroll(function(event) {
    //console.log("POSICION ACUTAL",element.scrollTop())
    var elTop = element.scrollTop(),
    elHeight = $(".products").height(),
    winheight = $(".wrapper").height(),
    scrolltrigger = 0.95;
    //console.log("RESULTADO: ",elTop/(elHeight-winheight));
    if  ((elTop/(elHeight-winheight)) > scrolltrigger) {
      var products = Backbone.app.products;
      if(products.nextPage === null)
      {
        return;
      }
      else
      {
        products.url = products.nextPage;
        //console.log("URL NEXT: ", products.nextPage);
        products.fetch(); 
      }
    }  
  });
  
  ////////////////////////////////////////////////////////

  
  FileReader.prototype.id = 0;
  FileList.prototype.cont = 0;
  //document.getElementById('selectIn').addEventListener('change', handleFileSelect, false);
  //document.getElementById('dropIn').addEventListener('change', handleFileSelect, false);

  function myFunction()
  {
    alert("The form will be submitted");
  }
  var csrftoken = Backbone.app.csrftoken('csrftoken');

  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }
  function sameOrigin(url) {
      // test that a given url is a same-origin URL
      // url could be relative or scheme relative or absolute
      var host = document.location.host; // host + port
      var protocol = document.location.protocol;
      var sr_origin = '//' + host;
      var origin = protocol + sr_origin;
      // Allow absolute or scheme relative URLs to same origin
      return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
          (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
          // or any other URL that isn't scheme relative or absolute i.e relative.
          !(/^(\/\/|http:|https:).*/.test(url));
  }
  $.ajaxSetup({
      beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
              // Send the token to same-origin, relative URLs only.
              // Send the token only if the method warrants CSRF protection
              // Using the CSRFToken value acquired earlier
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
      }
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
          channelUrl: '',
          status: true, // check login status
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: true // parse XFBML
        });

        FB.getLoginStatus(function (response) {
          console.log('FB resp:', response, response.status);
          /* Bind event handler only after Facebook SDK had a nice cup of coffee */
         /*$('.icon-cog').on('click', function () {
            Backbone.app.activeSession.login({
              before: function () {
                console.log('before login()')
              },
              after: function () {
                console.log('after login()')
              }
            });
          });*/
        });
      };
});

