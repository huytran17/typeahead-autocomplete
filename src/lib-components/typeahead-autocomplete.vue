<template>
  <div class="autocomplete__wrapper">
    <div class="input__autocomplete">
      <input
        type="text"
        :value="selectedItem.text"
        :class="[inputClass]"
        :disabled="disableInput"
        :placeholder="placeholder"
        @input="handleInput"
        @blur="hideDropdownMenu"
        @focus="showDropdownMenu = true"
        @click="showDropdownMenu = true"
      />
    </div>
    <div v-show="showDropdownMenu" class="dropdown__autocomplete">
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="dropdown__item"
        :class="{ selected: item.value === selectedItem.value }"
        @click="setSelectedItem(item)"
      >
        <span v-if="item.prependText">{{ item.prependText }}</span>
        <span>{{ item[bindingText] }}</span>
        <span v-if="item.appendText">{{ item.appendText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  prop: ["value"],

  model: {
    prop: "value",
    event: "input",
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
      selectedItem: {
        text: this.initialText,
        value: this.initialValue,
      },
      showDropdownMenu: false,
      filteredItems: this.items,
    };
  },

  watch: {
    selectedItem: {
      deep: true,
      handler(value) {
        this.filterData();
        this.$emit("change", value);
      },
    },

    items: {
      deep: true,
      handler(value) {
        this.filteredItems = value;
      },
    },

    initialValue: {
      handler(value) {
        this.selectedItem.value = value;
      },
    },

    initialText: {
      handler(value) {
        this.selectedItem.text = value;
      },
    },
  },
  methods: {
    setSelectedItem(item) {
      this.selectedItem = item;
      this.showDropdownMenu = false;
    },

    hideDropdownMenu() {
      return setTimeout(() => (this.showDropdownMenu = false), 200);
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
        if (this.selectedItem.text) {
          this.showDropdownMenu = false;
          return;
        }

        this.showDropdownMenu = true;
        return;
      }

      this.filteredItems = this.items.filter((item) =>
        `${item.prependText} ${item.text} ${item.appendText}`
          ?.toLowerCase()
          .includes(this.selectedItem?.text?.toLowerCase())
      );
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
}
.dropdown__autocomplete {
  max-height: 206px;
  height: min-content;
  overflow-y: auto;
  border: 1px solid #5180d8;
  padding: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  top: 100%;
  background: #fff;
  z-index: 99;
}
.dropdown__item {
  padding: 2px 4px;
  cursor: pointer;
}
.dropdown__item:hover {
  border: 1px solid #5180d8;
  background: #fdeaa6;
}
.highlight {
  border: 1px solid #5180d8;
  background: #fdeaa6;
}
</style>
