var dom = require('jsdom').jsdom;
var express = require('express');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var app = express();
var baseFolder = path.dirname(require.main.filename);

global.document = dom();
global.window = global.document.defaultView;

function IORouter ($routeProvider, $injector) {
  var baseFile = '/index.html';

  this.base = function (path) {
    baseFile = path;
    return this;
  };

  this.when = function (path, config) {
    var ngConf = _.clone(config);

    Object.keys(config.controller).forEach(function (method) {
      app[method.toLowerCase()](path, function (req, res, done) {
        $injector.invoke(config.controller[method], this, {
          IORequest: req,
          IOResponse: res,
          IOBaseFolder: baseFolder,
          IOBaseFile: baseFile
        });
        // res.sendfile(baseFolder + baseFile);
      });
    });

    if ('GET' in ngConf.controller) {
      ngConf.controller = ngConf.controller.GET;
      $routeProvider.when(path, ngConf);
    }

    return this;
  };

  this.otherwise = function (config) {
    $routeProvider.otherwise(config);

    return this;
  };

  this.$get = function () {

  };
}

module.exports = function (angular) {
  angular.module('angulario', ['ngRoute'])
  .provider('IORouter', IORouter);

  return app;
};
