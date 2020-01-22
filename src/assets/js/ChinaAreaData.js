//中国省市区镇数据信息类
/*
* 【使用】:
* dom接口：input[name='city']、input[name='area']、input[name='town']
* */

 function ChinaAreaData($self){
    this.$province_inp = $self.find("[name='province']");
    this.$city_inp = $self.find("[name='city']");
    this.$area_inp = $self.find("[name='area']");
    this.$town_inp = $self.find("[name='town']");

    this.sel_province;  //所选省份
    this.sel_city;      //所选城市
    this.sel_area;      //所选区县

    //初始化数据
    this._init_();

    //事件绑定
    this._bind_event_();
}

//数据资料
ChinaAreaData.datas = {
    "default_province":"江苏省",

    "province":{
        "江苏省":["苏州市"]
    },

    "city":{
        "苏州市":["吴江区", "高新区", "吴中区", "工业园区"]
    },

    /*"area":{
        "高新区":["枫桥", "狮山", "横塘", "镇湖", "浒墅关镇", "通安镇", "东渚镇"],
        "吴中区":["苏苑街道", "香山街道", "城南街道", "胥口镇", "郭巷镇", "东山镇", "木渎镇", "光福镇", "甪直镇", "渡村镇", "藏书镇", "横泾镇", "浦庄镇", "开发区", "太湖旅游度假区"],
        "吴江区":["滨湖街道", "松陵镇", "同里镇", "黎里镇", "平望镇", "盛泽镇", "七都镇", "震泽镇", "桃源镇" ],
        "工业园区":["湖东", "湖西"]
    }*/

    "area":{
        "高新区":["狮山"],
        "吴中区":["城南街道"],
        "吴江区":["太湖新城镇", "经济开发区", "同里镇", "盛泽镇"],
        "工业园区":["湖东", "湖西"]
    }
}

ChinaAreaData.prototype = {

    //初始化数据
    "_init_":function(){
        var datas = ChinaAreaData.datas;

        this._set_city_(datas);
        this._set_area_(datas);
        this._set_town_(datas);
    },

    //事件绑定
    "_bind_event_": function(){
        var _this = this;

        /*省份改变*/
        this.$province_inp.on("change", function(){
            _this.sel_province = this.value;
            _this._init_();
        })

        var datas = ChinaAreaData.datas;

        /*城市改变*/
        this.$city_inp.on("change", function(){
            _this.sel_city = this.value;
            _this._set_area_(datas);
            _this._set_town_(datas);
        })

        /*区县改变*/
        this.$area_inp.on("change", function(){
            _this.sel_area = this.value;
            _this._set_town_(datas);
        })
    },

    //设置城市
    "_set_city_": function(datas){
        var sel_province = this.sel_province || datas.default_province;

        /*省份数据初始化*/
        for(var province in datas.province){
            var $opt = (province === sel_province? $("<option selected>"+ province +"</option>"): $("<option>"+ province +"</option>"));
            this.$province_inp.append($opt);
        }

        var sel_city = this.sel_city,
            citys = datas.province[sel_province];

        /*城市数据构造*/
        this.$city_inp.empty();
        for(var i = 0; i<citys.length; i++){
            if(!sel_city && i === 0) this.sel_city = citys[i];
            this.$city_inp.append($("<option>"+ citys[i] +"</option>"));
        }
        this._refresh_(this.$city_inp);
    },

    //设置区县
    "_set_area_": function(datas){
        var sel_city = this.sel_city;

        /*区县数据构造*/
        this.$area_inp.empty();
        for(var i = 0; i<datas.city[sel_city].length; i++){
            if(!this.sel_area && i === 0) this.sel_area = datas.city[sel_city][i];
            this.$area_inp.append($("<option>"+ datas.city[sel_city][i] +"</option>"));
        }
        this._refresh_(this.$area_inp);
    },

    //设置乡镇
    "_set_town_": function(datas){
        var sel_area = this.sel_area;

        /*乡镇数据构造*/
        this.$town_inp.empty();
        for(var i = 0; i<datas.area[sel_area].length; i++){
            this.$town_inp.append($("<option>"+ datas.area[sel_area][i] +"</option>"));
        }
        this._refresh_(this.$town_inp);
    },

    //数据刷新（针对btx框架）
    "_refresh_":function($dom){
        var $form_select = $dom.parents("[data-btxc='form-select']");

        $form_select && $form_select.data("refresh") && $form_select.data("refresh")();
    }

}