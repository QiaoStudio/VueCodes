import Vue from 'vue'
import 'src/dependency'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const elementsContext = require.context('../../src/components/elements', true)
elementsContext.keys().forEach(elementsContext)

const modulesContext = require.context('../../src/components/modules', true)
modulesContext.keys().forEach(modulesContext)

const utilitiesContext = require.context('../../src/utilities', true, /\.js$/)
utilitiesContext.keys().forEach(utilitiesContext)
