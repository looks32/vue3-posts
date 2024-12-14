import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import objPlugins from './plugins/obj';
// import funcPlugins from './plugins/func';
// import person from './plugins/person';
import globalComponents from '@/plugins/global-components';


const app = createApp(App);
// app.use(funcPlugins);
app.use(globalComponents);
// app.use(objPlugins, {name:'짐코딩'});
// app.use(person);
// app.use(person, {name:'홍길동'});
app.use(router);
app.mount('#app');
import 'bootstrap/dist/js/bootstrap.js';


