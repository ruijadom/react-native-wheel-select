# react-native-wheel-select

A customizable wheel selector component for React Native.

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
  visibleRest={1}
  renderItem={(item: Item) => {
    return <Text>{item?.value}</Text>;
  }}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
