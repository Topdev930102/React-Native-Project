import React, { useEffect } from "react";
import { View } from "react-native";
import Header from '../components/Header'
import CreateAction from '../screen/actions/CreateAction';
import ReadAction from '../screen/actions/ReadAction';
import UpdateAction from '../screen/actions/UpdateAction';
import DeleteAction from '../screen/actions/DeleteAction';

export default function Index({ currentPage, ruleName, setPrevRoute, setPage, setLabel, setAction, setRActions, ractions, action }) {

  const initial = (data) => {
    if (data) {
      setPage(0);
    }
  }

  const back = (data) => {
    setPage(data);
  }

  const getData = (res) => {
    const temp = ractions;
    temp.push(res);
    console.log('temp', temp);
    setRActions([...temp]);
    setPage(0);
  }

  const getLabel = (label) => {
    setLabel(label);
    setPrevRoute('Actions');
  }
  const ActionComponent = () => {
    switch (action) {
      case "Add":
        return <CreateAction back={back} getData={getData} getLabel={getLabel} />
        break;
      case "Browse":
        return <ReadAction back={back} getData={getData} />
        break;
      case "Change":
        return <UpdateAction back={back} getData={getData} getLabel={getLabel} />
        break;
      case "Delete":
        return <DeleteAction back={back} getData={getData} />
        break;
      default:
        return <CreateAction back={back} getData={getData} getLabel={getLabel} />
    }
  }

  return (
    <View>
      <Header currentPage={currentPage} ruleName={ruleName} initial={initial} action={action} />
      <ActionComponent />
    </View>
  )
}
