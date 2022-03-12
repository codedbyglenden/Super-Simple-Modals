!function(t,e){'object'==typeof exports&&'undefined'!=typeof module?module.exports=e():'function'==typeof define&&define.amd?define(e):(t='undefined'!=typeof globalThis?globalThis:t||self).SuperSimpleModal=e()}(this,(function(){'use strict';return class{constructor(){this.focusableElements='a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',this.willAnimate=!1,this.animationTimeout=1,this.initiatorButton=null}strip(t){try{var e=document.implementation.createDocument('http://www.w3.org/1999/xhtml','html',null);return e.documentElement.innerHTML=t,e.documentElement.textContent||e.documentElement.innerText}catch(t){return''}}async remove(){const t=document.getElementById('ssm-modal');t&&(!0===this.willAnimate&&(t.setAttribute('aria-hidden',!0),await new Promise((t=>setTimeout(t,this.animationTimeout)))),t.remove()),null!==this.initiatorButton&&this.initiatorButton.focus()}generate({title:t='',description:e='',removeText:n='Cancel',addText:i='',mainContent:o='',callback:s=null,params:d={},initiatorButton:a=null,willAnimate:l=!1,animationTimeout:m=300}){a&&(this.initiatorButton=a,d.initiatorButton=a),m&&(this.animationTimeout=m),l&&(this.willAnimate=l);const c=o?`<div id="content" class="ssm-modal__content">${o}</div>`:'',r=e?`<div id="ssm-modal__description"><p>${this.strip(e)}</p></div>`:'',u=`\n\t\t<div\n\t\t\tid="ssm-modal"\n\t\t\tclass="ssm-modal${l?' will-animate':''}"\n\t\t\trole="dialog"\n\t\t\taria-modal="true"\n\t\t\taria-labelledby="ssm-modal__title"\n    \t\taria-describedby="ssm-modal__description"\n\t\t\taria-hidden="false"\n\t\t>\n\t\t\t<div class="ssm-modal__container">\n\t\t\t\t<h3 id="ssm-modal__title">${this.strip(t)}</h3>\n\n\t\t\t\t${r}\n\n\t\t\t\t${c}\n\n\t\t\t\t<div class="ssm-modal-buttons is-flex">\n\t\t\t\t\t<button\n\t\t\t\t\t\tid="ssm-modal__close"\n\t\t\t\t\t\taria-label="Close"\n\t\t\t\t\t\tclass="btn btn--preview"\n\t\t\t\t\t\ttitle="Close modal"\n\t\t\t\t\t>${this.strip(n)}</button>\n\t\t\t\t\t<button\n\t\t\t\t\t\tid="ssm-modal__do_it"\n\t\t\t\t\t\tclass="btn btn--fill"\n\t\t\t\t\t>${this.strip(i)}</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>`;document.body.insertAdjacentHTML('beforeend',u),this.initiateFocusTrap('ssm-modal'),document.getElementById('ssm-modal__close').addEventListener('click',(()=>this.remove())),document.getElementById('ssm-modal').addEventListener('click',(t=>{'ssm-modal'===t.target.getAttribute('id')&&this.remove()})),document.body.addEventListener('keydown',(t=>{const e=t||window.event;('key'in e?'Escape'===e.key||'Esc'===e.key:27===e.keyCode)&&this.remove()})),s&&document.getElementById('ssm-modal__do_it').addEventListener('click',(()=>{s(d)}))}initiateFocusTrap(t){const e=document.querySelector('#'+t),n=e.querySelectorAll(this.focusableElements),i=n[0],o=n[n.length-1];i.focus(),e.addEventListener('keydown',(function(t){'Tab'!==t.key&&9!==t.keyCode||(t.shiftKey?document.activeElement===i&&(o.focus(),t.preventDefault()):document.activeElement===o&&(i.focus(),t.preventDefault()))}))}}}));