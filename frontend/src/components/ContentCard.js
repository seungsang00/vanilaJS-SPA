import Component from '../core/Component';

export default class ContentCard extends Component {
  setup() {
    this.$state = {
      data: this.$props.data,
    };
  }
  template() {
    const { type } = this.$props;

    if (type === 'basic') {
      const { rank, idx, title, imageUrl, mediaName, url, summaryContent } = this.$state.data;
      return `
        <div class="content-item content-item-${idx}" data-url=${url}  data-index=${rank}>
          <div class="content-thumb" data-src=${imageUrl} style="background-image: url(${imageUrl});">
            <button class="content-bookmark-btn" data-content="bookmark-btn-${idx}">☆</button>
          </div>
          <h2 class="content-title">${title}</h2>
          <p class="content-summary">${summaryContent}</p>
          <span class="author">${mediaName}</span>
        </div>
      `;
    } else if (type === 'rank') {
      const { rank, idx, title, mediaName, url } = this.$state.data;
      return `
        <div class="content-item ranking-content content-item-${idx}" data-url=${url}>
          <div class="top12 content-rank">${rank}</div>
          <div class="top12 content-info">
            <h2 class="content-title">${title}</h2>
            <span class="author">${mediaName}</span>
          </div>
        </div>
      `;
    }
  }
  setEvent() {
    const { handleCardClick, handleBookmark } = this.$props;
    const { idx } = this.$state.data;
    const data = { ...this.$state.data };

    // FIXME: 이벤트 처리가 안된다...
    const $bookmarkBtn = document.querySelector('.content-bookmark-btn');
    $bookmarkBtn &&
      $bookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log(JSON.stringify(data));
        console.log('click');
      });
  }
  render() {
    console.log(this.$target.innerHTML);
  }
}
