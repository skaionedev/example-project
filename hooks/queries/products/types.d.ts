export interface IProduct {
  color_id: string
  createdAt: string
  gender: null | number
  image: string
  in_stock: boolean
  name: string
  name_ru: string
  on_sale: boolean
  price?: string
  prod_id: string
  sale_price: number
  price_usd: number
  price_lira: number
  slug: string
  tm_id: number
  trademark: ITrademak
}
export interface ITrademak {
  createdAt: string
  logo: null | string
  title: string
  title_tr: string
  tm_id: number
  value: string
}

export interface IProductFull extends IProduct {
  productDescriptions: IProductDescription[]
  categories: IProductCategory[]
  productDetails: IProductDetail[]
  productImages: IProductImage[]
  productSizes: IProductSize[]
}

export interface IProductDescription {
  desc_id: string
  prod_id: string
  text: string
  text_origin: string
  text_ru: string
}

export interface IProductCategory {
  cat_id: number
  createdAt?: string
  img: string
  img_ru: string
  is_visible: null | boolean
  parent_id?: number
  priority: number
  prod_count: number
  title: string
  title_ru: string
}

export interface IProductDetail {
  cd_id: number
  cost_price: number
  cross_item: string
  order_count: number
  origin_name: string
  origin_site: string
  origin_url: string
  prod_id: string
  updatedAt?: string
  view_count?: number
}

export interface IProductImage {
  img_id: string
  is_main?: boolean
  large: string
  medium: string
  prod_id: string
  small: string
}

export interface IProductSize {
  size: {
    s_id: string
    label: string
    count?: number
    priority: number
    createdAt?: string
  }
  stockQuantity: number
}
