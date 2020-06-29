<template>
  <div class="component">
    <Config
      config-key="open_weather"
      :config-value="openWeatherApiKey"
      placeholder="Enter your Open Weather API key"
    />
  </div>
</template>

<script>
import Config from "@/components/Config.vue";

export default {
  components: {
    Config
  },
  data() {
    return {
      openWeatherApiKey: ""
    };
  },
  created: function() {
    const config = this.$store.state.config;
    this.openWeatherApiKey = config["open_weather"];
  }
};
</script>

<style scoped>
.component {
  margin: 0.5rem;
}
</style>
