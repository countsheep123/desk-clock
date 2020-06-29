<template>
  <div class="content">
    <TimeDate />
    <Weather :lang="lang" />
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
  },
  computed: {
    lang: function() {
      return this.$store.state.lang;
    }
  }
};
</script>

<style scoped>
.content {
  display: inline-block;
}
</style>
