import {WINDOW_HEIGHT, WINDOW_WIDTH, isMobile} from '@constants/reusable';
import {Box, Flex, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import FeatureContent from './contentViews/FeatureContent';
import Animated from 'react-native-reanimated';
import FeatureContentBackground from './contentViews/FeatureContentBackground';
import {GradientText} from './TravelReimaginedScreen';
import {useDeviceType} from '@src/components/hooks';

interface FeaturesScreenProps {
  metadata: any;
  detail: string;
  title: string;
}

function FeaturesScreen({metadata, title, detail}: FeaturesScreenProps) {
  const deviceType = useDeviceType();

  return (
    <Animated.View style={{flex: 1}}>
      <Flex flex={1}>
        <View style={styles.backView}>
          <FeatureContentBackground />
        </View>
        <Flex
          style={[
            styles.overlay,
            {
              height: WINDOW_HEIGHT,
              justifyContent: 'flex-start',
            },
          ]}
          padding={{md: '65px', base: '27px'}}>
          <FeatureContent {...{title, detail, metadata}} />

          <Box w="full" mt={!isMobile ? 42 : 30}>
            <Box>
              <GradientText
                style={{
                  fontFamily: 'Spartan-Regular',
                  fontWeight: 'bold',
                  fontSize: deviceType === 'mobile' ? 28 : 48,
                  lineHeight: deviceType === 'mobile' ? 30 : 55,
                  textTransform: 'uppercase',
                }}>
                {title}
              </GradientText>
            </Box>

            <Box
              width={deviceType === 'tablet' ? WINDOW_WIDTH * 0.63 : '100%'}
              mt={'11px'}>
              <Text
                fontFamily={'Poppins-Regular'}
                fontSize={{base: '12.5px', md: '16px'}}
                lineHeight={{md: '32px', base: '24px'}}
                color={'secondary.1'}
                fontWeight={'400'}>
                {detail}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backView: {
    flex: 1,
    backgroundColor: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeaturesScreen;
