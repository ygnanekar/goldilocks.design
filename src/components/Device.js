import React from 'react'
import styled from 'styled-components'
import { BlobAnimated } from './Blob'

const Device = styled.div`
  display: grid;
  position: relative;
  grid-area: layout-body;
  grid-template-rows: ${props => props.theme.size.layout[500]} auto ${props => props.theme.size.layout[500]};
  background-color: ${props => props.theme.colors.black[100]};
  box-shadow: 0 ${props => props.theme.size.layout[200]} ${props => props.theme.size.layout[400]} rgba(0, 0, 0, 0.075);
  border-radius: ${props => props.theme.size.layout[400]};
`

const DeviceHeader = styled.header`
  display: grid;
  padding: ${props => `${props.theme.size.layout[200]} ${props.theme.size.layout[450]}`};
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.colors.black[200]};
`

const DeviceHeaderNav = styled.nav`
  height: ${props => `${props.theme.size.layout[450]}`};
`

const DeviceHeaderIcon = styled.div`
  height: ${props => `${props.theme.size.layout[450]}`};
  justify-self: center;
`

const DeviceHeaderAction = styled.div`
  height: ${props => `${props.theme.size.layout[450]}`};
  justify-self: end;
`

const DeviceBody = styled.main`
  padding: ${props => `${props.theme.size.layout[500]} ${props.theme.size.layout[600]}`};
`

const DeviceFooter = styled.footer`
`

const DeviceBackground = styled.div`
  position: fixed;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.black[100]};
  pointer-events: none;
`

export default ({children, headerNav, headerIcon, headerAction, ...props}) => (
  <>
    <DeviceBackground>
      <BlobAnimated />
    </DeviceBackground>
    <Device {...props}>
      <DeviceHeader>
        <DeviceHeaderNav>{headerNav}</DeviceHeaderNav>
        <DeviceHeaderIcon>{headerIcon}</DeviceHeaderIcon>
        <DeviceHeaderAction>{headerAction}</DeviceHeaderAction>
      </DeviceHeader>
      <DeviceBody>
        {children}
      </DeviceBody>
      <DeviceFooter />
    </Device>
  </>
)
