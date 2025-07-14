import Dep from './Dep.js'
import Watcher from './Watcher.js'

function observer(vm, obj) {
  const dep = new Dep()
  Object.keys(obj).forEach(key => {
    let _value = obj[key]
    Object.defineProperty(vm, key, {
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return _value
      },
      set(newVal) {
        _value = newVal
        dep.notify()
      }
    })
  })
}

function compiler(vm) {
  const el = document.querySelector(vm.$el);
  if (!el) {
    throw new Error(`Element with selector "${vm.$el}" not found.`);
  }

  const documentFragment = document.createDocumentFragment();
  const reg = /\{\{(.*)}}/;

  while (el.firstChild) {
    const child = el.firstChild;

    if (child.nodeType === Node.ELEMENT_NODE) {
      handleElementNode(vm, child, reg);
    } else if (child.nodeType === Node.TEXT_NODE) {
      handleTextNode(vm, child, reg);
    }

    documentFragment.appendChild(child);
  }

  el.appendChild(documentFragment);
}

function handleElementNode(vm, element, reg) {
  if (reg.test(element.innerHTML || "")) {
    const vmKey = RegExp.$1.trim();
    new Watcher(vm, element, vmKey);
  } else {
    Array.from(element.attributes).forEach((attr) => {
      if (attr.name === "v-model") {
        const vmKey = attr.value;
        element.addEventListener("input", (event) => {
          vm[vmKey] = event.target.value;
        });
      }
    });
  }
}

function handleTextNode(vm, textNode, reg) {
  if (reg.test(textNode.nodeValue || "")) {
    const vmKey = RegExp.$1.trim();
    new Watcher(vm, textNode, vmKey);
  }
}


export {
  observer, compiler
}