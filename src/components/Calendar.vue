<template>
  <div class="component">
    <v-calendar :attributes="attrs"></v-calendar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      attrs: [
        {
          key: "today",
          highlight: true,
          dates: new Date()
        }
      ]
    };
  },
  created: function() {
    this.fetch();
  },
  methods: {
    fetch: function() {
      var me = this;
      axios
        .get("https://holidays-jp.github.io/api/v1/date.json")
        .then(response => {
          Object.keys(response.data).forEach(key => {
            me.attrs.push({
              key: response.data[key],
              dates: key,
              dot: "red",
              popover: {
                label: response.data[key]
              }
            });
          });
        });
    }
  }
};
</script>

<style scoped>
.component {
  margin: 0.5rem;
}
</style>
