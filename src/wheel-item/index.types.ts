import { Animated, type StyleProp, type ViewStyle } from 'react-native';

export interface ItemProps {
  style: StyleProp<ViewStyle>;
  height: number;
  index: number;
  currentScrollIndex: Animated.AnimatedAddition<number>;
  visibleItemsCount: number;
  computeRotation: (x: number) => number;
  computeOpacity: (x: number) => number;
  computeScale: (x: number) => number;
  children: React.ReactElement | null;
}
