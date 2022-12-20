import React, { useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button, Paragraph, Dialog } from "react-native-paper";
import TreeView from "react-native-final-tree-view";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import SearchBar2 from "../components/SearchBar2";
import { useStore } from "../redux/actions";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function Index(props) {
  const theme = useStore(state => state.theme);
  const [visible, setVisible] = useState(false);
  const [nodes, setNode] = useState("");
  const [level, setLevel] = useState("");
  const family = useStore(state => state.family);
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setNode("");
    setVisible(false);
    props.onChangeTVisible(false);
  };

  const getIndicator = (isExpanded, hasChildrenNodes) => {
    if (!hasChildrenNodes) {
      return "-";
    } else if (isExpanded) {
      return "+";
    } else {
      return "+";
    }
  };

  const saveNodes = () => {
    props.saveNodes(nodes);
    hideDialog();
  };

  useEffect(() => {
    if (props.tvisible) {
      showDialog();
    } else {
      hideDialog();
    }

  }, [props.tvisible]);

  const treeView = useMemo(() => {
    return (
      <TreeView
        data={family}
        onNodePress={({ node, level }) => {
          let type = (isNaN(parseInt(node.value)) ? "string" : "number");
          if (props.dataType === null || props.dataType === type || level !== 2)
            setNode(node);
        }}
        renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
          let type = (isNaN(parseInt(node.value)) ? "string" : "number");

          return (
            <View>
              <Text
                style={[{
                  marginLeft: 10 * level,
                  fontSize: 20,
                }, level === 2 && props.dataType !== null && props.dataType !== type && { opacity: 0.5 }]}
              >
                {getIndicator(isExpanded, hasChildrenNodes)} {node.name}
              </Text>
            </View>
          );
        }}
      />
    );
  }, [[props.action, family]]);
  return (
    <Dialog visible={visible} onDismiss={hideDialog} style={theme === 'light' ? styles.dialog : styles.dialog_dark}>
      <Dialog.Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchBarElement}>
            <View style={styles.searchIcon}>
              <Icon name="search" size={23} color="white" />
            </View>
            <SearchBar2 result={nodes.path} />
          </View>
          <View>
            {treeView}
          </View>
          <Dialog.Actions style={styles.footer}>
            <Button labelStyle={{ fontSize: 20 }}
              onPress={saveNodes}>Ok</Button>
            <Button
              labelStyle={{ fontSize: 20 }}
              onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </ScrollView>
      </Dialog.Content>
    </Dialog>
  );
}
const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    borderRadius: 5,
    height: "80%",
    zIndex: 9999,
    position: 'absolute',
    top: 10
  },
  dialog_dark: {
    backgroundColor: "#0d0d0d",
    borderRadius: 5,
    height: "60%",
    zIndex: 9999,
    position: 'absolute',
    top: 0
  },
  searchBarElement: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10
  },
  searchIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "15%",
    backgroundColor: "#3333ff",
    borderWidth: 1,
    borderColor: "#3333ff",
    padding: 10,
    height: 50,
  },
  searchElement: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "85%",
    borderColor: "#6600ff",
    borderWidth: 1,
    padding: 6,
    backgroundColor: "white",
    height: 50,
  },
  searchText: {
    fontSize: 20,
  },
  footer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 50
  },
});
