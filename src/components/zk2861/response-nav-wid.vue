<template>
    <header class="fixed z3">
        <!--pc-->
        <div class="fsize-1d2 hide-s">
            <header-nav-wid v-bind="headerNavData" />
        </div>

        <!--mob-->
        <div class="fsize-1d4 hide show-s">
            <sandwich-nav-wid v-bind="headerNavData" />
        </div>
    </header>
</template>

<script>
    import HeaderNavWid from "./header-nav-wid"
    import SandwichNavWid from "./sandwich-nav-wid"

    export default {
        name: "response-nav-wid",
        components: {
            HeaderNavWid,
            SandwichNavWid
        },
        props: ["headerNavData"]
    }
</script>