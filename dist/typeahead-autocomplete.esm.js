//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  template: "#typeahead-autocomplete",
  prop: ["value"],
  model: {
    prop: "value",
    event: "hit"
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    initialText: {
      type: String,
      default: () => ""
    },
    initialValue: {
      type: [String, Number],
      default: () => ""
    },
    bindingText: {
      type: String,
      default: () => "text"
    },
    bindingValue: {
      type: String,
      default: () => "value"
    },
    appendText: {
      type: String,
      default: () => "text"
    },
    prependText: {
      type: String,
      default: () => "text"
    },
    disableSearch: {
      type: Boolean,
      default: () => false
    },
    disableInput: {
      type: Boolean,
      default: () => false
    },
    readOnly: {
      type: Boolean,
      default: () => false
    },
    showNoData: {
      type: Boolean,
      default: () => true
    },
    placeholder: {
      type: String,
      default: () => ""
    },
    inputClass: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      selectedItem: {},
      showDropdownMenu: false,
      filteredItems: this.items,
      isFocused: false
    };
  },
  computed: {
    hasItems() {
      return this.filteredItems.length;
    }
  },
  watch: {
    selectedItem: {
      deep: true,
      handler(value) {
        this.filterData();
        this.$emit("change", value);
        this.$emit("hit", value[this.bindingValue] || undefined);
      }
    },
    isFocused: {
      handler(value) {
        if (value) {
          this.filterData();
        }
      }
    }
  },
  created() {
    this.filteredItems = this.items;
    this.selectedItem = {
      text: this.initialText,
      value: this.initialValue
    };
  },
  methods: {
    click() {
      this.isFocused = true;
    },
    focusin() {
      this.isFocused = true;
    },
    blur() {
      setTimeout(() => this.isFocused = false, 200);
    },
    setSelectedItem(item) {
      this.selectedItem = item;
      this.isFocused = false;
    },
    handleInput(event) {
      this.selectedItem = {
        text: event.target.value || "",
        value: undefined
      };
      this.$emit("input", this.selectedItem);
    },
    filterData() {
      if (this.disableSearch) {
        return;
      }
      this.filteredItems = this.items.filter(item => {
        var _this$selectedItem, _this$selectedItem$te;
        const prependText = item.prependText;
        const appendText = item.appendText;
        let textToCompare = item.text || "";
        if (prependText) {
          textToCompare = `${prependText} ${textToCompare}`;
        }
        if (appendText) {
          textToCompare = `${textToCompare} ${appendText}`;
        }
        return textToCompare.toLowerCase().includes((_this$selectedItem = this.selectedItem) === null || _this$selectedItem === void 0 ? void 0 : (_this$selectedItem$te = _this$selectedItem.text) === null || _this$selectedItem$te === void 0 ? void 0 : _this$selectedItem$te.toLowerCase());
      });
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "autocomplete__wrapper"
  }, [_c('div', {
    staticClass: "input__autocomplete"
  }, [_c('input', {
    class: [_vm.inputClass],
    attrs: {
      "type": "text",
      "disabled": _vm.disableInput,
      "placeholder": _vm.placeholder,
      "readonly": _vm.readOnly,
      "autocomplete": "off"
    },
    domProps: {
      "value": _vm.selectedItem.text
    },
    on: {
      "input": _vm.handleInput,
      "click": _vm.click,
      "focusin": _vm.focusin,
      "blur": _vm.blur
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "hidden"
    },
    domProps: {
      "value": _vm.selectedItem.value
    }
  })]), _vm._v(" "), _vm.hasItems && _vm.isFocused ? _c('div', {
    staticClass: "dropdown__autocomplete"
  }, _vm._l(_vm.filteredItems, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "dropdown__item",
      class: {
        highlight: item.value === _vm.selectedItem.value
      },
      on: {
        "click": function ($event) {
          return _vm.setSelectedItem(item);
        }
      }
    }, [item.prependText ? _c('span', [_vm._v(_vm._s(item.prependText))]) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(item[_vm.bindingText]))]), _vm._v(" "), item.appendText ? _c('span', [_vm._v(_vm._s(item.appendText))]) : _vm._e()]);
  }), 0) : _vm._e(), _vm._v(" "), !_vm.hasItems && _vm.showNoData ? _c('div', {
    staticClass: "result__no-data-wrapper",
    attrs: {
      "name": "no-data"
    }
  }, [_c('div', {
    staticClass: "result__no-data"
  }, [_vm._t("nodata", function () {
    return [_c('span', [_vm._v("No data")])];
  })], 2)]) : _vm._e()]);
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-3f6a2ac6_0", {
    source: ".autocomplete__wrapper{position:relative}.input__autocomplete input:first-child{border:1px solid #aaa;height:20px;font-size:12px;margin-bottom:2px;width:100%;padding:4px 8px}.input__autocomplete{display:flex}.input__autocomplete input:first-child:focus{outline:0!important}.result__no-data-wrapper{display:flex}.dropdown__autocomplete,.result__no-data-wrapper{max-height:206px;height:min-content;overflow-y:auto;border:1px solid #5180d8;position:absolute;bottom:0;left:0;width:100%;top:100%;background:#fff;z-index:99}.result__no-data{padding:6px 4px;color:#aaa;text-align:center;width:100%}.dropdown__item{padding:6px 8px;cursor:pointer}.dropdown__item:hover{background:#dbe7f5}.highlight{background:#dbe7f5}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__ = undefined;
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);
var __vue_component__$1 = __vue_component__;

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  TypeaheadAutocomplete: __vue_component__$1
});

// Import vue components

// install function executed by Vue.use()
const install = function installTypeaheadAutocomplete(Vue) {
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    Vue.component(componentName, component);
  });
};

export { __vue_component__$1 as TypeaheadAutocomplete, install as default };
