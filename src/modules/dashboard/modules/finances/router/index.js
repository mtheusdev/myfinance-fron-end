const RecordsHome = () => import('./../views/RecordsHome')
const ReportsHome = () => import('./../views/ReportsHome')
const RecordsAdd = () => import('./../views/RecordsAdd')

export default [
  {
    path: 'records',
    component: RecordsHome,
    meta: { requiresAuth: true },
    alias: ['home', '']
  },
  {
    path: 'reports',
    component: ReportsHome,
    meta: { requiresAuth: true }
  },
  {
    path: 'records/add',
    name: 'recordsAdd',
    component: RecordsAdd,
    meta: { requiresAuth: true }
  }
]
