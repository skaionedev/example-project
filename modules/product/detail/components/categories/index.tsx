import PreviewImage from '@/components/common/preview-image'
import TablePlaceholder from '@/components/common/table/placeholder'
import { TableHeaderCell } from '@/components/styled/TableHeaderCell'
import { useProductsOneQuery } from '@/hooks/queries/products/useProductsOneQuery'
import { ASSETS_URL } from '@/lib/constants'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import NextImage from 'next/image'
import * as React from 'react'
import { useProductDetailContext } from '../../provider'
import { ImageWrapper, StyledTitle } from './styles'

const ProductDetailCategories = () => {
  const { expanded, handleExpanded } = useProductDetailContext()
  const { data, status, isFetching, isFetched } = useProductsOneQuery()

  const expandedKey = 'product-categories'
  if (!data) return null

  function resolvePathUrl(url: string) {
    return `${ASSETS_URL}${url}`
  }

  return (
    <Accordion
      expanded={expanded === expandedKey}
      onChange={handleExpanded(expandedKey)}
      variant="outlined"
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '70%', flexShrink: 0 }}>Категории</Typography>
      </AccordionSummary>
      <TableContainer sx={{ position: 'relative' }}>
        <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
          <TableHead>
            <TableRow>
              <TableHeaderCell align="left">Ид</TableHeaderCell>
              <TableHeaderCell align="left">{'Название(RU)'}</TableHeaderCell>
              <TableHeaderCell align="left">{'Название'}</TableHeaderCell>
              <TableHeaderCell align="left">Видимость </TableHeaderCell>
              <TableHeaderCell align="left">Приоритет </TableHeaderCell>
              <TableHeaderCell align="left">Кол-во товаров </TableHeaderCell>
              <TableHeaderCell align="left">Родитель </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TablePlaceholder
              status={status}
              length={data?.categories.length}
              isFetching={isFetching && !isFetched}
            />

            {status === 'success' &&
              data?.categories?.map(cat => (
                <TableRow hover key={cat.cat_id}>
                  <TableCell>#{cat.cat_id}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PreviewImage url={cat.img_ru}>
                        <ImageWrapper>
                          <NextImage
                            unoptimized
                            objectFit="contain"
                            height={50}
                            width={50}
                            src={resolvePathUrl(cat.img_ru)}
                          />
                        </ImageWrapper>
                      </PreviewImage>
                      <Tooltip title={cat.title_ru}>
                        <StyledTitle>{cat.title_ru}</StyledTitle>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PreviewImage url={cat.img}>
                        <ImageWrapper>
                          <NextImage
                            unoptimized
                            objectFit="contain"
                            height={50}
                            width={50}
                            src={resolvePathUrl(cat.img)}
                          />
                        </ImageWrapper>
                      </PreviewImage>
                      <Tooltip title={cat.title}>
                        <StyledTitle>{cat.title}</StyledTitle>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                  <TableCell>{cat.is_visible ? 'да' : 'нет'}</TableCell>
                  <TableCell>{cat.priority}</TableCell>
                  <TableCell>{cat.prod_count}</TableCell>
                  <TableCell>{cat.parent_id ? cat.parent_id : '-----'}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <AccordionDetails>выфв</AccordionDetails> */}
    </Accordion>
  )
}

export default ProductDetailCategories
