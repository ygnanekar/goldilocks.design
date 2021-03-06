import { graphql } from 'gatsby'

export const query = graphql`
  fragment ToolFrontmatter on MarkdownRemarkFrontmatter {
    id
    title
    description
    docs
    website
    version
    category
    github {
      ...Repository
    }
    npm {
      ...Package
    }
    badge {
      childImageSharp {
        fluid(maxWidth: 512) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }

  fragment Tool on MarkdownRemark {
    id
    fields {
      slug
      collection
    }
  }
`
