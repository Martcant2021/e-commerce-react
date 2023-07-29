import React from "react";
import { useQuery } from "react-query";
import { getLoggedInUser } from "../services/AuthApi";
import Error from "../ApiStatus/Error";
import Navbar from "../Layout/Navbar";
import {format} from "date-fns"
import { useNavigate} from "react-router-dom";


const MyProfile = ({  }) => {
  const accessToken = localStorage.getItem('access_token');
  const navigate = useNavigate()

  const { data: user, isLoading, isError } = useQuery(
    ["user", accessToken],() => getLoggedInUser(),
    {
      enabled: !!accessToken, 
    }
  );

  const handleLogout = () =>{
    localStorage.removeItem('access_token');
    navigate("/")
}


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Error message="Error fetching user data" />;
  }

  return (
    <div>
      <Navbar/>
      <div className="my-profile-container">
        <div className="my-profile-header">
          <h2>My Profile</h2>
        </div>
        {user && (
          <div key={user.id} className="user-info"> 
            <img src={user.avatar} alt={user.avatar} className="user-avatar" />
            <h2>Information</h2>
            <p>Name: {user.name}</p>
            <p>email: {user.email}</p>
            <p>Created At: {" "}{format(new Date(user.creationAt), "dd-MM-yyyy")}</p>

          </div>
        )}
        <button onClick={handleLogout} className="logout-link">
          Logout
        </button>

      </div>
    </div>
  );
};

export default MyProfile;
