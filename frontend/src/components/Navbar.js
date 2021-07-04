import Component from '../core/Component';

export default class Navbar extends Component {
  template() {
    return `
      <ul class="nav-item-list">
        <li class="nav-item" route="/">HOME</li>
        <li class="nav-item" route="/life">라이프</li>
        <li class="nav-item" route="/food">푸드</li>
        <li class="nav-item" route="/trip">여행</li>
        <li class="nav-item" route="/culture">컬쳐</li>
        <li class="nav-item" route="/bookmark">즐겨찾기</li>
      </ul>
    `;
  }

  setEvent() {
    const { handleRoute } = this.$props;
    this.addEvent('click', '.nav-item-list', (event) => {
      handleRoute(event.target);
    });
  }
}
