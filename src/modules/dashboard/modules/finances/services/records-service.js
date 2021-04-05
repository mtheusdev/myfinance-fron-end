import apollo from '@/plugins/apollo'
import RecordsQuery from './../graphql/Records.gql'
import TotalBalanceQuery from './../graphql/TotalBalance.gql'
import moment from 'moment'

const records = async variables => {
  const response = await apollo.query({
    query: RecordsQuery,
    variables
  })
  return response.data.records
}

const totalBalance = async () => {
  const response = await apollo.query({
    query: TotalBalanceQuery,
    variables: {
      date: moment().format('YYYY-MM-DD')
    }
  })
  return response.data.totalBalance
}

export default {
  records,
  totalBalance
}
