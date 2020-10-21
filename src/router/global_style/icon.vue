<template>
  <article>
    <p>BTX·UI 精选了一套常用的字体图标集合。其类名都是以 <code>.ico-*</code> 作为前缀的，比如删除图标：<code>.ico-del</code>。</p>
    <p>在实际项目中为了灵活控制字体图标大小，推荐使用 <code>&lt;i&gt;</code> 标签进行样式类绑定，可配合字号样式类 <code>.fsize-*</code> 及放缩微调类 <code>.scale-*</code> 协同使用。</p>
    <p></p>

    <!-- 图标 -->
    <h5>图标汇总</h5>
    <div class="pcenter fsize-d8">
        <div class="grid">
            <div class="col-2 mrg-b-2" v-for="(ico, i) of icons" :key="i">    
                <div class="w-10 h-10 round-sm line-lgray line thick-1">
                    <i :class="`ico-${ico.name} scale-${ico.scale || 1}`" class="fsize-2d5 dark"></i><br>
                    <span>{{ico.name}}</span><br>
                    <span class="fsize-d8 color-mgray">{{ico.code}}</span>
                </div>
            </div>
        </div>
    </div>

  </article>
</template>

<script>
export default {
  name: "icon",
  data(){
      return {

        //图标集合
        icons: [
            {
                name: "success",
                code: "\e620"
            },
            {
                name: "fail",
                code: "\e60c"
            },
            {
                name: "xiala",
                code: "\e6b9"
            },
            {
                name: "arrow-right",
                code: "\e607"
            },
            {
                name: "arrow-left",
                code: "\e608"
            },
            {
                name: "sousuo",
                code: "\e66e"
            },
            {
                name: "play",
                code: "\e6a4"
            },
            {
                name: "pause",
                code: "\e6a5"
            },
            {
                name: "close",
                code: "\e663"
            },
            {
                name: "add",
                code: "\e664"
            },
            {
                name: "more",
                code: "\e654"
            },
            {
                name: "link",
                code: "\e66d",
                scale: "d8"
            },
            {
                name: "save",
                code: "\e602",
                scale: "d8"
            },
            {
                name: "del",
                code: "\e612",
                scale: "d8"
            },
            {
                name: "mobile",
                code: "\e712"
            },
            {
                name: "weibo",
                code: "\e609"
            },
            {
                name: "wechat",
                code: "\e62d"
            },
            {
                name: "dy",
                code: "\e615"
            },
            {
                name: "bili",
                code: "\e617"
            },
            {
                name: "github",
                code: "\e761",
                scale: "d9"
            },
            {
                name: "download",
                code: "\e600",
                scale: "d9"
            },
            {
                name: "ui",
                code: "\e63c",
                scale: "d9"
            },
            {
                name: "home",
                code: "\e68e",
                scale: "d8"
            },
            {
                name: "list",
                code: "\e665",
                scale: "d9"
            },
            {
                name: "no-data",
                code: "\e62c",
                scale: "d9"
            },
            {
                name: "brightness",
                code: "\e632",
                scale: "d9"
            },
            {
                name: "data",
                code: "\e690"
            },
            {
                name: "user",
                code: "\e62b",
                scale: "d9"
            },
            {
                name: "system",
                code: "\e611",
                scale: "d9"
            },
            {
                name: "order",
                code: "\e684"
            },
            {
                name: "exit",
                code: "\e618",
                scale: "d8"
            },
            {
                name: "log",
                code: "\e60f",
                scale: "d9"
            },
            {
                name: "edit",
                code: "\e70c"
            },
            {
                name: "btxstudio-zh",
                code: "\e606",
                scale: "1d4"
            },
            {
                name: "company-pad",
                code: "\e603",
                scale: "d8"
            },
            {
                name: "company-line",
                code: "\e604",
                scale: "d8"
            },
            {
                name: "company-zh",
                code: "\e605",
                scale: "1d7"
            },
            {
                name: "level",
                code: "\e60a",
                scale: "1d2"
            },
            {
                name: "level_round",
                code: "\e60e"
            },
            {
                name: "btxstudio",
                code: "\e60b",
                scale: "1d2"
            },
            {
                name: "btxstudio-round",
                code: "\e60d"
            },
            {
                name: "qq",
                code: "\e63f"
            },
            {
                name: "weibo2",
                code: "\e64c"
            },
            {
                name: "email",
                code: "\e619",
                scale: "1d1"
            },
            {
                name: "tel",
                code: "\e768"
            },
            {
                name: "fix",
                code: "\e614"
            },
            {
                name: "website",
                code: "\e63d",
                scale: "1d1"
            },
            {
                name: "wechat2",
                code: "\e62a",
                scale: "1d1"
            },
            {
                name: "eye",
                code: "\e7d3"
            },
            {
                name: "brand",
                code: "\e610"
            },
            {
                name: "chart",
                code: "\e6cc"
            },
            {
                name: "addr",
                code: "\e613"
            },
            {
                name: "space",
                code: "\e89f"
            },
            {
                name: "directory",
                code: "\e666"
            },
            {
                name: "mail-list",
                code: "\e645"
            },
            {
                name: "book",
                code: "\e68b"
            },
            {
                name: "tesk",
                code: "\e601"
            },
            {
                name: "talk",
                code: "\e81a"
            },
            {
                name: "trophy",
                code: "\e723"
            },
            {
                name: "edit",
                code: "\eed2"
            },
            {
                name: "work",
                code: "\eee0"
            },
            {
                name: "circle",
                code: "\e633",
                scale: "1d1"
            },
            {
                name: "shop",
                code: "\e699",
                scale: "1d1"
            },
            {
                name: "group",
                code: "\e68f"
            },
            {
                name: "about",
                code: "\e674"
            },
        ]

      }
  }
};
</script>