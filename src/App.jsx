import { useState } from 'react'
import './App.css'
import Card from './Components/Card'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function App() {
  const [refreshData, setRefreshData] = useState(false);
  const location = useLocation();  
  const { role } = location.state || {};  
  const value = role;
  const navigate = useNavigate();

  
  const refreshUserData = () => {
    setRefreshData(!refreshData); 
  };

  const backfunc = () =>{
    navigate('/');
  };

  return (
    <>
      <div className="bg-cyan-700 text-white min-h-screen p-5">
      {/* Header Section */}
      <div className="flex justify-center items-center border-b-2 border-gray-100 pb-3">

            <button 
        className="absolute top-0 left-2 sm:top-0 sm:left-5 border-4 border-yellow-400 rounded-lg px-1 py-2 mt-2.5 text-xs 
        sm:text-lg font-bold bg-white text-black shadow-lg hover:opacity-80 hover:scale-105"
        onClick={backfunc}
      >
        🡸 BACK
      </button>

      {/* Main Heading */}
      <h1 className="text-base sm:text-3xl font-semibold text-center sm:text-left">
        🌟 Administration System 🌟
      </h1>

      {/* Role Display */}
      <div className="absolute top-0 right-1 sm:top-0 sm:right-5 border-4 border-yellow-400 rounded-lg px-0.9 py-2 mt-2.5 text-xs sm:text-lg bg-white text-black shadow-lg">
        <p className="font-bold">👤{role}</p>
      </div>
      </div>
      <div className='flex justify-evenly flex-col sm:flex-row sm:justify-evenly'>
     
      <Card value="Admin" refreshUserData={refreshUserData}  position= {role} />
      <Card value="Editor" refreshUserData={refreshUserData} position= {role}/>
      <Card value="Reader" refreshUserData={refreshUserData} position= {role}/>
    </div>
    </div>
    </>
  )
}

export default App
