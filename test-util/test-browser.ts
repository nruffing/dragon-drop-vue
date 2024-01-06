export function getIframeDocument(id: string): Document {
  const selector = `#${id}`
  const iframe = document.querySelector(selector) as HTMLIFrameElement
  const doc = iframe.contentDocument
  if (!doc) {
    throw new Error(`Could not find frame with selector ${selector}`)
  }
  return doc
}

export function getVitestDocument(): Document {
  return getIframeDocument('vitest-ui')
}

export function queryTestDomSelector(selector: string): HTMLElement | null {
  return getVitestDocument().querySelector(selector)
}
