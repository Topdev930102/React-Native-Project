import React, { useEffect, useState, useRef, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import jp from 'jsonpath';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useStore } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index(props) {
  const functionNameList = useStore(state => state.functions_name_list);
  const rulesNameList = useStore(state => state.rules_name_list);
  const theme = useStore(state => state.theme);
  const { currentPage, data, funcName, result, query, goback, initial, action, parent, ruleName, funcNameList, ruleNameList, getData, selectRule, selectFunction } = props;
  const [paths, setPaths] = useState([]);
  const [isvisible, setIsVisible] = useState(false);
  const [item, setItem] = useState('View Source');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRule, setIsOpenRule] = useState(false);
  const previous = (temp_query, index) => {
    goback(temp_query, index);
  }

  const goHome = () => {
    initial(true);
  }

  const isOpenDropdown = () => {
    if (isOpenRule) {
      setIsOpenRule(false);
    }
    setIsOpen(!isOpen);
  }

  const isOpenRuleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
    }
    setIsOpenRule(!isOpenRule);
  }


  const showData = () => {
    setIsOpen(!isOpen);
    setIsVisible(true);
    getData(true);
  }

  const onOpenRule = (index, item) => {
    selectRule(index, item);
    setIsOpenRule(false);
  }

  const onOpenFunction = (index, item) => {
    selectFunction(index, item);
    setIsOpenRule(false);
  }


  useEffect(() => {
    let temp_paths = [];
    if (query) {
      const newQuery = query.split('.');
      let tempList = [];
      for (let i = 0; i < newQuery.length; i++) {
        tempList.push(newQuery[i]);
        const newTemp = tempList.join('.');
        const temproot = jp.query(result, newTemp);
        temp_paths.push({
          query: newTemp,
          name: temproot[0].name
        })
      }
    }
    setPaths(temp_paths);
  }, [query, result, data]);


  return (
    <View>
      <View style={theme === 'light' ? styles.container : styles.container_dark}>
        <View style={styles.navigations}>
          <MaterialIcon
            name="home"
            size={30}
            color={theme === 'light' ? "black" : 'white'}
            onPress={() => goHome()}
          />
          {ruleName ? <Text style={theme === 'light' ? styles.path : styles.path_dark}>{'> '}{ruleName}</Text> : <></>}
          {funcName ? <Text style={theme === 'light' ? styles.path : styles.path_dark}>{'> '}{funcName}</Text> : <></>}
          {paths && paths.map((path, index) => {
            return (<View key={index}>
              <Text style={theme === 'light' ? styles.path : styles.path_dark} onPress={() => previous(path.query, index)}>{'> '}{path.name}</Text>
            </View>)
          })}
          {action && (<View>
            <Text style={theme === 'light' ? styles.path : styles.path_dark}>{'> '}{action}</Text>
          </View>)}
        </View>
        {currentPage === 0 && <View style={styles.vcenter}>
          <View style={styles.vcenter}>
            <MaterialIcon
              name="function-variant"
              size={20}
              color={theme === 'light' ? "black" : 'white'}
              onPress={() => isOpenRuleDropdown()}
            />
            <MaterialIcon
              name={isOpenRule ? "chevron-up" : 'chevron-down'}
              size={20}
              color={theme === 'light' ? "black" : 'white'}
              onPress={() => isOpenRuleDropdown()}
            />
          </View>
          <View>
            <MaterialIcon
              name="dots-vertical"
              size={30}
              color={theme === 'light' ? "black" : 'white'}
              onPress={() => isOpenDropdown()}
            />
          </View>
        </View>}

      </View>
      {currentPage === 0 && isOpen && <View style={theme === 'light' ? styles.dropdown : styles.dropdown_dark}>
        <View style={styles.item}>
          <MaterialIcon
            name="basket-outline"
            size={18}
            color={theme === 'light' ? "black" : 'white'}
          />
          <Text style={theme === 'light' ? styles.text : styles.text_dark} onPress={() => showData()}>{item}</Text>
        </View>
      </View>}
      {currentPage === 0 && isOpenRule && <ScrollView style={theme === 'light' ? styles.ruledropdown : styles.ruledropdown_dark}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.newItem}>
            <MaterialIcon
              name='plus'
              size={18}
              color={theme === 'light' ? "blue" : 'white'}
            />
            <Text style={theme === 'light' ? styles.text_blue : styles.text_dark} onPress={() => onOpenRule(-1, 'New Business Rule')}>New Business Rule</Text>
          </View>
          <View style={styles.newItem}>
            <MaterialIcon
              name='plus'
              size={18}
              color={theme === 'light' ? "blue" : 'white'}
            />
            <Text style={theme === 'light' ? styles.text_blue : styles.text_dark} onPress={() => onOpenFunction(-1, 'New Function')}>New Function</Text>
          </View>
        </View>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcon
              name='calculator'
              size={18}
              color={theme === 'light' ? "blue" : 'white'}
            />
            <Text style={theme === 'light' ? styles.text : styles.text_dark}>Rules</Text>
          </View>
          <View>
            {rulesNameList && rulesNameList.map((item, index) => {
              return (
                <View style={styles.item} key={index}>
                  <MaterialIcon
                    name='circle'
                    size={3}
                    color={theme === 'light' ? "black" : 'white'}
                  />
                  <Text style={theme === 'light' ? styles.text : styles.text_dark} onPress={() => onOpenRule(index, item)}>{item}</Text>
                </View>
              )
            })}
          </View>
        </View>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcon
              name='function-variant'
              size={18}
              color={theme === 'light' ? "blue" : 'white'}
            />
            <Text style={theme === 'light' ? styles.text : styles.text_dark}>Functions</Text>
          </View>
          <View>
            {functionNameList && functionNameList.map((item, index) => {
              return (
                <View style={styles.item} key={index}>
                  <MaterialIcon
                    name='circle'
                    size={3}
                    color={theme === 'light' ? "black" : 'white'}
                  />
                  <Text style={theme === 'light' ? styles.text : styles.text_dark} onPress={() => onOpenFunction(index, item)}>{item}</Text>
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    width: "100%",
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_dark: {
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: "white",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'black',
    width: "100%",
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  ruledropdown: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 53,
    right: '10%',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    zIndex: 9999,
  },
  ruledropdown_dark: {
    backgroundColor: '#0d0d0d',
    position: 'absolute',
    top: 53,
    right: '10%',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    zIndex: 9999
  },

  dropdown: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 53,
    right: '6%',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    zIndex: 9999
  },
  dropdown_dark: {
    backgroundColor: '#0d0d0d',
    position: 'absolute',
    top: 53,
    right: '6%',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    zIndex: 9999
  },
  newItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  vcenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text_blue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
    marginLeft: 5
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5
  },
  text_dark: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5
  },
  navigations: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  red: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold'
  },
  path: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  path_dark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});
