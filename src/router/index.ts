import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import store from 'store';
import exceptionRoutes from '@/router/route.exception';
import asyncRoutes from '@/router/route.async';
import commonRoutes from '@/router/route.common';
import useStore from '@/store/index';
import { InfoType } from '@/types';

const routes: Array<RouteRecordRaw> = [
  ...commonRoutes, // 无鉴权的业务路由 ex:登录 === 路由白名单
  ...asyncRoutes, // 带鉴权的业务路由
  ...exceptionRoutes, // 异常页必须放在路由匹配规则的最后
];
const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
});
const haveRoutes = async (next: any, to: any) => {
  try {
    const info = store.get('user_info');
    const { user } = useStore();
    let accessRoutes: object[] = [];
    if (info === undefined) {
      const data: InfoType = (await user.getInfo()) as InfoType;
      accessRoutes = (await user.generate(data.menu)) as object[];
    } else {
      const data = store.get('user_info').menu;
      accessRoutes = (await user.generate(data)) as object[];
    }
    accessRoutes.forEach((item: object) => {
      router.addRoute('Home', <RouteRecordRaw>item);
      router.replace(<RouteRecordRaw>item);
    });
    next({ ...to, replace: true });
  } catch (error) {
    next(`/login?redirect=${to.path}`);
  }
};

/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */
router.beforeEach(async (to, from, next) => {
  const token = store.get('user_token') !== undefined;
  const requiresAuth = to.meta.requiresAuth || to.meta.requiresAuth === false;
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (to.name === '404') {
        await haveRoutes(next, to);
      } else {
        next();
      }
      console.log(router.getRoutes(), to);
      // const Info = store.get('user_info') === undefined;
      //   console.log(router.getRoutes(), to)
      //   if (Info) {
      //   await haveRoutes(next, to);
      // } else {
      //   next();
      // }
    }
  } else if (requiresAuth) {
    next();
  } else {
    next(`/login?redirect=${to.path}`);
  }

  // 设置页面标题;
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE;
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
