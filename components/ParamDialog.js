import React, { useEffect, useMemo, useState, useRef } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Paragraph, Dialog } from "react-native-paper";
import { Table, TableWrapper, Cell, Row, Rows } from 'react-native-table-component';
import ParameterDropdown from './ParameterDropdown'
import Web3 from 'web3';
import { useStore } from '../redux/actions'
import contract_abi from '../constant/abi';
import contract_address from '../constant/contract_address';
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://matic-mumbai.chainstacklabs.com'),
);
const NameContract = new web3.eth.Contract(contract_abi, contract_address);
export default function Index({ isRule, isParamShow, functionIndex, ruleIndex, ruleName, formulas, ractions, setParamVisible, saveFormula }) {
  const theme = useStore(state => state.theme);
  const [query, setQuery] = useState('$');
  const [index, setIndex] = useState('');
  const [isvisible, setIsVisible] = useState(isParamShow);
  const [formula, setFormula] = useState(formulas);
  const [paramlist, setParamList] = useState([]);
  const [name, setName] = useState("");
  const [tdata, setTData] = useState({
    tableHead: ['Function', 'Parameter', 'Type'],
    tableData: [['1', '2', '3'], ['1', '2', '3']]
  });
  const hideDialog = () => {
    setIsVisible(false);
    setParamVisible(false);
  };

  const getData = (item, index, subIndex) => {
    let temp = paramlist;
    temp[index].types[subIndex] = item;
    setParamList([...temp]);
  }

  const extractParams = (item, path) => {
    if (item.params) {
      let objs = {};

      item.params.forEach((element, index) => {
        if (typeof element === 'object') {
          objs[index] = element;
        }
      })

      if (Object.keys(objs).length > 0) {
        Object.keys(objs).forEach((index) => {
          const element = objs[index];
          let temp_path = path + `.params[${index}]`;
          item.params[index] = '';
          item["path"] = path;
          extractParams(element, temp_path);
        })
      }
      item["path"] = path;
      item['types'] = ['default', 'default'];
      paramlist.push(item);
      setParamList(paramlist);
    }
  }

  const element = (data, index, subIndex) => {
    return <ParameterDropdown data={data} index={index} subIndex={subIndex} getData={getData}></ParameterDropdown>
  }

  const inputElement = (param, index, subIndex) => {
    return (
      <TextInput value={param} style={styles.textElement} onChangeText={(val) => {
        handleParam(val, index, subIndex);
      }} />
    )
  }


  const handleParam = (val, index, subIndex) => {
    let temp = paramlist;
    temp[index].params[subIndex] = val;
    setParamList([...temp]);
  }

  const saveRule = async () => {
    if (name === '') {
      alert("Please input rule name")
    }
    else {
      let save_params = [];
      let save_actions = [];
      for (let i = 0; i < paramlist.length; i++) {
        let item = [];
        item.push(paramlist[i].category, paramlist[i].name, paramlist[i].params, paramlist[i].path, paramlist[i].type, paramlist[i].types);
        save_params.push(item)
      }
      if (isRule) {
        for (let j = 0; j < ractions.length; j++) {
          let item = [];
          item.push(ractions[j].action_name, ractions[j].color, ractions[j].price, ractions[j].product_name);
          save_actions.push(item);
        }
      }
      let encoded;
      if (isRule) {
        encoded = NameContract.methods.updateRule(index, name, save_actions, save_params).encodeABI();
      }
      else {
        encoded = NameContract.methods.updateFunction(index, name, save_params).encodeABI();
      }
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(contract_address);
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
      Alert.alert('Successfully Saved');
      hideDialog();
      setName('');
    }
  }


  useEffect(() => {
    setParamList([]);
    if (formulas && isParamShow) {
      let obj = JSON.parse(JSON.stringify(formulas));
      extractParams(obj, query);
    }
    if (isParamShow) {
      setName(ruleName);
      if (isRule) {
        setIndex(ruleIndex);
      }
      else {
        setIndex(functionIndex);
      }
      setIndex(ruleIndex);
      setIsVisible(true);
    }
    else {
      setIsVisible(false);
    }
  }, [isParamShow])

  useEffect(() => {
    setFormula(formulas);
  }, [formulas])



  return (
    <Dialog visible={isvisible} onDismiss={hideDialog} style={theme === 'light' ? styles.dialog : styles.dialog_dark}>
      <Dialog.Content>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
          <View>
            <Text style={{ marginTop: 3 }}>Name:</Text>
          </View>
          <View></View>
          <TextInput style={theme === 'light' ? styles.ruleName : styles.ruleName_dark} value={name} onChangeText={(val) => setName(val)}></TextInput>
        </View>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: theme === 'light' ? 'black' : 'white' }}>
            <Row data={tdata.tableHead ? tdata.tableHead : []} textStyle={styles.head}></Row>
            {
              paramlist && paramlist.map((rowData, index) => {
                return rowData.params.map((item, i) => {
                  if (item != '') {
                    return (
                      <TableWrapper key={i} style={styles.row}>
                        <Cell data={rowData.name} style={styles.cellElement} textStyle={styles.celltext} />
                        <Cell data={inputElement(item, index, i)} style={styles.cellElement} textStyle={styles.celltext} />
                        <Cell data={element(rowData, index, i)} style={styles.cellElement} textStyle={styles.celltext} />
                      </TableWrapper>
                    )
                  }
                  else {
                    return <></>
                  }
                })
              })
            }
          </Table>
        </View>

      </Dialog.Content>
      <Dialog.Actions style={styles.footer}>
        <Button labelStyle={{ fontSize: 18 }} onPress={() => saveRule()}>Save</Button>
        <Button labelStyle={{ fontSize: 18 }} onPress={() => hideDialog()}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
}
const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    borderRadius: 5,
    height: "50%",
    paddingTop: 10,
    zIndex: 100
  },
  dialog_dark: {
    backgroundColor: "#0d0d0d",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    height: "50%",
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
  cellElement: {
    fontSize: 18,
    width: "33.3%",
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 30
  },
  celltext: {
    height: 20
  },
  head: {
    textAlign: 'center',
    height: 25,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
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
  ruleName: {
    borderWidth: 1,
    width: '50%',
    height: 28,
    fontSize: 14,
    marginBottom: 20,
    marginLeft: 10,
    padding: 6
  },
  ruleName_dark: {
    borderColor: 'white',
    borderWidth: 1,
    width: '50%',
    height: 28,
    fontSize: 14,
    marginBottom: 20,
    marginLeft: 10,
    padding: 6
  },
  textElement: {
    fontSize: 14,
    padding: 1
  },
  footer: {
    display: "flex",
    justifyContent: "space-around",
  },
});
