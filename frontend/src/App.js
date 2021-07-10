import api from './api.js';

import Component from './core/Component';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Bookmark from './pages/Bookmarks.js';
import Home from './pages/Home';
import Sub from './pages/Sub.js';

const LOCAL_KEY_BOOKMARK_CONTENT = 'user-bookmark-contents';
const SESSION_KEY_CUR_PATH = 'user-current-path';
const FIRST_PAGE = 1;

export default class App extends Component {
  setup() {
    this.$state = {
      data: {
        life: [],
        food: [],
        trip: [],
        culture: [],
        top12: [],
        bookmark: [],
      },
      curPage: FIRST_PAGE,
      currentPath: sessionCurPath,
      $dataLoader: null,
    };
  }

  onPopState() {
    const pathName = window.location.pathname;
    this.setState({ currentPath: pathName });
  }

  historyRouterPush(pathName) {
    window.history.pushState({}, pathName, window.location.origin + '/' + pathName);
  }

  template() {
    return `
      <header>
        <h1 class="logo">vanilla ZUM</h1>
        <nav data-component="navigator"></nav>
      </header>
      <main data-component="app-content"></main>
      <div class="loading" data-component="loading"></div>
      <footer>
        <a class="repo-link" href="https://github.com/seungsang00/zum">Github Repository</a>
      </footer>`;
  }

  beforeMounted() {
    const $loader = this.$target.querySelector('[data-component="loading"]');
    this.addLoader(new Loading($loader));
    this.fetchContentsData();
  }

  mounted() {
    const $nav = this.$target.querySelector('[data-component="navigator"]');
    const $main = this.$target.querySelector('[data-component="app-content"]');

    // 자식 컴포넌트 마운트
    new Navbar($nav, {
      handleRoute: (pathName) => {
        console.log(pathName);
        this.historyRouterPush(pathName);
        this.setState({ currentPath: pathName });
        window.sessionStorage.setItem(SESSION_KEY_CUR_PATH, pathName);
      },
    });

    if (this.$state.currentPath === '') {
      new Home($main, {
        data: {
          lifeContents: this.$state.data.life.slice(0, 4),
          foodContents: this.$state.data.food.slice(0, 4),
          tripContents: this.$state.data.trip.slice(0, 4),
          cultureContents: this.$state.data.culture.slice(0, 4),
          top12Contents: this.$state.data.top,
        },
        handleCardClick: this.handleCardClick,
        handleBookmark: this.handleBookmark,
      });
    } else if (this.$state.currentPath === 'life') {
      this.renderMain($main, 'life');
    } else if (this.$state.currentPath === 'food') {
      this.renderMain($main, 'food');
    } else if (this.$state.currentPath === 'trip') {
      this.renderMain($main, 'trip');
    } else if (this.$state.currentPath === 'culture') {
      this.renderMain($main, 'culture');
    } else if (this.$state.currentPath === 'bookmark') {
      new Bookmark($main, {
        data: this.$state.data.bookmark,
        handleCardClick: this.handleCardClick,
        handleBookmark: this.handleBookmark,
      });
    }
  }

  renderMain($main, category) {
    new Sub($main, {
      data: this.$state.data[category],
      category,
      handleCardClick: this.handleCardClick.bind(this),
      handleBookmark: this.handleBookmark.bind(this),
      onLastItemShown: this.onLastItemShown.bind(this),
    });
  }

  loadLocalStorageData() {
    const localBookmarkList = localStorage.getItem(LOCAL_KEY_BOOKMARK_CONTENT);
    if (localBookmarkList) {
      const loaded = localBookmarkList.split(',');
      this.setState({ data: { ...this.$state.data, bookmark: loaded } });
    }
  }

  fetchContentsData() {
    this.$loader.Visible = true;
    api.fetchContents({ category: 'home' }).then(({ data }) => {
      this.$loader.Visible = false;
      this.setState({ data: { ...this.$state.data, ...data } });
    });
  }

  handleCardClick(url) {
    // TODO: 상세페이지로 이동
    // TODO: api.fetchDetail로 상세페이지 데이터 받아오기
    console.log(`move to >>>`, url);
  }

  handleBookmark(content) {
    console.log(content);
    const { bookmark } = this.$state.data;
    const pushed = bookmark.push(JSON.parse(content));
    localStorage.setItem(LOCAL_KEY_BOOKMARK_CONTENT, JSON.stringify(pushed));
  }

  onLastItemShown(category) {
    this.$loader.Visible = true;
    api.fetchContents({ category, page: this.$state.curPage + 1 }).then(({ data: nextPageData }) => {
      this.$loader.Visible = false;
      this.$state.curPage++; // 성공했으니 진짜 +1
      const data = this.$state.data[category];
      console.log(this.$state);
      const concatData = data.concat(nextPageData);
      const newData = { ...this.$state.data, [category]: concatData };
      this.setState({ data: newData });
    });
  }
}
