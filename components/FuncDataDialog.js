import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import SFuncDropDown from "../components/SFuncDropDown";
import SOperatorDropDown from "../components/SOperatorDropDown";
import { Button, Dialog, TextInput } from "react-native-paper";
export default function Index(props) {
  const [visible, setVisible] = useState(false);
  const [func, setFunction] = useState("Sum");
  const [number, setNumber] = useState("");
  const [operators, setOperators] = useState([

  ]);
  const [operator, setOperator] = useState("");
  const data = {
    Sum: [],
    Substract: [],
    Multiply: [],
    Divide: [],
  };
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setNumber("");
    setFunction("Sum");
    setVisible(false);
    props.onChangeFVisible(false);
  };
  const onChangeFunction = (data) => {
    setFunction(data);
  };
  const onChangeOpeator = (data) => {
    setOperator(data);
  };
  const saveDialog = () => {
    if (operators) {
      props.saveFunction(func, number, operator);
      hideDialog();
    } else {
      props.saveFunction(func, number, "");
      hideDialog();
    }
  };
  useEffect(() => {
    if (props.fvisible) {
      showDialog();
    } else {
      hideDialog();
    }
  }, [props.fvisible]);
  useEffect(() => {
    Object.keys(data).map((item, index) => {
      if (item === func) {
        setOperators(data[item]);
        if (data[item].length == 0) {
          setOperator("None");
        }
      }
    });
  }, [func]);
  return (
    <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
      <Dialog.Content>
        <SFuncDropDown onChangeFunction={onChangeFunction} />
        <Text style={{ fontSize: 14, fontWeight: "700", marginBottom: 2 }}>
          Parameters
        </Text>
        <View style={styles.parameter}>
          <View style={styles.inputBar}>
            <Text style={{ fontSize: 14, fontWeight: "700" }}>Number =</Text>
            <TextInput
              mode="outlined"
              style={styles.inputElement}
              onChangeText={(newNumber) => setNumber(newNumber)}
              defaultValue={number}
            />
          </View>
          <View style={styles.operators}>
            {operators.length ? (
              <>
                <Text style={{ fontSize: 14, fontWeight: "700" }}>
                  Operator =
                </Text>
                <SOperatorDropDown
                  operators={operators}
                  onChangeOpeator={onChangeOpeator}
                />
              </>
            ) : (
              <></>
            )}
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Actions style={styles.footer}>
        <Button onPress={saveDialog}>Ok</Button>
        <Button onPress={hideDialog}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
}
const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    borderRadius: 5,
    height: "70%",
  },
  screen: {
    flex: 2,
    backgroundColor: "#fff",
    display: "flex",
    height: "100%",
  },
  parameter: {
    borderRadius: 15,
    borderColor: "#6600ff",
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 0,
    paddingLeft: 15,
    paddingRight: 10,
    borderStyle: "dashed",
  },
  inputBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 5,
  },
  label: {
    width: "15%",
    alignSelf: "center",
  },
  inputElement: {
    width: "60%",
    height: 30,
    backgroundColor: "white",
  },
  operators: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  funcButton: {
    padding: 0,
    backgroundColor: "#6600ff",
    padding: 6,
    borderRadius: 5,
  },
  operatorDropdown: {
    marginLeft: "12%",
  },
  dropdown1BtnStyle: {
    width: "50%",
    height: 50,
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
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blueBorder: {
    borderColor: "#6600ff",
  },
  footer: {
    marginTop: 0,
  },
});
