<template>
  <div class="container">
    <day-detail />
    <Month />
  </div>
</template>

<script>
import Month from '../components/Month.vue';
import DayDetail from '../components/DayDetail.vue';

export default {
  name: "Monthly",
  components: {
    Month,
    DayDetail
  }
}
</script>

<style scoped>
  .container {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 2fr 5fr;

    box-shadow: 0px 0px 15px 0px #ccc;
  }
</style>
