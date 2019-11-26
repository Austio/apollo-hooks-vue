import { reactive } from '@vue/composition-api';

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
      apolloState.data = result;
    },
    error(error) {
      apolloState.error = error;
    }
  });

  return {
    state: apolloState,
    query: q,
  }
}

export default useQuery;
