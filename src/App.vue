<template>
  <Button @click="onTestConfirm" label="Open confirm"></Button>
  <div class="console">
    <div class="console-item" v-for="(text, index) in items" :key="index">{{ text }}</div>
  </div>
  <DialogWrapper :transition-attrs="{name: 'dialog'}"/>
</template>

<script lang="ts">

import {defineComponent, reactive} from "vue";
import DialogWrapper from "../lib/components/DialogWrapper.vue";
import {confirm} from "./dialogs/ts/dialogs";


export default defineComponent({
  components: {DialogWrapper},
  props: {},
  setup(props, context) {
    const items = reactive<string[]>([]);

    async function onTestConfirm() {
      if (await confirm('Do you really want to do this ?')) {
        items.push("Confirmed")
      } else {
        items.push("Not confirmed");
      }
    }

    return {
      confirm,
      onTestConfirm,
      items
    }
  }
})
</script>

<style scoped lang="scss">

</style>

<style>

</style>