<template>
    <b-view :class="`max fixed flex-column color-light select-none bg-color-${colors?.bg || 'none'}`">

        <!--中部内容区域-->
        <b-view class="rel grow-1">
            <b-list :scroll="{y: 'auto', x: 'hidden'}" class="abs max">
                <keep-alive v-if="keepAlive">
                    <router-view />
                </keep-alive>
                <router-view v-else />
            </b-list>
        </b-view>

        <!--底部导航栏-->
        <b-view :class="`pcenter flex-around ${round? 'round-md round-t': ''} bg-color-${colors?.bar || 'dark'}`">
            <b-hot v-for="(nav,i) of navs" :key="i"
                   v-bind="nav.hotData"
                   @on_click="$emit('on_toggle', nav)"
                   class="rel pad-v-d5">

                <!--居中主按钮-->
                <b-view v-if="nav.main" class="rel w-5">
                    <b-icon v-bind="nav.iconData" 
                        :class="`abs flex-5 solid t-f3d4 thick-2 w-5 h-5 round fsize-1d7 line-${colors?.center?.line || 'neutral'} bg-color-${colors?.center?.bg || 'dgray'}`" />
                </b-view>

                <!--常规分布按钮-->
                <b-view v-else :class="`flex-column flex-5 color-${colors?.text?.normal || 'mgray'}`" :cname="colors?.text?.act || 'light'"
                    :state="curRoute === nav.hotData.link ? 'act' : ''"
                    :states="{
                        act: `color-${colors?.text?.act || 'light'}`
                    }">
                    <b-icon v-bind="nav.iconData" :cname="nav.act"
                        :state="curRoute === nav.hotData.link ? 'act' : ''"
                        :states="{
                            act: nav.act ?? ''
                        }"
                        class="w-2d7 h-2d7 trans-fast fsize-1d7" />
                    <b-text v-if="nav.text" class="fsize-d8">{{nav.text}}</b-text>
                </b-view>

            </b-hot>
        </b-view>

    </b-view>
</template>

<script setup lang="ts">
    import { computed, reactive } from "vue"
    import BView from "./core/b-view.vue"
    import BText from "./core/b-text.vue"
    import BList from "./core/b-list.vue"
    import BHot from "./core/b-hot.vue"
    import BIcon from "./core/b-icon.vue"

    defineEmits(['on_toggle']);
    const props = defineProps<{
        path: string,
        spread: {
            navId: string,
            iconData: any,
            hotData: any,
            text?: string,
            act?: string,
        }[],
        center?: {
            navId: string,
            iconData: any,
            hotData: any,
        },
        colors?: {
            bg?: string,
            bar?: string,
            center?: {
                bg?: string,
                line?: string
            },
            text?: {
                normal?: string,
                act?: string
            }
        },
        round?: boolean,
        keepAlive?: boolean
    }>();

    // 当前路由
    const curRoute = computed(() => props.path);

    // 总导航显示
    const navs = computed(() => {
        const spread: any = [ ...props.spread ];
        if (props.center) {
            spread.splice(Math.floor(spread.length / 2), 0, reactive({...props.center, main: true}));
        }
        return spread;
    })
</script>