import { Animated } from 'react-native';
import type { ItemProps } from './index.types';
import { memo } from 'react';
import styles from './index.styles';

const WheelPickerItem = ({
  children,
  currentScrollIndex,
  height,
  index,
  computeOpacity,
  computeRotation,
  computeScale,
  style,
  visibleItemsCount,
}: ItemProps) => {
  const relativeScrollIndex = Animated.subtract(index, currentScrollIndex);

  const translateY = relativeScrollIndex.interpolate({
    inputRange: (() => {
      const range = [0];
      for (let i = 1; i <= visibleItemsCount + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }
      return range;
    })(),
    outputRange: (() => {
      const range = [0];
      for (let i = 1; i <= visibleItemsCount + 1; i++) {
        let y = (height / 2) * (1 - Math.sin(Math.PI / 2 - computeRotation(i)));
        for (let j = 1; j < i; j++) {
          y += height * (1 - Math.sin(Math.PI / 2 - computeRotation(j)));
        }
        range.unshift(y);
        range.push(-y);
      }
      return range;
    })(),
  });

  const opacity = relativeScrollIndex.interpolate({
    inputRange: (() => {
      const range = [0];
      for (let i = 1; i <= visibleItemsCount + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }
      return range;
    })(),
    outputRange: (() => {
      const range = [1];
      for (let x = 1; x <= visibleItemsCount + 1; x++) {
        const y = computeOpacity(x);
        range.unshift(y);
        range.push(y);
      }
      return range;
    })(),
  });

  const scale = relativeScrollIndex.interpolate({
    inputRange: (() => {
      const range = [0];
      for (let i = 1; i <= visibleItemsCount + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }
      return range;
    })(),
    outputRange: (() => {
      const range = [1.0];
      for (let x = 1; x <= visibleItemsCount + 1; x++) {
        const y = computeScale(x);
        range.unshift(y);
        range.push(y);
      }
      return range;
    })(),
  });

  const rotateX = relativeScrollIndex.interpolate({
    inputRange: (() => {
      const range = [0];
      for (let i = 1; i <= visibleItemsCount + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }
      return range;
    })(),
    outputRange: (() => {
      const range = ['0deg'];
      for (let x = 1; x <= visibleItemsCount + 1; x++) {
        const y = computeRotation(x);
        range.unshift(`${y}deg`);
        range.push(`${y}deg`);
      }
      return range;
    })(),
  });

  return (
    <Animated.View
      style={[
        styles.option,
        style,
        {
          height,
          opacity,
          transform: [{ translateY }, { rotateX }, { scale }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default memo(WheelPickerItem);
