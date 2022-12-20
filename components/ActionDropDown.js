import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { useStore } from "../redux/actions";
export default function Index({ onChangeAction, action }) {
  const theme = useStore(state => state.theme);
  const standard_temp = ["Add", "Browse", "Change", "Delete"];
  const [functionList, setFunctionList] = useState([]);
  const [functionName, setFunctionName] = useState("Add");
  useEffect(() => {
    setFunctionList(standard_temp);
    setFunctionName(action);
  }, []);
  return (
    <View style={styles.funcDropdown}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 25,
          color: theme === 'light' ? "#3333ff" : 'white',
        }}
      >
        Actions
      </Text>
      {functionList && (
        <SelectDropdown
          statusBarTranslucent={false}
          data={functionList}
          disableAutoScroll={false}
          defaultValue={functionName}
          onSelect={(selectedItem, index) => {
            onChangeAction(selectedItem);
          }}
          defaultButtonText={functionName}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  funcDropdown: {
    alignItems: "center",
    marginBottom: 30,
    width: "70%",
  },
  dropdown1BtnStyle: {
    width: "90%",
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});
