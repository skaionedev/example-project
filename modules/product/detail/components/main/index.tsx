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
import NextImage from 'next/image'
import { ASSETS_URL } from '@/lib/constants'
import PreviewImage from '@/components/common/preview-image'

const ProductDetailMain = () => {
  const { expanded, handleExpanded } = useProductDetailContext()
  const { data } = useProductsOneQuery()

  const expandedKey = 'product-main'
  if (!data) return null

  return (
    <Accordion
      expanded={expanded === expandedKey}
      onChange={handleExpanded(expandedKey)}
      variant="outlined"
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '70%', flexShrink: 0 }}> Основная информация</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={1}>
          <PreviewImage url={data.productImages[0].small}>
            <NextImage
              unoptimized
              objectFit="contain"
              height={240}
              width={240}
              src={`${ASSETS_URL}${data.productImages[0].small}`}
            />
          </PreviewImage>
          <ListTile label="Название" value={data?.name} />
          <ListTile label="Название (RU)" value={data?.name_ru} />
          <ListTile label="В наличии" value={data?.in_stock ? 'да' : 'нет'} />
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        <Stack direction="row" spacing={1} sx={{ ml: -1.5 }}>
          <ListTile label="Слаг" value={data?.slug} />
          {data?.gender && <ListTile label="Пол" value={data?.gender} />}
          <ListTile label="В продаже" value={data?.on_sale ? 'да' : 'нет'} />
          <ListTile label="Цена" value={`TL ${data?.price_lira?.toFixed(2)}`} />
          <ListTile label="Цена" value={`$ ${data?.price_usd?.toFixed(2)}`} />
          <ListTile label="Цена" value={`${data?.sale_price?.toFixed(2)}`} />
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        <Stack direction="row" spacing={1}>
          <PreviewImage url={data.trademark.logo || ''}>
            <NextImage
              unoptimized
              objectFit="contain"
              height={240}
              width={240}
              src={`${ASSETS_URL}${data.trademark.logo}`}
            />
          </PreviewImage>
          <ListTile label="Ид брендa" value={data?.trademark.tm_id} />
          <ListTile label="Бренд" value={data?.trademark.title} />
          <ListTile label="Бренд (ТR)" value={data?.trademark.title_tr} />
          <ListTile label="Значение" value={data?.trademark.value} />
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export default ProductDetailMain
