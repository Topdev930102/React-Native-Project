import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import customData from '../constant/formulas.json';
import Web3 from 'web3';
import jp from 'jsonpath';
const web3 = new Web3(new Web3.providers.HttpProvider("https://matic-mumbai.chainstacklabs.com"));
import contract_abi from "../constant/abi";
import contract_address from "../constant/contract_address";
const NameContract = new web3.eth.Contract(contract_abi, contract_address);
import { useStore } from "../redux/actions";
export default function Index({ functions, funcName, onChangeFunction, category }) {
  const theme = useStore(state => state.theme);
  let function_temp = [];
  if (category != 'Custom') {
    const tempObj = jp.query(customData, `$.Category.${category}`)[0];
    for (let i = 0; i < tempObj.length; i++) {
      function_temp.push(tempObj[i].name)
    }
  }
  const [functionList, setFunctionList] = useState([]);
  const [functionName, setFunctionName] = useState("");
  useEffect(() => {
    setFunctionName(funcName);
  }, [funcName]);
  useEffect(() => {
    if (category != 'Custom') {
      setFunctionList(function_temp);
    }
    else {
      if (functions) {
        let temp_function_list = [];
        functions.forEach((element, index) => {
          temp_function_list.push(element.function_name);
        })
        setFunctionList(temp_function_list);
      }
    }
  }, [category]);
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
        Function Name
      </Text>
      {functionList && (
        <SelectDropdown
          statusBarTranslucent={false}
          data={functionList}
          disableAutoScroll={false}
          defaultValue={functionList[0]}
          onSelect={(selectedItem, index) => {
            onChangeFunction(selectedItem, index);
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
    width: "50%",
    alignItems: "center",
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
