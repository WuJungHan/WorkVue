(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7945b94a"],{"1dde":function(t,e,c){var a=c("d039"),i=c("b622"),o=c("2d00"),n=i("species");t.exports=function(t){return o>=51||!a((function(){var e=[],c=e.constructor={};return c[n]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"3a5e":function(t,e,c){"use strict";var a=c("7a23");function i(t,e,c,i,o,n){var s=Object(a["D"])("loading",!0);return Object(a["w"])(),Object(a["e"])(s,{active:o.isLoading,"onUpdate:active":e[1]||(e[1]=function(t){return o.isLoading=t})},null,8,["active"])}var o={data:function(){return{isLoading:!0}},methods:{isloading:function(){var t=this;setTimeout((function(){t.isLoading=!1}),2e3)}},created:function(){this.isloading()}};o.render=i;e["a"]=o},8418:function(t,e,c){"use strict";var a=c("c04e"),i=c("9bf2"),o=c("5c6c");t.exports=function(t,e,c){var n=a(e);n in t?i.f(t,n,o(0,c)):t[n]=c}},"99af":function(t,e,c){"use strict";var a=c("23e7"),i=c("d039"),o=c("e8b5"),n=c("861d"),s=c("7b0b"),r=c("50c4"),l=c("8418"),u=c("65f0"),d=c("1dde"),b=c("b622"),f=c("2d00"),O=b("isConcatSpreadable"),h=9007199254740991,j="Maximum allowed index exceeded",p=f>=51||!i((function(){var t=[];return t[O]=!1,t.concat()[0]!==t})),v=d("concat"),w=function(t){if(!n(t))return!1;var e=t[O];return void 0!==e?!!e:o(t)},g=!p||!v;a({target:"Array",proto:!0,forced:g},{concat:function(t){var e,c,a,i,o,n=s(this),d=u(n,0),b=0;for(e=-1,a=arguments.length;e<a;e++)if(o=-1===e?n:arguments[e],w(o)){if(i=r(o.length),b+i>h)throw TypeError(j);for(c=0;c<i;c++,b++)c in o&&l(d,b,o[c])}else{if(b>=h)throw TypeError(j);l(d,b++,o)}return d.length=b,d}})},b0c0:function(t,e,c){var a=c("83ab"),i=c("9bf2").f,o=Function.prototype,n=o.toString,s=/^\s*function ([^ (]*)/,r="name";a&&!(r in o)&&i(o,r,{configurable:!0,get:function(){try{return n.call(this).match(s)[1]}catch(t){return""}}})},d1f0:function(t,e,c){"use strict";c.r(e);c("b0c0");var a=c("7a23"),i=Object(a["g"])('<div class="row text-center"><div class="col-4"><h5 class="fw-bold pt-3">STEP 01</h5><p class="fs-5 fw-bold">確認訂單商品</p></div><div class="col-4"><h5 class="fw-bold pt-3">STEP 02</h5><p class="fs-5 fw-bold">輸入訂購資料</p></div><div class="col-4 bg-secondary"><h5 class="fw-bold pt-3">STEP 03</h5><p class="fs-5 fw-bold">付款/完成訂單</p></div></div>',1),o={class:"mx-auto text-start w-75"},n=Object(a["i"])("h2",{class:"fw-bold"},"訂單資訊",-1),s={class:"table"},r=Object(a["i"])("thead",{class:"bg-secondary"},[Object(a["i"])("tr",null,[Object(a["i"])("th",{scope:"col"},"品名"),Object(a["i"])("th",{scope:"col"},"類別"),Object(a["i"])("th",{scope:"col"},"數量"),Object(a["i"])("th",{scope:"col"},"價格")])],-1),l=Object(a["i"])("td",null,null,-1),u=Object(a["i"])("td",null,null,-1),d=Object(a["i"])("td",null,null,-1),b={class:"text-end"},f=Object(a["i"])("h2",{class:"fw-bold"},"訂購人資料",-1),O={class:"table"},h={class:"text-start"},j={class:"bg-secondary row"},p=Object(a["i"])("td",{class:"col-4 fw-bold"},"姓名：",-1),v={class:"col-8"},w={class:"row"},g=Object(a["i"])("td",{class:"col-4 fw-bold"},"電話：",-1),m={class:"col-8"},y={class:"row"},$=Object(a["i"])("td",{class:"col-4 fw-bold"},"地址：",-1),k={class:"col-8"},x={class:"row"},C=Object(a["i"])("td",{class:"col-4 fw-bold"},"信箱：",-1),G={class:"col-8"},T={class:"row"},L=Object(a["i"])("td",{class:"col-4 fw-bold"},"備註：",-1),P={class:"col-8"},q={class:"mb-3"},E={class:"d-flex justify-content-between"},_=Object(a["h"])("回上頁");function S(t,e,c,S,D,B){var J=Object(a["D"])("Loading"),M=Object(a["D"])("router-link");return Object(a["w"])(),Object(a["e"])(a["a"],null,[Object(a["i"])("div",null,[Object(a["i"])(J)]),i,Object(a["i"])("section",o,[Object(a["i"])("div",null,[n,Object(a["i"])("table",s,[r,Object(a["i"])("tbody",null,[(Object(a["w"])(!0),Object(a["e"])(a["a"],null,Object(a["B"])(D.cartProduct,(function(e){return Object(a["w"])(),Object(a["e"])("tr",{key:e.id},[Object(a["i"])("td",null,Object(a["G"])(e.product.title),1),Object(a["i"])("td",null,Object(a["G"])(e.product.category),1),Object(a["i"])("td",null,Object(a["G"])(e.qty)+"/"+Object(a["G"])(e.product.unit),1),Object(a["i"])("td",null,"＄"+Object(a["G"])(t.$toCurrency(e.final_total)),1)])})),128)),Object(a["i"])("tr",null,[l,u,d,Object(a["i"])("td",b,"總計：＄"+Object(a["G"])(t.$toCurrency(B.total)),1)])])])]),Object(a["i"])("div",null,[f,Object(a["i"])("table",O,[Object(a["i"])("tbody",h,[Object(a["i"])("tr",j,[p,Object(a["i"])("td",v,Object(a["G"])(D.data.user.name),1)]),Object(a["i"])("tr",w,[g,Object(a["i"])("td",m,Object(a["G"])(D.data.user.tel),1)]),Object(a["i"])("tr",y,[$,Object(a["i"])("td",k,Object(a["G"])(D.data.user.address),1)]),Object(a["i"])("tr",x,[C,Object(a["i"])("td",G,Object(a["G"])(D.data.user.email),1)]),Object(a["i"])("tr",T,[L,Object(a["i"])("td",P,Object(a["G"])(D.data.message),1)])])])])]),Object(a["i"])("div",q,[Object(a["i"])("div",E,[Object(a["i"])(M,{class:"btn btn-primary",to:"/check-orderer"},{default:Object(a["O"])((function(){return[_]})),_:1}),Object(a["i"])("button",{class:"btn btn-primary",onClick:e[1]||(e[1]=function(){return B.finishCheckOut_goToComplete&&B.finishCheckOut_goToComplete.apply(B,arguments)})},"完成訂單")])])],64)}c("159b"),c("99af");var D=c("3a5e"),B=c("e4f3"),J={components:{Loading:D["a"]},data:function(){return{cartProduct:[],data:{user:{email:"",name:"",tel:"",address:""},message:""}}},computed:{total:function(){var t=0;return this.cartProduct.forEach((function(e){t+=e.final_total})),t}},methods:{getCartList:function(){var t=this,e="".concat("https://vue3-course-api.hexschool.io/","api/").concat("worktest5577","/cart");this.$http.get(e).then((function(e){e.data.success?t.cartProduct=e.data.data.carts:t.$swal({title:e.data.message,icon:"error"})})).catch((function(e){t.$swal({title:e,icon:"error"})}))},goToCheckOrderer:function(){this.$router.push("/order-complete")},receiveQuery:function(){this.data.message=this.$route.query.message,this.data.user.email=this.$route.query.email,this.data.user.name=this.$route.query.name,this.data.user.tel=this.$route.query.tel,this.data.user.address=this.$route.query.address},finishCheckOut_goToComplete:function(){var t=this;if(!0===window.confirm("已確定資料無誤，確定送出訂單嗎?")){var e=this.data,c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("worktest5577","/order");this.$http.post(c,{data:e}).then((function(e){e.data.success?(t.$swal({title:e.data.message}),t.goToCheckOrderer(),B["a"].emit("updata-cart")):t.$swal({title:e.data.message,icon:"error"})})).catch((function(e){t.$swal({title:e,icon:"error"})}))}}},created:function(){this.getCartList(),this.receiveQuery()}};J.render=S;e["default"]=J},e4f3:function(t,e,c){"use strict";var a=function(t){return{all:t=t||new Map,on:function(e,c){var a=t.get(e);a?a.push(c):t.set(e,[c])},off:function(e,c){var a=t.get(e);a&&(c?a.splice(a.indexOf(c)>>>0,1):t.set(e,[]))},emit:function(e,c){var a=t.get(e);a&&a.slice().map((function(t){t(c)})),(a=t.get("*"))&&a.slice().map((function(t){t(e,c)}))}}},i=a();e["a"]=i}}]);
//# sourceMappingURL=chunk-7945b94a.79a8d3ce.js.map