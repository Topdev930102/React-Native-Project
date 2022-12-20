import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";

import Web3 from 'web3';
const web3 = new Web3(new Web3.providers.HttpProvider("https://matic-mumbai.chainstacklabs.com"));
import contract_abi from "../constant/abi";
import contract_address from "../constant/contract_address";

const NameContract = new web3.eth.Contract(contract_abi, contract_address);
export default function Index({ funcName, onChangeFunction, category }) {
  const math_temp = ["Sum", "Subtract", "Multiply", "Divide", "Pow"];
  const text_temp = ["Len", "Upper", "Trim"];
  const array_temp = ["MaxInArray", "MinInArray", "Sort"];
  const logistics_temp = ["Contains", "Exactly matches", "Greater than", "Less than"];
  const stastics_temp = ["Average", "Max", "Min"];
  let custom_temp = [];
  const [functionList, setFunctionList] = useState([]);
  const [functionName, setFunctionName] = useState("");
  useEffect(() => {
    setFunctionName(funcName);
  }, [funcName]);
  useEffect(() => {
    switch (category) {
      case "Math":
        setFunctionList(math_temp);
        break;
      case "Text":
        setFunctionList(text_temp);
        break;
      case "Array":
        setFunctionList(array_temp);
        break;
      case "Logistics":
        setFunctionList(logistics_temp);
        break;
      case "Statistic":
        setFunctionList(stastics_temp);
        break;
      case "Custom":
        NameContract.methods.getFormula().call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          custom_temp = res['1'].map((data) => {
            return data[0]
          })
          setFunctionList(custom_temp);
          setFunctionName(custom_temp[0])
        })
        break;
    }
  }, [category]);
  return (
    <View style={styles.funcDropdown}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 5,
          color: "#3333ff",
        }}
      >
      </Text>
      {functionList && (
        <SelectDropdown
          statusBarTranslucent={false}
          data={functionList}
          disableAutoScroll={false}
          defaultValue={functionName}
          onSelect={(selectedItem, index) => {
            onChangeFunction(selectedItem);
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
    marginLeft: "-10%",
    width: "50%",
    marginBottom: 30,
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
