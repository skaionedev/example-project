import { IStatus } from '@/hooks/queries/statuses/types'
import { useStatusesAllQuery } from '@/hooks/queries/statuses/useStatusesAllQuery'
import { filterOutFalsyItems, getResolution } from '@/lib/utils'
import { Autocomplete, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const FilterByStatus = (props: { width?: number | string }) => {
  const isMobile = getResolution() === 'MOBILE'
  const { width = isMobile ? '100%' : 240 } = props
  const router = useRouter()
  const [value, setValue] = React.useState<IStatus | null>(null)
  const { data: statuses, isLoading } = useStatusesAllQuery()

  const isDirtyRef = React.useRef(false)

  React.useEffect(() => {
    if (!isDirtyRef.current) return
    if (value) {
      const query = { ...router.query, status: value.code, page: null }
      const path = { pathname: router.pathname, query: filterOutFalsyItems(query) }
      router.replace(path, undefined, { shallow: true })
    } else {
      const query = { ...router.query, status: null, page: null }
      const path = { pathname: router.pathname, query: filterOutFalsyItems(query) }
      router.replace(path, undefined, { shallow: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isDirtyRef.current])

  React.useEffect(() => {
    if (isDirtyRef.current) return

    if (statuses && router.query.status) {
      const val = statuses.find(s => s.code == router.query.status)
      val && setValue(val)
    }
  }, [router.query.status, statuses])

  const changeValue = (_: any, val: IStatus | null) => {
    if (!isDirtyRef.current) isDirtyRef.current = true
    setValue(val)
  }

  return (
    <Autocomplete
      blurOnSelect
      clearText="Очистить"
      loading={isLoading}
      sx={{ width }}
      noOptionsText="Нет данных"
      getOptionLabel={option => option.name}
      options={statuses ?? []}
      size="small"
      onChange={changeValue}
      value={value}
      renderInput={params => (
        <TextField
          margin="none"
          variant="standard"
          {...params}
          label="Статус"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off'
          }}
        />
      )}
    />
  )
}

export default FilterByStatus
