(this.webpackJsonpgpct=this.webpackJsonpgpct||[]).push([[0],{1055:function(e,t){},1563:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),o=a(138),r=a.n(o),i=(a(737),a(53)),l=a(29),s=a(19),u=(a(429),a(712)),p=a(715),x=a.n(p),h=a(4),b=x()(u),d=function(e){var t=e.style,a=e.data,n=e.layout,c=e.templates;return Object(h.jsx)(b,{style:t,data:[a].concat(Object(l.a)(c||[])),layout:n})},j=a(718),y=a.n(j),m=a(717),O=a.n(m),f=a(1623),g=a(1622),v=a(1618),k=a(420),w=a.n(k),T=a(716),S=a(421),C=a.n(S);C.a.defaults.baseURL="http://3.210.142.92:5000/";var G=function(){var e=Object(T.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.get("".concat(t)).then((function(e){return e})).catch((function(e){console.log(e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=a(1621),D=a(1619),E=function(e){var t=e.handleGrapthType,a=e.graphType,c=e.templateChange,o=e.templatesOptions,r=e.data,l=e.selectedStock,u=e.handleStockChange,p=e.selectedTime,x=e.hanldeSelectedTime,b=Object(n.useState)([]),d=Object(s.a)(b,2),j=d[0],m=d[1];return Object(n.useEffect)((function(){G("stocks/available").then((function(e){console.log("res",e),m(e.data.list||[])}))}),[]),Object(h.jsxs)(L.a,{container:!0,spacing:2,direction:"row",alignItems:"center",textAlign:"center",children:[Object(h.jsx)(L.a,{item:!0,xs:2,children:Object(h.jsx)(v.a,{value:l,onChange:function(e,t){u(t)},fullWidth:!0,inputValue:l,options:j,renderInput:function(e){return Object(h.jsx)(D.a,Object(i.a)(Object(i.a)({},e),{},{variant:"standard",label:"Stock"}))}})}),Object(h.jsx)(L.a,{item:!0,xs:1,children:Object(h.jsxs)(g.a,{variant:"text","aria-label":"text button group",children:[Object(h.jsx)(f.a,{onClick:function(){return t("candlestick")},children:Object(h.jsx)(O.a,{color:"candlestick"===a?"primary":"action"})}),Object(h.jsx)(f.a,{onClick:function(){return t("ohlc")},children:Object(h.jsx)(y.a,{color:"ohlc"!==a?"primary":"action"})})]})}),Object(h.jsx)(L.a,{item:!0,xs:4,children:Object(h.jsx)(g.a,{variant:"text","aria-label":"text button group",children:["1h","1d","1wk","1mo"].map((function(e,t){return Object(h.jsx)(f.a,{onClick:function(){return x(e)},color:p!==e?"primary":"error",children:e},t)}))})}),Object(h.jsxs)(L.a,{item:!0,xs:5,children:[" ",Object(h.jsx)(g.a,{variant:"text","aria-label":"text button group",children:o(r).map((function(e,t){return Object(h.jsx)(f.a,{onClick:function(){return c(e)},children:e.name},t)}))})]})]})},F=function(e){return{graph:[{x:e.x,y:e.low,xaxis:"x",yaxis:"y",marker:{color:"blue"},templateType:1}],subGraphs:[{x:e.x,y:e.low,xaxis:"x",yaxis:"y",marker:{color:"blue"},templateType:1,mergedGraphs:[{x:e.x,y:e.a,xaxis:"x",yaxis:"y",marker:{color:"#90c7fc"},templateType:1},{x:e.x,y:e.high,xaxis:"x",yaxis:"y",type:"scatter",marker:{color:"red"},templateType:1},{x:e.x,y:e.open,type:"bar",marker:{color:e.open.map((function(t,a){return t<e.close[a]?"green":"red"}))},xaxis:"x",yaxis:"y",templateType:1}]}]}},I=function(e){return{graph:[{x:e.x,y:e.low.map((function(t,a){return(t+e.high[a])/2})),xaxis:"x",yaxis:"y",marker:{color:"#90c7fc"},templateType:2},{x:e.x,y:e.low.map((function(t,a){return(t+e.high[a])/2+.8999})),xaxis:"x",yaxis:"y",marker:{color:"#90c7fc"},templateType:2}],subGraphs:[]}},M=function(e,t){return{graph:[{x:e.x,y:e.low.map((function(e){return e+10})),xaxis:"x",yaxis:"y",marker:{color:"blue"},templateType:3},{x:e.x,y:e.low.map((function(e){return e-10})),xaxis:"x",yaxis:"y",marker:{color:"blue"},templateType:3}],subGraphs:[{x:e.x,y:e.open.map((function(t,a){return t<e.close[a]?t:-1*t})),type:"bar",marker:{color:"rgba(255,0,0,0.7)"},xaxis:"x",yaxis:"y",templateType:3,mergedGraphs:[{x:e.x,y:e.open.map((function(t,a){return t<e.close[a]?t:-1*t})),xaxis:"x",yaxis:"y",type:"scatter",marker:{color:"red"},templateType:3}]},{x:e.x,y:e.open.map((function(t,a){return t<e.close[a]?t:-1*t})),type:"bar",marker:{color:"rgba(0,0,255,0.7)"},xaxis:"x",yaxis:"y",templateType:3,mergedGraphs:[{x:e.x,y:e.low,xaxis:"x",yaxis:"y",marker:{color:"blue"},templateType:3}]}]}},z=function(e){return[{name:"T1",id:1,template:Object(i.a)({},F(e))},{name:"T2",id:2,template:Object(i.a)({},I(e))},{name:"T3",id:3,template:Object(i.a)({},M(e))}]},A={x:[],close:[],decreasing:{line:{color:"black"}},high:[],increasing:{line:{color:"black"}},line:{color:"rgba(31,119,180,1)"},low:[],open:[],type:"candlestick",xaxis:"x",yaxis:"y"};var B=function(){var e=Object(n.useState)("candlestick"),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)([]),r=Object(s.a)(o,2),u=r[0],p=r[1],x=Object(n.useState)([]),b=Object(s.a)(x,2),j=b[0],y=b[1],m=Object(n.useState)([]),O=Object(s.a)(m,2),f=O[0],g=O[1],v=Object(n.useState)({dragmode:"zoom",margin:{t:0,l:30,r:0,b:25},showlegend:!1,xaxis:{domain:[0,1],rangeslider:{visible:!1},title:"Date",type:"date"},yaxis:{domain:[0,1],autorange:!0},autosize:!0,height:600}),k=Object(s.a)(v,1)[0],w=Object(n.useState)("MMM"),T=Object(s.a)(w,2),S=T[0],C=T[1],L=Object(n.useState)("1h"),D=Object(s.a)(L,2),F=D[0],I=D[1],M=Object(n.useState)(Object(i.a)({},A)),B=Object(s.a)(M,2),J=B[0],P=B[1];return Object(n.useState)((function(){G("stocks?stock=".concat(null===S||void 0===S?void 0:S.toLowerCase(),"&interval=").concat(F)).then((function(e){var t,a,n=[],c=[],o=[],r=[],l=[];null===e||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.data)||void 0===a||a.forEach((function(e){n.push(e.high),c.push(e.low),o.push(e.open),r.push(e.close),l.push(new Date(e.date))})),console.log(l),P(Object(i.a)(Object(i.a)({},A),{},{high:n,low:c,open:o,close:r,x:l}))}))}),[]),Object(h.jsxs)("div",{children:[Object(h.jsx)(E,{graphType:a,handleGrapthType:function(e){c(e)},templateChange:function(e){var t,a;console.log("template.subGraphs",e),t=e.id,a=e.template,console.log("Arr",a.subGraphs),-1!==j.indexOf(t)?(g(Object(l.a)(f.filter((function(e){return e.templateType!==t})))),p(Object(l.a)(u.filter((function(e){return e.templateType!==t})))),y(Object(l.a)(j.filter((function(e){return e!==t}))))):(y([].concat(Object(l.a)(j),[t])),g([].concat(Object(l.a)(f),Object(l.a)(a.graph))),p([].concat(Object(l.a)(u),Object(l.a)(a.subGraphs))))},templatesOptions:z,data:J,selectedStock:S,selectedTime:F,hanldeSelectedTime:function(e){I(e),console.log(F),S&&G("stocks?stock=".concat(null===S||void 0===S?void 0:S.toLowerCase(),"&interval=").concat(e)).then((function(e){var t,a,n=[],c=[],o=[],r=[],l=[];null===e||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.data)||void 0===a||a.forEach((function(e){n.push(e.high),c.push(e.low),o.push(e.open),r.push(e.close),l.push(new Date(e.date))})),P(Object(i.a)(Object(i.a)({},A),{},{high:n,low:c,open:o,close:r,x:l}))}))},handleStockChange:function(e){C(e),e&&G("stocks?stock=".concat(null===e||void 0===e?void 0:e.toLowerCase(),"&interval=").concat(F)).then((function(e){var t,a,n=[],c=[],o=[],r=[],l=[];null===e||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.data)||void 0===a||a.forEach((function(e){n.push(e.high),c.push(e.low),o.push(e.open),r.push(e.close),l.push(new Date(e.date))})),P(Object(i.a)(Object(i.a)({},A),{},{high:n,low:c,open:o,close:r,x:l}))}))}}),Object(h.jsxs)("div",{id:"fullscreen",children:[Object(h.jsx)(d,{style:{width:"100%",height:"100%"},data:Object(i.a)(Object(i.a)({},J),{},{type:a}),layout:k,templates:f}),u.map((function(e){return Object(h.jsx)(d,{style:{width:"100%"},data:Object(i.a)({},e),layout:Object(i.a)(Object(i.a)({},k),{},{autosize:!0,height:150}),templates:e.mergedGraphs},e)}))]})]})},J=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,1625)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,o=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),o(e),r(e)}))};r.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(B,{})}),document.getElementById("root")),J()},429:function(e,t,a){},737:function(e,t,a){},938:function(e,t){},940:function(e,t){}},[[1563,1,2]]]);
//# sourceMappingURL=main.e81d334e.chunk.js.map