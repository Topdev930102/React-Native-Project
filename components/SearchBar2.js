import { Button, Alert } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useStore } from "../redux/actions";
export default function Index({ result }) {
  const theme = useStore(state => state.theme);
  const [isopen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsOpen(!isopen)}>
        <View style={styles.searchcontainer}>
          <View style={styles.searchbar}>
            <Text style={{
              fontSize: 20,
              color: 'black'
            }}>
              {result}
            </Text>
          </View>
        </View>
        {isopen ? (
          <View style={styles.detail}>
            <Text style={{
              fontSize: 20,
              color: 'black'
            }}>
              {result}
            </Text>
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 0,
  },
  searchicon: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    fontSize: 40,
    width: "20%",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 0,
    borderColor: "#3366ff",
  },
  searchbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#3366ff",
    borderRadius: 0,
    padding: 10,
    overflow: "scroll",
    backgroundColor: "white",
  },
  detail: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 50,
    marginTop: 3,
    width: "90%",
    borderRadius: 5,
    borderColor: "#3366ff",
    borderWidth: 1,
    padding: 8,
    backgroundColor: "white",
    zIndex: 9999
  },
});
