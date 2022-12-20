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
  const family = useStore(state => state.family);
  const theme = useStore(state => state.theme);
  const updateFamily = useStore(state => state.updateFamily)
  const updateJson = useStore(state => state.updateJson)
  const [isShowParams, setIsShowParams] = useState(false);
  const [isShowOperatorButtons, setIsShowOperatorButtons] = useState(false);
  const [action, setAction] = useState('Read');
  const [parentName, setParentName] = useState("");
  const [tvisible, setTVisible] = useState(false);
  const [cvisible, setCVisible] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [currentLabel, setCurrentLabel] = useState("name");
  const [node, setNode] = useState({})
  const [data, setData] = useState({
    category: "Math",
    name: "Sum",
    price: ["", ""],
  });
  const clearAll = () => {
    updateJson({ ...jsonVal, name: "", Color: "", Price: "", node: null });
    setNode(null);
    setIsShowParams(false)
    setIsShowOperatorButtons(false)
  }
  const showTDialog = () => {
    setTVisible(true);
  };
  const onChangeTVisible = (data) => {
    setTVisible(data);
  };
  const onChangeCVisible = (data) => {
    setCVisible(data);
  };

  const editChild = (label) => {
    setLabel(label);
    // back(2);
    // setPrevRoute("Actions")
  };

  const handleChangeText = (value, i, key) => {
    updateJson({ [key]: value });
  };

  const saveNodes = (nodes) => {
    setParentName(nodes.name);
    setIsShowOperatorButtons(true)
    setIsShowParams(true)

    if (nodes?.name === "Computer") {
      nodes = nodes?.children[0];
    }
    setNode(nodes);
    updateJson({ node: nodes });
    if (action === "Add") {
      updateJson({ name: "", Color: "", Price: "" });
      return;
    }
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
    const name = await calculate(jsonVal.name);
    const color = await calculate(jsonVal.Color);
    const price = await calculate(jsonVal.Price);
    if (jsonVal.name === "") {
      alert("Please input a name value");
      return;
    }
    if (jsonVal.Price === "" || jsonVal.Price === null) {
      alert("Please input a price value");
      return;
    }
    else if (jsonVal.Color === "") {
      alert("Please input a color value");
      return;

    }
    const node_index = family[0].children.map(e => e.id).indexOf(node.id);
    let newItem = {
      id: name + "item",
      name: name,
      path: "@root.Computer." + name,
      children: [
        {
          id: "Color",
          name: "Color",
          path: `@root.Computer.${name}.Color`,
          value: color,
        },
        {
          id: "Price",
          name: "Price",
          path: `@root.Computer.${name}.Price`,
          value: price
        },
      ]
    }
    let newFamily = JSON.parse(JSON.stringify(family));
    newFamily[0].children[node_index] = newItem;
    updateFamily(newFamily);
    const temp_data = {
      id: node_index,
      action_name: action,
      product_name: name,
      color: color,
      price: price
    };
    getData(temp_data)
  }
  useEffect(() => {
    clearAll();
  }, [])
  return (
    <View style={theme === 'light' ? styles.screen : styles.screen_dark}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.category}>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: theme === 'light' ? 'red' : 'white', fontWeight: 'bold', fontSize: 20 }}>Browse From:</Text>
          </View>
          <View style={styles.jsonSelect}>
            <Text style={styles.jsonName}>{parentName}</Text>
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
        {
          isShowParams &&
          <View style={theme === 'light' ? styles.parameters : styles.parameters_dark}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 2,
                color: "#3333ff",
              }}
            >
              Values
            </Text>
            <View style={styles.parameter}>
              <View style={styles.inputBar} >
                <Text style={{ fontSize: 18, fontWeight: "700" }}>Name</Text>
                <View style={styles.inputBar}>
                  <TextInput
                    mode="outlined"
                    style={styles.inputElement}
                    editable={false}
                    value={getFormula(jsonVal["name"]).toString()}
                  />
                  <MaterialIcon
                    name="function-variant"
                    size={20}
                    color="white"
                    style={styles.funcButton}
                  />
                  <Icon
                    name="search"
                    size={18}
                    color="white"
                    style={styles.searchButton2}
                  />
                </View>

              </View>
              {node &&
                node.children &&
                node.children.map((item, i) => {
                  return (
                    <View key={i} >
                      <View style={styles.inputBar} >
                        <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.name}</Text>
                        <View style={styles.inputBar}>
                          <TextInput
                            mode="outlined"
                            style={styles.inputElement}
                            editable={false}
                            value={getFormula(jsonVal[item.name]).toString()}
                            keyboardType={isNaN(parseInt(item.value)) ? "default" : "numeric"}
                          />
                          <MaterialIcon
                            name="function-variant"
                            size={20}
                            color="white"
                            style={styles.funcButton}
                          />
                          <Icon
                            name="search"
                            size={18}
                            color="white"
                            style={styles.searchButton2}
                          />
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
          </View>
        }
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
  contentContainer: {
    width: width
  },
  category: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10
  },
  jsonSelect: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    fontSize: 20,
    width: 350
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
    padding: 3,
    borderRadius: 10,
    marginTop: 10
  },
  parameters_dark: {
    backgroundColor: "#0d0d0d",
    padding: 3,
    borderRadius: 10,
    marginTop: 10
  },
  parameter: {
    borderRadius: 15,
    borderColor: "#3333ff",
    borderWidth: 2,
    padding: 7,
    marginBottom: 20,
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

