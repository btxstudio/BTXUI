<!--19-12-10-->
<template>
  <div :class="`select-widget relative ${state? 's-w-spread': ''}`">
    <div class="s-w-text" @click="toggle_options">
      <span v-if="show_selected">{{show_selected}}</span>
      <span v-else class="s-w-notic">{{placeholder}}</span>
      <i class="s-w-ico ico-xiala"></i>
    </div>
    <ul class="s-w-list fixed auto-scroll" :style="list_left_offset" @click="$_select" ref="$list">
      <li
        v-for="item of data_list"
        :class="`s-w-item ${-1 === selected.vals.indexOf(item.val)? '': 's-w-selected'}`"
        :data-val="item.val + ':' + item.text"
      >
        <div class="s-w-item-inner">
          <span class="s-w-ico"></span>
          <span class="s-w-val">{{item.text}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "select-widget",
  /*
   * init-data{
   *   placeholder: "选择提示",
   *   list-data: [
   *       {
   *           text: "文本显示",
   *           val: "实际传值",
   *           [* selected: "是否选中"]
   *       },...
   *   ],
   *   [* list-align: "列表对齐方式：left（默认）、center、right"],
   *   [* multiple: "是否启用多选"]
   * }
   * */
  props: {
    listData: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    listAlign: {
      type: String,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    }
  },
  model: {
    event: "on_select"
  },
  data() {
    return {
      //下拉面板状态
      state: false,

      //下拉选择值
      data_list: null,

      //选中值
      selected: {
        keys: [],
        vals: []
      },

      //下拉列表水平位移
      list_left_offset: 0
    };
  },
  methods: {
    //切换面板显示
    toggle_options(e) {
      e.stopPropagation();
      this[(this.state ? "hide" : "show") + "_options"]();
    },

    //显示切换面板
    show_options() {
      this.state = true;
      this.$nextTick(() => {
        this.$_set_list_left_offset();
      });
    },

    //隐藏切换面板
    hide_options() {
      this.state = false;
    },

    //设置列表选项
    set_option_data(option_data) {
      this.data_list = option_data;
    },

    //下拉选择
    $_select(e) {
      if (this.multiple) {
        //多选
        e.stopPropagation();
        this.$_select_as_multiple(e);
      } else {
        //单选
        this.$_select_as_solo(e);
      }
      this.$emit("on_select", this.selected);
    },

    //单项选择
    $_select_as_solo(e) {
      for (let i = 0; i < e.path.length; i++) {
        let selected = this.selected,
          val = e.path[i].dataset.val;
        if (val) {
          val = val.split(":");
          selected.vals = [val[0]];
          selected.keys = [val[1]];
          break;
        }
      }
    },

    //数据初始化
    $_init_data() {
      this.data_list = this.listData;
      this.$emit("on_select", this.selected);
    },

    //设置下拉列表水平位移
    $_set_list_left_offset() {
      let align = this.listAlign,
        left_offset = this.$refs.$list.clientWidth - this.$el.clientWidth,
        left = 0;
      if (align === "right") {
        //右对齐
        left = -left_offset;
      } else if (align === "center") {
        //居中对齐
        left = -left_offset / 2;
      }
      this.list_left_offset = `margin-left: ${left}px`;
    }
  },
  watch: {
    //设置默认值显示
    data_list(list) {
      let selected = this.selected;
      list.forEach(data => {
        if (data.selected) {
          selected.keys.push(data.text);
          selected.vals.push(data.val);
        }
      });
    }
  },
  computed: {
    //显示所选值
    show_selected() {
      return this.selected.keys.join(",");
    }
  },
  beforeMount() {
    this.$_init_data();
    document.body.addEventListener("click", () => {
      this.hide_options();
    });
  }
};
</script>

<style lang="scss" scoped>
.select-widget {
  display: inline-block;

  .s-w-text {
    cursor: pointer;

    .s-w-notic {
      opacity: 0.47;
    }
    .s-w-ico {
      display: inline-block;
      transform: rotate(180deg) translateY(2px);
      transition: all 0.4s;
    }
    &:hover {
      opacity: 0.7;
    }
  }

  //下拉选择列表
  .s-w-list {
    display: none;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 14px rgba(0, 0, 0, 0.17);
    max-height: 30rem;
    z-index: 9;
    animation: sliderDown 0.4s;

    .s-w-item {
      padding: 0 1rem;
      text-align: left;
      position: relative;
      cursor: pointer;
      min-width: 20rem;
      height: 2.6rem;
      line-height: 2.6rem;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        margin-top: -1px;
        height: 3px;
        width: 3px;
        border-radius: 50%;
        background-color: rgba(140, 140, 140, 0.24);
      }
      .s-w-item-inner {
        padding-left: 1.4rem;

        .s-w-val {
          opacity: 0.4;
        }
      }
      &:nth-of-type(odd) {
        background-color: rgba(100, 100, 100, 0.1);
      }
      &:hover {
        background-color: rgba(170, 170, 170, 0.14);

        .s-w-val {
          opacity: 0.8;
        }
      }

      //选中状态
      &.s-w-selected {
        background-color: rgba(170, 170, 170, 0.2);

        &::before {
          background-color: #4085f3;
        }
        .s-w-val {
          opacity: 0.9;
        }
      }
    }
  }

  //下拉列表展开状态
  &.s-w-spread {
    .s-w-list {
      display: block;
    }
    .s-w-text .s-w-ico {
      transform: rotate(0deg);
    }
  }
}

@-webkit-keyframes sliderDown {
  from {
    opacity: 0;
    -webkit-transform: translateY(-1.7rem);
  }
  to {
    opacity: 1;
    -webkit-transform: translateY(0);
  }
}
@keyframes sliderDown {
  from {
    opacity: 0;
    transform: translateY(-1.7rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
<style lang="scss" scoped>
.select-widget {
  .s-w-text {
    &::before {
      content: "";
      position: absolute;
      width: 130%;
      left: -15%;
      top: 10px;
      height: 3rem;
      background-color: rgba(12, 166, 161, 0.1);
      border: 1px solid rgba(12, 166, 161, 0.2);
      border-radius: 24px;
    }
  }

  //下拉选择列表
  .s-w-list {
    background-color: #002951;
  }
}
</style>