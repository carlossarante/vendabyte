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

      function getModel() {
        var deferred = $q.defer();

        $http.get('/schedules/')
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
      return {
        getUser : getUser,
        getMe : getMe,
        getArticles : getArticles,
        getModel : getModel,
        setComment : setComment,
        setLiked : setLiked,
        unsetLiked : unsetLiked,
        setInterested : setInterested,
        unsetInterested : unsetInterested,
        setFollower : setFollower,
        unsetFollower : unsetFollower,
      };

    }])
})();
