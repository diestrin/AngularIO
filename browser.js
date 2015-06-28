function IORouter ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  this.base = function (path) {
    return this;
  };

  this.when = function (path, config) {
    config.controller = config.controller.GET;
    $routeProvider.when(path, config);

    return this;
  };

  this.otherwise = function (config) {
    $routeProvider.otherwise(config);

    return this;
  };

  this.$get = function () {

  };
}

function IORequest () {

};

function IOResponse () {
  this.sendFile = function () {};
};

module.exports = function (angular) {
  angular.module('angulario', ['ngRoute'])
  .provider('IORouter', IORouter)
  .service('IORequest', IORequest)
  .service('IOResponse', IOResponse)
  .constant('IOBaseFolder', '')
  .constant('IOBaseFile', '');
};
