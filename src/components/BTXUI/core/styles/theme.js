export default {

    //预置主题色
    preset: {
        none: "transparent",
        main: "#051c24",
        sub: "#b4967a",
        light: "#fff",
        lgray: "#eee",
        mgray: "#a7a7a7",
        dgray: "#373737",
        dark: "#111",
        blue: "#4085f3",
        green: "#02b9a1",
        yellow: "#fdba00",
        red: "#ec4334",
        neutral: "rgba(134,134,134,.17)",
    },

    //追加或覆盖颜色
    append(colors){
        this.preset = { ...this.preset, ...colors }
    }

}