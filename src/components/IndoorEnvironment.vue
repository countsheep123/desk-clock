<template>
  <div class="component">
    <div class="indoor" v-if="indoor">
      <span>{{ ceil(indoor.temperature_val) }}℃</span>
      <span> / {{ indoor.humidity_val }}%</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      accesstoken: "",
      refreshInterval: 1000 * 60 * 60, // 1 hour
      timerId: "",
      indoor: null
    };
  },
  created: function() {
    this.accesstoken = this.$store.state.config["nature_remo"];
    this.fetch();
    this.timerId = setInterval(this.fetch, this.refreshInterval);
  },
  methods: {
    fetch: function() {
      console.log("accesstoken: " + this.accesstoken);
      if (
        typeof this.accesstoken === "undefined" ||
        this.accesstoken == null ||
        this.accesstoken.length == 0
      ) {
        // accesstoken required
        console.log("accesstoken required");
        return;
      }

      var me = this;

      axios
        .get("https://api.nature.global/1/devices", {
          headers: { Authorization: "Bearer " + this.accesstoken }
        })
        .then(response => {
          const data = response.data[0];
          console.log(data);
          me.indoor = {
            temperature_offset: data.temperature_offset,
            humidity_offset: data.humidity_offset,
            humidity_val: data.newest_events.hu.val,
            humidity_updated_at: data.newest_events.hu.created_at,
            illumination_val: data.newest_events.il.val,
            illumination_updated_at: data.newest_events.il.created_at,
            movement_val: data.newest_events.mo.val,
            movement_updated_at: data.newest_events.mo.created_at,
            temperature_val: data.newest_events.te.val,
            temperature_updated_at: data.newest_events.te.created_at
          };

          console.log(me.indoor);
        });
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
.indoor {
  font-size: 4vmax;
  font-family: "Monaco";
  font-weight: bold;
}
</style>
