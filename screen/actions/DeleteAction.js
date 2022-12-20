import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from '../../components/Header'
import JsonDataDialog from "../../components/JsonDataDialog";
import CagegoryDataDialog from "../../components/CategoryDataDialog";
import jp from "jsonpath";
import { Dimensions } from "react-native";
import Web3 from 'web3';
import { useStore } from '../../redux/actions';
import contract_abi from "../../constant/abi";
import contract_address from "../../constant/contract_address";
const web3 = new Web3(new Web3.providers.HttpProvider("https://matic-mumbai.chainstacklabs.com"));
const NameContract = new web3.eth.Contract(contract_abi, contract_address);
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function Index(props) {
  const { back, getData } = props;
  const jsonVal = useStore(state => state);
  const theme = useStore(state => state.theme);
  const family = useStore(state => state.family);
  const updateFamily = useStore(state => state.updateFamily)
  const updateJson = useStore(state => state.updateJson)
  const [isShowParams, setIsShowParams] = useState(false);
  const [isShowOperatorButtons, setIsShowOperatorButtons] = useState(false);
  const [action, setAction] = useState('Delete');
  const [tvisible, setTVisible] = useState(false);
  const [cvisible, setCVisible] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [currentLabel, setCurrentLabel] = useState("name");
  const [node, setNode] = useState({})
  const clearAll = () => {
    updateJson({ ...jsonVal, name: "", Color: "", Price: "", node: null });
    setNode(null);
    setIsShowParams(false)
    setIsShowOperatorButtons(false)
  }
  const onChangeTVisible = (data) => {
    setTVisible(data);
  };
  const onChangeCVisible = (data) => {
    setCVisible(data);
  };

  const saveNodes = (nodes) => {
    setIsShowOperatorButtons(true)
    if (nodes?.name === "Computer") {
      nodes = nodes?.children[0];
    }
    setNode(nodes);
    updateJson({ node: nodes });
    updateJson({ name: nodes?.name });
    if (nodes?.children && nodes.children.length) {
      for (const iterator of nodes.children) {
        updateJson({ [iterator.name]: iterator.value });
      }
    }
  };
  const saveParams = (param) => {
    updateJson({ [currentLabel]: param.path });
  }
  const cancelFunction = () => {
    back(0);
    updateJson({ name: "", Color: "", Price: "", node: null });
    // setPrevRoute("FirstScreen");
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
      return operation(item.name, await calculate(item.params[0]), 'Text');
    } else
      return operation(
        item.name,
        await calculate(item.params[0]),
        await calculate(item.params[1]),
      );
  };
  const clickSave = async () => {
    Alert.alert(
      "Confirm",
      "Do you want to delete data?",
      [
        {
          text: "YES", onPress: async () => {
            clearAll();
            const name = await calculate(jsonVal.name);
            const node_index = family[0].children.map(e => e.id).indexOf(node.id);
            console.log('node_index', node_index);
            let newFamily = JSON.parse(JSON.stringify(family));
            newFamily[0].children[node_index] = { ...newFamily[0].children[newFamily[0].children.length - 1] };
            newFamily[0].children.pop();
            updateFamily(newFamily);
            const temp_data = {
              id: node_index,
              action_name: 'Delete',
              product_name: name,
              color: "trans",
              price: "1"
            };
            getData(temp_data)
            // let encoded = NameContract.methods.deleteProductJson(node_index).encodeABI();
            // const gasPrice = await web3.eth.getGasPrice();
            // var tx = {
            //   to: contract_address,
            //   data: encoded,
            //   gas: 1132000,
            //   gasPrice,
            // }
            // web3.eth.accounts.signTransaction(tx, "0xcb88551ffb1b14059f3e2885333a2fc9670beb845d1a09520ef636a7122874e1").then(signed => {
            //   console.log("signed", signed)
            //   let tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
            //   tran.on('error', console.error);
            // })
            //   .catch(err => {
            //     console.log(err)
            //   })

          }
        },
        {
          text: "NO",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },

      ]
    );

  }


  useEffect(() => {
    clearAll();
  }, [])
  return (
    <View style={theme === 'light' ? styles.screen : styles.screen_dark}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.category}>
          <View style={styles.jsonSelect}>
            <Text style={styles.jsonName}>{getFormula(jsonVal["name"]).toString()}</Text>
            <Icon
              name="search"
              size={22}
              color="white"
              style={styles.searchButton}
              onPress={() => {
                setCVisible(true);
              }}
            />
          </View>
        </View>
        {isShowOperatorButtons && <View style={styles.publishfooter}>
          <Button
            mode="contained"
            onPress={() => clickSave()}
            buttonColor="#3333ff"
            style={styles.publishButton}
          >
            Ok
          </Button>
          <Button
            mode="contained"
            onPress={() => cancelFunction()}
            buttonColor="#3333ff"
            style={styles.publishButton}
          >
            Cancel
          </Button>
        </View>}
      </ScrollView>
      <CagegoryDataDialog
        cvisible={cvisible}
        action={action}
        onChangeCVisible={onChangeCVisible}
        saveNodes={saveNodes}
      />
      <JsonDataDialog
        tvisible={tvisible}
        onChangeTVisible={onChangeTVisible}
        saveNodes={saveParams}
        dataType={dataType}
        node={node}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    backgroundColor: 'white'
  },
  screen_dark: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    backgroundColor: 'black'
  },
  category: {
    display: "flex",
    width: width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  jsonSelect: {
    display: "flex",
    flexDirection: "row",
    width: width,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    // marginLeft: 30,
    fontSize: 20,
  },
  jsonName: {
    fontSize: 18,
    marginRight: 20,
    marginTop: 5,
    width: "50%",
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  parameters: {
    backgroundColor: "white",
    padding: 7,
    borderRadius: 10,
    marginTop: 20
  },

  parameter: {
    borderRadius: 15,
    borderColor: "#3333ff",
    borderWidth: 2,
    padding: 7,
    marginBottom: 40,
    marginTop: 10,
    borderStyle: "dashed",
  },
  paramsField: {
    alignItems: "center",
  },
  inputBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    width: "15%",
    alignSelf: "center",
  },
  inputElement: {
    width: "55%",
    height: 45,
    backgroundColor: "white",
  },
  funcButton: {
    padding: 0,
    backgroundColor: "#3333ff",
    padding: 6,
    borderRadius: 5,
  },
  searchButton: {
    padding: 0,
    backgroundColor: "#3333ff",
    padding: 8,
    borderRadius: 5,
    marginTop: 5
  },
  searchButton2: {
    padding: 0,
    backgroundColor: "#3333ff",
    padding: 8,
    borderRadius: 5,
  },
  operatorDropdown: {
    marginLeft: "12%",
  },
  dropdown1BtnStyle: {
    width: "50%",
    height: 50,
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
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  publishfooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    width: "50%",
    padding: 20,
  },
  publishButton: {
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  blueBorder: {
    borderColor: "#3333ff",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
  },
  red: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
  },

})

