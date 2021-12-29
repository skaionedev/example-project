import { styled } from '@mui/material/styles'

export const ImageWrapper = styled('div')`
  position: relative;
  /* min-height: 400px;
  min-width: 400px; */
`

export const Content = styled('div')`
  cursor: pointer;
`

export const Loader = styled('div', {
  shouldForwardProp: prop => prop !== 'boxHeight' && prop !== 'boxWidth'
})<{ boxWidth: number; boxHeight: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ boxWidth }) => boxWidth}px;
  height: ${({ boxHeight }) => boxHeight}px;
`
