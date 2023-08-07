/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Text, Button} from 'react-native';

import {HceTools} from 'react-native-nfc-sdk';

function HceCard(): JSX.Element {
  const hce = new HceTools();
  const [isTagRead, setIsTagRead] = useState('No');

  const emulate = () => {
    // The start emulation function receives a content, which
    // corresponds to a NFC tag payload, and a writable boolean,
    // which will define if the NFC card you emulate can be written
    // The second parameter is a callback which will be called once
    // your emulated tag is read
    hce.startEmulation({content: 'Hello World!', writable: false}, () => {
      setIsTagRead('Yes!');
      setTimeout(() => setIsTagRead('No'), 5000);
    });
  };

  return (
    <>
      <Button onPress={emulate} title="EMULATE NFC TAG" />
      <Text>Was the tag read? {isTagRead}</Text>
    </>
  );
}

export default HceCard;
