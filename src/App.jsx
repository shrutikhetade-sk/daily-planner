import './css/App.css'
import {Routes, Route} from 'react-router-dom';
import Habits from './pages/Habits'
import ToDoList from './pages/ToDoList'
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar></NavBar>
    <main>
      <Routes>
        <Route path='/' element={<Habits></Habits>}></Route>
        <Route path='/todolist' element={<ToDoList/>}></Route>
      </Routes>
    </main>
    </div>
  );
}

export default App
