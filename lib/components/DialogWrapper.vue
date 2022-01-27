<template>
  <transition v-bind="transitionAttrs">
    <component :is="dialogRef.dialog" v-if="dialogRef && dialogRef.wrapper === name"
               v-bind="dialogRef.props"></component>
  </transition>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {dialogRef} from "../ts/lib";

export default defineComponent({
  name: 'DialogWrapper',
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