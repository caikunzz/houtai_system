// i18n
import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';
// ElementPlusIcon
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// pinia
import pinia from '@/store/deault';
// vue router
import router from '@/router/index';
import App from './App.vue';
// antdv
import 'ant-design-vue/dist/reset.css';

import 'virtual:windi.css';
// Devtools: https://windicss.org/integrations/vite.html#design-in-devtools
import 'virtual:windi-devtools';
import '@/assets/styles/index.scss';

const i18n = createI18n({
  locale: 'en',
  messages,
});

const app = createApp(App);

app.use(router).use(pinia);

app.use(i18n);

app.mount('#app');
Object.entries(ElementPlusIconsVue).forEach((item) => {
  app.component(item[0], item[1]);
});

// 错误时的信息
const open401 = (tle: string, msg: string) => {
  ElNotification({
    title: tle,
    dangerouslyUseHTMLString: true,
    message: `<div class="flex justify-between items-center text-[16px] font-bold">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><rect x="0" y="0" width="32" height="32" fill="none" stroke="none" /><path fill="red" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4l-1.6 1.6z"/></svg>
        <p>${msg}<p>
      <div>`,
    position: 'bottom-left',
  });
};
app.provide('open401', open401);
