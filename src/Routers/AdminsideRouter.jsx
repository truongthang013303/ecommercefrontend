import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useCustomHook, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Dashboard from "../adminside/pages/dashboard";
// import Team from "../adminside/pages/team";
import Bar from "../adminside/pages/bar";
// import Dashboard from "../adminside/pages/calendar";
import Contacts from "../adminside/pages/contacts";
import FAQ from "../adminside/pages/faq";
import Form from "../adminside/pages/form";
// import Geography from "../adminside/pages/geography";
import Invoices from "../adminside/pages/invoices";
import Line from "../adminside/pages/line";
import Pie from "../adminside/pages/pie";
import Topbar from "../adminside/pages/global/Topbar";
import Sidebar from "../adminside/pages/global/Sidebar";
// import TestView from "../adminside/pages/testview";
import Orders from "../adminside/pages/Orders/Orders";
import Product from "../adminside/pages/Product/Product";
import Category from "../adminside/pages/Category/Category";
// import Users from "../adminside/pages/User/Users";
import Users from "../adminside/pages/users/Users";

const AdminsideRouter = () => {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  // const [mode, setMode] = useCustomHook();

  return (
    <ColorModeContext.Provider value={colorMode}>
    {/* <ColorModeContext.Provider value={setMode}> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar}/>
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* <Route path="/team" element={<Team />} /> */}
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              {/* <Route path="/calendar" element={<Calendar />} /> */}
              {/* <Route path="/geography" element={<Geography />} /> */}
              <Route path="/order" element={<Orders />} />
              <Route path="/product" element={<Product />} />
              <Route path="/category" element={<Category />} />
              {/* <Route path="/user" element={<Users />} /> */}
              <Route path="/users" element={<Users />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AdminsideRouter;
