<template>
  <div class="component">
    <div v-if="isQRShown">
      <button v-on:click="closeQR">Close</button>
      <QR :value="qrValue" />
    </div>
    <div v-else>
      <Config
        config-key="open_weather"
        v-model="openWeatherApiKey"
        placeholder="Enter your Open Weather API key"
      />
      <Config
        config-key="nature_remo"
        v-model="natureRemoAccessToken"
        placeholder="Enter your Nature Remo access token"
      />
      <button v-on:click="reset">Reset</button>
      <button v-on:click="showQR">Show QR</button>
    </div>
  </div>
</template>

<script>
import Config from "@/components/Config.vue";
import QR from "@/components/QR.vue";
import CryptoJS from "crypto-js";

export default {
  components: {
    Config,
    QR
  },
  data() {
    return {
      isQRShown: false,
      qrValue: "",
      openWeatherApiKey: "",
      natureRemoAccessToken: "",
      secret: "desk-clock"
    };
  },
  created: function() {
    const config = this.$store.state.config;

    if (this.$route.query["open_weather"]) {
      config["open_weather"] = this.decrypt(
        decodeURIComponent(this.$route.query["open_weather"])
      );
    }
    if (this.$route.query["nature_remo"]) {
      config["nature_remo"] = this.decrypt(
        decodeURIComponent(this.$route.query["nature_remo"])
      );
    }
    this.$store.commit("setConfig", config);

    this.openWeatherApiKey = config["open_weather"];
    this.natureRemoAccessToken = config["nature_remo"];

    this.$router.push(this.$route.path).catch(() => {});
  },
  methods: {
    showQR: function() {
      this.isQRShown = true;
      const config = this.$store.state.config;
      this.qrValue =
        this.getHostPort() +
        "/desk-clock/#/config" +
        "?open_weather=" +
        encodeURIComponent(this.encrypt(config["open_weather"])) +
        "&nature_remo=" +
        encodeURIComponent(this.encrypt(config["nature_remo"]));
      console.log(this.qrValue);
    },
    closeQR: function() {
      this.isQRShown = false;
    },
    reset: function() {
      this.openWeatherApiKey = "";
      this.natureRemoAccessToken = "";
      this.$store.commit("setConfig", {});
    },
    encrypt: function(value) {
      return CryptoJS.AES.encrypt(value, this.secret).toString();
    },
    decrypt: function(value) {
      return CryptoJS.AES.decrypt(value, this.secret).toString(
        CryptoJS.enc.Utf8
      );
    },
    getHostPort: function() {
      const url = window.location.href;
      return url.split("/")[0] + "//" + url.split("/")[2];
    }
  }
};
</script>

<style scoped>
.component {
  margin: 0.5rem;
}
</style>
