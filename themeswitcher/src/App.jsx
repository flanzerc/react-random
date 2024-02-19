
import { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/theme'
import ThemeBtn from './components/ThemeBtn';
import Card from './components/Card';

function App() {

  const [themeMode, setThemeMode] = useState("light");

  // define the function body here. make sure the functions names are same as created inside the theme context file
  // const ThemeContext = creteContext({themeMode: "light", lightTheme: () => {}, darkTheme: () => {}})
  const lightTheme = () => {
    setThemeMode("light");
  }
  
  const darkTheme = () => {
    setThemeMode("dark");
  }

  // handle change in the theme
  useEffect(() => {
    const allClassList = document.querySelector('html').classList;
    // console.log(allClassList);
    
    allClassList.remove('light', 'dark');
    allClassList.add(themeMode);
  }, [themeMode])

  return (
    <>
        <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
          <div className="flex flex-wrap min-h-screen items-center">
            <div className="w-full">
                <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                    <ThemeBtn />
                </div>

                <div className="w-full max-w-sm mx-auto">
                    <Card />
                </div>
            </div>
          </div>
        </ThemeProvider>

    </>
  )
}

export default App
