import ApolloClient from 'apollo-boost';
import Vue from 'vue';

export default function({ app }, inject) {
  const client = new ApolloClient({ uri: 'http://localhost:4000/graphql', fetch: fetch });

  Vue.prototype.$apollo = client;
}
