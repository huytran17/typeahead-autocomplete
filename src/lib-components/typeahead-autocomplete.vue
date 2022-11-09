<template>
  <div class="autocomplete__wrapper">
    <div class="autocomplete__input">
      <input
        type="text"
        :value="selectedItem.text"
        :class="[inputClass]"
        :disabled="disableInput"
        :placeholder="placeholder"
        :readonly="readOnly"
        autocomplete="off"
        @input="handleInput"
        @click="click"
        @focusin="focusin"
        @blur="blur"
      />
      <input type="hidden" :value="selectedItem.value" />
    </div>
    <div v-if="shouldShowDropdown" class="autocomplete__dropdown">
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="autocomplete__dropdown-item"
        :class="{ highlight: item[bindingValue] === selectedItem.value }"
        @click="setSelectedItem(item)"
      >
        <slot name="prepend"></slot>

        <span v-if="item.prependText">{{ item.prependText }}</span>
        <span>{{ item[bindingText] }}</span>
        <span v-if="item.appendText">{{ item.appendText }}</span>

        <slot name="append"></slot>
      </div>
    </div>

    <div name="no-data" v-if="shouldShowNoData" class="result__no-data-wrapper">
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

    remoteMode: {
      type: Boolean,
      default: () => false,
    },

    remoteUrl: {
      type: String,
      default: () => "",
    },

    requestTimeout: {
      type: Number,
      default: () => 10000,
    },
  },

  data() {
    return {
      selectedItem: {},
      showDropdownMenu: false,
      filteredItems: [],
      isFocused: false,
      remoteData: [],
    };
  },

  computed: {
    hasItems() {
      return this.filteredItems.length;
    },

    dataToFilter() {
      return this.remoteMode ? this.remoteData : this.items;
    },

    shouldShowNoData() {
      return !this.hasItems && this.showNoData && this.isFocused;
    },

    shouldShowDropdown() {
      return this.hasItems && this.isFocused;
    },
  },

  watch: {
    remoteData: {
      deep: true,
      immediate: true,
      handler(data) {
        if (this.remoteMode) {
          this.filteredItems = data;
        }
      },
    },

    selectedItem: {
      deep: true,
      handler(data) {
        this.filterData();
        this.$emit("change", data);
        this.$emit("hit", data.value || undefined);
      },
    },

    isFocused: {
      handler(data) {
        if (data) {
          this.filterData();
        }
      },
    },
  },

  created() {
    this.selectedItem = {
      text: this.initialText,
      value: this.initialValue,
    };

    if (this.remoteMode) {
      return this.fetchRemoteData();
    }

    this.filteredItems = this.items;
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
      this.selectedItem = {
        text: item[this.bindingText],
        value: item[this.bindingValue],
      };

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

      this.filteredItems = this.dataToFilter.filter((item) => {
        const prependText = item.prependText;
        const appendText = item.appendText;
        let textToCompare = item[this.bindingText] || "";

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

    fetchRemoteData() {
      try {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", this.remoteUrl);

        xhr.responseType = "json";

        xhr.timeout = this.requestTimeout;

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

        xhr.send();

        xhr.onload = () => {
          if (xhr.status === 200) {
            this.remoteData = xhr.response || [];
            this.$emit("fetch", xhr.response);
          }
        };

        xhr.ontimeout = () => {
          throw new Error(`Request timed out. Requested at ${this.remoteUrl}.`);
        };

        xhr.onerror = (error) => {
          throw new Error(error);
        };
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.autocomplete__wrapper {
  position: relative;
}
.autocomplete__input input:first-child {
  border: 1px solid #aaa;
  height: 20px;
  font-size: 12px;
  margin-bottom: 2px;
  width: 100%;
  padding: 4px 8px;
}
.autocomplete__input {
  display: flex;
}
.autocomplete__input input:first-child:focus {
  outline: none !important;
}
.result__no-data-wrapper {
  display: flex;
}
.autocomplete__dropdown,
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
.autocomplete__dropdown-item {
  padding: 6px 8px;
  cursor: pointer;
}
.autocomplete__dropdown-item:hover {
  background: #dbe7f5;
}
.highlight {
  background: #dbe7f5;
}
</style>
