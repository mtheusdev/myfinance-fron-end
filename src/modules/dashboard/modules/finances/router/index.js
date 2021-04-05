const RecordsHome = () => import('./../views/RecordsHome')
const RecordsAdd = () => import('./../views/RecordsAdd')

export default [
  {
    path: 'records',
    component: RecordsHome,
    meta: { requiresAuth: true },
    alias: ['home', '']
  },
  {
    path: 'records/add',
    name: 'recordsAdd',
    component: RecordsAdd,
    meta: { requiresAuth: true }
  }
]
