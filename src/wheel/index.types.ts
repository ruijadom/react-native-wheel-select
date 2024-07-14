import type {
  FlatListProps,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';

export interface WheelPickerProps {
  computeRotation?: (x: number) => number;
  computeScale?: (x: number) => number;
  containerProps?: Omit<ViewProps, 'style'>;
  containerStyle?: ViewStyle;
  decelerationRate?: 'normal' | 'fast' | number;
  flatListProps?: Omit<FlatListProps<string | null>, 'data' | 'renderItem'>;
  itemHeight?: number;
  itemStyle?: ViewStyle;
  onChange: (index: number) => void;
  opacityFunction?: (x: number) => number;
  options: any[];
  renderItem: (option: any, index: number) => React.ReactElement | null;
  selectedIndex: number;
  selectedIndicatorStyle?: StyleProp<ViewStyle>;
  visibleRest?: number;
}
