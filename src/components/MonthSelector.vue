<template>
  <div class="container">
    <h1 @click="previous" class="left">&lt;</h1>
    <h1>{{ monthYearOutput }}</h1>
    <h1 @click="next" class="right">&gt;</h1>
  </div>
</template>

<script>
export default {
  name: "MonthSelector",
  methods: {
    next() {
      this.$store.commit('nextmonth');
    },
    previous() {
      this.$store.commit('prevmonth');
    }
  },
  computed: {
    monthYearOutput() {
      const localeOpts = { month: 'long', year: 'numeric' };
      
      const now = new Date();
      now.setMonth(this.$store.state.selectedMonth)

      return now.toLocaleDateString(this.$store.state.local, localeOpts)
    }
  }
}
</script>

<style scoped>
  .container {
    display: grid;
    grid-auto-flow: column;
    color : #69d878;
  }



  /* h1 {
    border: 1px solid black;
  } */

  .left, .right {
    cursor: pointer;
    user-select: none;
  }

</style>
