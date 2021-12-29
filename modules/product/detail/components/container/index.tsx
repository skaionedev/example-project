import AppBreadcrumbs from '@/components/common/breadcrumbs'
import PageStateComponent from '@/components/common/page-state'
import { useProductsOneQuery } from '@/hooks/queries/products/useProductsOneQuery'
import React from 'react'
import ProductDetailProvider from '../../provider'
import ProductDetailAttributes from '../attributes'
import ProductDetailCategories from '../categories'
import ProductDetailAdditional from '../additional'
import ProductDetailMain from '../main'
import ProductDetailSizes from '../sizes'
import { useRouter } from 'next/router'
import ProductDetailImages from '../images'

const ProductDetailContainer = () => {
  const { data, status } = useProductsOneQuery()
  const router = useRouter()
  console.log({ data })

  return (
    <>
      <AppBreadcrumbs current={data ? data.name_ru : `${router.query.id}`} />
      <PageStateComponent status={status}>
        <ProductDetailProvider>
          <ProductDetailMain />
          <ProductDetailImages />
          <ProductDetailCategories />
          <ProductDetailSizes />
          <ProductDetailAttributes />
          <ProductDetailAdditional />
        </ProductDetailProvider>
      </PageStateComponent>
    </>
  )
}

export default ProductDetailContainer
