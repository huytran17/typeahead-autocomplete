<script>
import Vue from "vue";
// Uncomment import and local "components" registration if library is not registered globally.
import { TypeaheadAutocomplete } from "@/entry.esm";

export default Vue.extend({
  name: "ServeDev",
  components: {
    TypeaheadAutocomplete,
  },
  data() {
    return {
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
    <typeahead-autocomplete :items="items" />
  </div>
</template>
