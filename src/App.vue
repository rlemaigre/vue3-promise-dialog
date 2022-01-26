<template>
  <DialogWrapper :transition-attrs="{name: 'dialog'}"/>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import DialogWrapper from "./core/components/DialogWrapper.vue";

export default defineComponent({
  components: {DialogWrapper},
  props: {},
  setup(props, context) {
    return {}
  }
})
</script>

<style scoped lang="scss">

</style>