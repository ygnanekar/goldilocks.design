require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `goldilocks design`,
    titleAlt: `goldilocks design - thoughts on the web`,
    description: `thoughts on the web`,
    author: `@scotato`,
    twitter: '@scotato',
    siteUrl: 'https://goldilocks.design', // https://www.gatsbyjs.org/docs/path-prefix
    shortTitle: 'goldilocks.design', // Used for App manifest e.g. Mobile Home Screen
    shareImage: '/images/share.png', // Open Graph Default Share Image. 1200x1200 is recommended
    shareImageWidth: 900, // Change to the width of your default share image
    shareImageHeight: 600, // Change to the height of your default share image
    siteLogo: '/images/logo-512.png', // Logo used for SEO, RSS, and App manifest
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-external-links`]
      }
    },
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
          rule: {
            include: /brand|icons/
          }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `goldilocks-design`,
        short_name: `goldilocks`,
        start_url: `/`,
        background_color: `#F6D55C`,
        theme_color: `#F6D55C`,
        display: `minimal-ui`,
        icon: `static/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}/blog/${edge.node.fields.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/blog/${edge.node.fields.slug}`,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {frontmatter: { draft: { ne: true } }}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Goldilocks Design RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Source Sans Pro`,
            variants: [`200`,`200i`, `300`,`300i`, `400`, `400i`, `600`, `600i`, `700`, `700i`, `900`, `900i`]
          },
          {
            family: `Source Code Pro`,
            variants: [`200`, `300`, `400`, `500`, `600`, `700`, `900`]
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        head: true,
        anonymize: true
      },
    },
    'gatsby-plugin-netlify'
  ],
}
