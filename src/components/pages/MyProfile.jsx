import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { getLoggedInUser } from "../services/AuthApi";
import Error from "../ApiStatus/Error";
import Navbar from "../Layout/Navbar";
import {format} from "date-fns"
import { useNavigate, Link } from "react-router-dom";
import Loading from "../ApiStatus/Loading";


const MyProfile = ({  }) => {
    const accessToken = localStorage.getItem('access_token');
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError } = useQuery(
    ["user", accessToken],() => getLoggedInUser(),
    {
      enabled: !!accessToken, 
    }
  );

  const handleLogout = () =>{
    localStorage.removeItem('access_token');
    queryClient.invalidateQueries('user');
    navigate("/")
}


  if (isLoading) {
    return <Loading/>;
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
        {user.isAdmin && (
          <div>
            <p>{user.role}</p>

            <Link to="/admintools">admin tools</Link>

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
