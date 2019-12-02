const {reactive, toRefs} = require('@vue/composition-api');

function useQuery({
                    query,
                    context,
                    skip = false,
                    pollInterval,
                    notifiyOnNetworkStatusChange = false,
                    client = null,
                    fetchPolicy = 'network-and-cache',
                    errorPolicy = () => {
                    },
                  }) {

  const apolloCurrentResult = reactive({
    data: null,
    error: null,
    loading: null,
    stale: null,
    networkStatus: null
  });

  const observableQuery = context.root.$apollo.watchQuery({
    query,
  });

  observableQuery.subscribe({
    next(result) {
      apolloCurrentResult.data = result.data;
      apolloCurrentResult.loading = result.loading;
      apolloCurrentResult.networkStatus = result.networkStatus;
      apolloCurrentResult.stale = result.stale;
      apolloCurrentResult.error = null;
    },
    error(error) {
      apolloCurrentResult.loading = false;
      apolloCurrentResult.stale = false;
      apolloCurrentResult.error = error;
    }
  });

  return {
    result: toRefs(apolloCurrentResult),
    query: observableQuery,
    helpers: {
      fetchMore: observableQuery.fetchMore.bind(observableQuery),
      refetch: observableQuery.refetch.bind(observableQuery),
      startPolling: observableQuery.startPolling.bind(observableQuery),
      stopPolling: observableQuery.stopPolling.bind(observableQuery),
      updateQuery: observableQuery.updateQuery.bind(observableQuery),
    }
  }
}

module.exports = useQuery;
