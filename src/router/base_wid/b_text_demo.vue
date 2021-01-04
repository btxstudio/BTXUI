<template>
    <article>
        <header-info v-bind="header_info" />

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BText from "@/components/BTXUI/core/b-text"

    export default {
        name: "b_text_demo",
        components: {
            HeaderInfo,
            BText
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BText.name,
                    ...BText.introduce,
                }

            }
        }
    }
</script>