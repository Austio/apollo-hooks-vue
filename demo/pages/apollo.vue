<template>
  <div>
    <span>Message {{ message }}</span>
    <button @click="updateMessage">update Message to foo</button>
  </div>
</template>

<script>
  import { value, computed, watch, onMounted } from 'vue-function-api'
  import gql from 'graphql-tag';

  export default {
    setup(props, context) {
      // reactive state
      const message = value('');
      // computed state
      // const plusOne = computed(() => count.value + 1);
      // method
      // const increment = () => {
      //   count.value++;
      // };
      // watch
      // watch(
      //   () => count.value * 2,
      //   val => {
      //     console.log(`count * 2 is ${val}`);
      //   }
      // );
      // lifecycle
      function updateMessage() {
        message.value = 'foo';
      }

      onMounted(() => {
        context.root.$apollo.query({
          query: gql`{ message }`,
        })
          .then(data => { message.value = data.message })
      });
      // expose bindings on render context
      return {
        message,
        updateMessage,
      };
    },
  };
</script>
