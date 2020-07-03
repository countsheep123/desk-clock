<template>
  <div class="component">
    <div class="weather" v-if="weather">
      <span><font-awesome-icon :icon="icon"/></span>
      <span> / {{ ceil(weather.temp) }}℃</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  faSun,
  faUmbrella,
  faCloud,
  faSnowflake,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";

export default {
  props: {
    lang: String
  },
  data() {
    return {
      apikey: "",
      refreshInterval: 1000 * 60 * 60, // 1 hour
      timerId: "",
      location: {
        latitude: null,
        longitude: null
      },
      weather: null,
      icon: faQuestion
    };
  },
  created: function() {
    this.apikey = this.$store.getters.getConfig["open_weather"];
    this.getCurrentPosition();
    this.timerId = setInterval(this.fetch, this.refreshInterval);
  },
  watch: {
    location: function() {
      if (this.apikey) {
        this.fetch();
      }
    }
  },
  methods: {
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
            updated_at: response.data.dt,
            weather: response.data.weather[0].id,
            weathers: []
          };
          response.data.weather.forEach(element => {
            me.weather.weathers.push({
              id: element.id,
              name: element.main,
              description: element.description,
              iconUrl:
                "http://openweathermap.org/img/wn/" + element.icon + ".png"
            });
          });

          me.setFaWeatherIconById(me.weather.weather);

          console.log(me.weather);
        })
        .catch(error => {
          console.log(error);
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
    setFaWeatherIconById: function(id) {
      switch (parseInt(id / 100)) {
        case 2: // thunderstorm
          this.icon = faUmbrella;
          break;
        case 3: // drizzle
          this.icon = faUmbrella;
          break;
        case 5: // rain
          this.icon = faUmbrella;
          break;
        case 6: // snow
          this.icon = faSnowflake;
          break;
        case 7: // atmosphere
          this.icon = faUmbrella;
          break;
        case 8: // clear or cloud
          if (id == 800) {
            this.icon = faSun;
          } else {
            this.icon = faCloud;
          }
          break;
        default:
          this.icon = faQuestion;
      }
    },
    ceil: function(val) {
      return (Math.ceil(val / 0.5) * 0.5).toFixed(1);
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
</style>
