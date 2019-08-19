<template>
  <div>
    <div>Manually Fetched Apollo Message "{{ manualMessage }}"</div>
    <div>Subscribed Apollo Message "{{ data.data.message }}"</div>
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

  function useQuery({ query, context }) {
    const data = value(null);
    const error = value(null);
    const loading = value(true);

    const q = context.root.$apollo.watchQuery({
      query
    });

    q.subscribe({
      next(result) {
        data.value = result;
      },
      error(error) {
        error.value = error;
      }
    });

    return {
      data,
      error,
      loading,
      query: q,
    }
  }

  export default {
    setup(props, context) {
      const manualMessage = value('');
      const formMessage = value('');
      const getMessageGql = gql`{ message }`;

      function setApolloMessage() {
        context.root.$apollo.writeData({ data: { message: formMessage.value } });
      }

      const { data, loading, error } = useQuery({ query: getMessageGql, context });

      function getApolloMessage() {
        context.root.$apollo.query({
          query: getMessageGql,
        }).then(data => {
          manualMessage.value = data.data.message
        });
      }

      onMounted(getApolloMessage);
      // expose bindings on render context
      return {
        manualMessage,
        formMessage,
        data,
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
