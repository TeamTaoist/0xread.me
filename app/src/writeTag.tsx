/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

const styles = StyleSheet.create({
  btn: {},
  btnScan: {},
});

function WriteTag(): JSX.Element {
  const [writeResult, setWriteResult] = useState('waiting to write');
  const writeNFC = async () => {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord('hi, nfc')]);
      console.log('bytes', bytes);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.error('error', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    setWriteResult(result ? 'waiting success' : 'waiting fail');

    return result;
  };
  return (
    <>
      <TouchableOpacity style={[styles.btn, styles.btnScan]} onPress={writeNFC}>
        <Text>Write Tag</Text>
      </TouchableOpacity>

      <Text>{writeResult}</Text>
    </>
  );
}

export default WriteTag;
