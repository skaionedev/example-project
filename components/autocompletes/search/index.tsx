import React from 'react'
import { useRouter } from 'next/router'
import useDebounce from '@/hooks/debounce/useDebounceHook'
import { InputAdornment, TextField } from '@mui/material'
import { filterOutFalsyItems, getResolution } from '@/lib/utils'
import { MdSearch } from 'react-icons/md'

interface Props {
  label?: string
  queryString?: string
  width?: string
}

const TextSearchField = (props: Props) => {
  const isMobile = getResolution() === 'MOBILE'
  const {
    label = 'Поиск',
    queryString = 'search',
    width = isMobile ? '100%' : '25%'
  } = props
  const router = useRouter()
  const [text, setText] = React.useState('')
  const isDirtyRef = React.useRef(false)

  const debouncedText = useDebounce(text, 400)

  React.useEffect(() => {
    if (isDirtyRef.current) return
    if (router.query[queryString]) {
      setText(`${router.query[queryString]}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query[queryString], isDirtyRef.current])

  React.useEffect(() => {
    if (!isDirtyRef.current) return
    if (debouncedText) {
      const query = { ...router.query, [queryString]: debouncedText, page: null }
      const path = { pathname: router.pathname, query: filterOutFalsyItems(query) }
      router.replace(path, undefined, { shallow: true })
    } else {
      const query = { ...router.query, [queryString]: null, page: null }

      const path = { pathname: router.pathname, query: filterOutFalsyItems(query) }
      router.replace(path, undefined, { shallow: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText])

  const handleChange = (e: any) => {
    if (!isDirtyRef.current) isDirtyRef.current = true
    setText(e.target.value)
  }

  return (
    <TextField
      variant="standard"
      margin="none"
      label={label}
      size="small"
      sx={{ width }}
      value={text}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MdSearch />
          </InputAdornment>
        )
      }}
    />
  )
}

export default TextSearchField
