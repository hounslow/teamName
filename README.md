# team-name

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.3.0.

## Getting Started

### Quick Start
1. Run 
2. run
3. Run
4. 

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

### Testing

Running `npm test` will run the unit tests with Karma.

Karma will be used to test the site, and in some cases we will run end-to-end testing.

End To End testing will be applied by using an automated tool (or manual running of sites) to determine whether or not simple tasks will run on the site. Failure of an end-to-end test will indicate a larger problem with how the website works.

Karma is a test runner that applies unit tests to verify behaviour. 

First, We will inject dependencies onto our functions as listed in the AngularJS documentation (https://docs.angularjs.org/guide/di).

We can use `describe(...)` which tells us the name of the test
`it(...)` which will tell us what the test is doing
`beforeEach` can be done to instantiate an object before the test runs, and then `expect` can be used to verify the behaviour of the function is as expected.

For example, we can use beforeEach to create a new user. We can then run expects on the current password, change the user's password, and then verify that the password has been changed correctly using the expect function. Expectation can also be helped with `expect(user.getPassword().to.equal(value);`, where 'to.equal' will give us the form.

We will also test controllers using Karma. This will allow us to verify the type of object that is being created by the controller is what is needed. For example, we can run `expect(controller.User).to.be.an.instanceOf(User);` to verify that the object being created is of the right type.

As per our testing to be started at a later date, this testing will be implemented to ensure that our Tasks are completed for testing.





