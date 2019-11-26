<template>
  <div>
    <div>Manually Fetched Apollo Message "{{ state.manualMessage }}"</div>
    <div>Subscribed Apollo Message "{{ state.subscribeMessage }}"</div>
    <button @click="getApolloMessage">Update Manual Apollo Message from Storage</button>

    <button @click="setApolloMessage">mutate Apollo With Form Input</button>

    <label>
      Local Message
      <input v-model="state.formMessage" />
    </label>
  </div>
</template>

<script>
  import { reactive, onMounted } from '@vue/composition-api'
  import gql from 'graphql-tag';

  export default {
    setup(props, context) {
      const state = reactive({
        manualMessage: '',
        formMessage: '',
        subscribeMessage: '',
      });

      const getMessageGql = gql`{ message }`;

      console.log(getMessageGql);
      console.log(context.root.$apollo);

      // https://www.apollographql.com/docs/link/links/state/#writequery-and-readquery
      function setApolloMessage() {
        context.root.$apollo.writeData({ data: { message: state.formMessage } });
      }

      function getApolloMessage() {
        context.root.$apollo.query({
          query: getMessageGql,
        }).then(data => {
          state.manualMessage = data.data.message
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
            state.subscribeMessage = result.data.message;
          },
          error() {
            debugger;
          }
        });
      }());

      onMounted(getApolloMessage);
      // expose bindings on render context
      return {
        state,
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
