<template>
  <OkCancelBox :value="text" :valid="text">
    <template #header>Input</template>
    <template #body>
      <InputText v-model="text"></InputText>
    </template>
  </OkCancelBox>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import OkCancelBox from "./OkCancelBox.vue";

export default defineComponent({
  components: {OkCancelBox},
  props: {},
  setup(props, context) {
    const text = ref("");
    return {
      text
    }
  }
})
</script>

<style scoped lang="scss">

</style>