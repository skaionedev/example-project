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

const ProductDetailSizes = () => {
  const { expanded, handleExpanded } = useProductDetailContext()
  const { data, status, isFetching, isFetched } = useProductsOneQuery()

  const expandedKey = 'product-sizes'
  if (!data) return null

  return (
    <Accordion
      expanded={expanded === expandedKey}
      onChange={handleExpanded(expandedKey)}
      variant="outlined"
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '70%', flexShrink: 0 }}>Размеры</Typography>
      </AccordionSummary>
      <TableContainer sx={{ position: 'relative' }}>
        <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
          <TableHead>
            <TableRow>
              <TableHeaderCell align="left">Ид</TableHeaderCell>
              <TableHeaderCell align="left">Размер </TableHeaderCell>
              <TableHeaderCell align="left">В наличии </TableHeaderCell>
              <TableHeaderCell align="left">Кол-во </TableHeaderCell>
              <TableHeaderCell align="left">Приоритет </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TablePlaceholder
              status={status}
              length={data?.productSizes.length}
              isFetching={isFetching && !isFetched}
            />

            {status === 'success' &&
              data?.productSizes?.map(size => (
                <TableRow hover key={size.size.s_id}>
                  <TableCell>#{size.size.s_id}</TableCell>

                  <TableCell>{size.size.label}</TableCell>
                  <TableCell>{size.stockQuantity}</TableCell>

                  <TableCell>{size.size.count ? size.size.count : '----'}</TableCell>
                  <TableCell>{size.size.priority}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <AccordionDetails>выфв</AccordionDetails> */}
    </Accordion>
  )
}

export default ProductDetailSizes
