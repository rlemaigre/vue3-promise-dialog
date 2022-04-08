<template>
  <transition v-bind="transitionAttrs">
    <component :is="dialogRef.dialog" v-if="dialogRef && dialogRef.wrapper === name"
               v-bind="dialogRef.props"
               ref="dialogInstance"></component>
  </transition>
</template>

<script lang="ts">

import { ComponentPublicInstance, defineComponent, ref, watch } from "vue";
import { dialogRef } from "../ts/lib";

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
  setup() {
    const dialogInstance = ref<ComponentPublicInstance<typeof dialogRef.value.dialog>>();

    watch(dialogInstance, () => {
      if (dialogRef.value) {
        dialogRef.value.comp = dialogInstance.value
      }
    })

    return {
      dialogRef,
      dialogInstance
    }
  }
})
</script>

<style scoped lang="scss">

</style>
