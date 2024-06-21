import {Route, Routes} from 'react-router-dom';
import TopBar from './scenes/global/Topbar';
import SideBar from './scenes/global/Sidebar';
import Team from './scenes/team';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Form from './scenes/form';
import Pie from './scenes/pie';
import Bar from './scenes/bar';
import PieSubject from './scenes/pieSubject';
import PieDepartment from './scenes/pieDepartment';
import Line from './scenes/line';
import BarDepartment from './scenes/barDepartment';
import CSVUploadPage from './scenes/csv-upload';
import Dashboard from './scenes/dashboard';


function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <div className='app'>
      <SideBar/>
      <div className='content'>
        <TopBar/>
        <Routes>
          <Route path="/team" element={<Team/>}/>
          <Route path="/form" element={<Form/>}/>
          <Route path="/pie" element={<Pie/>}/>
          <Route path="/bar" element={<Bar/>}/>
          <Route path="/barDepartment" element={<BarDepartment/>}/>
          <Route path="/pieSubject" element={<PieSubject/>}/>
          <Route path="/pieDepartment" element={<PieDepartment/>}/>
          <Route path="/line" element={<Line/>}/>
          <Route path="/csv-upload" element={<CSVUploadPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
