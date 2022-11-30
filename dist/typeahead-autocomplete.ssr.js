'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
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
      default: function _default() {
        return [];
      }
    },
    initialText: {
      type: String,
      default: function _default() {
        return "";
      }
    },
    initialValue: {
      type: [String, Number],
      default: function _default() {
        return "";
      }
    },
    bindingText: {
      type: String,
      default: function _default() {
        return "text";
      }
    },
    bindingValue: {
      type: String,
      default: function _default() {
        return "value";
      }
    },
    appendText: {
      type: String,
      default: function _default() {
        return "text";
      }
    },
    prependText: {
      type: String,
      default: function _default() {
        return "text";
      }
    },
    disableSearch: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    disableInput: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    readOnly: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    showNoData: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    },
    placeholder: {
      type: String,
      default: function _default() {
        return "";
      }
    },
    inputClass: {
      type: String,
      default: function _default() {
        return "";
      }
    }
  },
  data: function data() {
    return {
      selectedItem: {},
      showDropdownMenu: false,
      filteredItems: this.items,
      isFocused: false
    };
  },
  computed: {
    hasItems: function hasItems() {
      return this.filteredItems.length;
    }
  },
  watch: {
    selectedItem: {
      deep: true,
      handler: function handler(value) {
        this.filterData();
        this.$emit("change", value);
        this.$emit("hit", value[this.bindingValue] || undefined);
      }
    },
    isFocused: {
      handler: function handler(value) {
        if (value) {
          this.filterData();
        }
      }
    }
  },
  created: function created() {
    this.filteredItems = this.items;
    this.selectedItem = {
      text: this.initialText,
      value: this.initialValue
    };
  },
  methods: {
    click: function click() {
      this.isFocused = true;
    },
    focusin: function focusin() {
      this.isFocused = true;
    },
    blur: function blur() {
      var _this = this;
      setTimeout(function () {
        return _this.isFocused = false;
      }, 200);
    },
    setSelectedItem: function setSelectedItem(item) {
      this.selectedItem = item;
      this.isFocused = false;
    },
    handleInput: function handleInput(event) {
      this.selectedItem = {
        text: event.target.value || "",
        value: undefined
      };
      this.$emit("input", this.selectedItem);
    },
    filterData: function filterData() {
      var _this2 = this;
      if (this.disableSearch) {
        return;
      }
      this.filteredItems = this.items.filter(function (item) {
        var _this2$selectedItem, _this2$selectedItem$t;
        var prependText = item.prependText;
        var appendText = item.appendText;
        var textToCompare = item.text || "";
        if (prependText) {
          textToCompare = "".concat(prependText, " ").concat(textToCompare);
        }
        if (appendText) {
          textToCompare = "".concat(textToCompare, " ").concat(appendText);
        }
        return textToCompare.toLowerCase().includes((_this2$selectedItem = _this2.selectedItem) === null || _this2$selectedItem === void 0 ? void 0 : (_this2$selectedItem$t = _this2$selectedItem.text) === null || _this2$selectedItem$t === void 0 ? void 0 : _this2$selectedItem$t.toLowerCase());
      });
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "autocomplete__wrapper"
  }, [_vm._ssrNode("<div class=\"input__autocomplete\"><input type=\"text\"" + _vm._ssrAttr("disabled", _vm.disableInput) + _vm._ssrAttr("placeholder", _vm.placeholder) + _vm._ssrAttr("readonly", _vm.readOnly) + " autocomplete=\"off\"" + _vm._ssrAttr("value", _vm.selectedItem.text) + _vm._ssrClass(null, [_vm.inputClass]) + "> <input type=\"hidden\"" + _vm._ssrAttr("value", _vm.selectedItem.value) + "></div> " + (_vm.hasItems && _vm.isFocused ? "<div class=\"dropdown__autocomplete\">" + _vm._ssrList(_vm.filteredItems, function (item, index) {
    return "<div" + _vm._ssrClass("dropdown__item", {
      highlight: item.value === _vm.selectedItem.value
    }) + ">" + (item.prependText ? "<span>" + _vm._ssrEscape(_vm._s(item.prependText)) + "</span>" : "<!---->") + " <span>" + _vm._ssrEscape(_vm._s(item[_vm.bindingText])) + "</span> " + (item.appendText ? "<span>" + _vm._ssrEscape(_vm._s(item.appendText)) + "</span>" : "<!---->") + "</div>";
  }) + "</div>" : "<!---->") + " "), !_vm.hasItems && _vm.showNoData ? _vm._ssrNode("<div name=\"no-data\" class=\"result__no-data-wrapper\">", "</div>", [_vm._ssrNode("<div class=\"result__no-data\">", "</div>", [_vm._t("nodata", function () {
    return [_c('span', [_vm._v("No data")])];
  })], 2)]) : _vm._e()], 2);
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-3f6a2ac6_0", {
    source: ".autocomplete__wrapper{position:relative}.input__autocomplete input:first-child{border:1px solid #aaa;height:20px;font-size:12px;margin-bottom:2px;width:100%;padding:4px 8px}.input__autocomplete{display:flex}.input__autocomplete input:first-child:focus{outline:0!important}.result__no-data-wrapper{display:flex}.dropdown__autocomplete,.result__no-data-wrapper{max-height:206px;height:min-content;overflow-y:auto;border:1px solid #5180d8;position:absolute;bottom:0;left:0;width:100%;top:100%;background:#fff;z-index:99}.result__no-data{padding:6px 4px;color:#aaa;text-align:center;width:100%}.dropdown__item{padding:6px 8px;cursor:pointer}.dropdown__item:hover{background:#dbe7f5}.highlight{background:#dbe7f5}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__ = undefined;
/* module identifier */
var __vue_module_identifier__ = "data-v-3f6a2ac6";
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);
var __vue_component__$1 = __vue_component__;/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,TypeaheadAutocomplete:__vue_component__$1});// install function executed by Vue.use()
var install = function installTypeaheadAutocomplete(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];
    Vue.component(componentName, component);
  });
};var components=/*#__PURE__*/Object.freeze({__proto__:null,'default':install,TypeaheadAutocomplete:__vue_component__$1});// Attach named exports directly to plugin. IIFE/CJS will
// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)
Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    componentName = _ref2[0],
    component = _ref2[1];
  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;