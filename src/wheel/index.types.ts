import type {
  FlatListProps,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';

type CustomListProps = Omit<
  FlatListProps<string | null>,
  'data' | 'renderItem'
>;

export interface WheelPickerProps {
  computeOpacity?: (x: number) => number;
  computeRotation?: (x: number) => number;
  computeScale?: (x: number) => number;
  containerProps?: Omit<ViewProps, 'style'>;
  containerStyle?: ViewStyle;
  itemHeight?: number;
  itemSelectedStyle?: StyleProp<ViewStyle>;
  itemStyle?: ViewStyle;
  listProps?: CustomListProps;
  onChange: (index: number) => void;
  options: any[];
  renderItem: (option: any, index: number) => React.ReactElement | null;
  scrollDecelerationRate?: 'normal' | 'fast' | number;
  selectedIndex: number;
  visibleItemsCount?: number;
}
