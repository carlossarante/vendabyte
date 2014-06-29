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

  login: function (opts) {
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
              json={};
              json.email = _session.attributes.email;
              json.facebook_uid = _session.attributes.id;
              //json.csrfmiddlewaretoken=csrftoken;
              json.first_name = _session.attributes.first_name;
              json.last_name = _session.attributes.last_name;
              var split=_session.attributes.email.split("@",1);
              //json.username = split.join();
             // json.photo = _session.attributes.picture.data.url;
              //json.cover = _session.attributes.cover.source;
              json.sex = _session.attributes.gender;
              json.birthday = "1988-04-24";
              split=  _session.attributes.location.name.split(",",1);
              $.get('/api/cities/?city_name='+split.join(), function(data) {
                json.city = data[0].url;
                  console.log("JSON ENVIADO USER:", json);
                  $.ajax({
                    url: "/api/user/",
                    type: 'POST',
                    data: json,
                    statusCode: {
                      201:function(data){
                        alert(data);
                        console.log("respuesta POST:",data);
                        window.location.href = data;
                      },
                      404:function(data){                        
                      },
                    },
                }); 
              });                    
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
          callback(null, response);
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

