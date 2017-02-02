# Agenda

_A monthly event manager_

Check out the [DEMO](http://danielemeli.com/agenda)


## Setup
The project is already compiled in the /dist folder. By the way, it you want to compile it by yourself, here is the 3 steps.


 - Install [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/)
 - In the root folder run `npm i` then `gulp build`
 - Run a php server and go into the dist folder with your browser

## Dependencies
Agenda is based on [Vue.js](https://vuejs.org/) for the management of the UI, on [flickity](http://flickity.metafizzy.co/) to controll the months sliding and [lodash](https://lodash.com/) because we always need lodash :)

## Notes
 - Written in HTML5, SASS, ES6 and compiled using gulp. Use `gulp watch` to development purpose. Use `gulp build` to compile for prod.
 - The calendar moves automatically to the current month and the single day view automatically move to the current hour
