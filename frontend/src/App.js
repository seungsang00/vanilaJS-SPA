import api from './api.js';

import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Component from './core/Component';
import Home from './pages/Home';

const LOCAL_KEY_BOOKMARK_CONTENT = 'user-bookmark-contents';
const FIRST_PAGE = 1;
const MAIN_PAGE = '/';

export default class App extends Component {
  setup() {
    this.$state = {
      data: {
        lifeContents: [],
        foodContents: [],
        tripContents: [],
        cultureContents: [],
        top12Contents: [],
        bookmarkContents: [],
      },
      curPage: FIRST_PAGE,
      currentPath: MAIN_PAGE,
      $dataLoader: null,
    };

    // window.onpopstate = () => this.onPopState(window.location.pathname);
  }

  // onPopState(path) {
  //   this.$state.currentPath = path;
  //   const $main = this.$target.querySelector('[data-component="app-content"]');
  //   $main.innerHTML = '';
  //   this.render();
  // }

  // historyRouterPush(pathName) {
  //   window.history.pushState({}, pathName, window.location.origin + pathName);
  // }

  // changeTap(path) {
  //   this.data.currentPath = path;
  //   this.historyRouterPush(path);
  //   const $main = this.$target.querySelector('[data-component="app-content"]');
  //   $main.innerHTML = '';
  //   this.render();
  // }

  template() {
    return `
      <header>
        <h1 class="logo">vanilla ZUM</h1>
        <nav data-component="navigator"></nav>
      </header>
      <main data-component="app-content"></main>
      <div data-component="loading"></div>
      <footer>
        <a class="repo-link" href="https://github.com/seungsang00/zum">Github Repository</a>
      </footer>`;
  }

  setLoader() {
    const $loader = this.$target.querySelector('[data-component="loading"]');
    this.setState({ $dataLoader: new Loading($loader) });
    this.fetchContentsData();
  }

  mounted() {
    const $nav = this.$target.querySelector('[data-component="navigator"]');
    const $main = this.$target.querySelector('[data-component="app-content"]');
    // const $loader = this.$target.querySelector('[data-component="loading"]');

    // 자식 컴포넌트 마운트
    new Navbar($nav, {
      handleRoute: (event) => {
        const pathName = event.target.getAttribute('route');
        this.changeTap(pathName);
      },
    });

    // this.setState({ $dataLoader: new Loading($loader) });
    // this.fetchContentsData();

    new Home($main, {
      data: {
        lifeContents: lifeContents.slice(0, 4),
        foodContents: foodContents.slice(0, 4),
        tripContents: tripContents.slice(0, 4),
        cultureContents: cultureContents.slice(0, 4),
        top12Contents,
      },
      handleCardClick: this.handleCardClick,
      handleBookmark: this.handleBookmark,
    });
  }

  handleCardClick(url) {
    console.log(`move to >>>`, url);
  }

  handleBookmark(content) {
    const { bookmarkContents } = this.$state.data;
    const newBookmarkContents = bookmarkContents.push(content);
    window.localStorage.setItem(LOCAL_KEY_BOOKMARK_CONTENT, JSON.stringify(newBookmarkContents));
  }

  fetchContentsData() {
    this.$state.$dataLoader.Visible = true;
    api.fetchContents({ category: 'home' }).then(({ data }) => {
      console.log(data);
      this.$state.$dataLoader.Visible = false;
      const { life, food, trip, culture, top } = data;
      const homeData = {
        data: {
          lifeContents: life,
          foodContents: food,
          tripContents: trip,
          cultureContents: culture,
          top12Contents: top,
        },
      };
      this.setState(homeData);
    });
  }
}
