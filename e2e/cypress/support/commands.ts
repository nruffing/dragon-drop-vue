import { spyConsoleLogs } from './e2e'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Navigates to the given path using the router.
       * @param path The path to navigate to.
       */
      navigateViaRouter(path: string): Chainable
      /**
       * Returns the spyConsoleLogs array for the current test.
       */
      getSpyConsoleLogs(): Chainable<any[]>
      /**
       * Asserts that the given event was logged to the console for the element with the given id.
       * @param eventName The name of the event to check for.
       * @param elementId The id of the element to check the event was logged for.
       * @param expectedCount The number of times the event should have been logged.
       * @param logIndex The index of the log to check for. A new log is created for every window/navigation. Defaults to 0.
       */
      expectEventLogged(eventName: string, elementId: string, expectedCount: number, logIndex?: number): Chainable
    }
  }
}

Cypress.Commands.add('navigateViaRouter', (path: string) => {
  return cy.get(`nav a[href="${path}"]`).click()
})

Cypress.Commands.add('getSpyConsoleLogs', () => {
  return cy.wrap(spyConsoleLogs)
})

Cypress.Commands.add('expectEventLogged', (eventName: string, elementId: string, expectedCount: number, logIndex?: number) => {
  return cy.getSpyConsoleLogs().then(logs => {
    const index = logIndex ?? 0
    if (logs.length <= index) {
      throw new Error(`Expected log index ${index} to exist, but there are only ${logs.length} logs`)
    }

    let actual = 0
    const log = logs[index]
    for (const args of log.args) {
      if (args.length < 1) {
        continue
      }
      const logObj = args[0]
      if (!logObj) {
        continue
      }
      if (logObj.eventName === eventName && logObj.domEl?.id === elementId) {
        actual++
      }
    }

    expect(actual).to.equal(
      expectedCount,
      `Expected event ${eventName} to be logged for element with id ${elementId} in log index ${index} ${expectedCount} times, but it was logged ${actual} times`,
    )
  })
})
