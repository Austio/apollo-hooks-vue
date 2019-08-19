<script>
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
