export default class NavCtrl {
  constructor() {
    this.init();
  }

  init() {
    this.isNavCollapsed = true;
    this.isCollapsed = false;
    this.isCollapsedHorizontal = false;

    this.status = {
      isopen: false
    };
  }

  toggleDropdown($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}

