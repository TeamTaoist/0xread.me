/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {
  HCESession,
  NFCTagType4NDEFContentType,
  NFCTagType4,
} from 'react-native-hce';

const styles = StyleSheet.create({
  btn: {},
  btnScan: {},
});

function HceCard(): JSX.Element {
  const [card, setCard] = useState<HCESession>();

  const startSession = async () => {
    const tag = new NFCTagType4({
      type: NFCTagType4NDEFContentType.Text,
      content: 'Hello world',
      writable: false,
    });

    console.log('tag', tag.content);

    try {
      console.log(' HCESession.getInstance:', HCESession.getInstance);
      const session = await HCESession.getInstance();
      session.setApplication(tag);
      await session.setEnabled(true);
      setCard(session);
      console.log('success', session.application?.content);
    } catch (error) {
      console.error('failed: ', error);
    }
  };

  const stopSession = async () => {
    if (!card) {
      return;
    }
    await card.setEnabled(false);
  };
  return (
    <>
      <TouchableOpacity onPress={startSession}>
        <Text>emulate card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.btnScan]}
        onPress={stopSession}>
        <Text>remove card</Text>
      </TouchableOpacity>
    </>
  );
}

export default HceCard;
