import React, { useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button, Dialog } from "react-native-paper";
import TreeView from "react-native-final-tree-view";
import Icon from "react-native-vector-icons/FontAwesome";
import SearchBar2 from "../components/SearchBar2";
import { useStore } from "../redux/actions";
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
    props.onChangeCVisible(false);
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
    if (props.cvisible) {
      showDialog();
    } else {
      hideDialog();
    }

  }, [props.cvisible]);

  const treeView = useMemo(() => {
    return (
      <TreeView
        data={family}
        onNodePress={({ node, level }) => {
          setNode(node);
        }}
        renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
          return (
            <View>
              <Text
                style={[{
                  marginLeft: 10 * level,
                  fontSize: 20,
                }, (props.action === "Add" || props.action === "Delete") && (node.name === "Grocery" || node.name === "Cloth" || node.name === "Machine") ? { opacity: 0.5 } : { opacity: 1 }]}
              >

                {getIndicator(isExpanded, hasChildrenNodes)} {node.name}
              </Text>
            </View>
          );
        }}
      />
    );
  }, [props.action, family]);
  return (
    <Dialog visible={visible} onDismiss={hideDialog} style={theme === 'light' ? styles.dialog : styles.dialog_dark}>
      <Dialog.Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchBarElement}>
            <View style={styles.searchIcon}>
              <Icon name="search" size={22} color="white" />
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
    height: "60%",
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
    top: 10
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
    padding: 12,
    height: 50,
  },
  searchElement: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "85%",
    borderColor: "#3333ff",
    borderWidth: 1,
    padding: 6,
    backgroundColor: "white",
    height: 50,
    fontSize: 24
  },
  searchText: {
    fontSize: 20,
  },
  footer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 100
  },
});
