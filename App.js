import React, { useEffect, useState } from "react";
import { View } from "react-native";
import HomeScreen from "./screen";
import FirstScreen from "./screen/firstscreen";
import ActionScreen from "./screen/actionscreen";
import { useColorScheme } from 'react-native';
import { useStore } from './redux/actions'
export default function App() {
    const theme = useColorScheme();
    const updateJson = useStore(state => state.updateJson);
    const [currentPage, setCurrentPage] = useState(0)
    const [isDisabled, setIsDisabled] = useState(true);
    const [isRule, setIsRule] = useState(true);
    const [funcName, setFuncName] = useState('');
    const [ruleName, setRuleName] = useState('New Business Rule');
    const [functions, setFunctions] = useState([]);
    const [formulas, setFormulas] = useState("");
    const [prevRoute, setPrevRoute] = useState("FirstScreen")
    const [label, setLabel] = useState("");
    const [currentAction, setCurrentAction] = useState('');
    const [ractions, setRActions] = useState([]);
    useEffect(() => {
        updateJson({ theme: theme })
    }, [currentPage])

    useEffect(() => {

    }, [currentAction])
    return (
        <View>
            {currentPage === 0 && <FirstScreen
                currentPage={currentPage}
                isDisabled={isDisabled}
                isRule={isRule}
                funcName={funcName}
                ruleName={ruleName}
                functions={functions}
                formulas={formulas}
                setFuncName={setFuncName}
                setRuleName={setRuleName}
                setPage={setCurrentPage}
                setAction={setCurrentAction}
                setFunctions={setFunctions}
                setFormulas={setFormulas}
                setRActions={setRActions}
                setIsRule={setIsRule}
                ractions={ractions}
            />}
            {currentPage === 1 && <ActionScreen
                currentPage={currentPage}
                funcName={funcName}
                ruleName={ruleName}
                setPage={setCurrentPage}
                setPrevRoute={setPrevRoute}
                setLabel={setLabel}
                setAction={setCurrentAction}
                setRActions={setRActions}
                ractions={ractions}
                action={currentAction}
            />}
            {currentPage === 2 && <HomeScreen
                currentPage={currentPage}
                prevRoute={prevRoute}
                funcName={funcName}
                ruleName={ruleName}
                functions={functions}
                label={label}
                setIsDisabled={setIsDisabled}
                setPage={setCurrentPage}
                setFormulas={setFormulas}
            />}
        </View>
    )
}

