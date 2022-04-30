import _ from 'lodash'

const result = _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 })
const app = document.getElementById('app')

app.innerHTML = JSON.stringify(result)
