import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import jp from "jsonpath";
const customData = require("../constant/formulas.json");
export default function Index({ selcategory, getCategory }) {
  const getCategoryList = () => {
    const tempcategories = jp.query(customData, "$.Category")[0];
    const tempdata = Object.keys(tempcategories);
    return tempdata;
  };
  const [categoryList, setCategoryList] = useState(getCategoryList());
  const [category, setCategory] = useState("");
  const changeCategory = (e) => {
    setCategory(e);
    getCategory(e);
  };
  useEffect(() => {
    setCategory(selcategory);
  }, [selcategory]);
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 5,
          color: "#3333ff",
        }}
      >
        Category
      </Text>
      <View style={styles.radiogroup}>
        {categoryList &&
          categoryList.map((e, index) => {
            return (
              <View key={index} style={styles.item}>
                <RadioButton
                  value={e}
                  status={category === e ? "checked" : "unchecked"}
                  onPress={() => changeCategory(e)}
                  color="#0000ff"
                />
                <Text style={styles.radioText}>{e}</Text>
              </View>
            );
          })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: "white",
    padding: 7,
    borderRadius: 7,
  },
  radiogroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    fontSize: 18,
  },
});
