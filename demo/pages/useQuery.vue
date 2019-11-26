<template>
  <div>
    <div>Manually Fetched Apollo Message "{{ state.manualMessage }}"</div>
    <div>Subscribed Apollo Message "{{ apolloState.data.data.message }}"</div>
    <button @click="getApolloMessage">Update Manual Apollo Message from Storage</button>

    <button @click="setApolloMessage">mutate Apollo With Form Input</button>

    <label>
      Local Message
      <input v-model="formMessage" />
    </label>
  </div>
</template>

<script>
  import { reactive, onMounted } from '@vue/composition-api';
  import gql from 'graphql-tag';

  function useQuery({ query, context }) {
    const apolloState = reactive({
      data: null,
      error: null,
      loading: null
    });

    const q = context.root.$apollo.watchQuery({
      query
    });

    q.subscribe({
      next(result) {
        apolloState.data.value = result;
      },
      error(error) {
        apolloState.error.value = error;
      }
    });

    return {
      state: apolloState,
      query: q,
    }
  }

  export default {
    setup(props, context) {
      const state = reactive({
        manualMessage: '',
        formMessage: '',
      });

      const getMessageGql = gql`{ message }`;

      function setApolloMessage() {
        context.root.$apollo.writeData({
          data: { message: state.formMessage }
        });
      }

      const { state: apolloState } = useQuery({
        query: getMessageGql,
        context
      });

      function getApolloMessage() {
        context.root.$apollo.query({
          query: getMessageGql,
        }).then(data => {
          state.manualMessage.value = data.data.message
        });
      }

      onMounted(getApolloMessage);
      // expose bindings on render context
      return {
        state,
        apolloState,
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
