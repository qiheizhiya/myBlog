(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55a0e53e"],{"2ef6":function(e,t,a){"use strict";var s=a("db59"),i=a.n(s);i.a},"6ffc":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.pageLoad,expression:"pageLoad",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"flex flex-column align-center"},[a("Header"),a("div",{staticClass:"list"},e._l(e.requestDatas,(function(t,s){return a("ul",{key:s,staticClass:"monUl"},[a("li",{staticClass:"monTitle"},[e._v(e._s(t[0].month)+", "+e._s(t[0].year))]),e._l(t,(function(t){return a("router-link",{key:t.id,staticClass:"mContent fadeInUp",class:"wow"+t.index,attrs:{tag:"ul",to:{name:"Detail",params:{id:t.id}}}},[a("li",{staticClass:"mCLi flex space-between"},[a("div",{staticClass:"mCLeft flex align-center"},[a("img",{attrs:{src:t.imgUrl,title:t.title,alt:t.title}}),a("div",{staticClass:"mCLText flex flex-column space-around"},[a("span",[e._v(e._s(t.title))]),a("span",[e._v(e._s(t.likeNum)+" 喜欢 / "+e._s(t.visitsNum)+" 读")])])]),a("span",{staticClass:"mCRight flex align-center"},[e._v(e._s(t.day))])])])}))],2)})),0),a("div",{staticClass:"footer"},[a("Loader",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]}),a("span",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading&&!e.pageLoad,expression:"!isLoading && !pageLoad"}],staticClass:"notMany"},[e._v("没有更多了~~O(∩_∩)O")])],1)],1)},i=[],n=a("2909"),r=(a("96cf"),a("1da1")),o=a("781b"),c=a("bc1b"),l=a("ed08"),u={name:"articleList",components:{Loader:o["a"]},data:function(){return{page:{pageSize:15,pageNum:1},requestDatas:[],pageLoad:!0,isLoading:!1,isNext:!0,wowNum:0,len:0}},watch:{requestDatas:{handler:function(){var e=this;this.$nextTick((function(){new c["WOW"]({live:!1,offset:0,boxClass:"wow".concat(e.wowNum)}).init(),e.wowNum++}))}}},created:function(){this.getArtList()},activated:function(){var e=this;Object(l["a"])((function(){return e.isNext}),(function(){e.page.pageNum+=1,e.getArtList()}))},deactivated:function(){Object(l["b"])()},methods:{getArtList:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,s,i,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isLoading=!0,t.next=3,e.$store.dispatch("getArtList",e.page);case 3:a=t.sent,s=a.data.data,i=s.len,r=s.total,o=s.datas,setTimeout((function(){var t;(t=e.requestDatas).push.apply(t,Object(n["a"])(o)),e.pageLoad=!1,e.isLoading=!1,e.len+=i,e.isNext=e.len!==r}),1e3);case 6:case"end":return t.stop()}}),t)})))()}}},d=u,f=(a("2ef6"),a("2877")),p=Object(f["a"])(d,s,i,!1,null,"d698fae4",null);t["default"]=p.exports},db59:function(e,t,a){}}]);