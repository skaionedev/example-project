import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useProductDetailContext } from '../../provider'
import ListTile from '@/components/common/list-tile'
import { useProductsOneQuery } from '@/hooks/queries/products/useProductsOneQuery'
import { Divider, Stack } from '@mui/material'

const ProductDetailAdditional = () => {
  const { expanded, handleExpanded } = useProductDetailContext()
  const { data } = useProductsOneQuery()

  const blank = '-------------'
  const expandedKey = 'product-additional'
  if (!data) return null

  return (
    <Accordion
      expanded={expanded === expandedKey}
      onChange={handleExpanded(expandedKey)}
      variant="outlined"
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '70%', flexShrink: 0 }}>Дополнительно</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={1} sx={{ ml: -1.5 }}>
          <a
            style={{ color: 'inherit', textDecoration: 'none' }}
            href={data?.productDetails[0].origin_url}
            target="_blank"
            rel="noreferrer"
          >
            <ListTile label="Ссылка" value={data?.productDetails[0].origin_url} />
          </a>
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        <Stack direction="row" spacing={1} sx={{ ml: -1.5 }}>
          <ListTile
            label="Название(Оригинал)"
            value={data?.productDetails[0].origin_name}
          />
          <ListTile label="Источник" value={data?.productDetails[0].origin_site} />
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        <Stack direction="row" spacing={1} sx={{ ml: -1.5 }}>
          <ListTile label="cd_id" value={data?.productDetails[0].cd_id ?? blank} />
          <ListTile
            label="Стоимость"
            value={data?.productDetails[0].cost_price ?? blank}
          />
          <ListTile
            label="cross_item"
            value={data?.productDetails[0].cross_item ?? blank}
          />
          <ListTile
            label="Кол-во заказов"
            value={data?.productDetails[0].order_count ?? blank}
          />

          <ListTile
            label="Просмотры"
            value={
              data?.productDetails[0].view_count ? data?.productDetails[0].view_count : 0
            }
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export default ProductDetailAdditional
