import './Style.css';
import {Routes,Route} from "react-router-dom"
import AddItem from './Component/Additem';
import Header from './Component/Header';
import Home from './Component/Home';
import UpdateItem from "./Component/UpdateItem";

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/additem' element={<AddItem/>}/>
            <Route path="/edit/:id" element={<UpdateItem />} />
        </Routes>
    </div>
  );
}

export default App;
