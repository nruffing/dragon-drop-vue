describe('v-drag', () => {
  it('successfully adds and removes draggable attribute, classes, and event listener', () => {
    cy.visit('/v-drag')

    const elementId = 'test-drag-item'

    cy.get(`#${elementId}`)
      .should('have.attr', 'draggable', 'true')
      .should('have.class', 'cy-dragClass')
      .should('have.class', 'ddv-draggable')
      .expectEventAttached('dragstart')
      .expectEventAttached('dragend')

    cy.expectEventLogged('useNativeEvent | event listener added', elementId, 2)

    // Navigate to another page to ensure the event listener is removed
    cy.navigateViaRouter('/').then(() => {
      cy.expectEventLogged('useNativeEvent | event listener removed', elementId, 2).then(logs => {
        cy.wrap(logs.find(log => log.event === 'dragstart')).should('exist')
        cy.wrap(logs.find(log => log.event === 'dragend')).should('exist')
      })
    })
  })
})
