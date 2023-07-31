// i18n
import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';
// vue router
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from '@/router/index';
// pinia
import store from '@/store';
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

app.use(router).use(store);

app.use(i18n);

app.mount('#app');
Object.entries(ElementPlusIconsVue).forEach((item) => {
  app.component(item[0], item[1]);
});
