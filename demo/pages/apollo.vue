<template>
  <div>
    <span>Message {{ message }}</span>
    <button @click="update">update Message to foo</button>
  </div>
</template>

<script>
  import { value, computed, watch, onMounted } from 'vue-function-api'
  import gql from 'graphql-tag';

  export default {
    data() {
      return {
        message: null
      }
    },
    setup(props, context) {
      // reactive state
      const message = value(null);
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
      onMounted(() => {
        context.root.$apollo.query({
          query: gql`{ message }`,
        })
          .then(data => this.message = data)
      });
      // expose bindings on render context
      return {
        message,
      };
    },
  };
</script>
