<template>
  <div class="component">
    <div v-if="apikeyApplied">
      <div class="weather" v-if="weather">
        <span>{{ weather.weather }}</span>
        <span><img :src="weather.icon_url"/></span>
        <span> / {{ weather.temp }}℃</span>
      </div>
    </div>
    <div v-else>
      <input v-model="apikey" placeholder="Enter your OpenWeather apikey" />
      <button v-on:click="applyApikey">Apply</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      lang: "",
      apikey: "",
      apikeyApplied: false,
      refreshInterval: 1000 * 60 * 60, // 1 hour
      timerId: "",
      location: {
        latitude: null,
        longitude: null
      },
      weather: null
    };
  },
  created: function() {
    this.getLang();
    this.isApikeyApplied();
    this.getCurrentPosition();
    this.timerId = setInterval(this.fetch, this.refreshInterval);
  },
  watch: {
    location: function(val) {
      console.log(val);
      if (this.apikeyApplied) {
        this.fetch();
      }
    }
  },
  methods: {
    getLang: function() {
      this.lang =
        (window.navigator.languages && window.navigator.languages[0]) ||
        window.navigator.language ||
        window.navigator.userLanguage ||
        window.navigator.browserLanguage;
      console.log(this.lang);
    },
    isApikeyApplied: function() {
      var apikey = this.$route.query.apikey;

      if (typeof apikey === "undefined" || apikey == null) {
        this.apikeyApplied = false;
        return;
      }
      if (apikey.length > 0) {
        this.apikey = apikey;
        this.apikeyApplied = true;
      } else {
        this.apikeyApplied = false;
      }
      return;
    },
    applyApikey: function() {
      this.$router.push({
        path: this.$route.path,
        query: { apikey: this.apikey }
      });
      this.isApikeyApplied();
      this.fetch();
    },
    fetch: function() {
      console.log("apikey: " + this.apikey);
      if (
        typeof this.apikey === "undefined" ||
        this.apikey == null ||
        this.apikey.length == 0
      ) {
        // apikey required
        console.log("apikey required");
        return;
      }

      if (
        this.location == null ||
        this.location.latitude == null ||
        this.location.longitude == null
      ) {
        // location required
        console.log("location required");
        return;
      }

      var me = this;

      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=" +
            this.lang +
            "&lat=" +
            this.location.latitude +
            "&lon=" +
            this.location.longitude +
            "&appid=" +
            this.apikey
        )
        .then(response => {
          me.weather = {
            city: response.data.name,
            temp: response.data.main.temp,
            temp_min: response.data.main.temp_min,
            temp_max: response.data.main.temp_max,
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            weather: response.data.weather[0].description,
            icon_url:
              "http://openweathermap.org/img/wn/" +
              response.data.weather[0].icon +
              ".png",
            weathers: []
          };
          response.data.weather.forEach(element => {
            me.weather.weathers.push({
              description: element.description,
              iconUrl:
                "http://openweathermap.org/img/wn/" + element.icon + ".png"
            });
          });

          console.log(me.weather);
        });
    },
    getCurrentPosition: function() {
      var me = this;
      if (!navigator.geolocation) {
        // not available
        console.log("not available");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        // success
        function(position) {
          me.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log(me.location.latitude + ", " + me.location.longitude);
        },
        // error
        function(error) {
          switch (error.code) {
            case 1: // PERMISSION_DENIED
              console.log("permission denied");
              break;
            case 2: // POSITION_UNAVAILABLE
              console.log("position unavailable");
              break;
            case 3: //TIMEOUT
              console.log("timeout");
              break;
            default:
              console.log("error code: " + error.code);
              console.log("error message: " + error.message);
              break;
          }
        }
      );
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
.weather {
  font-size: 4vmax;
  font-family: "Monaco";
  font-weight: bold;
}
input {
  width: 16rem;
}
</style>
