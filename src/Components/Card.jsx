import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { useNavigate } from 'react-router-dom'; 

const Card = (props) => {
  const { value, refreshUserData, position } = props;
  const [Userinfodata, setUserinfodata] = useState([]); 
  const [userName, setUserName] = useState(''); 
  const [userEmail, setUserEmail] = useState(''); 
  const [showAddForm, setShowAddForm] = useState(false); 

    
  const isAdmin = position === 'Admin';
  const isEditor = position === 'Editor';
  const isReader = position === 'Reader';



  
  const fetchUserInfo = async () => {
    try {
      const UserInfoCollection = collection(db, value); 
      const Userdata = await getDocs(UserInfoCollection); 
      const UserList = Userdata.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); 
      setUserinfodata(UserList); 
    } catch (error) {
      console.error('Error fetching User info:', error); 
    }
  };

  
  const handleUserData = async () => {
    if (!userName || !userEmail) {
      alert('Please enter both name and email.');
      return;
    }

    try {
      await addDoc(collection(db, value), {
        Name: userName,
        Email: userEmail,
        Active: true,
        Role: value, 
      });
      console.log('User added successfully!');

      
      setUserName('');
      setUserEmail('');
      setShowAddForm(false);

      
      fetchUserInfo();
    } catch (error) {
      console.error('Error adding admin: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, value, id)); 
      console.log(`Document with ID ${id} deleted.`);
      fetchUserInfo(); 
      refreshUserData();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  
  useEffect(() => {
    fetchUserInfo();
  }, [refreshUserData]);

  const Addingaction = () => (
    <div className="p-4">
      <input
        className="w-full p-2 rounded-lg border outline-none mb-2 text-black sm:w-[80%]" 
        type="text"
        placeholder="Enter Your Name"
        value={userName} 
        onChange={(e) => setUserName(e.target.value)} 
        disabled={isReader} 
      />
      <input
        className="w-full p-2 rounded-lg border outline-none mb-2 text-black sm:w-[80%]"
        type="text"
        placeholder="Enter Email"
        value={userEmail} 
        onChange={(e) => setUserEmail(e.target.value)} 
        disabled={isReader} 
      />
      <div className='flex justify-center'>
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2"
          onClick={handleUserData}
          disabled={isReader} 
        >
          Add {props.value}
        </button>
      </div>
    </div>
  );

  const handleRoleChange = async (userId, newRole, currentRole) => {
    if (!newRole) {
      alert('Please select a valid role.');
      return;
    }

    if (newRole === currentRole) {
      alert(`User is already in the ${newRole} collection.`);
      return;
    }

    try {
      
      const currentDocRef = doc(db, currentRole, userId); 
      const currentDocSnapshot = await getDoc(currentDocRef);

      if (currentDocSnapshot.exists()) {
        const userData = currentDocSnapshot.data(); 

        
        const targetDocRef = doc(db, newRole, userId); 
        await setDoc(targetDocRef, { ...userData, Role: newRole }); 
        console.log(`User moved to ${newRole} collection successfully!`);

        
        await deleteDoc(currentDocRef);
        console.log('User removed from the current collection.');

        
        fetchUserInfo(); 
        refreshUserData();
      } else {
        console.error('User document does not exist!');
      }
    } catch (error) {
      console.error('Error moving user document:', error);
    }
  };



  const toggleActiveStatus = async (userId, currentStatus) => {
    const newStatus = !currentStatus; 
  
    try {
      const userDocRef = doc(db, value, userId); 
      await updateDoc(userDocRef, {
        Active: newStatus, 
      });
  
      console.log(`User's Active status updated to ${newStatus ? 'Active' : 'Inactive'}`);
      refreshUserData();
    } catch (error) {
      console.error('Error updating Active status:', error);
    }
  };



  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5 sm:w-[490px]">
      {/* Title Section */}
      <div className="bg-red-500 text-white text-center py-4">
        <h1 className="text-xl font-bold sm:text-xl">{props.value} </h1>
      </div>

      {/* Admin Data Section */}
      <div className="p-4">
        {Userinfodata.length > 0 ? (
          Userinfodata.map((admin) => (
            <div
              key={admin.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 py-3"
            >
              {/* Admin Info */}
              <div className='mb-2 sm:mb-0'>
                <p className="text-gray-800 font-medium text-sm sm:text-base">{admin.Name}</p>
                <p className="text-gray-500 text-xs sm:text-sm">{admin.Email}</p>
              </div>

               {/* Action Buttons */}
               <div className="flex flex-wrap items-center space-x-2 mt-2 sm:mt-0">
                {/* Active Button */}
                <button
                  onClick={() => toggleActiveStatus(admin.id, admin.Active)}
                  className={`relative inline-flex items-center justify-center p-2 mb-2 ml-2 mr-2 text-sm font-bold text-white transition-all duration-300 rounded-full shadow-lg ${
                    admin.Active
                      ? 'bg-gradient-to-r from-green-500 to-green-700'
                      : 'bg-gradient-to-r from-gray-400 to-gray-600 '
                  } ${
                    isReader || isEditor ? 'opacity-50 cursor-not-allowed' : ''
                  } hover:opacity-80 hover:scale-105`}
                  disabled={isReader || isEditor} // Disable for Reader and Editor
                >
                  <span className="relative px-5 py-2 transition-all duration-300 rounded-full group-hover:bg-opacity-0 sm:px-6">
                    {admin.Active ? 'Active' : 'Inactive'}
                  </span>
                </button>
                


                <label className="block text-green-800 text-sm font-bold mb-2">
                <select
                  className="block w-full mt-2 p-2 border rounded-md shadow-sm"
                  onChange={(e) => handleRoleChange(admin.id, e.target.value, admin.Role)}
                  disabled={isReader || isEditor} // Disable for Reader and Editor
                >

                    {/* Display current role as the default selected option */}
                    <option value="">{admin.Role}</option>

                    
                    {admin.Role === "Admin" && (
                    <>
                        <option value="Editor">Editor</option>
                        <option value="Reader">Reader</option>
                    </>
                    )}
                    
                    {admin.Role === "Editor" && (
                    <>
                        <option value="Admin">Admin</option>
                        <option value="Reader">Reader</option>
                    </>
                    )}
                    
                    {admin.Role === "Reader" && (
                    <>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                    </>
                    )}
                </select>
                </label>



                <button
                  className={`bg-red-700 rounded-lg text-white text-center text-sl m-1.5 p-2 sm:text-sm ${
                    isReader ? 'opacity-50 cursor-not-allowed' : ''
                  }hover:opacity-80 hover:scale-105`}
                  onClick={() => handleDelete(admin.id)}
                  disabled={isReader} 
                >
                  Delete <i className="fab fa-youtube ml-1"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No {props.value} Users</p>
        )}
      </div>

      <div className="flex justify-center">
        {/* Show Add Form Button */}
        <button
          className="bg-green-600 rounded-full text-center text-3xl pl-3 pr-3 pb-2 mb-3 sm:text-3xl sm:pl-4 sm:pr-4 hover:opacity-80 hover:scale-105"
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={isReader}
        >
          +
        </button>
      </div>

      {/* Conditional Rendering for Add Form */}
      {showAddForm && Addingaction()}
    </div>
  );
};

export default Card;
