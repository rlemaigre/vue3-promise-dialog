<template>
  <OkCancelBox :value="true">
    <template #header>Confirm</template>
    <template #body>
      {{ text }}
    </template>
  </OkCancelBox>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import OkCancelBox from "./OkCancelBox.vue";

export default defineComponent({
  components: {OkCancelBox},
  props: {
    text: String
  },
  setup(props, context) {
  }
})
</script>

<style scoped lang="scss">

</style>