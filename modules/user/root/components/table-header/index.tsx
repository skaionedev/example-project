import TableToolbar from '@/components/common/table/toolbar'
import { useUsersAllQuery } from '@/hooks/queries/users/useUsersAllQuery'
import React from 'react'
import UserRootFilters from '../filters'

const UserRootTableHeader = () => {
  const { data } = useUsersAllQuery()
  return (
    <TableToolbar
      title="Пользователи"
      titleCount={data?.count}
      titleCountTooltip="Количество пользователей"
    >
      <UserRootFilters />
    </TableToolbar>
  )
}

export default UserRootTableHeader
