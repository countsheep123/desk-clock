<template>
  <div class="content">
    <TimeDate />
    <Weather :lang="lang" />
    <IndoorEnvironment />
  </div>
</template>

<script>
import TimeDate from "@/components/TimeDate.vue";
import Weather from "@/components/Weather.vue";
import IndoorEnvironment from "@/components/IndoorEnvironment.vue";

export default {
  components: {
    TimeDate,
    Weather,
    IndoorEnvironment
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
