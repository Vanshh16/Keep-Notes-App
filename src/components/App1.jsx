import { Routes, Route } from 'react-router-dom';
import App from './App';
import Post from './Post';

function App1() {
 return (
    <>
       <Routes>
          <Route path="/" element={<App />} />
          <Route path="/post" element={<Post />} />
       </Routes>
    </>
 );
};

export default App1;