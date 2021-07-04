import ContentList from '../components/ContentList';
import Component from '../core/Component';

export default class Bookmark extends Component {
  setup() {
    this.$state = {
      data: this.$props.data,
    };
  }

  template() {
    return `<section class="bookmark-content-list" data-component="bookmark-contents"></section>`;
  }

  mounted() {
    const $bookmarkContents = document.querySelector('[data-component="bookmark-contents"]');
    const { handleCardClick, handleBookmark, onLastItemShown } = this.$props;

    new ContentList($bookmarkContents, {
      category: 'bookmark',
      type: 'basic',
      initialData: this.$state.data,
      handleBookmark,
      handleCardClick,
      onLastItemShown,
    });
  }
}
