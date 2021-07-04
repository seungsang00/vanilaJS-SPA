import ContentList from '../components/ContentList';
import Component from '../core/Component';

export default class Home extends Component {
  setup() {
    this.$state = {
      ...this.$props.data,
    };
  }

  template() {
    return `
      <section class="main-contents" data-component="life-contents"></section>
      <section class="main-contents" data-component="food-contents"></section>
      <section class="main-contents" data-component="trip-contents"></section>
      <section class="main-contents" data-component="culture-contents"></section>
      <section class="ranking-contents" data-component="ranking-contents"></section>
    `;
  }

  mounted() {
    const $lifeContents = document.querySelector('[data-component="life-contents"]');
    const $foodContents = document.querySelector('[data-component="-contents"]');
    const $tripContents = document.querySelector('[data-component="-contents"]');
    const $cultureContents = document.querySelector('[data-component="-contents"]');
    const $rankingContents = document.querySelector('[data-component="-contents"]');

    const { lifeContents, foodContents, tripContents, cultureContents, top12Contents } = this.$state;
    const { handleCardClick, handleBookmark } = this.$props;

    new ContentList($lifeContents, {
      category: '#라이프',
      type: 'basic',
      initialData: lifeContents,
      handleCardClick,
      handleBookmark,
    });
    new ContentList($foodContents, {
      category: '#푸드',
      type: 'basic',
      initialData: foodContents,
      handleCardClick,
      handleBookmark,
    });
    new ContentList($tripContents, {
      category: '#여행',
      type: 'basic',
      initialData: tripContents,
      handleCardClick,
      handleBookmark,
    });
    new ContentList($cultureContents, {
      category: '#컬쳐',
      type: 'basic',
      initialData: cultureContents,
      handleCardClick,
      handleBookmark,
    });
    new ContentList($rankingContents, {
      category: '#실시간 TOP 12',
      type: 'rank',
      initialData: top12Contents,
      handleCardClick,
      handleBookmark,
    });
  }
}
