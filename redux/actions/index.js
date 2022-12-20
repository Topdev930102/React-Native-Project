import create from "zustand";
import { useColorScheme } from 'react-native';
export const useStore = create(
  (set, get) => ({
    family: [],
    name: "",
    Color: "",
    Price: null,
    node: null,
    rules: [],
    theme: 'light',
    functions_name_list: [],
    rules_name_list: [],
    functions: [],
    updateFamily: (familyArr) => set((prevState) => {
      return (
        { family: familyArr }
      )
    }),
    updateJson: (json) => set((prevState) => json),
  })
)