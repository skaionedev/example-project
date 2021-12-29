import AppPagination from '@/components/common/pagination'
import { useUsersAllQuery } from '@/hooks/queries/users/useUsersAllQuery'
import { Card } from '@mui/material'
import React from 'react'
import UserRootTable from '../table'
import UserRootTableHeader from '../table-header'

const UserRootContainer = () => {
  const { data } = useUsersAllQuery()
  const pages = data?.count ? Math.ceil(data?.count / 10) : 1
  return (
    <>
      <Card variant="outlined">
        <UserRootTableHeader />
        <UserRootTable />
        <AppPagination pages={pages} />
      </Card>
    </>
  )
}

export default UserRootContainer
