<template>
  <template v-for="(dialogRef, index) in dialogRefs" :key="index">
    <transition v-bind="transitionAttrs">
      <component
        :is="dialogRef.dialog"
        v-if="dialogRef && dialogRef.wrapper === name"
        v-bind="dialogRef.props"
        :ref="(ref: any) => (dialogRef.comp = ref)"
      ></component>
    </transition>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dialogRefs } from "../ts/lib";

export default defineComponent({
  name: "DialogWrapper",
  components: {},
  props: {
    name: {
      type: String,
      default: "default",
    },
    transitionAttrs: Object,
  },
  setup() {
    return {
      dialogRefs,
    };
  },
});
</script>

<style scoped lang="scss"></style>
