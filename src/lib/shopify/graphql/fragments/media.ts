export const mediaFragment = /* GraphQL */ `
  fragment MediaFields on Media {
    mediaContentType
    alt
    previewImage {
      url
      width
      height
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
        altText
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
`