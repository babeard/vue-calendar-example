import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locale: "en-US",
    selectedMonth: new Date().getMonth(),
    selectedDate: new Date(),
    mealplan: [
      {
        date: "12/1/2018",
        meals: [
          { name: "Biscuits & Gravy" },
          { name: "PB&J Sandwiches" },
          { name: "Salad" }
        ]
      },
      {
        date: "12/2/2018",
        meals: [{ name: "Cereal" }, null, { name: "Soup" }]
      },
      {
        date: "12/3/2018",
        meals: [
          { name: "Oatmeal" },
          { name: "Tikka Massala" },
          { name: "Sandwiches" }
        ]
      }
    ]
  },
  mutations: {
    nextmonth(state) {
      state.selectedMonth++;
    },
    prevmonth(state) {
      state.selectedMonth--;
    },
    setselecteddate(state, date) {
      state.selectedDate = date;
    }
  },
  actions: {}
});
