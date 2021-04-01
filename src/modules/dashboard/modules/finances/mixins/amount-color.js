export default {
  methods: {
    amountColor (amount) {
      return amount < 0 ? 'error2--text text--lighten-1' : 'greenPool--text text--lighten-1'
    }
  }
}
