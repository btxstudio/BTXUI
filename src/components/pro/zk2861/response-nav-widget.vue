<template>
    <header>
        <!--pc-->
        <div class="fsize-1d2 hide-s">
            <header-nav-widget v-bind="headerNavData" />
        </div>

        <!--mob-->
        <div class="fsize-1d4 hide show-s">
            <sandwich-nav-widget v-bind="headerNavData" />
        </div>
    </header>
</template>

<script>
    import HeaderNavWidget from "./header-nav-widget"
    import SandwichNavWidget from "./sandwich-nav-widget"

    export default {
        name: "response-nav-widget",
        components: {
            HeaderNavWidget,
            SandwichNavWidget
        },
        props: ["headerNavData"]
    }
</script>