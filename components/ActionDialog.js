import React, { useEffect, useMemo, useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { Button, Paragraph, Dialog } from "react-native-paper";
import ActionDropdown from "../components/ActionDropDown";
import { useStore } from '../redux/actions';
export default function Index({ isActionShow, setActionVisible, handleAction }) {
  const theme = useStore(state => state.theme);
  const [isvisible, setIsVisible] = useState(false);
  const [action, setAction] = useState("Add");
  const hideDialog = () => {
    setIsVisible(false);
    setActionVisible(false);
  };
  const saveAction = () => {
    handleAction(action);
    hideDialog();
  }
  const getAction = (result) => {
    setAction(result);
  }

  useEffect(() => {
    if (isActionShow) {
      setIsVisible(true);
    }
    else {
      setIsVisible(false);
    }
  }, [isActionShow])

  return (
    <Dialog visible={isvisible} onDismiss={hideDialog} style={theme === 'light' ? styles.dialog : styles.dialog_dark}>
      <Dialog.Content>
        <View style={styles.dialogbody}>
          <ActionDropdown onChangeAction={getAction}></ActionDropdown>
        </View>
      </Dialog.Content>
      <Dialog.Actions style={styles.footer}>
        <Button labelStyle={{ fontSize: 18, color: theme === 'light' ? 'blue' : 'white' }} onPress={saveAction}>Ok</Button>
        <Button labelStyle={{ fontSize: 18, color: theme === 'light' ? 'blue' : 'white' }} onPress={hideDialog}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
}
const styles = StyleSheet.create({
  dialog: {
    position: 'relative',
    backgroundColor: "white",
    borderRadius: 5,
    height: "40%",
    paddingTop: 10,
    zIndex: 100
  },

  dialog_dark: {
    position: 'relative',
    backgroundColor: "#0d0d0d",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    height: "40%",
    paddingTop: 10,
    zIndex: 100
  },

  dialogbody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
