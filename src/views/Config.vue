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
    var config = this.$store.getters.getConfig;

    if (this.$route.query["config"]) {
      config = this.decryptObj(decodeURIComponent(this.$route.query["config"]));
      this.$store.commit("setConfig", config);
    }

    this.openWeatherApiKey = config["open_weather"];
    this.natureRemoAccessToken = config["nature_remo"];

    this.$router.push(this.$route.path).catch(() => {});
  },
  methods: {
    showQR: function() {
      this.isQRShown = true;
      const config = this.$store.getters.getConfig;
      this.qrValue =
        this.getHostPort() +
        "/desk-clock/#/config" +
        "?config=" +
        encodeURIComponent(this.encryptObj(config));
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
    encryptObj: function(obj) {
      return CryptoJS.AES.encrypt(JSON.stringify(obj), this.secret).toString();
    },
    decryptObj: function(str) {
      var bytes = CryptoJS.AES.decrypt(str, this.secret);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
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
