import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { useStore } from '../redux/actions'
export default function Index({ onChangeCategory, library, category }) {
  const theme = useStore(state => state.theme);
  const standard_temp = ["Math", "Text", "Array", "Logistics", "Statistic"];
  const project_temp = ["Custom"];
  const [functionList, setFunctionList] = useState([]);
  const [functionName, setFunctionName] = useState("");
  useEffect(() => {
    switch (library) {
      case "Standard":
        setFunctionList(standard_temp);
        setFunctionName(standard_temp[0]);
        break;
      case "Project":
        setFunctionList(project_temp);
        setFunctionName(project_temp[0]);
        break;
    }
  }, [library]);
  useEffect(() => {
    setFunctionName(category);
  }, [category])
  return (
    <View style={styles.funcDropdown}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 5,
          color: theme === 'light' ? "#3333ff" : 'white',
        }}
      >
        Category
      </Text>
      {functionList && (
        <SelectDropdown
          statusBarTranslucent={false}
          data={functionList}
          disableAutoScroll={false}
          defaultValue={functionName}
          onSelect={(selectedItem, index) => {
            onChangeCategory(selectedItem);
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
    width: "50%",
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
