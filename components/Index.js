import { Text, View } from "react-native";
import { Button, Alert } from "react-native";
import React, { useState, useEffect, useRef } from "react";
export default function Index(props) {
  const [value, setValue] = useState("");
  const [name, setName] = useState("Jobhn");
  const handleClick = () => {
  };
  useEffect(() => {
    setValue(props.title1);
  }, []);

  return (
    <View>
      <Text>{value}</Text>
      <Text>{name}</Text>
      <Button title="eee" onPress={(e) => handleClick()}></Button>
    </View>
  );
}
