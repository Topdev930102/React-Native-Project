import React, { useEffect, useMemo, useState } from "react";
import { Text, TextInput, View, StyleSheet, ScrollView } from "react-native";
import { Button, Paragraph, Dialog } from "react-native-paper";
import JSONTree from 'react-native-json-tree';
import { useStore } from '../redux/actions';
import jp, { stringify } from 'jsonpath';
const customData = require("../constant/formulas.json");
export default function Index({ isTreeShow, handleTreeShow }) {
  const theme = useStore(state => state.theme);
  const family = useStore(state => state.family);
  const rules = useStore(state => state.rules);
  const functions = useStore(state => state.functions);
  const [isvisible, setIsVisible] = useState(false);
  const [treejson, setTreeJson] = useState([]);
  const hideDialog = () => {
    setIsVisible(false);
    handleTreeShow(false);
  };
  const handleData = item => {
    if (item === null) {
      return "";
    } else if (item != null && item.name) {
      const params = item.params.map(param => {
        if (typeof param === 'object') {
          return handleData(param);
        } else {
          return param;
        }
      });

      const result = params.map((ele, i) => {
        if (i < params.length - 1) {
          return ele + ',';
        } else {
          return ele;
        }
      });
      return (
        item.name + '(' + result + ')'
      );
    } else {
      return item;
    }
  };


  const handleTreeData = (family) => {
    if (family) {
      let temp_treejson = [];
      family.forEach(element => {
        if (element.children) {
          let parent_children = [];
          element.children.forEach((item, index) => {
            let temp_children = [];
            item.children.forEach((subitem, i) => {
              if (i === 0) {
                temp_children.push({
                  color: subitem.value
                });
              }
              else {
                temp_children.push({
                  price: subitem.value
                });
              }

            });
            parent_children.push(
              {
                name: item.name,
                detail: temp_children
              }
            );
          })
          temp_treejson.push({
            name: element.name,
            children: parent_children
          })
        }
        else {
          temp_treejson.push({
            name: element.name,
            children: []
          })
        }
      });
      return temp_treejson
    }
  }

  const handleRules = (previous_rules) => {
    let new_rules = [];
    previous_rules.forEach((rule, index) => {
      const condition = handleData(rule.data);
      const item = {
        rule_name: rule.rule_name,
        condition: condition,
        rule_actions: rule.rule_actions
      };
      new_rules.push(item);
    })
    return new_rules;
  }

  const handleFunctions = () => {
    let custom_functions = [];
    functions.forEach((element, index) => {
      let temp_params = [];
      element.function_paramlist.forEach((item, index) => {
        item[2].forEach((param, index) => {
          if (param != '') {
            temp_params.push(param);
          }
        })
      });
      custom_functions.push({
        name: element.function_name,
        params: temp_params,
        type: 'numeric'
      })
    })
    return custom_functions;
  }

  useEffect(() => {
    if (isTreeShow) {
      const data = handleTreeData(family);
      const custom_functions = handleFunctions();
      let temp = JSON.parse(JSON.stringify(customData));
      temp.Category = { ...temp.Category, Custom: custom_functions };
      const result_rules = handleRules(rules);
      const temp_json_tree = {
        data: data,
        rules: result_rules,
        functions: temp,
      }
      setTreeJson(temp_json_tree);

      setIsVisible(true);
    }
    else {
      setIsVisible(false);
    }
  }, [isTreeShow])

  return (

    <Dialog visible={isvisible} onDismiss={hideDialog} style={theme === 'light' ? styles.dialog : styles.dialog_dark}>
      <Dialog.Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.dialogbody}>
            <View style={styles.header}>
              <Text style={theme === 'light' ? styles.title : styles.title_dark}>
                {"View Source"}
              </Text>
            </View>
            <View>
              <JSONTree data={treejson} />
            </View>
            <View style={styles.footer}>
              <Button labelStyle={{ fontSize: 18, color: theme === 'light' ? 'blue' : 'white' }} onPress={hideDialog}>Cancel</Button>
            </View>
          </View>
        </ScrollView>
      </Dialog.Content>
    </Dialog>

  );
}
const styles = StyleSheet.create({
  dialog: {
    position: 'relative',
    backgroundColor: "white",
    borderRadius: 5,
    height: "50%",
    width: '88%',
    zIndex: 100,
    paddingTop: 20
  },
  dialog_dark: {
    position: 'relative',
    backgroundColor: "#1a1a1a",
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    height: "50%",
    width: '88%',
    zIndex: 100,
    paddingTop: 20
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold'
  },
  title_dark: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  dialogbody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'

  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 0,
    padding: 80
  }
});
