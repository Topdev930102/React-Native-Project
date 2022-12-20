import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import Library from '../components/Library';
import FuncDropDown from '../components/FuncDropDown';
import Header from '../components/Header';
import CategoryDropDown from '../components/CategoryDropDown';
import OperatorDropDown from '../components/OperatorDropDown';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditDataDialog from '../components/EditDataDialog';
import JsonDataDialog from '../components/JsonDataDialog';
import jp from 'jsonpath';
import { Dimensions } from 'react-native';
import Web3 from 'web3';
import contract_abi from '../constant/abi';
import contract_address from '../constant/contract_address';
import { useStore } from '../redux/actions';
const customData = require('../constant/formulas');
const productData = require('..//constant/productData');
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://matic-mumbai.chainstacklabs.com'),
);
const NameContract = new web3.eth.Contract(contract_abi, contract_address);
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function Index({
  currentPage,
  prevRoute,
  funcName,
  ruleName,
  label,
  setIsDisabled,
  setPage,
  setFormulas,
  isRule,
  setIsRule
}) {
  const jsonVal = useStore(state => state);
  const updateJson = useStore(state => state.updateJson);
  const functions = useStore(state => state.functions);
  const rules = useStore(state => state.rules);
  const theme = useStore(state => state.theme);
  const [dataType, setDataType] = useState(null);
  const [tvisible, setTVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [library, setLibrary] = useState('Standard');
  const [index, setIndex] = useState(0);
  const [nindex, setNodeIndex] = useState('');
  const [query, setQuery] = useState('$');
  const [isNode, setIsNode] = useState(false);
  const [paths, setPaths] = useState([]);
  const [funcData, setFuncData] = useState({});
  const [root, setRoot] = useState({
    category: 'Math',
    name: 'Sum',
    params: ['', ''],
    type: 'numeric',
    id: 0,
    detail: null,
    library: library
  });
  const [data, setData] = useState({
    category: 'Math',
    name: 'Sum',
    params: ['', ''],
    type: 'numeric',
    detail: null,
    id: 0,
    library: library
  });

  const getLibrary = lib => {
    setLibrary(lib);
    if (lib === 'Standard') getCategory('Math');
    else {
      setData({ ...data, library: 'Project', category: 'Custom', name: ' ' });
    }
  };
  const getCategory = result => {
    const tempObj = jp.query(customData, `$.Category.${result}`)[0];
    if (query === '$') {
      let temp = data;
      temp.category = result;
      temp.name = tempObj[0].name;
      temp.params = tempObj[0].params;
      temp.type = tempObj[0].type;
      setRoot(JSON.parse(JSON.stringify(temp)));
    } else {
      jp.apply(root, query, value => {
        value = { ...tempObj[0] };
        value.category = result;
        return value;
      });
      const tempData = jp.query(root, query);
      setData(JSON.parse(JSON.stringify(tempData[0])));
    }
  };

  const showTDialog = i => {
    setNodeIndex(i);
    setTVisible(true);
  };
  const onChangeTVisible = data => {
    setTVisible(data);
  };
  const onChangeEditVisible = data => {
    setEditVisible(data);
  };
  const onChangeFunction = (func, index) => {
    if (library === 'Standard') {
      if (query === '$') {
        let temp = data;
        temp.name = func;
        temp.library = library;
        setRoot(JSON.parse(JSON.stringify(temp)));
      } else {
        jp.apply(root, query, value => {
          value.name = func;
          value.library = library;
          return value;
        });
        const tempData = jp.query(root, query);
        setData(JSON.parse(JSON.stringify(tempData[0])));
      }
    }
    else {
      const temp_function = functions[index];
      const temp_function_paramlist = temp_function.function_paramlist;
      setFuncData(temp_function.data);
      let paths_list = [];
      let params_list = [];
      temp_function_paramlist && temp_function_paramlist.forEach((item, index) => {
        const temp_path = item[3];
        const temp_params = item[2];
        temp_params.forEach((param, i) => {
          if (param != '') {
            const path_1 = temp_path + `.params[${i}]`;
            params_list.push(param);
            paths_list.push(path_1);
          }
        })
      });
      const temp_data = {
        library: library,
        category: 'Custom',
        name: functions[index].function_name,
        params: params_list,
        type: 'numeric',
        detail: temp_function.data,
        id: 0
      };
      setData({ ...temp_data });
      if (query === '$') {
        console.log('temp_data', temp_data);
        setRoot(temp_data);
      }
      else {
        jp.apply(root, query, value => {
          value = { ...temp_data };
          return value;
        });
      }

    }
  };

  const editChild = i => {
    let temp = index + 1;
    setIndex(temp);
    let tempQuery = query + `.params[${i}]`;
    jp.apply(root, tempQuery, value => {
      return {
        library: 'Standard',
        category: 'Math',
        name: 'Sum',
        params: ['', ''],
        type: 'numeric',
        id: temp,
      };
    });
    const tempData = jp.query(root, tempQuery);
    setData(JSON.parse(JSON.stringify(tempData[0])));
    setQuery(tempQuery);
  };

  const handleChangeText = (event, i) => {
    let temp = data;
    temp.params[i] = event;
    if (query != '$') {
      jp.apply(root, query, value => {
        value = { ...temp };
        return value;
      });
      const tempData = jp.query(root, query);
      setData(JSON.parse(JSON.stringify(tempData[0])));
    } else {
      let temp = data;
      temp.params[i] = event;
      setRoot({ ...JSON.parse(JSON.stringify(temp)) });
    }
  };

  const saveNodes = nodes => {
    setIsNode(true);
    const tempNodes = nodes.path;
    if (query != '$') {
      let temp = data;
      temp.params[nindex] = tempNodes;
      jp.apply(root, query, value => {
        value = { ...temp };
        return value;
      });
      const tempData = jp.query(root, query);
      setData(tempData[0]);
    } else {
      let tempQuery = query + `.params[${nindex}]`;
      jp.apply(root, tempQuery, value => {
        value = tempNodes;
        return value;
      });
      setData(root);
    }
  };
  const operation = (operator, param1, param2) => {
    switch (operator) {
      case 'Sum':
        return NameContract.methods.add(param1, param2).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });

      case 'Subtract':
        return NameContract.methods.sub(param1, param2).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Multiply':
        return NameContract.methods.mul(param1, param2).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Divide':
        return NameContract.methods.div(param1, param2).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Pow':
        return NameContract.methods.pow(param1, param2).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Len':
        return NameContract.methods.len(param1).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Upper':
        return NameContract.methods.toUpper(param1).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Average':
        return NameContract.methods.avg(param1, param2).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Max':
        return NameContract.methods.max(param1, param2).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Min':
        return NameContract.methods.min(param1, param2).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Contains':
        return NameContract.methods.contain(param1, param2).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Exactly matches':
        return NameContract.methods
          .exactlyMatch(param1, param2)
          .call((err, res) => {
            if (err) {
              console.log('An error occured', err);
              return '';
            }
            return res;
          });
      case 'Greater than':
        return NameContract.methods
          .greaterThan(param1, param2)
          .call((err, res) => {
            if (err) {
              console.log('An error occured', err);
              return '';
            }
            return res;
          });
      case 'Less than':
        return NameContract.methods
          .lessThan(param1, param2)
          .call((err, res) => {
            if (err) {
              console.log('An error occured', err);
              return '';
            }
            return res;
          });
      case 'MaxInArray':
        return NameContract.methods.maxInArray(param1).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'MinInArray':
        return NameContract.methods.minInArray(param1).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
      case 'Sort':
        return NameContract.methods.sort(param1).call((err, res) => {
          if (err) {
            console.log('An error occured', err);
            return '';
          }
          return res;
        });
    }
  };

  const calculate = async item => {
    if (typeof item !== 'object') {
      if (item.includes('root')) {
        const temp_query = item.replace('@root', '$');
        const result = jp.query(productData, temp_query);
        return result[0]
      }
      else {
        return item
      }
    }
    if (typeof item !== 'object') {
      return item;
    }
    if (item.detail) {
      const detail = item.detail;
      return operation(
        detail.name,
        await calculate(detail.params[0]),
        await calculate(detail.params[1]),
      );
    }
    if (item.name === 'Len' || item.name === 'Upper' || item.name === 'Trim') {
      return operation(item.name, await calculate(item.params[0]), 'Text');
    } else {
      if (item.params.length === 1) {
        return operation(
          item.name,
          await calculate(item.params[0]),
          "")
      }
      else {
        return operation(
          item.name,
          await calculate(item.params[0]),
          await calculate(item.params[1]),
        );
      }
    }
  };
  const saveFunction = async () => {
    if (query != '$') {
      const newQuery = query.split('.');
      let tempList = [];
      for (let i = 0; i < newQuery.length - 1; i++) {
        tempList.push(newQuery[i]);
      }
      const newTemp = tempList.join('.');
      setQuery(newTemp);
      const temproot = jp.query(root, newTemp);
      setData(temproot[0]);
      setLibrary(temproot[0].library);
    } else {
      console.log('root', root);
      const res = await calculate(root);
      alert(res);
      if (prevRoute === 'FirstScreen') {
        setPage(0);
        setIsDisabled(false);
        setFormulas(root);
      }
      if (prevRoute === 'Actions') {
        setPage(1);
        updateJson({ [label]: root });
      }
    }
  };
  const handleParam = (val, i) => {
    let temp = data;
    temp.params[i] = val;
    jp.apply(funcData, paths[i], value => {
      value = val;
      return value;
    });
    const temproot = jp.query(funcData, '$');
    setFuncData({ ...temproot[0] });
    temp.detail = temproot[0];
    setData({ ...temp });
    if (query === '$') {
      setRoot(temp);
    }
    else {
      jp.apply(root, query, value => {
        value = { ...temp };
        return value;
      });
    }
  }

  const back = async () => {
    if (query != '$') {
      jp.apply(root, query, value => {
        value = "";
        return value;
      });
      const newQuery = query.split('.');
      let tempList = [];
      for (let i = 0; i < newQuery.length - 1; i++) {
        tempList.push(newQuery[i]);
      }
      const newTemp = tempList.join('.');
      setQuery(newTemp);
      const temproot = jp.query(root, newTemp);
      setData(temproot[0]);
    }
    else {
      if (prevRoute === 'FirstScreen') {
        setPage(0);
        setFormulas("");
      }
      if (prevRoute === 'Actions') {
        setPage(1);
        setFormulas("");
      }
    }
  };

  const addToLibrary = async name => {
    const networkId = await web3.eth.net.getId();
    let encoded = NameContract.methods.pushFormula(name).encodeABI();
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(contract_address);
    var tx = {
      to: contract_address,
      data: encoded,
      gas: 132000,
      gasPrice,
    };
    web3.eth.accounts
      .signTransaction(
        tx,
        '0xcb88551ffb1b14059f3e2885333a2fc9670beb845d1a09520ef636a7122874e1',
      )
      .then(signed => {
        console.log('signed', signed);
        let tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

        tran.on('confirmation', (confirmationNumber, receipt) => {
          console.log('confirmation: ' + confirmationNumber);
        });

        tran.on('transactionHash', hash => {
          console.log('hash');
          console.log(hash);
        });

        tran.on('receipt', receipt => {
          console.log('reciept');
          console.log(receipt);
        });
        tran.on('error', console.error);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const cancelFunction = () => {
    if (query != '$') {
      const newQuery = query.split('.');
      let tempList = [];
      for (let i = 0; i < newQuery.length - 1; i++) {
        tempList.push(newQuery[i]);
      }
      const newTemp = tempList.join('.');
      const temproot = jp.query(root, newTemp);
      setData(temproot[0]);
      setQuery(newTemp);
    } else {
    }
  };

  const toshow = item => {
    if (item === null) {
      return '';
    } else if (item != null && item.name) {
      const params = item.params.map(param => {
        if (typeof param === 'object') {
          return toshow(param);
        } else {
          return <Text>{param}</Text>;
        }
      });

      const result = params.map((ele, i) => {
        if (i < params.length - 1) {
          return <Text key={i}>{ele},</Text>;
        } else {
          return <Text key={i}>{ele}</Text>;
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

  const getFormula = item => {
    if (item === null) {
      return '';
    } else if (item != null && item.name) {
      const params = item.params.map(param => {
        if (typeof param === 'object') {
          return getFormula(param);
        } else {
          return param;
        }
      });
      return `${item.name}(` + params.join(',') + ')';
    } else {
      return item;
    }
  };
  const selectRule = (index, item) => {
    setIsRule(true);
    if (index === -1) {
      setFormulas("");
      setRActions([]);
      setRuleName(item);
      setFuncName('');
      setFunc(null);
      setRule(null);
      setPage(0);
    }
    else {
      setFuncName('');
      setRuleName(rules[index].rule_name);
      setRuleIndex(index);
      setRule(rules[index]);
      setFormulas(rules[index].data);
      setRActions([...rules[index].rule_actions]);
      setPage(0);
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
      setPage(0);
    }
    else {
      setRuleName('');
      setFuncName(functions[index].function_name);
      setFunctionIndex(index);
      setFunc(functions[index]);
      setFormulas(functions[index].data);
      setRActions([]);
      setPage(0);
    }
  }
  const goback = (temp_query, index) => {
    const temproot = jp.query(root, temp_query);
    setData(temproot[0]);
  }
  useEffect(() => {
  }, [])

  useEffect(() => {
    if (library === 'Project' && functions.length) {
      const temp_function = functions[0];
      const temp_function_paramlist = temp_function.function_paramlist;
      setFuncData(temp_function.data);
      let paths_list = [];
      let params_list = [];
      temp_function_paramlist && temp_function_paramlist.forEach((item, index) => {
        const temp_path = item[3];
        const temp_params = item[2];
        temp_params.forEach((param, i) => {
          if (param != '') {
            const path = temp_path + `.params[${i}]`;
            params_list.push(param);
            paths_list.push(path);
          }
        })
      });
      // setFuncData({
      //   category: 'Custom',
      //   name: functions[0].function_name,
      //   params: params_list,
      //   type: 'numeric',
      //   id: 0
      // });
      const temp_data = {
        library: library,
        category: 'Custom',
        name: temp_function.function_name,
        params: params_list,
        type: 'numeric',
        detail: temp_function.data,
        id: 0
      };
      setData({ ...temp_data });
      setPaths(paths_list);
      if (query === '$') {
        setRoot({
          ...temp_data
        });
      }
      else {
        jp.apply(root, query, value => {
          return {
            library: library,
            category: 'Custom',
            name: functions[0].function_name,
            params: params_list,
            type: 'numeric',
            detail: temp_function.data,
            id: 0
          }
        });
      }

    }
    else {

    }

  }, [library])
  const initial = (data) => {
    if (data) {
      setPage(0);
      setFormulas("");
    }
  }

  return (
    <ScrollView>
      <Header currentPage={currentPage} funcName={funcName} ruleName={ruleName} data={data} result={root} query={query} goback={goback} initial={initial} selectRule={selectRule} selectFunction={selectFunction}></Header>
      <View
        style={theme === 'light' ? styles.screen : styles.screen_dark}>
        <SearchBar result={toshow(root)} />
        <Library sellibrary={library} getLibrary={getLibrary} />
        <View style={styles.category}>
          <CategoryDropDown
            library={library}
            onChangeCategory={getCategory}
            category={data.category}
          />
          <FuncDropDown
            functions={functions}
            funcName={data.name}
            onChangeFunction={onChangeFunction}
            category={data.category}
          />
        </View>
        <View style={theme === 'light' ? styles.parameters : styles.parameters_dark}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 2,
              color: theme === 'light' ? '#3333ff' : 'white',
            }}>
            Values
          </Text>
          <View style={styles.parameter}>
            {library === 'Standard' && data &&
              data.params &&
              data.params.map((item, i) => {
                return (
                  <View key={i}>
                    <View style={styles.inputBar}>
                      <Text style={{ fontSize: 18, fontWeight: '700' }}>
                        X{i}=
                      </Text>
                      <TextInput
                        mode="outlined"
                        style={styles.inputElement}
                        onChangeText={event => {
                          handleChangeText(event, i);
                        }}
                        value={getFormula(item)}
                        keyboardType={data.type}
                      />
                      <MaterialIcon
                        name="function-variant"
                        size={20}
                        color="white"
                        style={styles.funcButton}
                        onPress={() => editChild(i)}
                      />
                      <Icon
                        name="search"
                        size={18}
                        color="white"
                        style={styles.searchButton}
                        onPress={() => {
                          showTDialog(i);
                        }}
                      />
                    </View>
                    {data.category === 'Logistics' &&
                      i < 1 &&
                      data.params.length > 1 && (
                        <View style={styles.paramsField}>
                          <OperatorDropDown
                            funcName={data.name}
                            onChangeFunction={onChangeFunction}
                            category={data.category}
                          />
                        </View>
                      )}
                  </View>
                );
              })}
            {
              library === 'Project' && data.params && data.params.map((item, i) => {
                return (
                  <View key={i}>
                    <View style={styles.inputBar}>
                      <Text style={{ fontSize: 18, fontWeight: '700' }}>
                        X{i}=
                      </Text>
                      <TextInput
                        mode="outlined"
                        style={styles.inputElement}
                        onChangeText={(val) => handleParam(val, i)}
                        value={getFormula(item)}
                        keyboardType={data.type}
                      />
                      <MaterialIcon
                        name="function-variant"
                        size={20}
                        color="white"
                        style={styles.funcButton}
                        onPress={() => editChild(i)}
                      />
                      <Icon
                        name="search"
                        size={18}
                        color="white"
                        style={styles.searchButton}
                        onPress={() => {
                          showTDialog(i);
                        }}
                      />
                    </View>
                  </View>
                )
              })

            }
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.actionButton}>
            <Button
              mode="contained"
              onPress={() => saveFunction()}
              buttonColor="#3333ff">
              Save
            </Button>
          </View>
          <View style={styles.actionButton}>
            <Button
              mode="outlined"
              onPress={() => back()}
              buttonColor="white"
              textColor="#3333ff"
              style={styles.blueBorder}>
              Back
            </Button>
          </View>
        </View>

        <JsonDataDialog
          tvisible={tvisible}
          onChangeTVisible={onChangeTVisible}
          saveNodes={saveNodes}
          dataType={dataType}
        />
        <EditDataDialog
          visible={editVisible}
          onChangeEditVisible={onChangeEditVisible}
          saveNodes={addToLibrary}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
  },
  screen_dark: {
    flex: 1,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
  },
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
    marginBottom: 10,
  },
  parameters_dark: {
    backgroundColor: '#0d0d0d',
    padding: 7,
    borderRadius: 10,
    marginBottom: 10,
  },
  parameter: {
    borderRadius: 15,
    borderColor: '#3333ff',
    borderWidth: 2,
    padding: 7,
    marginBottom: 20,
    marginTop: 10,
    borderStyle: 'dashed',
  },
  paramsField: {
    alignItems: 'center',
  },
  inputBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    width: '15%',
    alignSelf: 'center',
  },
  inputElement: {
    width: '55%',
    height: 45,
    backgroundColor: 'white',
  },
  funcButton: {
    padding: 0,
    backgroundColor: '#3333ff',
    padding: 6,
    borderRadius: 5,
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
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  publishfooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  actionButton: {
    width: '50%',
    padding: 20,
  },
  publishButton: {
    // marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
  red: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonStyle: {
    backgroundColor: '#3399FF',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#3399FF',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 40,
    marginBottom: 0,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
  },
});
