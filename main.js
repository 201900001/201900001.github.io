class Icon extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['src', 'tooltip'];
  }

  get src() {
    return this.getAttribute('src');
  }

  get tooltip() {
    return this.getAttribute('tooltip');
  }

  get style() {
    return this.getAttribute('style');
  }

  uuid() {
    return this.src + Math.random().toString(36);
  }

  render() {
    const id = this.uuid();
    const template = document.createElement('template');
    template.innerHTML = `
        <div
          style="${this.style}"
          class="w-10 h-10 inline-flex items-center justify-center rounded overflow-hidden"
        >  
          <img
            data-tooltip-target="${id}"
            data-tooltip-placement="bottom"
            src="assets/icon/${this.src}"
            alt="icon"
            loading="lazy" 
          />
        </div>
        ${
          this.tooltip
            ? `<div
                id="${id}"
                role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                ${this.tooltip}
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>`
            : ''
        }
    `;
    this.append(template.content.cloneNode(true));
  }
}

customElements.define('i-con', Icon);

const toIndexPage = () => {
  document.querySelector('span#off').classList.remove('text-gray-300');
  document.querySelector('span#on').classList.add('text-gray-300');
  document.querySelector('input[type="checkbox"]').checked = false;
  document.querySelector('main').style.visibility = 'hidden';
  setTimeout(() => {
    window.location.href = '/';
  }, 500);
};

const toStyledPage = () => {
  document.querySelector('span#off').classList.add('text-gray-300');
  document.querySelector('span#on').classList.remove('text-gray-300');
  document.querySelector('input[type="checkbox"]').checked = true;
  document.querySelector('main').style.visibility = 'hidden';
  setTimeout(() => {
    window.location.href = '/styled';
  }, 500);
};

document.addEventListener('DOMContentLoaded', event => {
  document.querySelector('main').style.opacity = 1;
});
