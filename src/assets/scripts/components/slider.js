'use strict';
const Flickity = require('flickity');

class Slider {
  constructor() {
    this.slider = document.querySelector('[data-slider]');
    if(!this.slider) return;
    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.currentMonth = new Date().getMonth();
    this.monthNameDiv = document.querySelector('[data-month-name]');
    this.init();
  }
};

Slider.prototype.init = function () {
  this.flkty = new Flickity( this.slider, {
    cellAlign: 'center',
    contain: true,
    pageDots: false
  });

  this.flkty.select( this.currentMonth );
  this.updateMonthName();
  this.flkty.on( 'select', this.updateMonthName.bind(this));
};

Slider.prototype.updateMonthName = function () {
  this.monthNameDiv.innerHTML = this.monthNames[this.flkty.selectedIndex];
};

module.exports = Slider;
