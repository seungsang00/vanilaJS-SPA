import Component from '../core/Component';

export default class Loading extends Component {
  template() {
    return `
      <div class="loading-wrap">
        <div class="spinner">
          <div class="bubble-1"></div>
          <div class="bubble-2"></div>
        </div>
      </div>
    `;
  }

  setup() {
    const { visible } = this.$props || { visible: true };
    this.$state = {
      visible,
    };
  }

  get Visible() {
    return this.$state.visible;
  }

  set Visible(value) {
    this.$state.visible = value;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
    const { visible } = this.$state;
    const display = visible === true ? 'block' : 'none';
    this.$target.style.display = display;
  }
}
