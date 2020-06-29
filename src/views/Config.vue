<template>
  <div class="component">
    <Config
      config-key="open_weather"
      :config-value="openWeatherApiKey"
      placeholder="Enter your Open Weather API key"
    />
    <Config
      config-key="nature_remo"
      :config-value="natureRemoAccessToken"
      placeholder="Enter your Nature Remo access token"
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
      openWeatherApiKey: "",
      natureRemoAccessToken: ""
    };
  },
  created: function() {
    const config = this.$store.state.config;
    this.openWeatherApiKey = config["open_weather"];
    this.natureRemoAccessToken = config["nature_remo"];
  }
};
</script>

<style scoped>
.component {
  margin: 0.5rem;
}
</style>
