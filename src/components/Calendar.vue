<template>
  <div class="component">
    <v-calendar :attributes="attrs" :is-dark="isDark"></v-calendar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    darkMode: Boolean
  },
  data() {
    return {
      isDark: this.darkMode,
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
  watch: {
    darkMode: {
      handler(newVal) {
        this.isDark = newVal;
      },
      immediate: true
    }
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
