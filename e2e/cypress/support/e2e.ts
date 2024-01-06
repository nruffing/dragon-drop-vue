import './commands'

export const spyConsoleLogs: any[] = []

beforeEach(() => {
  // clear the spyConsoleLogs array before each test
  while (spyConsoleLogs.length) {
    spyConsoleLogs.pop()
  }
  Cypress.on('window:before:load', win => {
    spyConsoleLogs.push(cy.spy(win.console, 'log'))
  })
})
