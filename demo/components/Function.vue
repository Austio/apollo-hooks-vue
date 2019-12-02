<template>
  <div>
    <span>count is {{ state.count }}</span>
    <span>plusOne is {{ state.plusOne }}</span>
    <button @click="increment">count++</button>
  </div>
</template>

<script>
  import { reactive, computed, watch, onMounted } from '@vue/composition-api'

  export default {
    setup() {
      const state = reactive({
        count: 0,
        plusOne: computed(() => state.count + 1),
      });

      const increment = () => {
        state.count++;
      };

      // lifecycle
      onMounted(() => {
        console.log(`mounted`);
      });
      // expose bindings on render context
      return {
        state,
        increment,
      };
    },
  };
</script>
