import { createRouter, createWebHashHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/signin', component: () => import('../pages/auth/SignInPage.vue') },
    { path: '/signup', component: () => import('../pages/auth/SignUpPage.vue') },
    { path: '/forgot', component: () => import('../pages/auth/ForgotPage.vue') },
    { 
      path: '/', 
      component: () => import('../pages/HomePage.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      getAuth(),
      (user) => {
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next('/signin');
    }
  } else {
    next();
  }
});

export default router;
