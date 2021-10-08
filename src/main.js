// main.js 進入點檔案

// 將外部套件引用
import { createApp } from 'vue';
// 將vue元件引用進來-請將node_modules資料夾的放前面 自己寫的放後面 不然會出錯
// axios
import axios from 'axios';
// VueAxios
import VueAxios from 'vue-axios';

// jquery (由於目前bs5不需要jQuery 故有必要再使用)
import $ from 'jquery';

// bootstrap
import 'bootstrap';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// VueYoutube
// import VueYoutube from 'vue-youtube';

// vue3-loading-overlay
import Loading from 'vue3-loading-overlay';
// vue3-loading-overlay
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

// fortawesome icon
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// 根據 icon 的種類引用
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faGooglePlus } from '@fortawesome/free-brands-svg-icons';

// MenuIcon
// import MenuIcon from 'vue-material-design-icons/Menu.vue';

// vee-validate匯入主套件
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
// vee-validate匯入相關規則
import rules from '@vee-validate/rules';
// vee-validate匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';
// vee-validate匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// 修改跳出視窗套件
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// js檔 千分號函式 全域使用
import toCurrency from './assets/javascript/toCurrency';

import App from './App.vue';
// router
import router from './router';

// library.add(faCoffee, faGooglePlus);

// 讓jQuery 變成全域
// 在想使用的頁面 js 輸入 /* global $ */ 去忽略es link報錯問題
window.$ = $;

// vee-validate定義驗證規則
// 將全部規則rules 載出來
Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});

// vee-validate 加入本機 多國語系
configure({
  // vee-validate 載入繁體中文
  generateMessage: localize({ zh_TW: zhTW }),
  // vee-validate 調整為輸入字元立即進行驗證
  validateOnInput: true,
});
// vee-validate 設定預設語系-繁體中文
setLocale('zh_TW');

// 用const app方式
const app = createApp(App);

// vee-validate 註冊三個全域元件
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

// vue3-loading-overlay
app.component('Loading', Loading);

// 千分號 全域設定 toCurrency
app.config.globalProperties.$toCurrency = toCurrency;

// fortawesome
// app.component('font-awesome-icon', FontAwesomeIcon);

// MenuIcon
// app.component('menu-icon', MenuIcon);

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
  icon: 'success',
};
// 啟用
// app.use(VueYoutube);
// app.use(BootstrapVue);
// app.use(IconsPlugin);
app.use(VueSweetalert2, options);
app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
