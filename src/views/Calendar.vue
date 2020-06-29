<template>
  <div class="content">
    <Calendar :dark-mode="isDark" />
  </div>
</template>

<script>
import Calendar from "@/components/Calendar.vue";

export default {
  components: {
    Calendar
  },
  computed: {
    isDark: function() {
      return this.$store.state.isDark;
    }
  }
};
</script>

<style scoped>
.content {
  display: inline-block;
}
</style>
