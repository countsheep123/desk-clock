<template>
  <div class="content">
    <Calendar />
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from "@/components/Calendar.vue";

export default {
  components: {
    Calendar
  }
};
</script>

<style scoped>
.content {
  display: inline-block;
}
</style>
