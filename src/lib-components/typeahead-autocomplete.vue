<template>
  <div class="autocomplete__wrapper">
    <div class="input__autocomplete">
      <input
        type="text"
        :value="selectedItem.text"
        :class="[inputClass]"
        :disabled="disableInput"
        :placeholder="placeholder"
        :readonly="readOnly"
        @input="handleInput"
        @click="click"
        @focusin="focusin"
        @blur="blur"
        autocomplete="off"
      />
      <input type="hidden" :value="selectedItem.value" />
    </div>
    <div v-if="hasItems && isFocused" class="dropdown__autocomplete">
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="dropdown__item"
        :class="{ highlight: item.value === selectedItem.value }"
        @click="setSelectedItem(item)"
      >
        <span v-if="item.prependText">{{ item.prependText }}</span>
        <span>{{ item[bindingText] }}</span>
        <span v-if="item.appendText">{{ item.appendText }}</span>
      </div>
    </div>

    <div
      name="no-data"
      v-if="!hasItems && showNoData"
      class="result__no-data-wrapper"
    >
      <div class="result__no-data">
        <slot name="nodata">
          <span>No data</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  template: "#typeahead-autocomplete",

  prop: ["value"],

  model: {
    prop: "value",
    event: "hit",
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },

    initialText: {
      type: String,
      default: () => "",
    },

    initialValue: {
      type: [String, Number],
      default: () => "",
    },

    bindingText: {
      type: String,
      default: () => "text",
    },

    bindingValue: {
      type: String,
      default: () => "value",
    },

    appendText: {
      type: String,
      default: () => "text",
    },

    prependText: {
      type: String,
      default: () => "text",
    },

    disableSearch: {
      type: Boolean,
      default: () => false,
    },

    disableInput: {
      type: Boolean,
      default: () => false,
    },

    readOnly: {
      type: Boolean,
      default: () => false,
    },

    showNoData: {
      type: Boolean,
      default: () => true,
    },

    placeholder: {
      type: String,
      default: () => "",
    },

    inputClass: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {
      selectedItem: {},
      showDropdownMenu: false,
      filteredItems: this.items,
      isFocused: false,
    };
  },

  computed: {
    hasItems() {
      return this.filteredItems.length;
    },
  },

  watch: {
    selectedItem: {
      deep: true,
      handler(value) {
        this.filterData();
        this.$emit("change", value);
        this.$emit("hit", value[this.bindingValue] || undefined);
      },
    },

    isFocused: {
      handler(value) {
        if (value) {
          this.filterData();
        }
      },
    },
  },

  created() {
    this.filteredItems = this.items;

    this.selectedItem = {
      text: this.initialText,
      value: this.initialValue,
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
      setTimeout(() => (this.isFocused = false), 200);
    },

    setSelectedItem(item) {
      this.selectedItem = item;
      this.isFocused = false;
    },

    handleInput(event) {
      this.selectedItem = {
        text: event.target.value || "",
        value: undefined,
      };

      this.$emit("input", this.selectedItem);
    },

    filterData() {
      if (this.disableSearch) {
        return;
      }

      this.filteredItems = this.items.filter((item) => {
        const prependText = item.prependText;
        const appendText = item.appendText;
        let textToCompare = item.text || "";

        if (prependText) {
          textToCompare = `${prependText} ${textToCompare}`;
        }

        if (appendText) {
          textToCompare = `${textToCompare} ${appendText}`;
        }

        return textToCompare
          .toLowerCase()
          .includes(this.selectedItem?.text?.toLowerCase());
      });
    },
  },
};
</script>

<style>
.autocomplete__wrapper {
  position: relative;
}
.input__autocomplete input:first-child {
  border: 1px solid #aaa;
  height: 20px;
  font-size: 12px;
  margin-bottom: 2px;
  width: 100%;
  padding: 4px 8px;
}
.input__autocomplete {
  display: flex;
}
.input__autocomplete input:first-child:focus {
  outline: none !important;
}
.result__no-data-wrapper {
  display: flex;
}
.dropdown__autocomplete,
.result__no-data-wrapper {
  max-height: 206px;
  height: min-content;
  overflow-y: auto;
  border: 1px solid #5180d8;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  top: 100%;
  background: #fff;
  z-index: 99;
}
.result__no-data {
  padding: 6px 4px;
  color: #aaa;
  text-align: center;
  width: 100%;
}
.dropdown__item {
  padding: 6px 8px;
  cursor: pointer;
}
.dropdown__item:hover {
  background: #dbe7f5;
}
.highlight {
  background: #dbe7f5;
}
</style>
