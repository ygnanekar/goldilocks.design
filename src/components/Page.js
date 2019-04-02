import React from 'react'
import { ThemeProvider } from 'styled-components'
import moment from 'moment'

import { useView, useViewEffect } from '../hooks'
import GlobalStyle from '../styles/global-style'
import getTheme from '../styles/theme'
import Layout from './Layout'
import Device from './Device'
import SEO from './SEO'
import Banner from './Banner'

const Page = props => {
  const { page, post } = props.data
  const { id, title, color, colorWeight } = page
  const navBlacklist = ['lock', '404', 'home']
  const theme = props.theme || getTheme()

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle bodyBg={theme.colors[color][colorWeight]} />
        <SEO title={title} description={post && post.excerpt} />
        <Layout hasBanner={!!post}>
          {post && <Banner {...post.frontmatter} />}
          <Device
            page={page}
            navTitle={!navBlacklist.includes(id) && (post ? 'Blog' : 'Home')}
            navTo={post ? '/blog' : '/home'}
            detail={post && moment(post.frontmatter.date).format('MMM D, YYYY')}
            backgroundIsFlipped={!!post}
            footer={id === 'home'}
          >
            {props.children}
          </Device>
        </Layout>
      </>
    </ThemeProvider>
  )
}

export const PageBrowser = ({children, ...props}) => {
  const [view] = useView()
  useViewEffect()

  return (
    <Page theme={getTheme(view)} {...props}>
      {children}
    </Page> 
  )
}

export default Page