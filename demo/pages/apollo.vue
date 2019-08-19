<template>
  <div>
    <div>Manually Fetched Apollo Message "{{ manualMessage }}"</div>
    <div>Subscribed Apollo Message "{{ subscribeMessage }}"</div>
    <button @click="getApolloMessage">Update Manual Apollo Message from Storage</button>

    <button @click="setApolloMessage">mutate Apollo With Form Input</button>

    <label>
      Local Message
      <input v-model="formMessage" />
    </label>
  </div>
</template>

<script>
  import { value, computed, watch, onMounted } from 'vue-function-api'
  import gql from 'graphql-tag';

  export default {
    setup(props, context) {
      const manualMessage = value('');
      const formMessage = value('');
      const subscribeMessage = value('');

      const getMessageGql = gql`{ message }`;

      console.log(getMessageGql);
      console.log(context.root.$apollo);

      // https://www.apollographql.com/docs/link/links/state/#writequery-and-readquery
      function setApolloMessage() {
        context.root.$apollo.writeData({ data: { message: formMessage.value } });
      }

      function getApolloMessage() {
        context.root.$apollo.query({
          query: getMessageGql,
        }).then(data => {
          manualMessage.value = data.data.message
        });
      }

      // https://www.apollographql.com/docs/react/api/apollo-client/#ApolloClient.watchQuery
      // https://www.apollographql.com/docs/react/api/apollo-client/#observablequery-functions
      (function subscribeToQuery() {
        const observableQuery = context.root.$apollo.watchQuery({
          query: getMessageGql
        });

        observableQuery.subscribe({
          next(result) {
            subscribeMessage.value = result.data.message;
          },
          error() {
            debugger;
          }
        });
      }());

      onMounted(getApolloMessage);
      // expose bindings on render context
      return {
        manualMessage,
        formMessage,
        subscribeMessage,
        setApolloMessage,
        getApolloMessage,
      };
    },
  };
</script>

<style>
  button {
    display: block;
    background-color: #00C48D;
    color: white;
    height: 50px;
    border-radius: 5px;
    font-size: 20px;
    margin-top: 10px;
  }
  input {
    display: block;
    height: 50px;
    margin: 10px;
  }
</style>
