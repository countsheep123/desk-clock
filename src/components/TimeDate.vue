<template>
  <div class="component">
    <div class="time">{{ time }}</div>
    <div class="date">{{ date }}</div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      refreshInterval: 1000 * 1, // 1 second
      timerId: "",
      time: null,
      date: null
    };
  },
  created: function() {
    this.update();
    this.timerId = setInterval(this.update, this.refreshInterval);
  },
  methods: {
    update: function() {
      this.date = moment().format("YYYY / MM / DD (ddd)");
      this.time = moment().format("HH:mm:ss");
    },
    cancelRefresh: function() {
      clearInterval(this.timerId);
    }
  },
  beforeDestroy() {
    clearInterval(this.timerId);
  }
};
</script>

<style scoped>
.component {
  margin: 0.5rem;
}
.date {
  font-size: 4vmax;
  font-family: "Monaco";
  font-weight: bold;
}
.time {
  font-size: 16vmax;
  font-family: "Monaco";
  font-weight: bold;
}
</style>
