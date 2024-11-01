class Router {
    constructor() {
      window.onpopstate = this.handlePopState;
    }

    navigate(path: string) {
      history.pushState({}, '', path);
      this.route(path);
    }

    handlePopState() {
      this.route(window.location.pathname);
    }

    route(path: string) {
      // Define route handling logic
    }
  }