var Backbone = require('backbone'),
	Router = require('./routers/router'),
	$ = require('jquery');
	Backbone.$ = $;

$(function(){
  Backbone.app = new Router();
});

  function handleFileDropped(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    FileReader.prototype.id = 0;
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0; i < files.length && i <5; i++) {
      var f = files[i];
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }      
      var reader = new FileReader();
      reader.id = i+1;
      console.log(reader);

      // Closure to capture the file information.
      reader.onload = function (e){
        console.log("estos si es loco  " + files.length);
        $("#file"+e.target.id).children('img').attr({
            src: ''+e.target.result,
        });
      }

      //Read in the image file as a data URL.
      reader.readAsDataURL(f);
  }
}

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('deco');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileDropped, false);

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    
    console.log(document.getElementById("fichero").files = files);
    console.log(files);
    FileReader.prototype.id = 0;
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0; i < files.length && i <5; i++) {
      var f = files[i];
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }      
      var reader = new FileReader();
      reader.id = i+1;
      console.log(reader);

      // Closure to capture the file information.
      reader.onload = function (e){
        console.log("estos si es loco  " + files.length);
        $("#file"+e.target.id).children('img').attr({
            src: ''+e.target.result,
        });
      }

      //Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


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