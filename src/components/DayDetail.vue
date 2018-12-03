<template>
  <div class="main">
    <div class="header">
      <div class="left">
        <div>
          {{ getCurrentDay }}
        </div>
        <div>
          {{ getCurrentWeekDay }}
        </div>
      </div>
      <div>Hello</div>
      
    </div>
    <div>AGENDA</div>
    <div>FOOT</div>
  </div>
</template>

<script>
export default {
  name: "DayDetail",
  computed: {
    currentlySelected() {
      return this.$store.state.selectedDate
    },

    getCurrentDay() {
      return this.$store.state.selectedDate.getDate()
    },

    getCurrentWeekDay() {
      const selectedDate = this.$store.state.selectedDate
      return selectedDate.toLocaleDateString(this.$store.state.locale, { weekday: 'long' })
    }
  }

}
</script>

<style scoped>
  .main {
    background-color: #69d878;
    padding: 20px;
    color: white;
    display:grid;
    align-items: center;
  }

  .header {
    display: flex;
  }

  .header .left {
    display: grid;
  }

</style>
