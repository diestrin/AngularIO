# Angular.IO

## What is this?

This is an aim to create isomorphic Angular.js code that works in both, back-end and front-end at the same time.
This is thought to be achieved by creating a sort of services and interceptors with ngRoute and others, and connect the Angular config with the Express routing.
Check the [test](https://github.com/diestrin/AngularIO-Test) project to see how this works.

## What do I need to know?

- This is in development beginning, no code is ensure to be working under unexpected circumstances
- The project allows you to provide the Express and Angular version you want
- You need to use ngRoute, no other router is supported so far
- You need to follow a set of rules for the app to work
- This project uses Browserify to consume npm modules from the front-end
- All the apps works with html5mode activated

## API

### IORouter

This service works as a mask for ngRoute and the Express back-end.
It has almost the same API as ngRoute, with some exceptions

#### .base

Define the base file to be used by the application.
This is needed since the routes in Angular are rendered using an HTML as a base, so the Express app needs to know what is going to be the base to use for the rendered sections.

#### .when

Define a new route for both ends
You can use the same parameters that ngRoute allows (and even more if you want, since ngRoute does not complain about extra info), like controllerAs, template, templateUrl, etc.
The special parameters for Angular.IO are:

- controller: The controller field accepts an object or a function only, not a string. If you provide an object, the keys needs to be HTTP method names, like GET, POST, etc. These are going to be used as the controllers for the incoming request with Express. If the value is a function, then a GET only method is assumed.
- policies: This field is to set global policies that affect all the routes. A policy is a function that validates if the request should proceed or not. The values of the array can be a function or an object. If an object is given, the keys should be HTTP methods names, and those are meant to apply for that method only

#### .otherwise

This is just a bridge to ngRoute otherwise method

### IORequest

This service is only available to controllers that respond to a route.
While executing in the front-end it is just an empty object with the functions declared to not fail.
This is meant to be used in the back-end only.

### IOResponse

This service is only available to controllers that respond to a route.
While executing in the front-end it is just an empty object with the functions declared to not fail.
This is meant to be used in the back-end only.


