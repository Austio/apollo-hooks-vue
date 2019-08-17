<template>
  <div>
    <div>Apollo Message "{{ message }}"</div>
    <button @click="setApolloMessage">Update Apollo with Input</button>
    <button @click="getApolloMessage">Get Message From Apollo</button>
    <label>
      Local Message
      <input v-model="localMessage" />
    </label>
  </div>
</template>

<script>
  import { value, computed, watch, onMounted } from 'vue-function-api'
  import gql from 'graphql-tag';

  export default {
    setup(props, context) {
      const message = value('');
      const localMessage = value('');

      const getMessageGql = gql`{ message }`;

      console.log(getMessageGql);
      console.log(context.root.$apollo);

      // https://www.apollographql.com/docs/link/links/state/#writequery-and-readquery
      function setApolloMessage() {
        context.root.$apollo.writeData({ data: { message: localMessage.value } });
        getApolloMessage();
      }

      function getApolloMessage() {
        context.root.$apollo.query({
          query: getMessageGql,
        }).then(data => {
          message.value = data.data.message
        });
      }

      // https://www.apollographql.com/docs/react/api/apollo-client/#ApolloClient.watchQuery
      // https://www.apollographql.com/docs/react/api/apollo-client/#observablequery-functions
      function subscribeToQuery() {
        const observableQuery = context.root.$apollo.watchQuery({
          query: getMessageGql
        });

        observableQuery.subscribe()
      }

      onMounted(getApolloMessage);
      // expose bindings on render context
      return {
        message,
        localMessage,
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
