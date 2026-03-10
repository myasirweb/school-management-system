import React from 'react'
import AdminHeader from './header'
import UserNameCard from '../UI/userNameCard'
import StatsCards from '../UI/StatsCards'
import AdminEvents from '../UI/adminEvents'
import FinanceOverview from '../UI/FinanceOverview'
import QuickActions from '../UI/QuickActions'
import EarningAndExpenses from '../UI/earningAndExpenses'
import ActivityArea from '../UI/activityArea'

const AdminDashboardMain = () => {
  return (
    <div>
      <AdminHeader />
  
      <UserNameCard />
      <StatsCards />
      <AdminEvents />
      <FinanceOverview />
      <QuickActions />
      <EarningAndExpenses />
      <ActivityArea />
    </div>
  )
}

export default AdminDashboardMain
