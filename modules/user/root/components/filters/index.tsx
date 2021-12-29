import TextSearchField from '@/components/autocompletes/search'
import AppFilters from '@/components/common/filters'
import React from 'react'

const UserRootFilters = () => {
  return (
    <AppFilters>
      <TextSearchField />
    </AppFilters>
  )
}

export default UserRootFilters
