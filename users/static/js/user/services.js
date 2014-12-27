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
      function getArticles() {
        var deferred = $q.defer();

        $http.get('/api/article/')
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
      function setLiked(product) {
        var deferred = $q.defer();

        $http.post('/api/likes/',{"article":product.url})
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function unsetLiked(product) {
        var deferred = $q.defer();

        $http.delete(product.url+"delete_like/")
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function setInterested(product) {
        var deferred = $q.defer();

        $http.post('/api/interesting/',{"article":product.url})
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function unsetInterested(product) {
        var deferred = $q.defer();

        $http.delete(product.url+"delete_interesting/")
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function setFollower(product) {
        var deferred = $q.defer();

        $http.post(product.user.url+'add_follower/',{})
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function unsetFollower(product) {
        var deferred = $q.defer();

        $http.delete(product.user.url+"remove_follower/")
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
       function getFollowers() {
        var deferred = $q.defer();

        $http.get("/api/user/?format=json&list=following")
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
