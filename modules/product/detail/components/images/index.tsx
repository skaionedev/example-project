import TablePlaceholder from '@/components/common/table/placeholder'
import { TableHeaderCell } from '@/components/styled/TableHeaderCell'
import { useProductsOneQuery } from '@/hooks/queries/products/useProductsOneQuery'
import { ASSETS_URL } from '@/lib/constants'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useProductDetailContext } from '../../provider'
import NextImage from 'next/image'
import PreviewImage from '@/components/common/preview-image'

const ProductDetailImages = () => {
  const { expanded, handleExpanded } = useProductDetailContext()
  const { data, status, isFetching, isFetched } = useProductsOneQuery()

  const expandedKey = 'product-images'
  if (!data) return null

  return (
    <Accordion
      expanded={expanded === expandedKey}
      onChange={handleExpanded(expandedKey)}
      variant="outlined"
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '70%', flexShrink: 0 }}>Фотографии товара</Typography>
      </AccordionSummary>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 260px)', position: 'relative' }}>
        <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
          <TableHead>
            <TableRow>
              <TableHeaderCell align="left">Ид</TableHeaderCell>
              <TableHeaderCell align="left">Основная </TableHeaderCell>
              <TableHeaderCell align="left">Маленькая </TableHeaderCell>
              <TableHeaderCell align="left">Средняя </TableHeaderCell>
              <TableHeaderCell align="left">Большая </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TablePlaceholder
              status={status}
              length={data?.productImages.length}
              isFetching={isFetching && !isFetched}
            />

            {status === 'success' &&
              data?.productImages?.map(image => (
                <TableRow hover key={image.img_id}>
                  <TableCell>#{image.img_id}</TableCell>
                  <TableCell>{image.is_main ? 'Да' : 'Нет'}</TableCell>
                  <TableCell>
                    <PreviewImage url={image.small}>
                      <NextImage
                        unoptimized
                        objectFit="contain"
                        height={60}
                        width={60}
                        src={`${ASSETS_URL}${image.small}`}
                      />
                    </PreviewImage>
                  </TableCell>
                  <TableCell>
                    <PreviewImage url={image.medium}>
                      <NextImage
                        unoptimized
                        objectFit="contain"
                        height={60}
                        width={60}
                        src={`${ASSETS_URL}${image.medium}`}
                      />
                    </PreviewImage>
                  </TableCell>
                  <TableCell>
                    <PreviewImage url={image.large}>
                      <NextImage
                        unoptimized
                        objectFit="contain"
                        height={60}
                        width={60}
                        src={`${ASSETS_URL}${image.large}`}
                      />
                    </PreviewImage>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Accordion>
  )
}

export default ProductDetailImages
