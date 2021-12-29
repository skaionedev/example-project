import TablePlaceholder from '@/components/common/table/placeholder'
import { TableHeaderCell } from '@/components/styled/TableHeaderCell'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { formatDateDetail } from '@/lib/utils'
import {
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { StyledTitle, ImageWrapper, StyledLink } from './styles'
import { MdModeEdit } from 'react-icons/md'
import { IOrderProductFull } from '@/hooks/queries/orders/types'
import OrderDetailProductStatus from '../product-status'
import NextImage from 'next/image'
import { ASSETS_URL } from '@/lib/constants'
import { BiLinkExternal } from 'react-icons/bi'
import { AiOutlineLink } from 'react-icons/ai'
import OrderDetailProductInfo from '../product-info'
import PreviewImage from '@/components/common/preview-image'

const OrderDetailTable = () => {
  const { data, status, isFetched, isFetching } = useOrdersOneQuery()
  const router = useRouter()

  function resolvePathUrl(row: IOrderProductFull) {
    return `${ASSETS_URL}${row.image}`
  }

  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 260px)', position: 'relative' }}>
      <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">Ид</TableHeaderCell>
            <TableHeaderCell align="left">Наименование</TableHeaderCell>
            <TableHeaderCell align="left">Размер</TableHeaderCell>

            <TableHeaderCell align="left">Цена</TableHeaderCell>
            <TableHeaderCell align="left" style={{ minWidth: 80 }}>
              Кол-во
            </TableHeaderCell>
            <TableHeaderCell align="left">Сумма</TableHeaderCell>
            <TableHeaderCell align="left" style={{ minWidth: 120 }}>
              Статус
            </TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TablePlaceholder
            status={status}
            length={data?.orderDetails.length}
            isFetching={isFetching && !isFetched}
          />

          {status === 'success' &&
            data?.orderDetails?.map(row => (
              <TableRow hover key={row.od_id}>
                <TableCell>{row.od_id}</TableCell>
                <TableCell align="left">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PreviewImage url={row.image}>
                      <ImageWrapper>
                        <NextImage
                          unoptimized
                          objectFit="contain"
                          height={50}
                          width={50}
                          src={resolvePathUrl(row)}
                        />
                      </ImageWrapper>
                    </PreviewImage>
                    <Tooltip title={row.name_ru}>
                      <StyledTitle>{row.name_ru}</StyledTitle>
                    </Tooltip>
                  </Stack>
                </TableCell>
                <TableCell align="left">{row.size}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.count}</TableCell>
                <TableCell align="left">{(row.price * row.count).toFixed(2)}</TableCell>
                <TableCell align="left">
                  <OrderDetailProductStatus product={row} />
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center">
                    <Tooltip title="Посмотреть на сайте">
                      <StyledLink href={row.origin_url} target="_blank" rel="noreferrer">
                        <IconButton size="small">
                          <AiOutlineLink size={20} />
                        </IconButton>
                      </StyledLink>
                    </Tooltip>
                    <OrderDetailProductInfo product={row} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderDetailTable
