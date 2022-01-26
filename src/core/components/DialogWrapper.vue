<template>
  <transition v-bind="transitionAttrs">
    <component :is="dialogRef.dialog" v-if="dialogRef"></component>
  </transition>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {dialogRef} from "../ts/lib";

export default defineComponent({
  components: {},
  props: {
    transitionAttrs: Object
  },
  setup(props, context) {
    return {
      dialogRef
    }
  }
})
</script>

<style scoped lang="scss">

</style>