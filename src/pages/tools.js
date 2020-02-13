import React from 'react'
import { graphql } from 'gatsby'
import groupBy from 'lodash/groupBy'

import Layout, { Container } from '../components/Layout'
import Header from '../components/Header'
import { Back } from '../components/Link'
import Group from '../components/Group'
import CardMedium from '../components/CardMedium'

const ToolsPage = ({ data }) => {
  const tools = data.tools.edges.map(tool => tool.node)
  const toolsByCategory = groupBy(tools, 'frontmatter.category')
  const categoryOrder = [
    'programming-language',
    'user-interface',
    'web',
    'devops',
    'api',
    'design',
    'augmented-reality'
  ]

  return (
    <Layout>
      <Header
        title="Tools"
        primary={<Back to='/' />}
      />
      <Container>
        {categoryOrder.map(category => (
          <Group title={category.replace('-', ' ')}>
            {toolsByCategory[category].map(tool => (
              <CardMedium
                to={tool.fields.slug}
                key={tool.fields.slug}
                badge={tool.frontmatter.badge.childImageSharp.fluid}
                title={tool.frontmatter.title}
                description={tool.frontmatter.description}
              />
            ))}
          </Group>
        ))}
      </Container>
    </Layout>
  )
}

export default ToolsPage

export const pageQuery = graphql`
  query {
    tools: allMarkdownRemark(
        filter: { fields: { collection: { eq: "tools" } } }
        sort: { fields: [frontmatter___title], order: ASC }
      ) {
        edges {
          node {
            ...Tool
          }
        }
    }
  }
`

export const query = graphql`
  fragment Tool on MarkdownRemark {
    id
    fields {
      slug
      collection
    }
    frontmatter {
      id
      title
      description
      github {
        url
      }
      docs
      website
      version
      category
      badge {
        childImageSharp {
          fluid(maxWidth: 512) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      date
      projects
      posts
      tools
    }
  }
`

