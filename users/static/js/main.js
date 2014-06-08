var Backbone = require('backbone'),
    $ = require('jquery'),
	  Router = require('./routers/router');
	  Backbone.$ = $;

    window.$ = $;
    window.jQuery = $;

$(function(){
  Backbone.app = new Router();
  window.vendabyte = Backbone.app;

  var croppicContaineroutputOptions = {
        uploadUrl:'/static/img_save_to_file.php',
        //cropUrl:'img_crop_to_file.php', 
        outputUrlId:'cropOutput',
        modal:false,
        loaderHtml:'<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> '
    }

  var cropContaineroutput = new Croppic('cropContaineroutput', croppicContaineroutputOptions);     


  function handleFileSelect(evt) {
    var filesIn = evt.target.files; // FileList object
    var el = $(this);
    var inputId = el.attr('id');
    loadBtn = $(".load-button");
    dropArea= $("#deco");
    console.log("Elemento que genera evento", el);
    console.log("ARCHIVOS DENTRO DE EL : ", el.context.files);
    //$.post( "/users/login/", filesIn[0], function(data){console.log(data);});
    reader = new FileReader(); //FileReader object


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

    reader.onload = function (e){
      console.log(reader.result);
      $("#thumbnail"+filesIn.cont).find('img').attr({
          src: ''+e.target.result,
      });
    }

    reader.readAsDataURL(filesIn[0]);
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

