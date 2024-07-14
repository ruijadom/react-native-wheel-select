# react-native-wheel-select

A highly customizable and user-friendly wheel selector component for React Native, designed to provide a seamless and intuitive selection experience. Perfect for forms, settings, and any interface requiring a stylish and efficient picker.

## Installation

```sh
npm install react-native-wheel-select
```

## Usage

```js
import { WheelPicker } from 'react-native-wheel-select';

// ...

<WheelPicker
  key={data.join(',')}
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

The `WheelPicker` component accepts the following props:

- **computeOpacity**: Function to determine the opacity of items. Default is `(x: number) => Math.pow(1 / 3, x)`.
- **computeRotation**: Function to determine the rotation of items. Default is `(x: number) => 1 - Math.pow(1 / 2, x)`.
- **computeScale**: Function to determine the scale of items. Default is `(x: number) => 1.0 ** x`.
- **containerProps**: Additional props for the container. Default is `{}`.
- **containerStyle**: Style for the container. Default is `{}`.
- **itemHeight**: Height of each item in the wheel. Default is `40`.
- **itemSelectedStyle**: Style for the selected indicator. Default is `{}`.
- **itemStyle**: Style for each item. Default is `{}`.
- **listProps**: Additional props for the FlatList. Default is `{}`.
- **onChange**: Callback function called when the selected item changes.
- **options**: Array of options to be displayed in the wheel.
- **renderItem**: Function to render each item.
- **scrollDecelerationRate**: The rate at which the wheel decelerates. Default is `'fast'`.
- **selectedIndex**: Index of the selected item.
- **visibleItemsCount**: Number of items visible on either side of the selected item. Default is `2`.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
