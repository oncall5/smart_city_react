

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, { Suspense } from 'react';
import LoadingPage from './components/LoadingPage'
// import React from 'react'
// import {  useRoutes } from 'react-router-dom'
import routes from './router/router'

const renderRoutes = (routes) => {
  if (!Array.isArray(routes)) {
    return null;
  }
  return (
    <Switch>
      {routes.map((route, index) => {
        //这里的意思就是会先进行寻找router中是否有redirct的配置，如果有就进行配置，因为没有子组件，所以可以直接return
        console.log("routes.map((route, index)",route)
        if (route.redirect) {
          return (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
            />
          );
        }
        //当不需要redirect的时候，则需要渲染自己的子组件
        return (
          <Route
            key={route.path || index}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            // 这里将会渲染子组件
            render={() => {
              const renderChildRoutes = renderRoutes(route.childRoutes);
              console.log("renderChildRoutes",route,renderChildRoutes)
              //之后判断当前的路由配置项是否具有component属性，如果有则需要渲染这个组件，如果没有这个属性，则返回子路由的渲染结果即可
              if (route.component) {
                return (
                  //这里的Suspense组件就是为了当异步import组件的时候，如果需要加载的模块还没有完成，就会先加载fallback中的组件，之后当加载完毕之后才会跳转
                  <Suspense fallback={<LoadingPage />}>
                    <route.component route={route}>{renderChildRoutes}</route.component>
                  </Suspense>
                );
              }
              return renderChildRoutes;
            }}
          />
        );
      })}
    </Switch>
  );
};

function App() {
  
  return (
    <Router>
      {renderRoutes(routes)}
      </Router>
  );
}

export default App;
