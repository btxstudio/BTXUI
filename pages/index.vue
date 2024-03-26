
<template>
    <article>
        <p class="pcenter-s">
            <!-- <img class="h-5 h-4-s" src="@/assets/img/btx_ui.jpg"> -->
        </p>
        <p>BTX·UI 是一套基于 Vue 2.0 为开发者准备的多端组件库，可以帮助工程师快速开发。使用组件 Demo 可以快速体验交互细节。</p>
        <div class="bg-color line line-neutral thick-1 round-sm pad-d5 flex">
            <div class="col-4 flex-1 flex-2-s col-12-s">
                <!-- <img src="@/assets/img/btx.jpg" class="round-sm"> -->
            </div>
            <div class="col-8 flex-4 flex-2-s pcenter-s col-12-s">
                <div class="pad-l-4 pad-l-0-s">
                    <p><span class="alpha-d7">框架作者 - </span><br><b class="fsize-1d2">btx·STU 邢天博</b></p>
                    <p>UI 架构师<span class="alpha-d2 mrg-h-1 mrg-h-d5-s">|</span>全栈工程师<span class="alpha-d2 mrg-h-1 mrg-h-d5-s">|</span>视觉设计师</p>
                </div>
            </div>
        </div>
        <p></p>

        <!--设计原则-->
        <section>
            <h5>设计原则</h5>
            <p><b class="mrg-r-1 color-sub">· 全局样式</b>BTX·UI 采用渐进式设计方案，用户可以只使用全局样式库来进行快速网页设计，并可根据需要进行响应式布局分段样式库引用；</p>
            <p><b class="mrg-r-1 color-sub">· 主题组件</b>对于开发 webapp 类大型应用，推荐使用组件来进行开发，框架预置了一套完善的 "Level 风格主题 UI 库<span class="alpha-d6">（高阶组件库）</span>"，配合 "基础组件"<span class="alpha-d6">（主要实现基础布局）</span>，可快速构建 web 应用；</p>
            <p><b class="mrg-r-1 color-sub">· 应用组件</b>对于定制化程度更高的应用开发，可以使用 "基础组件" + "应用组件" 配合 styles 样式实现机制，来进行底层打造。甚至可以进行二次封装，构建一套定制化主题组件；</p>
            <p>全局样式秉持 web 开发传统的 "样式复用" 理念，而组件应用则推崇新兴的 "组件复用" 理念，根据实际应用场景可以选择不同的开发模式。此外，全局样式也可以与组件进行混合使用。</p>
        </section>
    </article>
</template>

<script setup lang="ts">
</script>