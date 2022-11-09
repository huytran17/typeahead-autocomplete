# typeahead-autocomplete

# Description

This package is available for VueJS 2x

## [View The Examples](https://codesandbox.io/s/vue-2-playground-forked-wqy5nf?file=/src/App.vue)

![image](https://user-images.githubusercontent.com/68387887/200896104-8fae132e-393c-4027-8faa-05845af5bd83.png)
![image](https://user-images.githubusercontent.com/68387887/200896417-baaafec6-8bab-4b9d-9db4-ce469edafcd5.png)

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
  Vue.use(TypeaheadAutocomplete);
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

```html
<typeahead-autocomplete
  v-model="selectedValue"
  :items="[
    { 
      text: 'ABC', 
      value: 'abc' 
    }, 
    { 
      text: 'DEF', 
      value: 'def' 
    }, 
    { 
      text: 'GHI', 
      value: 'ghi' 
    }
  ]"
/>
```

### Attributes

| Name           | Type               | Default | Description                                                                                       |
| -------------- | ------------------ | ------- | ------------------------------------------------------------------------------------------------- |
| items          | `Array`            | `[]`    | Array of data.                                                                                    |
| initialText    | `String`           | `text`  | The displayed text at first.                                                                      |
| initialValue   | `String`, `Number` | `value` | The selected value at first.                                                                      |
| bindingText    | `String`           | `text`  | Path to the property used to display the text.                                                    |
| bindingValue   | `String`           | `value` | Path to the property used to return the value.                                                    |
| prependText    | `String`           |         | Text used to add at the beginning of the item.                                                    |
| appendText     | `String`           |         | Text used to add at the end of the item.                                                          |
| disableSearch  | `Boolean`          | `false` | Turn off the search function on the input field.                                                  |
| disableInput   | `Boolean`          | `false` | Disable input.                                                                                    |
| placeholder    | `String`           |         | Placeholder for input field.                                                                      |
| inputClass     | `String`           |         | Custom classes for input field.                                                                   |
| readOnly       | `Boolean`          | `false` | Set read-only for input field.                                                                    |
| showNoData     | `Boolean`          | `true`  | Option to show text or not when no data is found.                                                 |
| remoteMode     | `Boolean`          | `false` | Switch to load data through API.                                                                  |
| remoteUrl      | `String`           |         | Data request URL (Only works when `remoteMode` is **enabled**.                                    |
| requestTimeout | `Number`           | `10000` | Maximum time for API to request data (milliseconds) (Only works when `remoteMode` is **enabled**. |

### Events

| Name     | Description                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| `change` | Triggered when an autocomplete item is selected. The entry in the input `data` array that was selected is returned. |
| `input`  | Triggered when typing on search box. The typed data is returned.                                                    |
| `hit`    | The component can be used with `v-model`. The `bindingValue` of the entry in the input `data` will be returned      |
| `fetch`  | Return all data from API after successfully fetched.                                                                |

### Slots

`prepend` and `append` slots available for adding buttons or other markup.
`nodata` available for customizing the text when no data is found.

## Contributing

PR's are welcome!
