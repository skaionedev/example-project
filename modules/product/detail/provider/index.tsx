import { useProductsOneQuery } from '@/hooks/queries/products/useProductsOneQuery'
import React from 'react'
import { IProductDetailContext } from './types'

const ProductDetailContext = React.createContext<IProductDetailContext>(
  {} as IProductDetailContext
)

const ProductDetailProvider: React.FC = ({ children }) => {
  const { status } = useProductsOneQuery()
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleExpanded =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  React.useEffect(() => {
    let cleanup = false
    let tID: NodeJS.Timeout

    if (status === 'success') {
      tID = setTimeout(() => {
        if (cleanup) return
        setExpanded('product-main')
      }, 100)
    }
    return () => {
      cleanup = true
      clearTimeout(tID)
    }
  }, [status])

  const memoedValue = React.useMemo(
    () => ({
      handleExpanded,
      expanded
    }),
    [expanded]
  )

  return (
    <ProductDetailContext.Provider value={memoedValue}>
      {children}
    </ProductDetailContext.Provider>
  )
}

export function useProductDetailContext() {
  const context = React.useContext(ProductDetailContext)
  if (context === undefined) {
    throw new Error(
      'useProductDetailContext should be used within ProductDetailProvider '
    )
  }

  return context
}

export default ProductDetailProvider
