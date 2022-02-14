import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faAngleDoubleLeft, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';

library.add(faTimes, faAngleDoubleLeft, faExpand);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app');
