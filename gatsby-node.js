const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const sourceGitHub = require('./src/plugins/sourceGithub')
const sourceNPM = require('./src/plugins/sourceNPM')

exports.sourceNodes = async ({ actions: { createNode }, createNodeId, createContentDigest }) => {
  const actions = { createNode, createNodeId, createContentDigest }
  await sourceGitHub(actions)
  await sourceNPM(actions)
  return
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  const isMarkdown = node.internal.type === 'MarkdownRemark'
  const collection = isMarkdown && getNode(node.parent).sourceInstanceName
  
  if (isMarkdown) {
    createNodeField({
      name: `slug`,
      node,
      value: `/${collection}${createFilePath({ node, getNode })}`,
    })

    createNodeField({
      name: `collection`,
      node,
      value: collection,
    })

    if (collection === 'tools') {
      createNodeField({
        name: `isPackage`,
        node,
        value: !!node.frontmatter.npm,
      })
    }
  }
}

exports.createPages = ({ graphql, actions: { createPage } }) =>
  graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
              collection
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.log(result.errors)
      throw result.errors
    }

    const remark = result.data.allMarkdownRemark.edges
    const posts = remark.filter(({node: post}) => post.fields.collection === 'posts')
    const projects = remark.filter(({node: project}) => project.fields.collection === 'projects')
    const tools = remark.filter(({node: tools}) => tools.fields.collection === 'tools')
    const template = name => path.resolve(`src/templates/${name}.js`)
    const createFeedbackPage = slug => createPage({
      path: slug + 'feedback',
      component: template('feedback'),
      context: {
        slug: slug + 'feedback',
        from: slug
      }
    })

    posts.forEach((post, index) => {
      const slug = post.node.fields.slug
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      createPage({
        path: slug,
        component: template('post'),
        context: {
          slug: slug,
          previous,
          next
        }
      })

      createFeedbackPage(slug)
    })

    projects.forEach(project => {
      const slug = project.node.fields.slug

      createPage({
        path: slug,
        component: template('project'),
        context: {
          slug: slug,
        }
      })

      createFeedbackPage(slug)
    })

    tools.forEach(tool => {
      createPage({
        path: tool.node.fields.slug,
        component: template('tool'),
        context: {
          slug: tool.node.fields.slug,
        }
      })
    })
  })
