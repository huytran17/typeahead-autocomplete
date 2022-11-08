<script>
import Vue from "vue";
import { TypeaheadAutocomplete } from "@/entry.esm";

export default Vue.extend({
  name: "ServeDev",

  components: {
    TypeaheadAutocomplete,
  },

  data() {
    return {
      selectedValue: undefined,
      items: [
        {
          text: "1",
          value: 1,
        },
        {
          text: "2",
          value: 2,
        },
        {
          text: "3",
          value: 3,
        },
        {
          text: "4",
          value: 4,
        },
        {
          text: "5",
          value: 5,
        },
        {
          text: "6",
          value: 6,
        },
        {
          text: "7",
          value: 7,
        },
        {
          text: "8",
          value: 8,
        },
        {
          text: "9",
          value: 9,
        },
        {
          text: "10",
          value: 10,
        },
        {
          text: "11",
          value: 11,
        },
        {
          text: "12",
          value: 12,
        },
      ],
    };
  },
});
</script>

<template>
  <div id="app">
    <typeahead-autocomplete
      v-model="selectedValue"
      :items="items"
      initial-text="1"
      :initial-value="1"
      binding-text="text"
      binding-value="value"
    >
      <template v-slot:nodata>
        <span>No data available</span>
      </template>
    </typeahead-autocomplete>
  </div>
</template>
