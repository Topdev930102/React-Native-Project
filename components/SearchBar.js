import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Index({ result }) {
  const [isopen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsOpen(!isopen)}>
        <View style={styles.searchcontainer}>
          <View style={styles.searchicon}>
            <MaterialIcon name="function-variant" size={25} color="white" />
          </View>
          <View style={styles.searchbar}>
            <Text style={{ color: 'black' }}>=</Text>
            <Text>{result}</Text>
          </View>
        </View>
        {isopen ? (
          <View style={styles.detail}>
            <Text>{result}</Text>
          </View>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
  },
  searchcontainer: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: 0,
  },
  searchicon: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: 40,
    width: '18%',
    padding: 10,
    marginLeft: 5,
    borderWidth: 1,
    backgroundColor: '#3333ff',
    borderRadius: 5,
    borderColor: '#3366ff',
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '82%',
    height: 50,
    borderWidth: 1,
    borderColor: '#3366ff',
    borderRadius: 5,
    padding: 10,
    overflow: 'scroll',
    backgroundColor: 'white',
    marginLeft: 5,
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    marginTop: 3,
    marginLeft: '20%',
    width: '76%',
    height: 'auto',
    borderRadius: 5,
    borderColor: '#3366ff',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});
