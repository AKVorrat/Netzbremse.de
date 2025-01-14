class GDPRiframeWrapper extends HTMLElement {
  static consentBtnSelector = ".gdpr-consent-btn"
  static consentOverlaySelector = ".gdpr-consent-overlay"
  static loadingSelector = ".gdpr-loading-indicator"
  
  constructor() {
    super()
  }

  connectedCallback() {
    const consentBtn = this.querySelector(GDPRiframeWrapper.consentBtnSelector)
    consentBtn.setAttribute("a", "")
    consentBtn?.addEventListener("click", (event) => {
      event.preventDefault()
      this.loadIframe()
      this.hideConsentOverlay()
    })
  }

  loadIframe() {
    const iframe = this.querySelector("iframe")
    const src = iframe?.getAttribute("data-src")
    if (src) {
      iframe.setAttribute("src", src)
    }

    // capture iframe loading state
    this.showLoadingOverlay()
    iframe?.addEventListener("load", () => {
      this.hideLoadingOverlay()
    })
  }

  hideConsentOverlay() {
    this.setVisibility(GDPRiframeWrapper.consentOverlaySelector, "hidden")
  }

  showLoadingOverlay() {
    this.setVisibility(GDPRiframeWrapper.loadingSelector, "visible")
  }

  hideLoadingOverlay() {
    this.setVisibility(GDPRiframeWrapper.loadingSelector, "hidden")
  }

  setVisibility(selector, value) {
    const element = this.querySelector(selector)
    if (element && element.style) {
      element.style.visibility = value
    }
  }
}

customElements.define("gdpr-iframe-wrapper", GDPRiframeWrapper)