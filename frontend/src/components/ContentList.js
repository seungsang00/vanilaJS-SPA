import Component from '../core/Component';
import ContentCard from './ContentCard';
import EmptyMessage from './EmptyMessage';

export default class ContentList extends Component {
  setup() {
    const { category, type, initialData, handleCardClick, handleBookmark } = this.$props;
    this.$state = {
      category,
      data: initialData,
      type,
      handleCardClick,
      handleBookmark,
      $emptyMessage: null,
    };
  }

  template() {
    return `
      <h2 class="content-section-title">${this.$state.category}</h2>
      <section data-component="content-list"></section>
    `;
  }

  mounted() {
    const $list = this.$target.querySelector('[data-component="content-list"]');
    const { data, type, handleBookmark, handleCardClick } = this.$state;

    const hasData = this.data && this.data.length > 0 ? true : false;

    if (!hasData) {
      this.$state.$emptyMessage = new EmptyMessage($list, { message: 'No Contents :(', visible: !hasData });
      this.$state.$emptyMessage.Visible = !hasData;
    } else {
      data.forEach((content) => {
        new ContentCard($list, { data: content, type, handleBookmark, handleCardClick });
      });
    }
  }
}
