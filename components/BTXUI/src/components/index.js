import Vue from "vue"

//基础组件
import BGrid from "./core/b-grid"
import BHot from "./core/b-hot"
import BDrag from "./core/b-drag"
import BIcon from "./core/b-icon"
import BImg from "./core/b-img"
import BInput from "./core/b-input"
import BList from "./core/b-list"
import BText from "./core/b-text"
import BTextarea from "./core/b-textarea"
import BView from "./core/b-view"
import BVideo from "./core/b-video"
import BWebview from "./core/b-webview"

//应用组件
import BtnWid from "./btn/btn-wid"
import CheckboxWid from "./checkbox/checkbox-wid"
import ContentWid from "./content/content-wid"
import CarouselWid from "./carousel/carousel-wid"
import DrawerWid from "./drawer/drawer-wid"
import FormWid from "./form/form-wid"
import FormPannelWid from "./formPannel/form-pannel-wid"
import ImgsUploadWid from "./imgsUpload/imgs-upload-wid"
import PageFlipWid from "./pageFlip/page-flip-wid"
import PannelWid from "./pannel/pannel-wid"
import SelectWid from "./select/select-wid"
import SliderWid from "./slider/slider-wid"
import RangeWid from "./range/range-wid"
import SearchWid from "./search/search-wid"
import TabWid from "./tab/tab-wid"
import TableWid from "./table/table-wid"
import TagWid from "./tag/tag-wid"
import TagsWid from "./tags/tags-wid"
import TooltipWid from "./tooltip/tooltip-wid"
import UploadWid from "./upload/upload-wid"
import AppWid from "./app/app-wid"

const components = {
    core: [
        BGrid,
        BHot,
        BDrag,
        BIcon,
        BImg,
        BInput,
        BList,
        BText,
        BTextarea,
        BView,
        BVideo,
        BWebview
    ],
    wids: [
        BtnWid,
        CheckboxWid,
        ContentWid,
        CarouselWid,
        DrawerWid,
        FormWid,
        FormPannelWid,
        ImgsUploadWid,
        PageFlipWid,
        PannelWid,
        SelectWid,
        SliderWid,
        RangeWid,
        SearchWid,
        TabWid,
        TableWid,
        TagWid,
        TagsWid,
        TooltipWid,
        UploadWid,
        AppWid,
    ]
};

//加载核心组件
[...components.core, ...components.wids].forEach((wid)=>{
    Vue.component(wid.name, wid);
})