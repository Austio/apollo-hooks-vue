<template>
  <div>
    <no-ssr>
      <div>Loading: {{ loading }}</div>
      <div>Error: {{ error }}"</div>
      <div>Message: {{ data }}</div>
    </no-ssr>

    <hr />
    <p> This will update the Client Cache </p>
    <button @click="() => writeToApolloCache(formMessage)">
      Manually Mutate Apollo Cache With Form Input
    </button>

    <p> This will refetch the value from the server </p>
    <button @click="() => refetch()">
      Refetch The Message From Server
    </button>

    <hr />
    <label>
      Local Message
      <input v-model="formMessage" />
    </label>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  import useQuery from '~/../src/useQuery';
  const getMessageGql = gql`{ message }`;

  export default {
    data() {
      return {
        formMessage: null,
      };
    },
    setup(props, context) {
      const {
        result: { loading, data, error },
        helpers: { refetch }
      } = useQuery({ query: getMessageGql, context });

      function writeToApolloCache(message) {
        context.root.$apollo.writeData({
          data: { message }
        });
      }
      return {
        loading,
        data,
        error,
        refetch,
        writeToApolloCache,
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
