import{j as c}from"./index.50392c2a.js";class n{constructor(){this.__stack={}}on(t,s,i){return(this.__stack[t]||(this.__stack[t]=[])).push({fn:s,ctx:i}),this}once(t,s,i){const o=(...e)=>{this.off(t,o),s.apply(i,e)};return o.__callback=s,this.on(t,o,i)}emit(t){const s=this.__stack[t];if(s!==void 0){const i=[].slice.call(arguments,1);s.forEach(o=>{o.fn.apply(o.ctx,i)})}return this}off(t,s){const i=this.__stack[t];if(i===void 0)return this;if(s===void 0)return delete this.__stack[t],this;const o=i.filter(e=>e.fn!==s&&e.fn.__callback!==s);return o.length!==0?this.__stack[t]=o:delete this.__stack[t],this}}var h=c(({app:r})=>{const t=new n;r.config.globalProperties.$bus=t,r.provide("bus",t)});export{h as default};
