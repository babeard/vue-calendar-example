
<template>
  <div class="main">
    <selector />
    <div class="griddy">
      <div class="weekdays" v-for="d in getWeekDays" :key="d">
        <h3>{{d}}</h3>
      </div>
      <div class="days" v-for="(d,i) in getCalendarDays" :class="{ dull: isDullable(d), today: isToday(d)}" :key="i">
        <div 
          class="day" 
          :class="{ selected: isSelected(d) }"
          @click="selectDay(d)"
        >
          {{d.getDate()}}
        </div>
        <div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
/*
TODOS 
  - make Locale a user preference setting
  - make Start of week day a user preference setting


*/
import Selector from "./MonthSelector.vue"
export default {
  name: "Month",
  components: {
    Selector
  },
  methods: {

    isDullable(date) {
      const now = new Date()
      now.setMonth(this.$store.state.selectedMonth)
      return date.getMonth() != now.getMonth()
    },

    isToday(date) {
      const now = new Date()
      return date.getDate() == now.getDate() && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear();
    },

    isSelected(date) {
      const selectedDate = this.$store.state.selectedDate

      return date.getDate() == selectedDate.getDate() && date.getMonth() == selectedDate.getMonth() && date.getFullYear() == selectedDate.getFullYear();
    },

    toLocaleDateString(date, opts) {
      return date.toLocaleDateString(this.$store.state.locale, opts);
    },

    selectDay(date) {
      this.$store.commit('setselecteddate', date);
    }
  },
  computed: {
    getCalendarDays() {
      
      const selectedMonth = this.$store.state.selectedMonth;

      const current = new Date();
      current.setMonth(selectedMonth)
      
      // Get first day of current month
      const first = new Date(`${current.getMonth() + 1}/1/${current.getFullYear()}`)

      // Set to the first day of the week of the first.
      // Example: Set to Sun Nov 25, 2018 if First is Sat Dec 1, 2018
      first.setDate(first.getDate() - first.getDay())

      const last = new Date()

      // Set the month to the month following selectedMonth
      last.setMonth(selectedMonth + 1)
      
      // Make sure we set the date to the first of the following month. If we do not,
      // we may have an extra week populated in the next month
      last.setDate(0)
      
      // Get the last day of the following month
      last.setDate(last.getDate() + (6 + 7 - last.getDay()) % 7)
      
      // Make a copy to iterate over
      const iterFirst = new Date(first)

      // Make a copy
      const days = [new Date(iterFirst)]

      while(true) {
        
        // Move to next day
        iterFirst.setDate(iterFirst.getDate() + 1)
        
        // If the current first is equivalent or greater than the last day, then exit loop.
        if(iterFirst >= last) break;

        // Push a copy into the array
        days.push(new Date(iterFirst))
      }

      return days;

    },
    getWeekDays() {

      // Define the format of the selector title
      const localeOpts = { weekday: 'short' }

      const date = new Date()
      
      // Set date to the first day of the week (default: Sunday)
      date.setDate(date.getDate() - date.getDay())

      // Insert the first day's formatted string
      const weekdays = [ this.toLocaleDateString(date, localeOpts) ]

      for(let i = 0; i < 6; i++) {

        // Set to the next day
        date.setDate(date.getDate() + 1);

        // Insert formatted string into the weekdays array
        weekdays.push( this.toLocaleDateString(date, localeOpts) );
      }

      return weekdays
    }
  }


}
</script>

<style scoped>
  .main {
    padding: 50px;
  }

  .griddy {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 15px;
  }

  .weekdays {
    text-transform: uppercase;
    color: #777;
    font-size: 12pt;
  }

  .dull {
    color: #afafaf;
    font-weight: inherit;
    
  }

  .days {
    display: grid;
    align-items: center;
    justify-content: center;
    
  }

  .day {
    display: flex;
    min-width: 35px;
    min-height: 35px;
    align-items: center;
    justify-content: center;
    font-size: 15pt;
    cursor: pointer;
    border: 2px solid transparent;
  }

  .today .day {
    background-color: #69d878;
    border-radius: 5px;
    color: white;
    /* border: 2px solid #69d878; */
    /* background-color: inherit; */
    
  }

  .selected {
    border: 2px solid #484848;
    /* background-color:aqua; */
  }

  .dot {
    width: 7px;
    height: 7px;
    background-color: #69d878;
    display: inline-block;
    border-radius: 50%;
    margin-top: 10px;
    margin-bottom: 20px;
  }

</style>
