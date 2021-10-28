import React from "react";
// import * as core from "dva-core";
import * as core from "../dva-core";
import invariant from "invariant";
import createHashHistory from "history/createHashHistory";
import { Provider, connect as _connect } from "react-redux";
import { routerMiddleware, routerReducer as routing } from "react-router-redux";
import document from "global/document";
import { isFunction } from "dva-core/lib/utils";

export const connect = _connect; // 把connect原封不动地返回

export default function (opts = {}) {
  // 获得history对象
  const history = opts.history || createHashHistory();
  const createOpts = {
    initialReducer: {
      routing,
    },
    setupMiddlewares(middlewares) {
      return [routerMiddleware(history), ...middlewares];
    },
    setupApp(app) {
      app._history = patchHistory(history);
    },
  };

  const app = core.create(opts, createOpts); // 创建app
  const oldAppStart = app.start;
  app.router = router;
  app.start = start;
  return app;

  function router(router) {
    invariant(
      isFunction(router),
      `[app.router] router should be function, but got ${typeof router}`
    );
    app._router = router;
  }

  function start(container) {
    // 允许 container 是字符串，然后用 querySelector 找元素
    if (isString(container)) {
      container = document.querySelector(container);
      invariant(container, `[app.start] container ${container} not found`);
    }

    // 并且是 HTMLElement
    invariant(
      !container || isHTMLElement(container),
      `[app.start] container should be HTMLElement`
    );

    // 路由必须提前注册
    invariant(
      app._router,
      `[app.start] router must be registered before app.start()`
    );

    oldAppStart.call(app);
    const store = app._store;

    // export _getProvider for HMR
    // ref: https://github.com/dvajs/dva/issues/469
    app._getProvider = getProvider.bind(null, store, app);

    // If has container, render; else, return react component
    if (container) {
      render(container, store, app, app._router);
      app._plugin.apply("onHmr")(render.bind(null, container, store, app));
    } else {
      return getProvider(store, this, this._router);
    }
  }
}

function isHTMLElement(node) {
  return (
    typeof node === "object" && node !== null && node.nodeType && node.nodeName
  );
}

function isString(str) {
  return typeof str === "string";
}

function getProvider(store, app, router) {
  return (extraProps) => (
    <Provider store={store}>
      {router({ app, history: app._history, ...extraProps })}
    </Provider>
  );
}

function render(container, store, app, router) {
  const ReactDOM = require("react-dom"); // eslint-disable-line
  ReactDOM.render(
    React.createElement(getProvider(store, app, router)),
    container
  );
}

// 使用代理模式监听路由的变化
function patchHistory(history) {
  const oldListen = history.listen;
  history.listen = (callback) => {
    callback(history.location);
    oldListen.call(history, callback);
  };
  return history;
}