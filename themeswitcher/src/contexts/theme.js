import { createContext, useContext } from "react";

// another way of declaring it : const UserContext = React.createContext(); 
// refer minicontetx project
export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {},
})

// no need to have a separate jsx file to return the provider
export const ThemeProvider = ThemeContext.Provider

// custom hook
export default function useTheme() {
    return useContext(ThemeContext);
}