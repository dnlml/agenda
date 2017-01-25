const WebFont = require('webfontloader');
const Slider = require('./components/slider');

class App {
  constructor () {
    this.init();
  }
}

App.prototype.init = function () {
  new Slider();
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
