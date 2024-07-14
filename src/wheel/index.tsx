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
import WheelItem from '../wheel-item';
import styles from './index.styles';

const computeFunctions = {
  computeOpacity: (x: number) => Math.pow(1 / 3, x),
  computeRotation: (x: number) => 1 - Math.pow(1 / 2, x),
  computeScale: (x: number) => 1.0 ** x,
};

export const Wheel = ({
  computeOpacity = computeFunctions.computeOpacity,
  computeRotation = computeFunctions.computeRotation,
  computeScale = computeFunctions.computeScale,
  containerProps = {},
  containerStyle = {},
  itemHeight = 40,
  itemSelectedStyle = {},
  itemStyle = {},
  listProps = {},
  onChange,
  options,
  renderItem,
  scrollDecelerationRate = 'fast',
  selectedIndex,
  visibleItemsCount = 2,
}: WheelPickerProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [scrollY] = useState(new Animated.Value(0));

  const containerHeight = useMemo(
    () => (1 + visibleItemsCount * 2) * itemHeight,
    [visibleItemsCount, itemHeight]
  );
  const customOptions = useMemo(() => {
    const array: (any | null)[] = [...options];
    for (let i = 0; i < visibleItemsCount; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleItemsCount]);

  const offsets = useMemo(
    () => customOptions.map((_, i) => i * itemHeight),
    [customOptions, itemHeight]
  );

  const currentScrollIndex = useMemo(
    () => Animated.add(Animated.divide(scrollY, itemHeight), visibleItemsCount),
    [visibleItemsCount, scrollY, itemHeight]
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
          itemSelectedStyle,
          {
            transform: [{ translateY: -itemHeight / 2 }],
            height: itemHeight,
          },
        ]}
      />
      <FlatList<string | null>
        {...listProps}
        ref={flatListRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const { y } = event.nativeEvent.contentOffset;
          scrollY.setValue(y);
        }}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={scrollDecelerationRate}
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
          <WheelItem
            key={`option-${index}`}
            index={index}
            style={itemStyle}
            height={itemHeight}
            currentScrollIndex={currentScrollIndex}
            computeRotation={computeRotation}
            computeScale={computeScale}
            computeOpacity={computeOpacity}
            visibleItemsCount={visibleItemsCount}
          >
            {renderItem(option, index)}
          </WheelItem>
        )}
      />
    </View>
  );
};

export default React.memo(Wheel);
