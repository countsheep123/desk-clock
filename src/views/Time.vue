<template>
  <div class="content">
    <TimeDate />
    <Weather />
  </div>
</template>

<script>
// @ is an alias to /src
import TimeDate from "@/components/TimeDate.vue";
import Weather from "@/components/Weather.vue";

export default {
  components: {
    TimeDate,
    Weather
  }
};
</script>

<style scoped>
.content {
  display: inline-block;
}
</style>
