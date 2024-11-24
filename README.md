# react-native-wheel-select

A highly customizable and user-friendly wheel selector component for React Native, designed to provide a seamless and intuitive selection experience. Perfect for forms, settings, and any interface requiring a stylish and efficient picker.

## Installation

```sh
npm install react-native-wheel-select
```

## Usage

```tsx
import { Wheel } from 'react-native-wheel-select';

const data = [...Array(100).keys()].map((index) => index.toString());

const [selected, setSelected] = useState(0);

<Wheel
  options={data}
  selectedIndex={selected}
  onChange={(index: number) => setSelected(index)}
  itemHeight={42}
  visibleItemsCount={1}
  renderItem={(item, index) => {
    return <Text>{item}</Text>;
  }}
/>;
```

Here is an example of how the `Wheel` component works:

![Wheel Component Example](./resources/lib-example.gif)

## Props

The `Wheel` component accepts the following props:

- **options**: Array of options to be displayed in the wheel.
- **selectedIndex**: Index of the selected item.
- **onChange**: Callback function that receives the selected index when it changes.
- **renderItem**: Function to render each item, receives the option and index as parameters.
- **itemHeight**: Height of each item in the wheel (optional).
- **visibleItemsCount**: Number of items visible on either side of the selected item (optional).
- **containerProps**: Additional props for the container (excluding style).
- **containerStyle**: Style object for the container.
- **itemSelectedStyle**: Style for the selected item indicator.
- **listProps**: Additional props for the underlying FlatList (excluding data and renderItem).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
