import { describe, expect, test } from 'vitest'
import DragonDropVue from './DragonDropVue'
import { generateTestVueApp, mountApp } from '../test-util/test-vue-app'

describe('plugin setup', () => {
  test('uses default directive name', () => {
    const testApp = generateTestVueApp()
    DragonDropVue.install(testApp.app)

    expect(testApp.app.directive('drag')).toBeDefined()
    expect(testApp.app.directive('drop')).toBeDefined()
  })

  test('uses overridden directive name', () => {
    const testApp = generateTestVueApp()

    const dragDirectiveName = 'drag-directive-test'
    const dropDirectiveName = 'drop-directive-test'

    DragonDropVue.install(testApp.app, {
      dragDirectiveName,
      dropDirectiveName,
    })

    expect(testApp.app.directive(dragDirectiveName)).toBeDefined()
    expect(testApp.app.directive(dropDirectiveName)).toBeDefined()
  })

  test('native event vue directive is registered', () => {
    const testApp = generateTestVueApp()
    DragonDropVue.install(testApp.app)

    expect(testApp.app.directive('native-event')).toBeDefined()
  })
})
