import Component from '../core/Component';
import ContentCard from './ContentCard';
import EmptyMessage from './EmptyMessage';
import { listObserber } from '../utils/obserbers';

const DATA_LIMIT = 40;

export default class InfiniteContentList extends Component {
  setup() {
    const { category, type, initialData, onLastItemShown } = this.$props;
    this.$state = {
      category,
      data: initialData,
      type,
      $emptyMessage: null,
    };
    this.$io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0 && entry.target.dataset.index < DATA_LIMIT) {
          if (entry.target.dataset.index == this.$state.data.length) {
            onLastItemShown(category);
          }
        }
      });
    });
  }

  template() {
    return `
      <h2 class="content-section-title">${this.$state.category}</h2>
      <section class="content-list" data-component="content-list"></section>
    `;
  }

  mounted() {
    const $list = this.$target.querySelector('[data-component="content-list"]');
    const { data, type } = this.$state;
    const { handleCardClick, handleBookmark } = this.$props;

    const hasData = data && data.length > 0 ? true : false;

    if (!hasData) {
      this.$state.$emptyMessage = new EmptyMessage($list, { message: 'No Contents :(', visible: !hasData });
      this.$state.$emptyMessage.Visible = !hasData;
    } else {
      $list.innerHTML = data
        .map((content, index) => {
          const $card = new ContentCard($list, {
            data: { ...content, rank: index + 1 },
            type,
            handleBookmark,
            handleCardClick,
          });
          return $card.template();
        })
        .join('');
    }
  }

  setEvent() {
    document.querySelectorAll('.content-item').forEach(($card, index) => {
      this.$io.observe($card, this.$state.data.length, () => console.log(`gogo`));
    });
  }
}
