import {Route, Routes} from 'react-router-dom';
import TopBar from './scenes/global/Topbar';
import SideBar from './scenes/global/Sidebar';
import Team from './scenes/team';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Form from './scenes/form';
import Pie from './scenes/pie';
import LoginPage from './scenes/login';
import { Provider } from 'react-redux';
import store from './scenes/redux';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <Provider store={store}>
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <div className='app'>
      <SideBar/>
      <div className='content'>
        <TopBar/>
        <Routes>
        <Route path="/" element={<LoginPage/>}/>
          <Route path="/team" element={<Team/>}/>
          <Route path="/form" element={<Form/>}/>
          <Route path="/pie" element={<Pie/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </div>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
