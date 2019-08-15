<script>
  // https://www.graphqlhub.com/playground?query=%23%20Welcome%20to%20GraphQLHub!%20Type%20your%20GraphQL%20query%20here%2C%20or%0A%23%20explore%20the%20%22Docs%22%20to%20the%20right%0A%0A%7B%0A%20%20hn2%20%7B%0A%20%20%20%20nodeFromHnId(id%3A%22clayallsopp%22%2C%20isUserId%3Atrue)%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20...%20on%20HackerNewsV2User%20%7B%0A%20%20%20%20%20%20%20%20submitted(first%3A%205)%20%7B%0A%20%20%20%20%20%20%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20hasNextPage%0A%20%20%20%20%20%20%20%20%20%20%20%20endCursor%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20cursor%0A%20%20%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20...%20on%20HackerNewsV2Story%20%7B%0A%09%09%09%09%09%09%09%09score%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20...%20on%20HackerNewsV2Comment%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20text%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D
  export default {
    apollo: `# Welcome to GraphQLHub! Type your GraphQL query here, or
# explore the "Docs" to the right

{
  hn2 {
    nodeFromHnId(id:"clayallsopp", isUserId:true) {
      id
      ... on HackerNewsV2User {
        submitted(first: 5) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            cursor
            node {
              id
              ... on HackerNewsV2Story {
                score
                url
              }
              ... on HackerNewsV2Comment {
                text
              }
            }
          }
        }
      }
    }
  }
}`
  }
</script>
