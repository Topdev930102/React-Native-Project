import React, { useEffect, useMemo, useState, useRef } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Button, Dialog, Switch } from "react-native-paper";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Web3 from 'web3';
import jp, { stringify } from 'jsonpath';
import contract_abi from '../constant/abi';
import contract_address from '../constant/contract_address';
import { useStore } from '../redux/actions';
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://matic-mumbai.chainstacklabs.com'),
);
const NameContract = new web3.eth.Contract(contract_abi, contract_address);
export default function Index({ isTestShow, isRule, func, rule, setTestVisible }) {
  const theme = useStore(state => state.theme);
  const [isvisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [paramlist, setParamList] = useState([]);
  const hideDialog = () => {
    setIsVisible(false);
    setTestVisible(false);
  };
  const onCancelDialog = () => {
    setIsVisible(false);
    setTestVisible(false);
    setTimeout(() => {
      setParamList([]);
      setName('');
      setValue("");
    }, 200);
  }

  const handleParam = (val, i) => {
    paramlist[i].param = val;
    setParamList([...paramlist]);
    jp.apply(data, paramlist[i].path, value => {
      value = val;
      return value;
    });
    const temproot = jp.query(data, '$');
    setData(temproot[0]);
  }
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
    if (typeof item !== 'object') return item;
    if (item.name === 'Len' || item.name === 'Upper' || item.name === 'Trim') {
      return operation(item.name, calculate(item.params[0]), 'Text');
    } else
      return operation(
        item.name,
        await calculate(item.params[0]),
        await calculate(item.params[1]),
      );
  };

  const onTestRule = async () => {
    const result = await calculate(data);
    setValue(result.toString());
    if (result) {

      let encoded;
      let gasPrice;
      let nonce;
      const action = rule.rule_actions[0];
      switch (action.action_name) {
        case 'Add':
          console.log(action.product_name, 'Acer', action.color, parseInt(action.price));
          encoded = NameContract.methods.createProductJson(action.product_name, 'Acer', action.color, parseInt(action.price)).encodeABI();
          gasPrice = await web3.eth.getGasPrice();
          nonce = await web3.eth.getTransactionCount(contract_address);
          var tx = {
            to: contract_address,
            data: encoded,
            gas: 1132000,
            gasPrice: parseInt(gasPrice * 1.1),
          };
          web3.eth.accounts
            .signTransaction(
              tx,
              '0xcb1daa868d71ec55bddf88ffd73129eaab4451e5c2a806f2fff88fc74bf7f669'
              // '0xcb88551ffb1b14059f3e2885333a2fc9670beb845d1a09520ef636a7122874e1',
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
              tran.on('errorpppppppp', console.error);
            })
            .catch(err => {
              console.log('oooooo', err);
            });
          break;
        case 'Delete':
          console.log('action', action.id);
          encoded = NameContract.methods.deleteProductJson(action.id).encodeABI();
          gasPrice = await web3.eth.getGasPrice();
          nonce = await web3.eth.getTransactionCount(contract_address);
          var tx = {
            to: contract_address,
            data: encoded,
            gas: 113200,
            gasPrice: gasPrice,
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
          break;
        case 'Change':
          encoded = NameContract.methods.updateProductJson(action.id, action.product_name, 'Acer', action.color, action.price).encodeABI();
          gasPrice = await web3.eth.getGasPrice();
          nonce = await web3.eth.getTransactionCount(contract_address);
          var tx = {
            to: contract_address,
            data: encoded,
            gas: 1132000,
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
          break;
        default:
          break;
      }

    }

  }
  useEffect(() => {
    if (isRule) {
      if (rule) {
        setName(rule.rule_name);
        const temp_rule_paramlist = rule.rule_paramlist;
        let params_list = [];
        temp_rule_paramlist && temp_rule_paramlist.forEach((item, index) => {
          const temp_path = item[3];
          const temp_params = item[2];
          temp_params.forEach((param, i) => {
            if (param != '') {
              const path = temp_path + `.params[${i}]`;
              const param_unit = {
                path: path,
                param: param
              };
              params_list.push(param_unit);
            }
          })
        })
        setParamList([...params_list]);
        setData(rule.data);
      }
    }
    else {
      if (func) {
        setName(func.function_name);
        const temp_function_paramlist = func.function_paramlist;
        let params_list = [];
        temp_function_paramlist && temp_function_paramlist.forEach((item, index) => {
          const temp_path = item[3];
          const temp_params = item[2];
          temp_params.forEach((param, i) => {
            if (param != '') {
              const path = temp_path + `.params[${i}]`;
              const param_unit = {
                path: path,
                param: param
              };
              params_list.push(param_unit);
            }
          })
        })
        setParamList([...params_list]);
        setData(func.data);
      }
    }


    if (isTestShow) {
      setIsVisible(true);
    }
    else {
      setIsVisible(false);
    }
  }, [isTestShow])

  return (
    <Dialog visible={isvisible} onDismiss={hideDialog} style={theme === 'light' ? styles.dialog : styles.dialog_dark}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Dialog.Content>
          <View style={styles.header}>
            <MaterialIcon
              name="calculator"
              size={26}
              color={theme === 'light' ? 'blue' : 'white'}
            />
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme === 'light' ? '#000000' : 'white' }}>Custom {isRule ? "Rule" : 'Function'}</Text>
          </View>
          <View style={styles.ruleName}>
            <Text style={theme === 'light' ? styles.title : styles.title_dark}>Name: </Text>
            <Text style={styles.ruleText}>{name}</Text>
          </View>
          <View style={styles.formula}>
            <Text style={theme === 'light' ? styles.title : styles.title_dark}>Parameters:  </Text>
            {
              paramlist && paramlist.map((item, i) => {
                return (
                  <View style={styles.param}>
                    <Text style={styles.label}>Param{i}: </Text>
                    <TextInput keyboardType='numeric' value={item.param} style={theme === 'light' ? styles.inputparam : styles.inputparam_dark} onChangeText={(val) => handleParam(val, i)}></TextInput>
                  </View>
                )
              })
            }
          </View>
          <View style={styles.result}>
            <Text style={styles.title}>Result: </Text>
            <Text style={styles.resultText}>
              {value}
            </Text>
          </View>
          <Dialog.Actions style={styles.footer}>
            <Button labelStyle={{ fontSize: 18 }} onPress={() => onTestRule()}>Test</Button>
            <Button labelStyle={{ fontSize: 18 }} onPress={() => onCancelDialog()}>Cancel</Button>
          </Dialog.Actions>
        </Dialog.Content>
      </ScrollView>

    </Dialog>

  );
}
const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue'
  },
  title_dark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  dialog: {
    backgroundColor: "white",
    borderRadius: 5,
    height: "65%",
    paddingTop: 10,
    zIndex: 100
  },
  dialog_dark: {
    backgroundColor: "#0d0d0d",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    height: "65%",
    paddingTop: 10,
    zIndex: 100
  },
  dialogbody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    flex: 1
  },
  ruleName: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  ruleText: {
    fontSize: 18,
  },
  param: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  label: {
    fontSize: 18
  },
  inputparam: {
    width: '70%',
    borderWidth: 1,
    padding: 2,
    paddingLeft: 10,
    fontSize: 18
  },
  inputparam_dark: {
    width: '70%',
    borderColor: 'white',
    borderWidth: 1,
    padding: 2,
    paddingLeft: 10,
    fontSize: 18
  },
  formula: {
    marginBottom: 20
  },
  formulaText: {
    fontSize: 20
  },
  result: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  resultText: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold'
  },
  footer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 10
  },
});
