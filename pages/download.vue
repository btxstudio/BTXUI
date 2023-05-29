<template>
    <article>
        <p>BTX·UI 不支持 IE8 及以下版本，因为 BTX·UI 是基于 Vue2.0 开发的，使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有兼容 ECMAScript 5 的浏览器。</p>
        <p></p>

        <!--更新日志-->
        <section>
            <h5>更新日志</h5>
            <p>最新稳定版本：1.0.0</p>
            <p>每个版本的更新日志见 <a href="https://github.com/btxstudio/BTXUI" class="color-blue" target="_blank">GitHub</a>。</p>
            <p></p>
        </section>

        <!--全局样式-->
        <section>
            <h5>全局样式</h5>
            <p>全局样式的使用方式和 bootstrap 类似，可以直接通过 <code>&lt;script&gt;</code> 标签引入。分为 "开发版本" 和 "生产版本"，开发版本采用 scss 进行源码构建：</p>
            <p>生产版本中 <code>btx.min.css</code> 提供基础样式库；<code>btx.pad.min.css</code> 提供基于平板（ipadPro 标准）的样式库，建议宽度分段为：740px - 1367px；<code>btx.mob.min.css</code> 提供基于手机端（iPhone6|7|8 PLUS 标准）的样式库，建议宽度分段为：0 - 740px；<code>btx.webapp.min</code> 提供基于 webapp 的基础样式初始化库。</p>
            <p><b>CDN：</b></p>
            <p>基础适配版：<code>&lt;link rel="stylesheet" src="http://www.75sea.com/cdn/css/v2/btx.min.css"&gt;&lt;/script&gt;</code></p>
            <p>平板适配版：<code>&lt;link rel="stylesheet" src="http://www.75sea.com/cdn/css/v2/btx.pad.min.css"&gt;&lt;/script&gt;</code></p>
            <p>手机适配版：<code>&lt;link rel="stylesheet" src="http://www.75sea.com/cdn/css/v2/btx.mob.min.css"&gt;&lt;/script&gt;</code></p>
            <p>webapp 适配版：<code>&lt;link rel="stylesheet" src="http://www.75sea.com/cdn/css/v2/btx.webapp.min"&gt;&lt;/script&gt;</code></p>
            <p><b>版本下载：</b></p>
            <div class="flex pcenter color-light">
                <a href="http://75sea.com/cdn/css/v2/scss_download" class="bg-color-green round-lg pad-v-d5 w-15 max-w-s" download="scss_download.zip">
                    <i class="ico-download mrg-r-1"></i>开发版本
                </a>
                <a href="http://75sea.com/cdn/css/v2/min_download" class="bg-color-green round-lg pad-v-d5 w-15 mrg-l-2 max-w-s" download="min_download.zip">
                    <i class="ico-download mrg-r-1"></i>生产版本
                </a>
            </div>
            <p></p>
        </section>

        <!--NPM-->
        <section>
            <h5>NPM</h5>
            <P>在用 BTX·UI 构建大型应用时推荐使用 NPM 安装 webapp 版本，除了全局样式更提供了丰富的组件，以便更为灵活且轻松的完成界面及交互的开发工作。NPM 能很好地和诸如 webpack 或 Browserify 模块打包器配合使用。</P>
            <p><b>最新稳定版：</b></p>
            <p><code>$ npm install btx-ui -S</code></P>
        </section>
    </article>
</template>

<script>
    export default {
        name: "download"
    }
</script>