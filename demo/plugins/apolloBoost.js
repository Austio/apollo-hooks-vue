import ApolloClient from 'apollo-boost';
import Vue from 'vue';

export default function({ app }, inject) {
  const client = new ApolloClient({ uri: 'https://www.graphqlhub.com/graphql', fetch: fetch });

  Vue.prototype.$apollo = client;

  debugger;
}
