const WebFont = require('webfontloader');
const Slider = require('./components/slider');
const App = require('./components/app');

class Agenda {
  constructor () {
    this.init();
  }
}

Agenda.prototype.init = function () {
  new App();
  new Slider();
}

document.addEventListener('DOMContentLoaded', function () {

  // Webfont loading to avoid FOUT
  WebFont.load({
    custom: {
      families: ['title', 'subtitle']
    },
    active: function () {
      new Agenda();
    },
    inactive: function () {
      new Agenda();
    }
  });
});
