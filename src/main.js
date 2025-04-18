import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "./style.css";

const app = createApp(App);
app.use(Toast);
app.use(router);
app.mount("#app");
