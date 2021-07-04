import InfiniteContentList from '../components/InfiniteContentList';
import Component from '../core/Component';

export default class Sub extends Component {
  setup() {
    this.$state = {
      category: this.$props.category,
      data: this.$props.data,
    };
    console.log(this.$state.category);
  }

  template() {
    return `<section class="category-content-list" data-component="infinite-contents"></section>`;
  }

  mounted() {
    const $infiniteContents = document.querySelector('[data-component="infinite-contents"]');
    const { handleCardClick, handleBookmark, onLastItemShown } = this.$props;

    new InfiniteContentList($infiniteContents, {
      category: this.$state.category,
      type: 'basic',
      initialData: this.$state.data,
      handleBookmark,
      handleCardClick,
      onLastItemShown,
    });
  }
}
