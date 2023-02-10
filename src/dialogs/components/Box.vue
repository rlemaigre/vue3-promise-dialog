<template>
  <div class="wrapper">
    <div class="centered">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: undefined,
  setup(props, context) {},
});
</script>

<style scoped lang="scss">
.wrapper {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.25s;

  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    transition: transform 0.25s;
    background-color: white;
  }
}

.dialog-enter-from.wrapper,
.dialog-leave-to.wrapper {
  opacity: 0;

  .centered {
    transform: translate(-50%, -50%) scale(0.5);
  }
}
</style>
