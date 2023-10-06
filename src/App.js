import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerRouter from "./Routers/CustomerRouter";
import AdminsideRouter from "./Routers/AdminsideRouter";

function App() {
  // const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);
  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
        <>
          <Routes>
            <Route path="/*" element={<CustomerRouter />}></Route>
            <Route path="/admin/*" element={<AdminsideRouter />}></Route>
          </Routes>
        </>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
