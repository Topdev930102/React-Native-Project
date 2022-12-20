import React, { useEffect, useMemo, useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { Button, Paragraph, Dialog } from "react-native-paper";
export default function Index({ isRuleShow, setRuleVisible, saveRule }) {
  const [isvisible, setIsVisible] = useState(false);
  const [rule, setRule] = useState("");
  const hideDialog = () => {
    setIsVisible(false);
    setRuleVisible(false);
  };
  const saveAction = () => {
    saveRule(rule);
    hideDialog();
  }
  const handleRuleName = (event) => {
    setRule(event);
  }
  useEffect(() => {
    if (isRuleShow) {
      setIsVisible(true);
    }
    else {
      setIsVisible(false);
    }
  }, [isRuleShow])

  return (
    <Dialog visible={isvisible} onDismiss={hideDialog} style={styles.dialog}>
      <Dialog.Content>
        <View style={styles.dialogbody}>
          <TextInput style={styles.ruleElement} placeholder="Please input rule name" onChangeText={handleRuleName}></TextInput>
        </View>
      </Dialog.Content>
      <Dialog.Actions style={styles.footer}>
        <Button labelStyle={{ fontSize: 18 }} onPress={saveAction}>Save</Button>
        <Button labelStyle={{ fontSize: 18 }} onPress={hideDialog}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
}
const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    borderRadius: 5,
    height: "40%",
    paddingTop: 10,
    zIndex: 100
  },
  dialogbody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ruleElement: {
    fontSize: 16,
    padding: 10,
    marginLeft: 30,
    borderColor: '#3333ff',
    borderWidth: 1,
    width: '80%',
    marginTop: 40,
    height: 40,
  },
  footer: {
    display: "flex",
    justifyContent: "space-around",
  },
});
