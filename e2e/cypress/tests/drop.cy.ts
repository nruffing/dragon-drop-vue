describe('v-drop', () => {
  it('successfully adds and removes classes and event listener', () => {
    cy.visit('/v-drop')

    const elementId = 'test-drop-item'

    cy.get(`#${elementId}`)
      .should('not.have.attr', 'draggable', 'true')
      .should('have.class', 'cy-dropClass')
      .should('have.class', 'ddv-dropzone')
      .expectEventAttached('dragover')
      .expectEventAttached('dragenter')
      .expectEventAttached('dragleave')
      .expectEventAttached('drop')

    cy.expectEventLogged('useNativeEvent | event listener added', elementId, 4)

    // Navigate to another page to ensure the event listener is removed
    cy.navigateViaRouter('/').then(() => {
      cy.expectEventLogged('useNativeEvent | event listener removed', elementId, 4).then(logs => {
        cy.wrap(logs.find(log => log.event === 'dragover')).should('exist')
        cy.wrap(logs.find(log => log.event === 'dragenter')).should('exist')
        cy.wrap(logs.find(log => log.event === 'dragleave')).should('exist')
        cy.wrap(logs.find(log => log.event === 'drop')).should('exist')
      })
    })
  })
})
