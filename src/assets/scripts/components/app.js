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
      <div :class="className">
        <div class="modal__header">Add new Event</div>
        <div class="modal__body">
          Event name: <input class="modal__input--text" type="text" name="title" v-model="eventName" placeholder="New event">
          Event Description: <textarea class="modal__input--textarea" name="description" id="" cols="30" rows="10" v-model="eventDescription" placeholder="Enter description"></textarea>
        </div>
        <div class="modal__footer">
          <button class="modal__footer__cancel" @click="cancel">Cancel</button>
          <button class="modal__footer__add" @click="saveEvent"> Add </button>
        </div>
      </div>
    `,
    data () {
      return {
        className: 'modal',
        eventName: '',
        eventDescription: ''
      }
    },
    created() {
      window.Event.$on('openModal', this.toggleVisibility)
    },
    methods: {
      toggleVisibility(hour, day, month) {
        this.className = 'modal anim';
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
          title: this.eventName || 'New event',
          description: this.eventDescription || 'New event description',
          id: this.progressiveId
        });
        this.cancel();
      },
      cancel () {
        this.className = 'modal';
        this.eventName = '';
        this.eventDescription = '';
        window.Event.$emit('closeModal');
      }
    }
  });

  Vue.component('event', {
    props: ['title','description','event-id'],
    template: `
      <div class="day__hour__item__event">
        <div class="day__hour__item__event__title">{{title}}</div>
        <div class="day__hour__item__event__description">{{description}}</div>
        <div class="day__hour__item__event__close" :data-event-remove="eventId" @click="removeEvent(eventId)">x</div>
      </div>
    `,
    methods: {
      removeEvent(eventId) {
        window.Event.$emit('closeModal');
        this.cleanData(eventId);
      },
      cleanData(eventId) {
        window.Event.$emit('reindexEvents', eventId);
      }
    }
  });

  Vue.component('hour', {
    props: ['hour', 'events', 'day', 'month'],
    template: `<li class="day__hour__item-wrapper">
      <div class="day__hour__item" :data-event-hour="hour" :data-event-day="day" :data-event-month="month" :events="events">
        <span>{{hour}}h</span>
        <event v-for="event in events" v-if="event.time == hour && event.day == day && event.month == month" :title="event.title" :description="event.description" :event-id="event.id"></event>
      </div></li>
    `
  });

  Vue.component('day', {
    template: `
      <div :class="className">
        <div class="day__header">{{d}} {{mName}} <div class="day__header__close" @click="hideDay">x</div></div>
        <ul class="day__hour__list" @click="manageEvent" data-day-list>
          <hour v-for="hour in this.$root.$data.hours" :hour="hour" :day="d" :month="mNumber" :events="events"></hour>
        </ul>
      </div>
    `,
    data() {
      return {
        events: this.$root.$data.events,
        d: '',
        mNumber: '',
        mName: '',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        className: 'day'
      }
    },
    created (){
      window.Event.$on('openDay', this.prepareDay);
      window.Event.$on('openDayOther', this.showDay);
      window.Event.$on('openModal', this.hideDayOther);
      window.Event.$on('closeModal', this.showDay);
    },
    mounted () {
      this.setScrollToCurrent();
    },
    methods: {
      manageEvent(e) {
        const eventHour =
              e.target.dataset.eventHour ||
              e.target.parentElement.dataset.eventHour ||
              e.target.parentElement.parentElement.dataset.eventHour;
        const eventDay =
              e.target.dataset.eventDay ||
              e.target.parentElement.dataset.eventDay ||
              e.target.parentElement.parentElement.dataset.eventDay;
        const eventMonth =
              e.target.dataset.eventMonth ||
              e.target.parentElement.dataset.eventMonth ||
              e.target.parentElement.parentElement.dataset.eventMonth;

        const eventRemove = e.target.dataset.eventRemove;
        if (eventRemove) {
          this.removeEvent(eventRemove)
          return;
        };
        if (eventHour) this.addEvent(eventHour, eventDay, eventMonth);

      },
      removeEvent(eventRemove) {
        this.$root.$data.events = this.$root.$data.events.filter( el => el.id != eventRemove);
        this.events = this.$root.$data.events;
      },
      addEvent(eventHour, eventDay, eventMonth) {
        window.Event.$emit('openModal', eventHour, eventDay, eventMonth);
      },
      prepareDay (d,m) {
        this.d = d;
        this.mNumber = m;
        this.mName = this.months[m - 1];
        this.setScrollToCurrent();
        this.showDay();
      },
      showDay (){
        this.className = 'day anim';
      },
      hideDay () {
        this.className = 'day';
        window.Event.$emit('closeDay', this.showDay);
      },
      hideDayOther () {
        this.className = 'day back';
      },
      setScrollToCurrent () {
        const list = this.$el.querySelector('[data-day-list]');
        const listHeight = list.getBoundingClientRect().height;
        const listItem = list.querySelector('li');
        const liHeight = listItem.getBoundingClientRect().height;
        const date = new Date();
        const hour = date.getHours();
        list.scrollTop = (liHeight * hour) + listHeight;
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
    created (){
      window.Event.$on('openDay', this.hideCalendar);
      window.Event.$on('closeDay', this.showCalendar);
      window.Event.$on('reindexEvents', this.removeEvent);
    },
    methods: {
      eventManager () {
        if(!this.day) return;
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
      },
      removeEvent(eventId) {
        this.$parent.$data.events = this.$root.$data.events.filter(el => el.id != eventId);
        this.events = this.$parent.$data.events;
      },
      hideCalendar () {
        this.cal = document.querySelector('[data-calendar]');
        this.cal.classList.add('anim');
      },
      showCalendar () {
        this.cal.classList.remove('anim');
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
      events: [ //here I should call the API entrypoint of the backend to persist the object
        {
          day: 10,
          month: 2,
          time: 3,
          title: 'Event Title 1',
          description: 'This is a short description',
          id: 1
        },
        {
          day: 13,
          month: 2,
          time: 5,
          title: 'Event Title 2',
          description: 'This is another short description',
          id: 2
        },
        {
          day: 22,
          month: 2,
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
