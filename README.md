# react-native-wheel-select

A highly customizable and user-friendly wheel selector component for React Native, designed to provide a seamless and intuitive selection experience. Perfect for forms, settings, and any interface requiring a stylish and efficient picker.

## Installation

```sh
npm install react-native-wheel-select
```

## Usage

```js
import { Wheel } from 'react-native-wheel-select';

const data = [...Array(100).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}));

const [selected, setSelected] = useState(data[0]?.value || 0);

<Wheel
  options={data}
  selectedIndex={selected}
  onChange={(value: React.SetStateAction<number>) => setSelected(value)}
  itemHeight={42}
  visibleItemsCount={1}
  renderItem={(item: Item) => {
    return <Text>{item?.value}</Text>;
  }}
/>
```

## Props

The `Wheel` component accepts the following props:

- **computeOpacity**: Function to determine the opacity of items.
- **computeRotation**: Function to determine the rotation of items.
- **computeScale**: Function to determine the scale of items.
- **containerProps**: Additional props for the container.
- **containerStyle**: Style for the container.
- **itemHeight**: Height of each item in the wheel.
- **itemSelectedStyle**: Style for the selected indicator.
- **itemStyle**: Style for each item.
- **listProps**: Additional props for the FlatList.
- **onChange**: Callback function called when the selected item changes.
- **options**: Array of options to be displayed in the wheel.
- **renderItem**: Function to render each item.
- **scrollDecelerationRate**: The rate at which the wheel decelerates.
- **selectedIndex**: Index of the selected item.
- **visibleItemsCount**: Number of items visible on either side of the selected item.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
