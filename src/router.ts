import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import { userModule } from './store/modules/user.module';
import Layout from './views/Layout.vue';

Vue.use(Router);

const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    name: '',
    component: Layout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'home',
        name: 'home-page',
        component: () => import(/* webpackChunkName: "home" */ './pages/HomePage.vue'),
        meta: {
          pageName: 'homePage',
          requiresAuth: true,
        },
      },
      {
        path: 'about',
        name: 'about-page',
        component: () => import(/* webpackChunkName: "about" */ './pages/AboutPage.vue'),
        meta: {
          pageName: 'aboutPage',
          requiresAuth: true,
        },
      },
      {
        path: 'gallery',
        name: 'gallery-page',
        component: () => import(/* webpackChunkName: "gallery" */ './pages/GalleryPage.vue'),
        meta: {
          pageName: 'galleryPage',
          requiresAuth: true,
        },
      },
      {
        path: 'saved',
        name: 'saved-page',
        component: () => import(/* webpackChunkName: "saved" */ './pages/SavedPage.vue'),
        meta: {
          pageName: 'savedPage',
          requiresAuth: true,
        },
      },
      {
        path: 'settings',
        name: 'settings-page',
        component: () => import(/* webpackChunkName: "settings" */ './pages/SettingsPage.vue'),
        meta: {
          pageName: 'settingsPage',
          requiresAuth: true,
        },
      },
      {
        path: 'profile',
        name: 'profile-page',
        component: () => import(/* webpackChunkName: "profile" */ './pages/ProfilePage.vue'),
        meta: {
          pageName: 'profilePage',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
  },
  {
    path: '**',
    name: 'not-found',
    component: () => import(/* webpackChunkName: 'not-found' */ './views/NotFound.vue'),
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: constantRoutes,
  });

const router = createRouter();

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!!userModule.getUser) {
      next();
    } else {
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
