<template>
  <div class="component">
    <input v-model="val" :placeholder="placeholder" />
    <button v-on:click="apply">Apply</button>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    configKey: String,
    value: String
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(value) {
        this.commitChange(value);
      }
    }
  },
  methods: {
    commitChange(newValue) {
      this.$emit("input", newValue);
    },
    apply: function() {
      var config = this.$store.getters.getConfig;
      config[this.configKey] = this.val;
      this.$store.commit("setConfig", config);
    }
  }
};
</script>

<style scoped>
.component {
  margin: 0.5rem;
}
input {
  width: 16rem;
}
</style>
