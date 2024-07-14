import {
  Animated,
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  View,
} from 'react-native';
import type { WheelPickerProps } from './index.types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import WheelPickerItem from '../wheel-item';
import styles from './index.styles';

export const WheelPicker = ({
  computeRotation = (x: number) => 1 - Math.pow(1 / 2, x),
  computeScale = (x: number) => 1.0 ** x,
  containerProps = {},
  containerStyle = {},
  decelerationRate = 'fast',
  flatListProps = {},
  itemHeight = 40,
  itemStyle = {},
  onChange,
  opacityFunction = (x: number) => Math.pow(1 / 3, x),
  options,
  renderItem,
  selectedIndex,
  selectedIndicatorStyle = {},
  visibleRest = 2,
}: WheelPickerProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [scrollY] = useState(new Animated.Value(0));

  const containerHeight = useMemo(
    () => (1 + visibleRest * 2) * itemHeight,
    [visibleRest, itemHeight]
  );
  const customOptions = useMemo(() => {
    const array: (any | null)[] = [...options];
    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleRest]);

  const offsets = useMemo(
    () => customOptions.map((_, i) => i * itemHeight),
    [customOptions, itemHeight]
  );

  const currentScrollIndex = useMemo(
    () => Animated.add(Animated.divide(scrollY, itemHeight), visibleRest),
    [visibleRest, scrollY, itemHeight]
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = Math.min(
        itemHeight * (options.length - 1),
        Math.max(event.nativeEvent.contentOffset.y, 0)
      );

      let index = Math.floor(offsetY / itemHeight);
      const last = offsetY % itemHeight;
      if (last > itemHeight / 2) index++;

      if (index !== selectedIndex) {
        onChange(index);
      }
    },
    [itemHeight, options.length, selectedIndex, onChange]
  );

  useEffect(() => {
    if (selectedIndex < 0 || selectedIndex >= options.length) {
      throw new Error(
        `Selected index ${selectedIndex} is out of bounds [0, ${options.length - 1}]`
      );
    }
  }, [selectedIndex, options]);

  return (
    <View
      style={[styles.container, { height: containerHeight }, containerStyle]}
      {...containerProps}
    >
      <View
        style={[
          styles.selectedIndicator,
          selectedIndicatorStyle,
          {
            transform: [{ translateY: -itemHeight / 2 }],
            height: itemHeight,
          },
        ]}
      />
      <FlatList<string | null>
        {...flatListProps}
        ref={flatListRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const { y } = event.nativeEvent.contentOffset;
          scrollY.setValue(y);
        }}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={decelerationRate}
        onLayout={() => {
          flatListRef.current?.scrollToIndex({
            index: selectedIndex,
            animated: false,
          });
        }}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        data={customOptions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ index, item: option }) => (
          <WheelPickerItem
            key={`option-${index}`}
            index={index}
            style={itemStyle}
            height={itemHeight}
            currentScrollIndex={currentScrollIndex}
            computeRotation={computeRotation}
            computeScale={computeScale}
            opacityFunction={opacityFunction}
            visibleRest={visibleRest}
          >
            {renderItem(option, index)}
          </WheelPickerItem>
        )}
      />
    </View>
  );
};

export default React.memo(WheelPicker);
