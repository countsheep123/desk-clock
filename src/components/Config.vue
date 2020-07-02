<template>
  <div class="component">
    <input v-model="value" :placeholder="placeholder" />
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
    val() {
      return this.value;
    }
  },
  methods: {
    onChangeInput(event) {
      this.$emit("input", event.target.value);
    },
    apply: function() {
      var config = this.$store.state.config;
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
