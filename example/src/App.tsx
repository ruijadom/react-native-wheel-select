import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Wheel } from 'react-native-wheel-select';

const generateRandomString = (length: number = 8) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array(length)
    .fill(null)
    .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
    .join('');
};

const data: string[] = Array(100)
  .fill(null)
  .map(() => generateRandomString());

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    console.log(selectedIndex);
  }, [selectedIndex]);

  return (
    <View style={styles.container}>
      <Wheel
        key={data.join(',')}
        options={data}
        selectedIndex={selectedIndex}
        onChange={(index: number) => {
          setSelectedIndex(index);
        }}
        itemHeight={42}
        visibleItemsCount={1}
        renderItem={(item: string) => {
          return <Text>{item}</Text>;
        }}
      />
      <View style={styles.text}>
        <Text>Index: {selectedIndex}</Text>
        <Text>Item: {data[selectedIndex]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    fontSize: 16,
  },
});
