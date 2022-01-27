<template>
  <Button @click="onTestConfirm" label="Test confirm dialog" class="m-3"></Button>
  <Button @click="onTestText" label="Test prompt text dialog" class="m-3"></Button>
  <div class="console">
    <div class="console-item" v-for="(text, index) in items" :key="index">{{ text }}</div>
  </div>
  <DialogWrapper :transition-attrs="{name: 'dialog'}"/>
</template>

<script lang="ts">

import {defineComponent, reactive} from "vue";
import DialogWrapper from "../lib/components/DialogWrapper.vue";
import {confirm, promptText} from "./dialogs/ts/dialogs";


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

    async function onTestText() {
      let text = await promptText('Enter some text');
      if (text) {
        items.push(text)
      }
    }

    return {
      confirm,
      onTestConfirm,
      onTestText,
      items
    }
  }
})
</script>

<style scoped lang="scss">
.console {
  margin: 20px;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
</style>