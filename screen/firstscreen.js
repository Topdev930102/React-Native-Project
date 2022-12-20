/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ActionDialog from '../components/ActionDialog'
import ParamDialog from '../components/ParamDialog'
import ParamAsDialog from '../components/ParamAsDialog'
import JsonTreeDialog from '../components/JsonTreeDialog'
import TestDialog from '../components/TestDialog'
import { Button } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import jp from 'jsonpath';
import { Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
const customData = require('../constant/formulas');
import Web3 from 'web3';
import SelectDropdown from "react-native-select-dropdown";
import contract_abi from '../constant/abi';
import contract_address from '../constant/contract_address';
import { useStore } from '../redux/actions';
import Spinner from 'react-native-loading-spinner-overlay';
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://matic-mumbai.chainstacklabs.com'),
);
const NameContract = new web3.eth.Contract(contract_abi, contract_address);
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function Index({ currentPage, isDisabled, isRule, funcName, ruleName, formulas, setFuncName, setRuleName, setFunctions, setPage, setAction, setFormulas, setRActions, setIsRule, ractions }) {
  const rules = useStore(state => state.rules);
  const functions = useStore(state => state.functions);
  const theme = useStore(state => state.theme);
  const updateFamily = useStore(state => state.updateFamily);
  const updateJson = useStore(state => state.updateJson);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isActionShow, setIsActionShow] = useState(false);
  const [isTestShow, setIsTestShow] = useState(false);
  const [isTreeShow, setIsTreeShow] = useState(false);
  const [isParamShow, setIsParamShow] = useState(false);
  const [isParamAsShow, setIsParamAsShow] = useState(false);
  const [elements, setElements] = useState([]);
  const [func, setFunc] = useState(null);
  const [rule, setRule] = useState(null);
  const [ruleList, setRuleList] = useState([]);
  const [index, setIndex] = useState('');
  const [ruleIndex, setRuleIndex] = useState(0);
  const [functionIndex, setFunctionIndex] = useState(0);
  const [data, setData] = useState({
    category: 'Math',
    name: 'Sum',
    params: ['', ''],
    type: 'numeric',
    id: 0,
  });
  const [actions, setActions] = useState([]);
  const editFunction = () => {
    setPage(2);
  };

  const toshow = item => {
    if (item === null) {
      return <Text />;
    } else if (item != null && item.name) {
      const params = item.params.map(param => {
        if (typeof param === 'object') {
          return toshow(param);
        } else {
          return <Text style={styles.black}>{param}</Text>;
        }
      });

      const result = params.map((ele, i) => {
        if (i < params.length - 1) {
          return <Text key={i} style={styles.black}>{ele},</Text>;
        } else {
          return <Text key={i} style={styles.black}>{ele}</Text>;
        }
      });
      return (
        <Text
          style={item.id === data.id ? [styles.flex, styles.red] : styles.flex}>
          {item.name}({result})
        </Text>
      );
    } else {
      return item;
    }
  };
  const onActionDialog = () => {
    setIsActionShow(true);
  }

  const onSaveDialog = () => {
    setIsOpen(false);
    setIsParamShow(true);
  }

  const onSaveAsDialog = () => {
    setIsOpen(false);
    setIsParamAsShow(true);
  }

  const setActionVisible = (data) => {
    setIsActionShow(data);
  }

  const setParamVisible = (data) => {
    setIsParamShow(data);
    setIsOpen(false);
  }
  const setParamAsVisible = (data) => {
    setIsParamAsShow(data);
    setIsOpen(false);
    NameContract.methods.getRule().call((err, res) => {
      if (err) {
        console.log('err', err);
      }
      else {
        console.log('res', res);
        if (res["1"]) {
          setRuleList([...res["1"]]);
        }
        else {
        }
      }
    })
  }

  const handleAction = (result) => {
    if (result) {
      setAction(result);
      setPage(1);
    }
  }
  const removeItem = (index) => {
    Alert.alert(
      'Confirm',
      'Are you sure to remove an action?',
      [
        {
          text: 'YES', onPress: () => {
            const temp = ractions.splice(index, 1);
            setElements([...temp]);
          }
        },
        {
          text: 'NO', onPress: () => {
          }
        },
      ]
    )

  }

  const saveFormula = (new_formula) => {
    setFormulas(new_formula);
  }

  const OnRuleTest = () => {
    if (rule !== null || func !== null) {
      setIsTestShow(true);
    }
    else {
      Alert.alert('Please select rule or function.')
    }
  }


  const setTestVisible = (result) => {
    setIsTestShow(result);
    setRuleList([]);
  }

  const storeRule = () => {
    if (isRule && !ractions.length) {
      Alert.alert(
        "Warning",
        "Please add actions for rule"
      );
    }
    else {
      setIsOpen(!isOpen)
    }
  }

  const initial = (data) => {
    if (data) {
      setRActions([]);
      setFormulas("");
    }
  }

  const getData = (data) => {
    setIsTreeShow(data);
  }

  const handleTreeShow = (data) => {
    setIsTreeShow(data);
  }

  const getRules = (temp_rules) => {
    let temp_rule_list = [];
    for (let i = 0; i < temp_rules.length; i++) {
      const rule_name = temp_rules[i][0];
      let temp_actions = temp_rules[i][1];
      let rule_actions = [];
      for (let j = 0; j < temp_actions.length; j++) {
        const item = {
          id: temp_actions[j][0],
          action_name: temp_actions[j][1],
          color: temp_actions[j][2],
          price: temp_actions[j][3],
          product_name: temp_actions[j][4],
        };
        rule_actions.push(item);
      }
      const temp_paramlist = temp_rules[i][2];
      let rule_paramlist = temp_paramlist;
      let root = {};
      for (let x = temp_paramlist.length - 1; x > -1; x--) {
        const temp_param = temp_paramlist[x];
        if (x === temp_paramlist.length - 1) {
          const initial_data = {
            category: temp_param[0],
            name: temp_param[1],
            params: temp_param[2],
            type: temp_param[4]
          };
          root = JSON.parse(JSON.stringify(initial_data));
        }
        else {
          const temp = {
            category: temp_param[0],
            name: temp_param[1],
            params: temp_param[2],
            type: temp_param[4]
          };
          const tempQuery = temp_param[3];
          jp.apply(root, tempQuery, value => {
            return temp;
          });
        }
      }
      const rule_unit = {
        rule_name: rule_name,
        rule_actions: rule_actions,
        rule_paramlist: rule_paramlist,
        data: root
      };
      temp_rule_list.push(rule_unit);
      updateJson({ rules: temp_rule_list });
    }
    let rule_names = [];
    temp_rule_list.forEach((element, index) => {
      rule_names.push(element.rule_name);
    })
    updateJson({ rules_name_list: rule_names });
  }

  const getFunctions = (temp_functions) => {
    let temp_functions_list = [];
    for (let i = 0; i < temp_functions.length; i++) {
      const function_name = temp_functions[i][0];
      const temp_paramlist = temp_functions[i][1];
      let function_paramlist = temp_paramlist;
      let root = {};
      for (let x = temp_paramlist.length - 1; x > -1; x--) {
        const temp_param = temp_paramlist[x];
        if (x === temp_paramlist.length - 1) {
          const initial_data = {
            category: temp_param[0],
            name: temp_param[1],
            params: temp_param[2],
            type: temp_param[4]
          };
          root = JSON.parse(JSON.stringify(initial_data));
        }
        else {
          const temp = {
            category: temp_param[0],
            name: temp_param[1],
            params: temp_param[2],
            type: temp_param[4]
          };
          const tempQuery = temp_param[3];
          jp.apply(root, tempQuery, value => {
            return temp;
          });
        }
      }
      const function_unit = {
        function_name: function_name,
        function_paramlist: function_paramlist,
        data: root
      };
      temp_functions_list.push(function_unit);
      updateJson({ functions: temp_functions_list });
    }
    let function_names = [];
    temp_functions_list.forEach((element, index) => {
      function_names.push(element.function_name);
    })
    updateJson({ functions_name_list: function_names });
  }

  const selectRule = (index, item) => {
    setIsRule(true);
    if (index === -1) {
      setFormulas("");
      setRActions([]);
      setRuleName(item);
      setFuncName('');
      setFunc(null);
      setRule(null);
    }
    else {
      setFuncName('');
      setRuleName(rules[index].rule_name);
      setRuleIndex(index);
      setRule(rules[index]);
      setFormulas(rules[index].data);
      setRActions([...rules[index].rule_actions]);
    }
  }

  const selectFunction = (index, item) => {
    setIsRule(false);
    setFuncName(item);
    setRuleName('');
    if (index === -1) {
      setFormulas("");
      setRActions([]);
      setFuncName(item);
      setRuleName('');
    }
    else {
      setRuleName('');
      setFuncName(functions[index].function_name);
      setFunctionIndex(index);
      setFunc(functions[index]);
      setFormulas(functions[index].data);
      setRActions([]);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    NameContract.methods.getRule().call((err, res) => {
      if (err) {
        console.log('err', err);
      }
      else {
        if (res["1"]) {
          const temp_rules = res["1"];
          getRules(temp_rules);
        }
        else {
        }
      }
    })

    NameContract.methods.getFunction().call((err, res) => {
      if (err) {
        console.log('err', err);
      }
      else {
        if (res["1"]) {
          const temp_functions = res["1"];
          getFunctions(temp_functions);
        }
        else {
        }
      }
    })

    NameContract.methods.getProductJson().call((err, res) => {
      if (err) {
        console.log('An error occured', err);
        return '';
      }
      let productArray = [];
      let categoryName = ['Computer', 'Machine', 'Grocery', 'Cloth'];
      res.forEach((element, i) => {
        let children = [];
        i === 0 &&
          element &&
          element.length &&
          element.forEach(computer => {
            let computerDetail = [];
            if (computer[0] && computer[2] && computer[2].length > 0) {
              computerDetail.push({
                id: 'Color',
                name: 'Color',
                path: `@root.${categoryName[i]}.${computer[0]}.Color`,
                value: computer[2][0],
              });
              computerDetail.push({
                id: 'Price',
                name: 'Price',
                path: `@root.${categoryName[i]}.${computer[0]}.Price`,
                value: computer[2][1],
              });
              children.push({
                id: computer[0],
                name: computer[0],
                path: `@root.${categoryName[i]}.${computer[0]}`,
                company: computer[1],
                children: computerDetail,
              });
            }
          });
        productArray.push({
          id: categoryName[i],
          path: `@root.${categoryName[i]}`,
          name: categoryName[i],
          children,
        });
      });
      updateFamily(productArray);
    });


    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (ractions) {
      let temp = [];
      ractions.forEach((element, index) => {
        temp.push(element.id, element.action_name, element.product_name, element.color, element.price);
      });
      setActions(temp);
    }
  }, [ractions])

  useEffect(() => {
    if (ruleList.length) {
      const temp_rule = ruleList[ruleList.length - 1];
      setRule(temp_rule);
      const temp_params = temp_rule[2];
      const initial_param = temp_params[temp_params.length - 1];
      const initial_data = {
        category: initial_param[0],
        name: initial_param[1],
        params: initial_param[2],
        type: initial_param[4]
      };
      const root = JSON.parse(JSON.stringify(initial_data));
      for (let i = 0; i < temp_params.length - 1; i++) {
        const item = temp_params[i];
        const temp = {
          category: item[0],
          name: item[1],
          params: item[2],
          type: item[4]
        };
        const tempQuery = temp_params[i][3];
        jp.apply(root, tempQuery, value => {
          return temp;
        });
      }
    }
  }, [ruleList])

  return (
    <>
      <ScrollView style={theme === 'light' ? styles.screen : styles.screen_dark}>
        {/* <Spinner visible={isLoading}
          textContent={'Loading...'} textStyle={{ color: 'white', fontSize: 25 }} /> */}
        <Header currentPage={currentPage} initial={initial} funcName={funcName} ruleName={ruleName} getData={getData} selectRule={selectRule} selectFunction={selectFunction} />
        <View style={styles.container}>
          <View>
            <View style={{ borderColor: theme === 'light' ? 'blue' : 'white', borderWidth: 2, marginTop: 50, borderRadius: 10 }}>
              <View style={styles.condition}>
                <MaterialIcon
                  name="atom"
                  size={26}
                  color={theme === 'light' ? "blue" : "white"}
                />
                <Text style={theme === 'light' ? styles.title : styles.title_dark}>{isRule ? "Condition" : "Custom Function"}</Text>
              </View>
              <View style={styles.inputBar}>
                <SearchBar result={toshow(formulas)} />
                <MaterialIcon
                  name="pencil"
                  size={22}
                  color="white"
                  style={styles.funcButton}
                  onPress={() => editFunction()}
                />
              </View>
            </View>
            {isRule && <View style={{ borderColor: theme === 'light' ? 'blue' : 'white', borderWidth: 2, marginTop: 50, borderRadius: 10, paddingBottom: 15, paddingTop: 15, zIndex: -1 }}>
              <View style={styles.actionTitle}>
                <MaterialIcon
                  name="play-circle-outline"
                  size={26}
                  color={theme === 'light' ? "blue" : "white"}
                />
                <Text style={theme === 'light' ? styles.title : styles.title_dark}>Action(s)</Text>
              </View>
              <View style={styles.publishfooter}>
                {ractions && ractions.map((item, index) => {
                  return (
                    <View style={styles.action} key={index}>
                      <View>
                        <Button
                          mode="contained"
                          style={styles.readButton}
                          labelStyle={{ fontSize: 18, color: 'white' }}>
                          {item.action_name}
                        </Button>
                      </View>
                      <View style={styles.objectName}>
                        <Text style={{ fontSize: 18 }}>{item.product_name}</Text>
                      </View>
                      <View style={styles.deleteIcon}>
                        <MaterialIcon
                          name="delete-outline"
                          size={28}
                          color={theme === 'light' ? '#e60000' : 'white'}
                          onPress={() => removeItem(index)}
                        />
                      </View>
                    </View>
                  )
                })}
                <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <TouchableOpacity style={styles.addButton} onPress={() => onActionDialog()}>
                    <Text style={{ fontSize: 30, color: '#3333ff' }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>}

            <View style={styles.footer}>
              <Button
                mode="contained"
                style={styles.saveButton}
                labelStyle={{ fontSize: 14, color: 'white' }}
                onPress={() =>
                  storeRule()}
              >
                Add To Library
              </Button>
              {
                isOpen && <View style={theme === 'light' ? styles.menu : styles.menu_dark}>
                  <TouchableOpacity style={styles.menuItem} onPress={() => onSaveDialog()}>
                    <MaterialIcon
                      name="content-save"
                      size={18}
                      color={theme === 'light' ? "blue" : 'white'}
                    />
                    <Text style={theme === 'light' ? styles.menuText : styles.menuText_dark}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => onSaveAsDialog()}>
                    <MaterialIcon
                      name="content-save-all"
                      size={18}
                      color={theme === 'light' ? "blue" : 'white'}
                    />
                    <Text style={theme === 'light' ? styles.menuText : styles.menuText_dark}>Save As</Text>
                  </TouchableOpacity>
                </View>
              }

              <Button
                mode="contained"
                style={styles.saveButton}
                labelStyle={{ fontSize: 14, color: 'white' }}
                onPress={() => OnRuleTest()}
              >
                Test
              </Button>
            </View>
          </View >
        </View>
        <ParamDialog isRule={isRule} isParamShow={isParamShow} functionIndex={functionIndex} ruleIndex={ruleIndex} funcName={funcName} ruleName={ruleName} formulas={formulas} ractions={ractions} setParamVisible={setParamVisible} saveFormula={saveFormula}></ParamDialog>
        <ParamAsDialog isRule={isRule} isParamAsShow={isParamAsShow} formulas={formulas} ractions={ractions} setParamAsVisible={setParamAsVisible} saveFormula={saveFormula}></ParamAsDialog>
      </ScrollView>
      <TestDialog isTestShow={isTestShow} isRule={isRule} func={func} rule={rule} setTestVisible={setTestVisible}></TestDialog>
      <ActionDialog isActionShow={isActionShow} setActionVisible={setActionVisible} handleAction={handleAction}></ActionDialog>
      <JsonTreeDialog isTreeShow={isTreeShow} handleTreeShow={handleTreeShow} />
    </>

  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  screen_dark: {
    backgroundColor: 'black',
  },
  header: {
    marginTop: 15,
    marginRight: 15,
    display: 'flex',
    alignItems: 'flex-end'
  },
  container: {
    marginLeft: 5,
    marginRight: 5
  },
  title: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
    color: 'black'
  },
  title_dark: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
    color: 'white'
  },
  dropdown1BtnStyle: {
    width: "100%",
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
  category: {
    display: 'flex',
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parameters: {
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 10,
  },

  parameter: {
    borderRadius: 15,
    borderColor: '#3333ff',
    borderWidth: 2,
    padding: 7,
    marginBottom: 40,
    marginTop: 10,
    borderStyle: 'dashed',
  },
  paramsField: {
    alignItems: 'center',
  },
  condition: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15
  },
  inputBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    padding: 20,
    zIndex: 999
  },
  label: {
    width: '15%',
    alignSelf: 'center',
  },
  actionTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  },
  inputElement: {
    width: '55%',
    height: 45,
    backgroundColor: 'white',
    padding: 10,
  },
  funcButton: {
    padding: 0,
    backgroundColor: '#3333ff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 30,
  },
  searchButton: {
    padding: 0,
    backgroundColor: '#3333ff',
    padding: 8,
    borderRadius: 5,
  },
  operatorDropdown: {
    marginLeft: '12%',
  },
  dropdown1BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'blue',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
  publishfooter: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0
  },
  actionButton: {
    width: '50%',
    padding: 20,
  },
  actionIcon: {
    marginRight: 10
  },
  publishButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 3,
    borderRadius: 10,
    width: 140,
    backgroundColor: '#3333ff'
  },
  footer: {
    marginTop: 52,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 400
  },
  addButton: {
    marginTop: 30,
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#3333ff',
    borderWidth: 2
  },
  createButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 3,
    borderRadius: 10,
    width: 140,
    backgroundColor: 'white',
    borderColor: '#3333ff',
    borderWidth: 1
  },
  readButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 3,
    borderRadius: 10,
    width: 140,
    backgroundColor: '#3333ff',
    borderColor: '#3333ff',
    borderWidth: 1
  },
  saveButton: {
    paddingTop: 5,
    paddingBottom: 3,
    borderRadius: 10,
    backgroundColor: '#3333ff',
    borderColor: '#3333ff',
    borderWidth: 1,
    borderRadius: 10,
    width: 160
  },
  menu: {
    position: 'absolute',
    top: 60,
    borderWidth: 1,
    width: 160,
    borderRadius: 5,
    borderColor: "#f5f5f5",
    backgroundColor: "#f2f2f2"
  },
  menu_dark: {
    position: 'absolute',
    top: 60,
    borderWidth: 1,
    width: 160,
    borderRadius: 5,
    borderColor: "#f5f5f5",
    backgroundColor: "#0d0d0d"
  },
  menuItem: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  menuText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black'
  },
  menuText_dark: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  blueBorder: {
    borderColor: '#3333ff',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  black: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  red: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  objectName: {
    width: 120,
    height: 40,
    marginLeft: 50,
    borderColor: 'blue',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
