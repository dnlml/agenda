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
    this.backToCurrent = document.querySelector('[data-current-month]');
    this.init();
  }
};

Slider.prototype.init = function () {
  this.flkty = new Flickity( this.slider, {
    cellAlign: 'center',
    contain: true,
    pageDots: false,
    initialIndex: this.currentMonth,
    draggable: false,
    prevNextButtons: false
  });
  this.addNav();
  this.updateMonthName();
  this.flkty.on( 'select', this.updateMonthName.bind(this));
  this.eventManager();
};

Slider.prototype.addNav = function () {
  this.navigateFn = this.navigate.bind(this);
  this.header = document.querySelector('[data-calendar-header]');
  this.header.addEventListener('click', this.navigateFn);
};

Slider.prototype.navigate = function (e) {
  const direction = e.target.dataset.calendarNav || 0;
  if(!direction) return;
  if(direction === 'next') this.flkty.next();
  if(direction === 'prev') this.flkty.previous();
};

Slider.prototype.updateMonthName = function () {
  this.monthNameDiv.innerHTML = this.monthNames[this.flkty.selectedIndex];
};

Slider.prototype.eventManager = function () {
  this.backToCurrent.addEventListener('click', () => {
    this.flkty.select( this.currentMonth );
  });
};

module.exports = Slider;
