import React, { useState } from 'react';
import { View, Image, Text, Button } from 'react-native';

const Test = ({ imagePath = "../assets/profile/frog.png" }) => {
  return (
    <View>
      {imagePath ? (
        <View>
          <Image source={{ uri: imagePath }} style={{ width: 200, height: 200 }} />
          <Text>Image Path: {imagePath}</Text>
        </View>
      ) : (
        <Text>No image path provided</Text>
      )}
    </View>
  );
};

export default Test;
