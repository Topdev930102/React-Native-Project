import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useStore } from '../redux/actions';
export default function Index({ sellibrary, getLibrary }) {
  const theme = useStore(state => state.theme);
  const [categoryList, setCategoryList] = useState(['Standard', 'Project']);
  const changeCategory = e => {
    getLibrary(e);
  };
  return (
    <View style={theme === 'light' ? styles.container : styles.container_dark}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          marginBottom: 5,
          color: theme === 'light' ? '#3333ff' : 'white',
        }}>
        Library
      </Text>
      <View style={styles.radiogroup}>
        {categoryList &&
          categoryList.map((e, index) => {
            return (
              <View key={index} style={styles.item}>
                <RadioButton
                  value={e}
                  status={sellibrary === e ? 'checked' : 'unchecked'}
                  onPress={() => changeCategory(e)}
                  color="#0000ff"
                />
                <Text style={styles.radioText}>{e}</Text>
              </View>
            );
          })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 7,
    marginTop: 10,
  },
  container_dark: {
    marginBottom: 12,
    backgroundColor: '#0d0d0d',
    padding: 7,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 10,
  },
  radiogroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 18,
  },
});
