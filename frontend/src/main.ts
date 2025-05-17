import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadGuiTextData } from "./rete/utils";

// URLクエリからlang取得
const lang = new URLSearchParams(location.search).get('lang') || 'ja'

// 表示テキスト(多言語ファイル)の読み込み
loadGuiTextData(lang).then(() => {
    // アプリケーション作成
    createApp(App).mount('#app');
})
