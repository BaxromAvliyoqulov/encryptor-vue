// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

// Faqat bitta createApp chaqiruvi kerak
createApp(App).use(router).mount("#app");
