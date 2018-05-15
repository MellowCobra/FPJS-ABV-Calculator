import initModel from './Model'
import update from './Update'
import view from './View'
import app from './App'

const node = document.querySelector('[name="app"]')

app(initModel, update, view, node)
