var Backbone = require('backbone'),
    $ = require('jquery'),
	  Router = require('./routers/router');
	  Backbone.$ = $;

    window.$ = $;
    window.jQuery = $;

$(function(){
  Backbone.app = new Router();
  window.vendabyte = Backbone.app;

  /*var formData = new FormData();

  formData.append("model", "http://localhost:8000/articles/api/models/1/");
  formData.append("short_description", "Excelente");
  formData.append("price", "100");
  formData.append("specs", "El mejor cel de los celulares");
  formData.append('csrfmiddlewaretoken',Backbone.app.csrftoken('csrftoken'));

  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:8000/articles/api/article/");
  request.send(formData);*/
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

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString = atob(dataURI.split(',')[1]);
   /* var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);*/

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab],{"type":mimeString});
    window.blob = blob;
    return blob
  }

  function handleFileSelect(evt) {
    var filesIn = evt.target.files;
    var el = $(this);
    var inputId = el.attr('id');
    loadBtn = $(".load-button");
    dropArea= $("#deco");
    readerIn = new FileReader(); //FileReader object

    if (!filesIn[0].type.match('image.*')) {
        alert("Solo se permiten archivos de imagen");
        return;
      } 

    if(filesIn.cont <5)
    {
      el.attr({
        id : 'file'+(filesIn.cont+1),
        class : "none"
      });
      $(".upload-box").prepend(el);
      if(inputId === "selectIn"){
        loadBtn.prepend('<input type="file" id="selectIn" value="Submit" class="button relative">');
      }
      else{
        dropArea.prepend('<input type="file" id="dropIn" value="Submit" class="dropArea absolute">');
      }      
      document.getElementById(inputId).addEventListener('change', handleFileSelect, false);      

      FileList.prototype.cont += 1;
    }
    else{
      alert("Solo puede elegir 5 fotos");
      return;
    }     

    readerIn.onload = function (e){
      var tempImg = new Image();
      tempImg.src = readerIn.result;
      readerOut = new FileReader();

      tempImg.onload = function() {

        var MAX_WIDTH = 800;
        var MAX_HEIGHT = 600;
        var tempW = tempImg.width;
        var tempH = tempImg.height;
        if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
               tempH *= MAX_WIDTH / tempW;
               tempW = MAX_WIDTH;
            }
        } else {
            if (tempH > MAX_HEIGHT) {
               tempW *= MAX_HEIGHT / tempH;
               tempH = MAX_HEIGHT;
            }
        }

        var canvas = document.createElement('canvas');
        canvas.width = tempW;
        canvas.height = tempH;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, tempW, tempH);
        var dataURL = canvas.toDataURL("image/jpeg");
        
        var blob = dataURItoBlob(dataURL);
        blob.name = "pepsi";
        readerOut.readAsDataURL(blob);

        var formData2 = new FormData();

        formData2.append("article", "http://localhost:8000/articles/api/article/4/");
        formData2.append("art_img", blob);
        formData2.append("art_img", blob);
        formData2.append('csrfmiddlewaretoken',Backbone.app.csrftoken('csrftoken'));

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8000/articles/api/picture/");
        request.send(formData2);
      }

      readerOut.onload = function(e) {
        $("#thumbnail"+filesIn.cont).find('img').attr({
          src: ''+e.target.result,
        });
      }
      /*$("#thumbnail"+filesIn.cont).find('img').attr({
          src: ''+e.target.result,
      });*/
    }
    readerIn.readAsDataURL(filesIn[0]);
  }
  FileReader.prototype.id = 0;
  FileList.prototype.cont = 0;
  document.getElementById('selectIn').addEventListener('change', handleFileSelect, false);
  document.getElementById('dropIn').addEventListener('change', handleFileSelect, false);

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

