import styles from "./src/components/core/styles/b-style.vue";
import bView from "./src/components/core/b-view.vue";
import bText from "./src/components/core/b-text.vue";

const initGlobalComponents = [styles, bView, bText];

export default {
    name: "btxui",
    install(app){
        // 注册全局组件
        initGlobalComponents.forEach(wid => {
            app.component(wid.__name, wid);
        })
    }
}