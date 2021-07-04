import Component from '../core/Component';

export default class EmptyMessage extends Component {
  setup() {
    const { visible = false, message } = this.$props;
    this.$state = {
      visible,
      message,
    };
  }

  template() {
    return `
      <article class="empty-msg">
        <h2>${this.$state.message}</h2>
      </article>
    `;
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
