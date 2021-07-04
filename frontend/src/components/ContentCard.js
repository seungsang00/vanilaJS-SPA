import Component from '../core/Component';

export default class ContentCard extends Component {
  setup() {
    this.$state = {
      ...this.$props.data,
    };
  }
  template() {
    const { type } = this.$props;

    if (type === 'basic') {
      const { idx, title, imageUrl, mediaName, url, summaryContent } = this.$state;
      return `
        <div class="content-item content-item-${idx}" data-url=${url} data-index=${index}>
          <div class="content-thumb" data-src=${imageUrl} style="background-image: url(${imageUrl});">
            <button class="content-bookmark-btn" data-content="bookmark-btn-${idx}">☆</button>
          </div>
          <h2 class="content-title">${title}</h2>
          <p class="content-summary">${summaryContent}</p>
          <span class="author">${mediaName}</span>
        </div>
      `;
    } else if (type === 'rank') {
      const { rank, idx, title, mediaName, url } = this.$state;
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

    this.addEvent('click', '.content-item', () => {
      handleCardClick(this.$state.url);
    });

    this.addEvent('click', '.content-bookmark-btn', (event) => {
      event.stopPropagation();
      handleBookmark(this.$state);
    });
  }
}
