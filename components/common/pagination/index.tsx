import { filterOutFalsyItems } from '@/lib/utils'
import { Divider, Grid, Pagination } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  pages: number
}

const AppPagination: React.FC<Props> = ({ pages }) => {
  const router = useRouter()

  const [page, setPage] = React.useState(1)
  const isInitedRef = React.useRef(false)

  const paginate = (_: React.ChangeEvent<unknown>, page: number) => {
    const query = filterOutFalsyItems({ ...router.query, page: page > 1 ? page : null })
    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true
    })
    setPage(page)
  }

  React.useEffect(() => {
    const routerPage = router.query.page
    if (isInitedRef.current || !routerPage) return
    const number = Number(routerPage.toString())
    setPage(number)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitedRef.current, router.query.page])

  return (
    <>
      {pages > 1 && (
        <>
          <Divider />
          <Grid container justifyContent="flex-end" spacing={1} sx={{ padding: '10px 4px' }}>
            <Grid item>
              <Pagination
                shape="rounded"
                color="primary"
                size="small"
                count={pages}
                page={page}
                onChange={paginate}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default AppPagination
