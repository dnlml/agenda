'use strict';

const Vue = require('vue/dist/vue.js');
const forEach = require('lodash/forEach');

class App {
  constructor() {
    this.init();
  }
};

App.prototype.init = function () {
  window.Event = new Vue();

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
      toggleVisibility(hour, day, month) {
        console.log(hour, day, month);
        this.isVisible = true;
        this.day = day;
        this.month = month;
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
      <li class="day__hour__item" :data-event-hour="hour" :data-event-day="day" :data-event-month="month" :events="events">
        <span>{{hour}}h</span>
        <event v-for="event in events" v-if="event.time == hour && event.day == day && event.month == month" :title="event.title" :event-id="event.id"></event>
      </li></div>
    `
  });

  Vue.component('day', {
    template: `
      <div class="day" v-show="isVisible">
        <div class="day__header">{{d}} {{mName}} <div class="day__header__close" @click="hideDay">x</div></div>
        <ul class="day__hour__list" @click="manageEvent">
          <hour v-for="hour in this.$root.$data.hours" :hour="hour" :day="d" :month="mNumber" :events="events"></hour>
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
        const eventHour = e.target.dataset.eventHour || e.target.parentElement.dataset.eventHour;
        const eventDay = e.target.dataset.eventDay || e.target.parentElement.dataset.eventDay;
        const eventMonth = e.target.dataset.eventMonth || e.target.parentElement.dataset.eventMonth;

        const eventRemove = e.target.dataset.eventRemove;
        if (eventRemove) this.removeEvent(eventRemove);
        if (eventHour) this.addEvent(eventHour, eventDay, eventMonth);
      },
      removeEvent(eventRemove){
        this.$root.$data.events = this.$root.$data.events.filter( el => el.id != eventRemove);
        this.events = this.$root.$data.events;
      },
      addEvent(eventHour, eventDay, eventMonth) {
        window.Event.$emit('openPop', eventHour, eventDay, eventMonth, this);
      },
      showDay (d,m) {
        this.isVisible = true;
        this.d = d;
        this.mNumber = m;
        this.mName = this.months[m - 1];
      },
      hideDay () {
        this.isVisible = false;
      }
    }
  });

  Vue.component('calendar-day', {
    props: ['day', 'month'],
    template: `
      <li @click="eventManager" :class="hasEvent()"><slot></slot></li>
    `,
    data () {
      return {
        events: this.$parent.$data.events
      }
    },
    methods: {
      eventManager () {
        window.Event.$emit('openDay', this.day, this.month);
      },
      hasEvent () {
        let tmpClass = '';
        forEach(this.events, el => {
          if(el.day == this.day && el.month == this.month ) {
            tmpClass = 'calendar__day__item--event';
          }
        });
        return tmpClass;
      }
    }
  });

  new Vue({
    el: '#root',
    data: {
      hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      progressiveId: 4,
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
        },
        {
          day: 29,
          month: 1,
          time: 4,
          title: 'Event Title 4',
          description: 'This is a short description',
          id: 4
        }
      ]
    }
  });
};

module.exports = App;
