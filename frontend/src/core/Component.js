export default class Component {
  $target;
  $props;
  $state;
  $loader;
  $fields;
  $io;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
    this.beforeMounted();
    this.mounted();
    this.setEvent();

    window.onpopstate = () => this.onPopState();
    window.onbeforeunload = () => this.onBeforeUnload();
  }
  onPopState() {}
  onBeforeUnload() {}

  setup() {}

  mounted() {}

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setEvent() {}

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
    this.mounted();
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }

  addLoader(loader) {
    this.$loader = loader;
  }

  beforeMounted() {}

  setFields(fields) {
    this.$fields = { ...this.$fields, ...fields };
  }
}
