import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
export default function Index({ onChangeFunction }) {
  const functions = ["Sum", "Substract", "Multiply", "Divide"];
  return (
    <View style={styles.funcDropdown}>
      <Text style={{ fontSize: 14, fontWeight: "700", marginBottom: 5 }}>
        Function Name
      </Text>
      <SelectDropdown
        data={functions}
        defaultValueByIndex={1}
        defaultValue={"Sum"}
        onSelect={(selectedItem, index) => {
          onChangeFunction(selectedItem);
        }}
        defaultButtonText={"Sum"}
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
              size={18}
            />
          );
        }}
        dropdownIconPosition={"right"}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  funcDropdown: {
    marginBottom: 10,
  },
  dropdown1BtnStyle: {
    width: "50%",
    height: 35,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left", fontSize: 14 },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left", fontSize: 14 },
});
