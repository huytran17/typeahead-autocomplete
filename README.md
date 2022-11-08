# typeahead-autocomplete

## Installation

From NPM:

```
> npm i typeahead-autocomplete
```

## Browser

```html
<script
  type="text/javascript"
  src="node_modules/vuejs/dist/vue.min.js"
></script>
<script
  type="text/javascript"
  src="node_modules/typeahead-autocomplete/dist/typeahead-autocomplete.min.js"
></script>
<script type="text/javascript">
  Vue.use(Dropdown);
</script>
```

## Usage

Import and register the component

```javascript
import TypeaheadAutocomplete from "typeahead-autocomplete";

// Global registration
Vue.component("typeahead-autocomplete", TypeaheadAutocomplete);

// OR

// Local registration
export default {
  components: {
    TypeaheadAutocomplete,
  },
};
```

### Basic Usage

The only required attribute is a `items` array.

```html
<typeahead-autocomplete
  v-model="selectedValue"
  :items="[{ text: 'ABC', value: 'abc' }, { text: 'DEF', value: 'def' }, { text: 'GHI', value: 'ghi' }]"
/>
```

### Attributes

| Name          | Type               | Default | Description                                       |
| ------------- | ------------------ | ------- | ------------------------------------------------- |
| items         | `Array`            |         | Array of data. **Required**                       |
| initialText   | `String`           | `text`  | The displayed text at first.                      |
| initialValue  | `String`, `Number` | `value  | The selected value at first.                      |
| bindingText   | `String`           | `text`  | Path to the property used to display the text.    |
| bindingValue  | `String`           | `value` | Path to the property used to return the value.    |
| prependText   | `String`           |         | Text used to add at the beginning of the item.    |
| appendText    | `String`           |         | Text used to add at the end of the item.          |
| disableSearch | `Boolean`          | `false` | Turn off the search function on the input field.  |
| disableInput  | `Boolean`          | `false` | Disable input.                                    |
| placeholder   | `String`           |         | Placeholder for input field.                      |
| inputClass    | `String`           |         | Custom classes for input field.                   |
| readOnly      | `Boolean`          | `false` | set read-only for input field.                    |
| showNoData    | `Boolean`          | `true`  | Option to show text or not when no data is found. |

### Events

| Name     | Description                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| `change` | Triggered when an autocomplete item is selected. The entry in the input `data` array that was selected is returned. |
| `input`  | Triggered when typing on search box. The typed data is returned.                                                    |
| `hit`    | The component can be used with `v-model`. The value of the entry in the input `data` will be returned               |

### Slots

There is `nodata` slot available for customizing the text when no data is found.

## Contributing

PR's are welcome!
