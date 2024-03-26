// core-wid
import styles from "./src/components/core/styles/b-style.vue";
import bView from "./src/components/core/b-view.vue";
import bText from "./src/components/core/b-text.vue";
import bHot from "./src/components/core/b-hot.vue";
import bImg from "./src/components/core/b-img.vue";
import bIcon from "./src/components/core/b-icon.vue";
import bInput from "./src/components/core/b-input.vue";
import bTextarea from "./src/components/core/b-textarea.vue";
import bVideo from "./src/components/core/b-video.vue";
import bList from "./src/components/core/b-list.vue";
import bDrag from "./src/components/core/b-drag.vue";
import bWebview from "./src/components/core/b-webview.vue";
import bRow from "./src/components/core/b-grid/b-row.vue";
import bCol from "./src/components/core/b-grid/b-col.vue";

// app-wid
import btnWid from "./src/components/btn-wid.vue";
import appWid from "./src/components/app-wid.vue";

const initGlobalComponents = [styles, bView, bText, bHot, bImg, bIcon, bVideo, bList, bWebview, bInput, bDrag, bTextarea, bRow, bCol,
        btnWid, appWid];

export default {
    name: "btxui",
    install(app, config){
        // 注册全局组件
        initGlobalComponents.forEach(wid => {
            app.component(wid.__name, wid);
        })

        // 扩展全局属性
        if (config) {
            Object.keys(config).forEach(key => {
                app.config.globalProperties[`$${key}`] = config[key];
            })
        }
    }
}