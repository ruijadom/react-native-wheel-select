import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WheelPicker } from 'react-native-wheel-select';

interface Item {
  value: number;
  label: string;
}

const data = [...Array(100).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}));

export default function App() {
  const [selected, setSelected] = useState(data[0]?.value || 0);

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
