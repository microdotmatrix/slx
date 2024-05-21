export const metaObjectQuery = `#graphql
  query MyQuery($type: String!) {
    metaobjects(type: $type, first: 10) {
      nodes {
        handle
        id
        fields {
          key
          value
          references(first: 1) {
            nodes {
              ... on MediaImage {
                id
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
