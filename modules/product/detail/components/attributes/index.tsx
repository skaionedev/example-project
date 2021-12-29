import TablePlaceholder from '@/components/common/table/placeholder'
import { TableHeaderCell } from '@/components/styled/TableHeaderCell'
import { useProductsOneQuery } from '@/hooks/queries/products/useProductsOneQuery'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
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
import * as React from 'react'
import { useProductDetailContext } from '../../provider'
import { StyledTitle } from './styles'

const ProductDetailAttributes = () => {
  const { expanded, handleExpanded } = useProductDetailContext()
  const { data, status, isFetching, isFetched } = useProductsOneQuery()

  const expandedKey = 'product-attributes'
  if (!data) return null

  return (
    <Accordion
      expanded={expanded === expandedKey}
      onChange={handleExpanded(expandedKey)}
      variant="outlined"
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '70%', flexShrink: 0 }}>Атрибуты</Typography>
      </AccordionSummary>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 260px)', position: 'relative' }}>
        <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
          <TableHead>
            <TableRow>
              <TableHeaderCell align="left">Ид</TableHeaderCell>
              <TableHeaderCell align="left">Ид товара </TableHeaderCell>
              <TableHeaderCell align="left">Атрибут </TableHeaderCell>
              <TableHeaderCell align="left">Атрибут(Origin)</TableHeaderCell>
              <TableHeaderCell align="left">Атрибут(RU) </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TablePlaceholder
              status={status}
              length={data?.productSizes.length}
              isFetching={isFetching && !isFetched}
            />

            {status === 'success' &&
              data?.productDescriptions?.map(desc => (
                <TableRow hover key={desc.desc_id}>
                  <TableCell>#{desc.desc_id}</TableCell>
                  <TableCell>{desc.prod_id}</TableCell>

                  <TableCell>
                    <Tooltip title={desc.text}>
                      <StyledTitle>{desc.text}</StyledTitle>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={desc.text_origin}>
                      <StyledTitle>{desc.text_origin}</StyledTitle>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={desc.text_ru}>
                      <StyledTitle>{desc.text_ru}</StyledTitle>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <AccordionDetails>выфв</AccordionDetails> */}
    </Accordion>
  )
}

export default ProductDetailAttributes
