<template>
  <OkCancelBox :value="true" ok-label="YES" cancel-label="NO">
    <template #header>Confirm</template>
    <template #body>
      <div style="padding: 20px;">
        {{ text }}
      </div>
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