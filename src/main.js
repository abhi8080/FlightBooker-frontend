import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/superhero/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createI18n } from "vue-i18n";
import en from "./assets/i18n/en.json";
import se from "./assets/i18n/se.json";

const i18n = createI18n({
  locale: localStorage.getItem("lang") || "en",
  messages: {
    en: en,
    se: se,
  },
});

const lang = localStorage.getItem("lang") || "en";
axios.defaults.baseURL = "http://localhost:5228";
axios.defaults.headers["Accept-Language"] = lang;

createApp(App).use(i18n).use(store).use(router, axios).mount("#app");
