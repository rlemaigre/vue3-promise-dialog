<template>
  <transition v-bind="transitionAttrs">
    <component :is="dialogRef.dialog" v-if="dialogRef && dialogRef.wrapper === name"></component>
  </transition>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {dialogRef} from "../ts/lib";

export default defineComponent({
  components: {},
  props: {
    name: {
      type: String,
      default: 'default'
    },
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