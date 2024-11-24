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
  containerProps?: Omit<ViewProps, 'style'>;
  containerStyle?: ViewStyle;
  itemHeight?: number;
  itemSelectedStyle?: StyleProp<ViewStyle>;
  listProps?: CustomListProps;
  onChange: (index: number) => void;
  options: any[];
  renderItem: (option: any, index: number) => React.ReactElement | null;
  selectedIndex: number;
  visibleItemsCount?: number;
}
