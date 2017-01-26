'use strict';

const Vue = require('vue/dist/vue.js');

class EventManager {
  constructor() {
    this.init();
  }
};

EventManager.prototype.init = function () {
  new Vue({
    el: '#root',
    data: {
      hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      progressiveId: 2,
      newEventTime: '',
      newEventTitle: '',
      newEventDescription: '',
      events: [
        {
          time: 3,
          title: 'Event Title 1',
          description: 'This is a short description',
          id: 1
        },
        {
          time: 5,
          title: 'Event Title 2',
          description: 'This is another short description',
          id: 2
        }
      ]
    },
    methods: {
      manageEvent(e) {
        const eventAdd = e.target.dataset.eventAdd;
        const eventRemove = e.target.dataset.eventRemove;
        if (eventRemove) this.removeEvent(eventRemove);
        if (eventAdd) this.addEvent(eventAdd);
      },
      removeEvent(eventRemove){
        this.events = this.events.filter( el => el.id != eventRemove);
      },
      addEvent(eventAdd) {
        const time = this.newEventTime || eventAdd;
        const title = this.newEventTitle || 'Title temp';
        const description = this.newEventDescription || 'temp description';
        this.progressiveId += 1;
        this.events.push({
          time: time,
          title: title,
          description: description,
          id: this.progressiveId
        });
      }
    }
  });
};

// EventManager.prototype.EventManager = function () {

// };

module.exports = EventManager;
