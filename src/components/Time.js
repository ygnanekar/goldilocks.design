import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'

const getTime = (format = 'h:mm A MMM D') => moment().format(format)

const Timestamp = styled.span`
  font-size: ${props => props.theme.size[props.fontSize || 500]};
  font-weight: 300;

  ${props => props.theme.media.tabletHorizontal`
    font-size: ${props => props.theme.size[
      props.fontSize ? props.fontSize + 50 : 600
    ]};
  `}

  ${props => props.theme.media.phone`
    font-size: ${props => props.theme.size[
      props.fontSize ? props.fontSize + 150 : 700
    ]};
  `}
`

const Time = ({ fontSize, format }) => {
  const [time, setTime] = useState(getTime(format))
  
  useEffect(() => {
    const timer = setInterval(() =>
      setTime(getTime(format))
    , 1000)
    return () => clearInterval(timer)
  })

  return <Timestamp fontSize={fontSize}>{time}</Timestamp>
}

const timeSizes = {
  sm: 200,
  md: 500,
  lg: 900
}

const dateSizes = {
  sm: 100,
  md: 350,
  lg: 500
}

export const TimeClockDate = styled.div.attrs({
  children: ({ size }) => (
    <>
      <Time format='h:mm' fontSize={timeSizes[size]} />
      <Time format='dddd, MMMM D' fontSize={dateSizes[size]} />
    </>
  )
})`
  display: grid;
  user-select: none;
  line-height: 1;
  text-align: center;
`

export default Time
