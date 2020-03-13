<template>
  <article>
    <p>BTX·UI 提供了一套常用的图标集合。其类名都是以 <code>.ico-*</code> 作为前缀的。</p>
    <p></p>

    <!-- 图标 -->
    <h5>图标汇总</h5>
    <div class="pcenter fsize-d8">
        <div class="flex-layout-spread mrg-b-2" v-for="n of Math.ceil(icons.length / row_num)" :key="n">
            <div class="w-10 h-10 round light-gray-border" sm v-for="(num, i) of row_num" :key="i" v-if="icons[(n - 1)*row_num + i]">
                <i :class="`ico-${icons[(n - 1)*row_num + i].name}`" class="fsize-2d5 dark"></i><br>
                <span>{{icons[(n - 1)*row_num + i].name}}</span><br>
                <span class="fsize-d8 middle-gray">{{icons[(n - 1)*row_num + i].code}}</span>
            </div>
        </div>
    </div>

  </article>
</template>t

<script>
export default {
  name: "icon",
  data(){
      return {

        //单行显示数目
        row_num: 6,

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
                code: "\e66d"
            },
            {
                name: "save",
                code: "\e602"
            },
            {
                name: "del",
                code: "\e612"
            },
            {
                name: "btxstudio-zh",
                code: "\e606"
            },
            {
                name: "company-pad",
                code: "\e603"
            },
            {
                name: "company-line",
                code: "\e604"
            },
            {
                name: "company-zh",
                code: "\e605"
            },
            {
                name: "level",
                code: "\e60a"
            },
            {
                name: "level_round",
                code: "\e60e"
            },
            {
                name: "btxstudio",
                code: "\e60b"
            },
            {
                name: "btxstudio-round",
                code: "\e60d"
            }
        ]

      }
  }
};
</script>