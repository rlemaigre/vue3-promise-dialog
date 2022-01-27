<template>
  <OkCancelBox :value="text" :valid="!!text">
    <template #header>Input</template>
    <template #body>
      <div style="padding: 20px">
        <span class="p-float-label">
            <InputText id="username" type="text" v-model="text"/>
            <label for="username">{{ label }}</label>
        </span>
      </div>
    </template>
  </OkCancelBox>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import OkCancelBox from "./OkCancelBox.vue";

export default defineComponent({
  components: {OkCancelBox},
  props: {
    label: String
  },
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