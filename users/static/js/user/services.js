(function () {

  angular.module('vendabyte.services', [])

    .factory('vendabyteService', ['$http', '$q', '$filter', function ($http, $q, $filter) {

      function getMe() {
        var deferred = $q.defer();

        $http.get('/api/user/?list=me&format=json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getUser(url) {
        var deferred = $q.defer();

        $http.get(url+'?format=json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getArticles(param) {
        var deferred = $q.defer();

        $http.get('/api/article/?format=json&list='+param)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getPageArticles(url) {
        var deferred = $q.defer();

        $http.get(url)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getArticle(url) {
        var deferred = $q.defer();

        $http.get(url)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getDevices() {
        var deferred = $q.defer();

        $http.get('/api/devices/')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getBrands(device) {
        var deferred = $q.defer();

        $http.get("/api/brands/?format=json&device_detail="+device)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getModel(model) {
        var deferred = $q.defer();

        $http.get("/api/models/?format=json&model_name="+model)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getComment(url) {
        var deferred = $q.defer();

        $http.get(url)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function setComment(comment) {
        var deferred = $q.defer();

        $http.post('/api/comment/',comment)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function setLiked(object) {
        var deferred = $q.defer();

        $http.post('/api/likes/', object)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function unsetLiked(object) {
        var deferred = $q.defer();

        $http.delete(object.article +"delete_like/",{
          headers: {
              'X-CSRFToken': $http.defaults.headers.post['X-CSRFToken']
          }
        })
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function setInterested(object) {
        var deferred = $q.defer();

        $http.post('/api/interesting/',object)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function unsetInterested(object) {
        var deferred = $q.defer();

        $http.delete(object.article+"delete_interesting/",{
          headers: {
              'X-CSRFToken': $http.defaults.headers.post['X-CSRFToken']
          }
        })
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function setFollower(url) {
        var deferred = $q.defer();

        $http.post(url+'add_follower/',{})
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function unsetFollower(url) {
        var deferred = $q.defer();

        $http.delete(url+"remove_follower/",{ 
          headers: {
              'X-CSRFToken': $http.defaults.headers.post['X-CSRFToken']
          }
        })
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getDirective(directive) {
        var deferred = $q.defer();

        $http.get("/static/partials/"+directive)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
       function getFollowers(param) {
        var deferred = $q.defer();

        $http.get("/api/user/?format=json&list="+param)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      
      return {
        getUser : getUser,
        getMe : getMe,
        getArticles : getArticles,
        getArticle : getArticle,
        getPageArticles : getPageArticles,
        getDevices : getDevices,
        getBrands : getBrands,
        getModel : getModel,
        getComment : getComment,
        setComment : setComment,
        setLiked : setLiked,
        unsetLiked : unsetLiked,
        setInterested : setInterested,
        unsetInterested : unsetInterested,
        setFollower : setFollower,
        unsetFollower : unsetFollower,
        getDirective : getDirective,
        getFollowers : getFollowers,
      };

    }])
})();
