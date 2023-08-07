/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import NfcManager from 'react-native-nfc-manager';
// import ReadTag from './src/readTag';
// import WriteTag from './src/writeTag';
import HceCard from './src/hce';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [hasNfc, setHasNFC] = useState<boolean>(false);
  console.log('hasNfc', hasNfc);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const generateProof = () => {
    // TODO
  };

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();

      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Button title="generate" onPress={generateProof} />
        {/* <View>support NFC : {hasNfc ? 'yes' : 'no'}</View> */}
      </ScrollView>
      {/* {hasNfc && (
        <>
          <ReadTag />
          <WriteTag />
        </>
      )} */}
      <HceCard />
    </SafeAreaView>
  );
}

export default App;
