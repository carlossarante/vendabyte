var Backbone  = require('backbone'),
  Handlebars  = require('handlebars'),
  $           = require('jquery'),
  _           = require('underscore'),
  async       = require('async');

module.exports= Backbone.Model.extend({
  defaults: {
    id: null,
    third_party_id: null,
    name: null,
    email: null,    
    first_name:null,
    last_name:null,
    picture:null,
    cover:null,
    birthday:null,
    gender:null,
    location:null,
    status: 0
  },

  isAuthorized: function () {
    /* true if third_party_id exists */
    return Boolean(this.get("third_party_id"));
  },

  logout: function () {
    /* destroy session */
    Backbone.app.activeSession.id = "";
    Backbone.app.activeSession.clear();
    FB.logout();
    console.log('logout done!');
  },

  verificate:function(event,username) {
    var msg = $("#verMSG");
    console.log("ESTOY DENTRO");
    $.ajax({
        url: "/users/check_user/",
        type: 'POST',
        data: {"username": username},
        statusCode: {
          200:function(data){
            console.log("respuesta VERIFICACION POST:",data.responseText)
            msg.html("Disponible");
            msg.removeClass('none');
          },
          409:function(data){
            console.log("respuesta VERIFICACION POST:",data.responseText)
            msg.html("Usuario ya existe");
            msg.removeClass('none');
          },
        },
    }); 
  },

  login: function (opts) {
    var username = $("#username"),
        self=this;

    username.focusout(function(event) {
      self.verificate(event,username.val());
    });
    username.keypress(function(event) {      
      if(event.charCode === 13){
        self.verificate(event,username.val());
      }
    });
    console.log('#########\n login called.\n###########');
    //console.log(opts);

    /* run optional passed user func */
    //opts.before && opts.before();

    _session = this;
    this._onALWAYS = function () {
      //opts.after && opts.after();
    };
    this._onERROR = function () {
      console.log('this._onERROR with result:', result);
    };

    this._onSUCCESS = function (result) {
      var csrftoken = Backbone.app.csrftoken('csrftoken');
      var json={};
      console.log('this._onSUCCESS with result:', result);
      console.log(_session.get('third_party_id'));
      json.email = _session.attributes.email;
      json.facebook_uid = _session.attributes.id;
      //json.csrfmiddlewaretoken=csrftoken;
      console.log(json);
      $.ajax({
          url: "/users/login/",
          type: 'POST',
          data: json,
          /*success:function(data){
            console.log("respuesta POST:",data);
            //window.location.href = data;},
          },*/
          statusCode: {
            200:function(data){
              console.log("respuesta POST:",data);
              window.location.href = data;
            },
            404:function(data){
              var form = document.forms[0]; 
              json={};
              json.email = _session.attributes.email;
              json.facebook_uid = _session.attributes.id;
              //json.csrfmiddlewaretoken=csrftoken;
              json.first_name = _session.attributes.first_name;
              json.last_name = _session.attributes.last_name;
              var split=_session.attributes.email.split("@",1);
              //json.username = split.join();
              json.photo_url = _session.attributes.picture.data.url;
              json.cover_url = _session.attributes.cover.source;
              json.sex = _session.attributes.gender;
              json.birthday = "1988-04-24";
              window.datos = _session.attributes;
              //split=  _session.attributes.location.name.split(",",1);

              y = $('.city-select');
              $.get('/api/cities/?format=json', function(data) {
                data.forEach(function(argument) {
                  y.append('<option value="'+argument.url+'" label= "'+argument.city_name+'"></option>');
                })
              });

              $("#registerUser").removeClass('none');

              form.onsubmit = function(){                
                //json.birthday = $("#year").val()+"-"+$("#month").val()+"-"+$("#day").val();
                json.birthday = $("#datepicker").val();
                json.city = $(".city-select").val();
                json.username = $("#username").val();               

                $.ajax({
                    url: "/api/user/",
                    type: 'POST',
                    data: json,
                    statusCode: {
                      200:function(data){
                        console.log("respuesta POST:",data);
                        window.location.href = data;
                      },
                      404:function(data){                        
                      },
                    },
                }); 
                return false;
              }
             /* $.get('/api/cities/?format=json', function(data) {
                json.city = data[0].url;
                  console.log("JSON ENVIADO USER:", json);
                  $.ajax({
                    url: "/api/user/",
                    type: 'POST',
                    data: json,
                    statusCode: {
                      200:function(data){
                        console.log("respuesta POST:",data);
                        window.location.href = data;
                      },
                      404:function(data){                        
                      },
                    },
                }); 
              }); */                   
            },
          },
      }); 
    };

    this._getuserdata = function (callback) {
      console.log('_getuserdata called;');
      /* Here you can assemble a query */
      FB.api('me?fields=id,name,third_party_id,email,first_name,last_name,birthday,picture,cover,gender,location', function (response) {
        if (!response || response.error) {
          callback(true, response.error);
        } else {
          console.log('"/me" query success where username is ' + response['name'] + '.', response);
          FB.api('me/picture?width=300', function (response2) {
            if (!response2 || response2.error) {
              callback(true, response2.error);
            } else {
              response.picture = response2;
              callback(null, response);
            }
          });          
        }
      });
    };

    this._savesession = function (user, callback) {
      console.log('_savesession called, user data:', user);
      /* if third_party_id exist its totally okay */
      if (user['third_party_id']) {
        _session.set({
          id: user['id'],
          third_party_id: user['third_party_id'],
          name: user['name'],
          email: user['email'],
          first_name:user['first_name'],
          last_name:user['last_name'],
          picture:user['picture'],
          cover:user['cover'],
          birthday:user['birthday'],
          gender:user['gender'],
          location: user['location'],
          status: "1"
        }, {
          silent: true
        });
        callback(null, "Everything is wonderful.");
      } else {
        callback(true, "third_party_id check failed!");
        return false;
      }
    }

    FB.login(function (response) {
      console.log("vive vive")
      console.log(response);
      if (response.authResponse) {
        console.log('Fetching authResponse information.... ');

        /* Use async.js to run async functions in a row */
        async.waterfall([
        _session._getuserdata,
        _session._savesession,
        /* optionally here you can include _session.save() -> this will push cookies (including auth_token) to the server */
         ], function (err, result) {
          console.log('Queue finished. Error occured:', err, ' result:', result); !! err && _session._onERROR(result); !! !err && _session._onSUCCESS(result);
          _session._onALWAYS(result);
        });

      } else {
        _session._onERROR('User cancelled login or did not fully authorize.');
      }
    }, {
      scope: 'email,user_likes'
    });
  }
});

