import {WINDOW_HEIGHT} from '@constants/reusable';
import {Box, Flex, Text} from 'native-base';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {createFilter} from 'react-native-search-filter';
import {StyleSheet} from 'react-native';
import {flightDestinations} from '@src/helpers/mocks/flight_destinations';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {nativeBaseTheme} from '@constants/theme';
import {Calendar} from 'react-native-calendars';

interface PassengerSelectionProps {
  passengerSelectionState: boolean;
  onChangePassengerSelectState: (state: boolean) => void;
}

const PassengerSelection = ({
  passengerSelectionState,
  onChangePassengerSelectState,
}: PassengerSelectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const translateY = useSharedValue(WINDOW_HEIGHT);
  const prevTranslationY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const KEYS_TO_FILTERS = [
    'airportCode.iataCode',
    'country',
    'airportCode.name',
  ];

  const filteredDestinations = useMemo(() => {
    return flightDestinations.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
  }, [flightDestinations, searchTerm]);

  const searchUpdated = useCallback((term: string) => {
    setIsLoading(true);
    setSearchTerm(term);
    setIsLoading(false);
  }, []);

  const getDisabledDatesBeforeToday = useCallback(() => {
    const disabledDates: {[key: string]: {disabled: boolean}} = {};
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    for (let m = 1; m < month; m++) {
      const daysInMonth = new Date(year, m, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        const date = `${year}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`;
        disabledDates[date] = {disabled: true};
      }
    }

    for (let d = 1; d < day; d++) {
      const date = `${year}-${month < 10 ? '0' + month : month}-${
        d < 10 ? '0' + d : d
      }`;
      disabledDates[date] = {disabled: true};
    }

    return disabledDates;
  }, []);

  const gesture = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationY.value = translateY.value;
    })
    .onUpdate(event => {
      const clampedTranslationY = Math.min(
        Math.max(
          prevTranslationY.value + event.translationY,
          WINDOW_HEIGHT * 0.4,
        ),
        WINDOW_HEIGHT,
      );
      translateY.value = clampedTranslationY;
    })
    .onEnd(() => {
      if (translateY.value > WINDOW_HEIGHT * 0.5) {
        translateY.value = withTiming(
          WINDOW_HEIGHT,
          {
            duration: 200,
            easing: Easing.linear,
          },
          () => {
            runOnJS(onChangePassengerSelectState)(false);
          },
        );
      } else {
        translateY.value = withTiming(WINDOW_HEIGHT * 0.4, {
          duration: 200,
          easing: Easing.linear,
        });
      }
    });

  useEffect(() => {
    if (passengerSelectionState) {
      translateY.value = withTiming(WINDOW_HEIGHT * 0.4, {duration: 300});
    }
  }, [passengerSelectionState]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Flex flex={1}>
        <GestureDetector {...{gesture}}>
          <Flex
            py="10px"
            w="100%"
            bg="white"
            alignItems="center"
            justifyContent="center">
            <Box h="1" w="20%" bg="secondary.1" borderRadius="10px" />
          </Flex>
        </GestureDetector>
        <Box px="27px" mt="20px">
          <Box pb="20px" borderBottomWidth="1" borderBottomColor="secondary.1">
            <Text
              color="primary.1"
              fontSize={{base: '12px'}}
              fontFamily="Spartan-Regular">
              Select the number of passengers
            </Text>
          </Box>
          <Box mt={{base: '12px'}}></Box>
        </Box>
      </Flex>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    height: WINDOW_HEIGHT * 0.6,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default PassengerSelection;
