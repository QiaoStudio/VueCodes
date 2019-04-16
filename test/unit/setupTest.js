import _ from 'lodash'

let errorSpy

let originalConsole = _.cloneDeep(window.console)
global.beforeAll(() => {
  errorSpy = jest.spyOn(window.console, 'error')
})

global.beforeEach(() => {
  errorSpy.mockClear()
})

global.afterEach(() => {
  expect(errorSpy).not.toHaveBeenCalled()
})

global.afterAll(() => {
  window.console = originalConsole
})
