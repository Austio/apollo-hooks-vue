# vue-apollo-hooks

This is an example of how we can implement useQuery hooks in a repo.

### CAVEATS PLEASE READ THIS

The API for composition API has changed quite a bit, so there may be some core breaking changes to how this works.

### Start the Demo
```
cd demo
yarn install
yarn run dev

// Start graphql server
cd demo
node graphql
```

### Usage in a Project

#### Setup Composition API
```
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);
```

#### Import useQuery
ATM you have to inject the context into useQuery.

I have also tried this using partial application with provide/inject and wasn't crazy about it.

```
import { inject } from '@vue/composition-api';
import fetchUsers from '~/apollo/queries/fetchUsers.gql';
export default {
  setup(_, context) {
    const {
      result: { loading, data, error },
      helpers: { refetch }
    } = useQuery({ query: fetchUsers, context });

    return {
      loading,
      data,
      error,
      refetch,
    }
  }
}  
```