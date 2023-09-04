<template>
  <OkCancelBox :valid="!!text && confirmation !== undefined">
    <template #header>Input</template>
    <template #body>
      <div style="padding: 20px">
        <span class="p-float-label">
          <InputText
            id="username"
            type="text"
            v-model="text"
            style="width: 400px"
          />
          <label for="username">{{ label }}</label>
        </span>
        <Button
          label="Open nested"
          type="button"
          class="p-button-raised"
          style="margin-right: 10px"
          @click="openNested"
        />
      </div>
    </template>
  </OkCancelBox>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { confirm } from "../ts/dialogs";
import OkCancelBox from "./OkCancelBox.vue";

export default defineComponent({
  components: { OkCancelBox },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const text = ref("");
    const confirmation = ref<true | null>();

    function returnValue() {
      return `${text.value} (${confirmation.value})`;
    }

    async function openNested() {
      confirmation.value = await confirm("Do you really want to do this ?");
    }

    return {
      openNested,
      text,
      confirmation,
      returnValue,
    };
  },
});
</script>

<style scoped lang="scss"></style>
