<template>
  <div>
    <span>Message {{ message }}</span>
    <br />
    <button @click="updateMessage">Change Message to Bar</button>
    <br />
    <button @click="getMessage">Get Message Value</button>
  </div>
</template>

<script>
  import { value, computed, watch, onMounted } from 'vue-function-api'
  import gql from 'graphql-tag';

  export default {
    setup(props, context) {
      const message = value('');

      const getMessageGql = gql`{ message }`;

      console.log(getMessageGql)
      console.log(context.root.$apollo);

      // https://www.apollographql.com/docs/link/links/state/#writequery-and-readquery
      function updateMessage() {
        context.root.$apollo.writeData({ data: { message: 'bar' } });
      }

      function getMessage() {
        context.root.$apollo.query({
          query: getMessageGql,
        }).then(data => {
          message.value = data.data.message
        });
      }

      onMounted(getMessage);
      // expose bindings on render context
      return {
        message,
        updateMessage,
        getMessage,
      };
    },
  };
</script>
