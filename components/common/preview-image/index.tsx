import React from 'react'
import AppModal from '../modal'
import NextImage from 'next/image'
import { ImageWrapper, Content, Loader } from './styles'
import { ASSETS_URL } from '@/lib/constants'
import { CircularProgress } from '@mui/material'

interface Props {
  url: string
  width?: number
  height?: number
  boxWidth?: number
  boxHeight?: number
}

const PreviewImage: React.FC<Props> = props => {
  const {
    url = '',
    height = 500,
    width = 500,
    boxHeight = 300,
    boxWidth = 300,
    children
  } = props
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [image, setImage] = React.useState('')

  React.useEffect(() => {
    setImage(url)
  }, [url])

  const openModal = () => {
    if (!url) return
    setIsOpen(true)
  }
  const stopLoading = () => setIsLoading(false)

  return (
    <>
      <Content onClick={openModal}>{children}</Content>

      <AppModal open={isOpen} onClose={setIsOpen} title="">
        <ImageWrapper>
          {isLoading && (
            <Loader boxHeight={boxHeight} boxWidth={boxWidth}>
              <CircularProgress />
            </Loader>
          )}

          <NextImage
            width={width}
            height={height}
            onLoadingComplete={stopLoading}
            onError={stopLoading}
            unoptimized
            src={`${ASSETS_URL}${url}`}
            objectFit="contain"
          />
        </ImageWrapper>
      </AppModal>
    </>
  )
}

export default PreviewImage
