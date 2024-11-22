import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  const [user, setUser] = useState("")
  useEffect (() =>{
    const userEmail = localStorage.getItem('UserEmail')
    if(userEmail){
      setUser(userEmail)
    }
  },[])
  return (
    // <Router>
      <Routes>
         <Route path='/login' element= {<Login  setUser= {setUser}/>}/>
         <Route path='/signup' element={<Signup  setUser= {setUser}/>}/>
       {user &&(<>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
       </>
       )}
       {/* Fallback for unauthorized access */}
       {!user && <Route path="*" element={<Login setUser={setUser} />} />}
      </Routes>
    // </Router>
  );
}

export default App;
