import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (<Wrapper>{children}</Wrapper>)
}

export default AuthLayout
