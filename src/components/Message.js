import React from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'

import Avatar from './Avatar'
import Bubble from './Bubble'
import Link from './Link'

const Message = styled.div`
  display: grid;
  grid-template-columns: ${props => props.theme.size.layout[450]} ${props => props.bubbleWidth || 'auto'};
  grid-template-rows: auto auto;
  grid-column-gap: ${props => props.theme.size.layout[200]};
  grid-template-areas: 
    "avatar bubbles"
    ". timestamp";
  justify-content: start;

  ${props => props.theme.media.tabletHorizontal`
    grid-template-columns: ${props => props.theme.size.layout[500]} ${props => props.bubbleWidth || 'auto'};
    grid-column-gap: ${props => props.theme.size.layout[250]};
  `}

  ${props => props.theme.media.tabletVertical`
    grid-template-columns: ${props => props.theme.size.layout[550]} ${props => props.bubbleWidth || 'auto'};
    grid-column-gap: ${props => props.theme.size.layout[300]};
  `}

  ${props => props.theme.media.phone`
    grid-template-columns: ${props => props.theme.size.layout[650]} ${props => props.bubbleWidth || 'auto'};
    grid-column-gap: ${props => props.theme.size.layout[400]};
  `}
`

export const Messages = styled.div`
  display: grid;
  align-self: center;
  width: ${props => props.theme.size.layout[800]};
  grid-row-gap: ${props => props.theme.size.layout[300]};
`

const MessageBanner = styled.img`
  width: 100%;
`

const bubbles = css`
  display: flex;
  flex-direction: column;
  grid-area: bubbles;

  > * {
    border-radius: 0;
  }

  > *:first-child {
    border-top-left-radius: ${props => props.theme.size.layout[350]};
    border-top-right-radius: ${props => props.theme.size.layout[350]};

    ${props => props.theme.media.tabletHorizontal`
      border-top-left-radius: ${props => props.theme.size.layout[500]};
      border-top-right-radius: ${props => props.theme.size.layout[500]};
    `}

    ${props => props.theme.media.tabletVertical`
      border-top-left-radius: ${props => props.theme.size.layout[550]};
      border-top-right-radius: ${props => props.theme.size.layout[550]};
    `}

    ${props => props.theme.media.phone`
      border-top-left-radius: ${props => props.theme.size.layout[650]};
      border-top-right-radius: ${props => props.theme.size.layout[650]};
    `}
  }

  > *:last-child {
    border-bottom-left-radius: ${props => props.theme.size.layout[350]};
    border-bottom-right-radius: ${props => props.theme.size.layout[350]};

    ${props => props.theme.media.tabletHorizontal`
      border-bottom-left-radius: ${props => props.theme.size.layout[500]};
      border-bottom-right-radius: ${props => props.theme.size.layout[500]};
    `}

    ${props => props.theme.media.tabletVertical`
      border-bottom-left-radius: ${props => props.theme.size.layout[550]};
      border-bottom-right-radius: ${props => props.theme.size.layout[550]};
    `}

    ${props => props.theme.media.phone`
      border-bottom-left-radius: ${props => props.theme.size.layout[650]};
      border-bottom-right-radius: ${props => props.theme.size.layout[650]};
    `}
  }
`

const BubbleGroup = styled.div`
  ${bubbles}
`

const BubbleGroupLink = styled(Link)`
  ${bubbles}
`

const Bubbles = props => props.to
  ? <BubbleGroupLink {...props} />
  : <BubbleGroup {...props} />

const MessageAvatarLink = styled.a`
  align-self: flex-end;
  grid-area: avatar;
`

const MessageAvatar = props => (
  <MessageAvatarLink
    href={`https://twitter.com/${props.author}`}
    title={props.author}
    target="_blank"
  >
    <Avatar {...props} />
  </MessageAvatarLink>
)

const Details = styled.small`
  margin: 0.5rem 1.25rem;
  grid-area: timestamp;
  font-size: 12px;
  color: ${props => props.theme.colors.black[900]};
`

export default ({children, banner, avatar, author, title, timestamp, details, to, ...props}) => (
  <Message {...props}>
    <MessageAvatar fixed={avatar} author={author} />
    <Bubbles to={to}>
      {/* {banner && <MessageBanner fixed={banner} title={title} />} */}
      {banner && <MessageBanner src={banner} title={title} />}
      <Bubble>
        {children}
      </Bubble>
    </Bubbles>
    {(timestamp || details) && (
      <Details>
        {timestamp && moment(timestamp).fromNow()}
        {(timestamp && details) && ' - '}
        {details}
      </Details>
    )}
  </Message>
)
