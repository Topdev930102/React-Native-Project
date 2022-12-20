import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
export default function Index({ data, index, subIndex, getData }) {
  const standard_temp = ["Const", "Number", "String"];
  const [paramList, setParamList] = useState(standard_temp);
  const [paramName, setParamName] = useState("Const");
  const onChangeParameter = (item) => {
    getData(item, index, subIndex);
  }
  return (
    <View style={styles.funcDropdown}>
      {paramList && (
        <SelectDropdown
          statusBarTranslucent={false}
          data={paramList}
          disableAutoScroll={false}
          defaultValue={paramName}
          onSelect={(selectedItem, index) => {
            onChangeParameter(selectedItem);
          }}
          defaultButtonText={paramName}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={11}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  funcDropdown: {
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
    marginTop: 3
  },
  dropdown1BtnStyle: {
    width: "90%",
    height: 25,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left", fontSize: 13 },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left", fontSize: 13 },
});
