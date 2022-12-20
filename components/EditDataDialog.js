import React, { useEffect, useMemo, useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { Button, Paragraph, Dialog } from "react-native-paper";

export default function Index(props) {
  const [visible, setVisible] = useState(false);
  const [nodes, setNode] = useState("");
  const [name, setName] = useState("");
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setNode("");
    setVisible(false);
    props.onChangeEditVisible(false);
  };
  const saveFunction = () => {
    props.saveNodes(name);
    hideDialog();
  };
  const handleChangeName = (e) => {
    setName(e);
  }
  useEffect(() => {
    if (props.visible) {
      showDialog();
    } else {
      hideDialog();
    }
  }, [props.visible]);

  return (
    <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
      <Dialog.Content>
        <View style={styles.searchBarElement}>
          <Text style={{ fontSize: 18, fontWeight: "700", width: '30%' }}>Name: </Text>
          <TextInput
            mode="outlined"
            style={styles.searchElement}
            onChangeText={(event) => {
              handleChangeName(event);
            }}
            value={name}
          />
        </View>
        <View style={styles.parameters}>
          <Text style={{ fontSize: 18, fontWeight: "700", width: '30%' }}>Variable: </Text>
          <TextInput style={styles.parametersInput}></TextInput>
        </View>
      </Dialog.Content>
      <Dialog.Actions style={styles.footer}>
        <Button labelStyle={{ fontSize: 18 }} onPress={saveFunction}>Save</Button>
        <Button labelStyle={{ fontSize: 18 }} onPress={hideDialog}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
}
const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    borderRadius: 5,
    height: "50%",
    paddingTop: 30
  },
  searchBarElement: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  parameters: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "15%",
    backgroundColor: "#3333ff",
    padding: 10,
    height: 40,
  },
  searchElement: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "70%",
    borderColor: "#3333ff",
    borderWidth: 1,
    padding: 8,
    backgroundColor: "white",
    height: 40,
  },
  parametersInput: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "70%",
    borderColor: "#3333ff",
    borderWidth: 1,
    padding: 8,
    backgroundColor: "white",
    height: 40,
  },
  footer: {
    display: "flex",
    justifyContent: "space-around",
  },
});
