'use strict';

const Vue = require('vue/dist/vue.js');

class App {
  constructor() {
    this.init();
  }
};

App.prototype.init = function () {
  window.Event = new Vue();

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
    props: ['hour', 'events', 'day', 'month'],
    template: `<div>
      <li class="day__hour__item" :data-event-add="hour" :events="events">
        <span>{{hour}}h</span>
        <event v-for="event in events" v-if="event.time == hour && event.day == day && event.month == month" :title="event.title" :event-id="event.id"></event>
      </li></div>
    `
  });

  Vue.component('day', {
    template: `
      <div class="day" v-show="isVisible">
        <div class="day__header">{{d}} {{mName}} </div>
        <ul class="day__hour__list" @click="manageEvent">
          <hour v-for="hour in this.$root.$data.hours" :hour="hour" :events="events" :day="d" :month="mNumber"></hour>
        </ul>
      </div>
    `,
    data() {
      return {
        events: this.$root.$data.events,
        isVisible: false,
        d: '',
        mNumber: '',
        mName: '',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      }
    },
    created (){
      window.Event.$on('openDay', this.showDay);
    },
    methods: {
      manageEvent(e) {
        const eventAdd = e.target.dataset.eventAdd || e.target.parentElement.dataset.eventAdd;
        const eventRemove = e.target.dataset.eventRemove;
        if (eventRemove) this.removeEvent(eventRemove);
        if (eventAdd) this.addEvent(eventAdd);
      },
      removeEvent(eventRemove){
        this.$root.$data.events = this.$root.$data.events.filter( el => el.id != eventRemove);
        this.events = this.$root.$data.events;
      },
      addEvent(eventAdd) {
        window.Event.$emit('openPop', eventAdd, this);
      },
      showDay (d,m) {
        this.isVisible = true;
        this.d = d;
        this.mNumber = m;
        this.mName = this.months[m - 1];
      }
    }
  });

  Vue.component('modal', {
    template: `
      <div class="modal" v-show="isVisible">
        Event name: <br> <input type="text" name="title" v-model="eventName"> <br>
        Event Description: <br><textarea name="description" id="" cols="30" rows="10" v-model="eventDescription"></textarea>
        <div>
          <button @click="cancel">Cancel</button>
          <button @click="saveEvent"> Add </button>
        </div>
      </div>
    `,
    data () {
      return {
        isVisible: false,
        eventName: 'New event',
        eventDescription: 'New event description'
      }
    },
    created() {
      window.Event.$on('openPop', this.toggleVisibility)
    },
    methods: {
      toggleVisibility(hour) {
        this.isVisible = true;
        this.day = 27;
        this.month = 1;
        this.time = hour;
        this.progressiveId = this.$root.$data.progressiveId += 1;
      },
      saveEvent () {
        this.$root.$data.events.push({
          day: this.day,
          month: this.month,
          time: this.time,
          title: this.eventName,
          description: this.eventDescription,
          id: this.progressiveId
        });

        this.isVisible = false;
        this.eventName = 'New event';
        this.eventDescription = 'New event description';
      },
      cancel () {
        this.isVisible = false;
      }
    }
  });

  Vue.component('calendar-day', {
    props: ['day', 'month'],
    template: `
      <li @click="eventManager"><slot></slot></li>
    `,
    methods: {
      eventManager () {
        window.Event.$emit('openDay', this.day, this.month);
      }
    }
  });

  new Vue({
    el: '#root',
    data: {
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
  });
};

module.exports = App;
