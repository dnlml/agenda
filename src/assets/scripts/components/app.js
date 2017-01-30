'use strict';

const Vue = require('vue/dist/vue.js');

class App {
  constructor() {
    this.init();
  }
};

App.prototype.init = function () {

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

  Vue.component('day', {
    template: `
      <div class="day">
        <div class="day__header">12 January 2017</div>
        <ul class="day__hour__list" @click="manageEvent">
          <hour v-for="hour in this.$root.$data.hours" :hour="hour" :events="events"></hour>
        </ul>
      </div>
    `,
    data() {
      return {
        events: this.$root.$data.events
      }
    },
    methods: {
      manageEvent(e) {
        const eventAdd = e.target.dataset.eventAdd || e.target.parentElement.dataset.eventAdd;
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
        const time = this.$root.$data.newEventTime || eventAdd;
        const title = this.$root.$data.newEventTitle || 'Title temp';
        const description = this.$root.$data.newEventDescription || 'temp description';
        this.$root.$data.progressiveId += 1;
        this.events.push({
          day: day,
          month: month,
          time: time,
          title: title,
          description: description,
          id: this.$root.$data.progressiveId
        });
      }
    }
  });

  Vue.component('modal', {
    template: `
      <div class="modal">
        <form>
          Event name: <br> <input type="text" name="title"> <br>
          Event Description: <br><textarea name="description" id="" cols="30" rows="10"></textarea>
          <fieldset>
            <input type="submit" value="Cancel">
            <input type="submit" value="Add">
          </fieldset>
        </form>
      </div>
    `
  });

  new Vue({
    el: '#root',
    data() {
      return {
        hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        progressiveId: 3,
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
          },
          {
            day: 27,
            month: 1,
            time: 3,
            title: 'Event Title 3',
            description: 'This is a short description',
            id: 3
          }
        ]
      }
    }
  });
};

module.exports = App;
