/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

const styles = StyleSheet.create({
  btn: {},
  btnScan: {},
});

function ReadTag(): JSX.Element {
  const [tagContent, setTagContent] = useState('');
  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
      console.log('tag found:', tag);
      setTagContent(JSON.stringify(tag));
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  const readTag = async () => {
    await NfcManager.registerTagEvent();
  };
  const cancelReadTag = async () => {
    NfcManager.unregisterTagEvent();
    setTagContent('');
  };
  return (
    <>
      <TouchableOpacity style={[styles.btn, styles.btnScan]} onPress={readTag}>
        <Text>Scan Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cancelReadTag}>
        <Text>Cancel Scan</Text>
      </TouchableOpacity>
      <Text>{tagContent}</Text>
    </>
  );
}

export default ReadTag;
