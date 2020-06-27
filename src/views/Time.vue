<template>
  <div class="content">
    <TimeDate />
  </div>
</template>

<script>
// @ is an alias to /src
import TimeDate from "@/components/TimeDate.vue";

export default {
  components: {
    TimeDate
  }
};
</script>

<style scoped>
.content {
  display: inline-block;
}
</style>
