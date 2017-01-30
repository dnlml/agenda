'use strict';

const Vue = require('vue/dist/vue.js');

class EventManager {
  constructor() {
    this.init();
  }
};

EventManager.prototype.init = function () {

  Vue.component('event', {
    props: ['title', 'event-id'],
    template: `
      <div class="day__hour__item__event">
        {{title}}
        <div class="day__hour__item__event__close" :data-event-remove="eventId">x</div>
      </div>
    `
  });

  Vue.component('hour', {
    props: ['hour', 'events'],
    template: `<div>
      <li class="day__hour__item" :data-event-add="hour" :events="events">
        <span>{{hour}}h</span>
        <event v-for="event in events" v-if="event.time == hour " :title="event.title" :event-id="event.id"></event>
      </li></div>
    `
  });

  new Vue({
    el: '#root',
    data: {
      hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      progressiveId: 2,
      newEventDay: '',
      newEventMonth: '',
      newEventTime: '',
      newEventTitle: '',
      newEventDescription: '',
      events: [
        {
          day: 27,
          month: 1,
          time: 3,
          title: 'Event Title 1',
          description: 'This is a short description',
          id: 1
        },
        {
          day: 27,
          month: 1,
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
        const day = 27;
        const month = 1;
        const time = this.newEventTime || eventAdd;
        const title = this.newEventTitle || 'Title temp';
        const description = this.newEventDescription || 'temp description';
        this.progressiveId += 1;
        this.events.push({
          day: day,
          month: month,
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
