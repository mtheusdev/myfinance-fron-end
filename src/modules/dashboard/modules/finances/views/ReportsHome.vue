<template>
  <v-layout row wrap>
    <v-flex xs12>
      <ToolbarByMonth format="MM-YYYY" color="primary"
        :month="month || $route.query.month"
        @month="changeMonth"
      />
    </v-flex>
    <v-flex v-for="chart in charts" :key="chart.title" xs12 sm6 md6 lg6 xl6>
      <v-card>
        <v-card-text>
          <h2 class="font-weight-light mb-4">{{ chart.title }}</h2>
          <canvas :ref="chart.refId"></canvas>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Chart from 'chart.js'
import { mapActions, mapState } from 'vuex'
import ToolbarByMonth from './../components/ToolbarByMonth'
import RecordsService from './../services/records-service'
import { Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { generateChartConfigs } from '@/utils'

export default {
  name: 'ReportsHome',
  data () {
    return {
      monthSubject$: new Subject(),
      records: [],
      subscriptions: [],
      charts: [
        {
          title: 'Receitas vs Despesas',
          refId: 'chartIncomesExpenses'
        },
        {
          title: 'Despesas por Categoria',
          refId: 'chartCategoryExpenses'
        }
      ],
      chartIncomesExpenses: undefined,
      chartCategoryExpenses: undefined
    }
  },
  methods: {
    ...mapActions(['setTitle']),
    ...mapActions('finances', ['setMonth']),
    changeMonth (month) {
      this.$router.push({
        path: this.$route.path,
        query: { month }
      })
      this.setMonth({ month })
      this.monthSubject$.next(month)
    },
    createChart (chartId, options) {
      const ref = Array.isArray(this.$refs[chartId]) ? this.$refs[chartId][0] : this.$refs[chartId]
      const ctx = ref.getContext('2d')
      return new Chart(ctx, options)
    },
    setRecords () {
      this.subscriptions.push(
        this.monthSubject$.pipe(mergeMap(month => RecordsService.records({ month }))).subscribe(records => {
          this.records = records
          this.setCharts()
        })
      )
    },
    setCharts () {
      // receitas e despesas
      const chartIncomesExpensesConfigs = generateChartConfigs({
        type: 'bar',
        items: this.records,
        keyToGroup: 'type',
        keyOfValue: 'amount',
        aliases: { CREDIT: 'Receitas', DEBIT: 'Despesas' },
        backgroundColors: [
          this.$vuetify.theme.themes.dark.greenPool2,
          this.$vuetify.theme.themes.dark.error
        ]
      })
      if (this.chartIncomesExpenses) {
        this.chartIncomesExpenses.data.datasets = chartIncomesExpensesConfigs.data.datasets
        this.chartIncomesExpenses.update()
      } else {
        this.chartIncomesExpenses = this.createChart('chartIncomesExpenses', chartIncomesExpensesConfigs)
      }
      // despesas por categoria
      const chartCategoryExpensesConfigs = generateChartConfigs({
        type: 'doughnut',
        items: this.records.filter(r => r.type === 'DEBIT'),
        keyToGroup: 'category.description',
        keyOfValue: 'amount',
        backgroundColors: [
          this.$vuetify.theme.themes.dark.accent,
          this.$vuetify.theme.themes.dark.primary,
          this.$vuetify.theme.themes.dark.greenPool,
          this.$vuetify.theme.themes.dark.greenPool2
        ]
      })
      if (this.chartCategoryExpenses) {
        this.chartCategoryExpenses.data.datasets = chartCategoryExpensesConfigs.data.datasets
        this.chartCategoryExpenses.data.labels = chartCategoryExpensesConfigs.data.labels
        this.chartCategoryExpenses.update()
      } else {
        this.chartCategoryExpenses = this.createChart('chartCategoryExpenses', chartCategoryExpensesConfigs)
      }
    }
  },
  computed: {
    ...mapState('finances', ['month'])
  },
  components: {
    ToolbarByMonth
  },
  created () {
    this.setTitle({ title: 'Relatórios' })
    this.setRecords()
  },
  destroyed () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
</script>

<style>

</style>
