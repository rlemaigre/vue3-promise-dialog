<script setup lang="ts" generic="T extends string | number">
import { ref } from "vue";
import OkCancelBox from "./OkCancelBox.vue";

const props = defineProps<{ genValue: T }>();

const innerValue = ref<string>(
  typeof props.genValue === "number"
    ? props.genValue.toString()
    : props.genValue
);

function returnValue(): T {
  if (typeof props.genValue === "number") {
    return Number(innerValue.value) as T;
  } else {
    return innerValue.value as T;
  }
}

defineExpose<{
  returnValue: () => T;
}>({ returnValue });
</script>

<template>
  <OkCancelBox :valid="innerValue != undefined">
    <template #header>Input</template>
    <template #body>
      <div style="padding: 20px">
        <span class="p-float-label">
          <InputText
            v-if="typeof genValue === 'string'"
            id="field"
            type="text"
            v-model="innerValue"
          />
          <InputText v-else id="field" type="number" v-model="innerValue" />
          <label for="field">Some Label</label>
        </span>
      </div>
    </template>
  </OkCancelBox>
</template>

<style scoped lang="scss"></style>
