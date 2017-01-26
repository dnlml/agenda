const WebFont = require('webfontloader');
const Slider = require('./components/slider');
const EventManager = require('./components/eventManager');

class App {
  constructor () {
    this.init();
  }
}

App.prototype.init = function () {
  new Slider();
  new EventManager();
}

document.addEventListener('DOMContentLoaded', function () {
  WebFont.load({
    custom: {
      families: []
    },
    active: function () {
      new App();
    },
    inactive: function () {
      new App();
    }
  });
});
