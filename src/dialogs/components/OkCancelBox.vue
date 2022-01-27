<template>
  <Box>
    <form class="box" onsubmit="return false">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <div class="footer">
        <Button label="Cancel" type="button" class="p-button-raised" style="margin-right: 10px"
                @click="closeDialog(null)"/>
        <Button label="Ok" type="submit" class="p-button-raised" @click="closeDialog(value)" :disabled="!valid"/>
      </div>
    </form>
  </Box>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {closeDialog} from "../../../lib/index";
import Box from "./Box.vue";

export default defineComponent({
  components: {Box},
  props: {
    value: {},
    valid: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    return {
      closeDialog
    }
  }
})
</script>

<style scoped lang="scss">
.box {
  .header {
    color: white;
    background-color: var(--primary-color);
    display: flex;
    align-items: center;
    height: 50px;
    padding: 10px;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
}
</style>