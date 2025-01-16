class InfiniteScroll extends HTMLElement {
  constructor() {
    super() 
  }

  connectedCallback() {
    const children = Array.from(this.childNodes);
    for (const child of children) {
      const clone = child.cloneNode(true);
      if (clone.setAttribute) 
        clone.setAttribute("aria-hidden", "true")
      this.appendChild(clone)
    }
  }

}

customElements.define("infinite-scroll-x", InfiniteScroll)
