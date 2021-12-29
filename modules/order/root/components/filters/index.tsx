import TextSearchField from '@/components/autocompletes/search'
import FilterByStatus from '@/components/autocompletes/status'
import AppFilters from '@/components/common/filters'
import React from 'react'

const OrderRootFilters = () => {
  return (
    <AppFilters>
      <TextSearchField />
      <FilterByStatus />
    </AppFilters>
  )
}

export default OrderRootFilters
