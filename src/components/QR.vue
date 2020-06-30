<template>
  <div class="component">
    <vue-qrcode :value="val" :options="option"></vue-qrcode>
  </div>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  components: {
    VueQrcode
  },
  props: {
    value: String
  },
  data() {
    return {
      val: this.value,
      option: {
        errorCorrectionLevel: "H",
        maskPattern: 0,
        margin: 2,
        scale: 1,
        width: 200,
        color: {
          dark: "#000000FF",
          light: "#FFFFFFFF"
        }
      }
    };
  }
};
</script>

<style scoped>
.component {
  margin: 0.5rem;
}
</style>
