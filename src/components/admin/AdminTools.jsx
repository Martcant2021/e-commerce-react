import { useQuery } from 'react-query';
import Loading from '../ApiStatus/Loading';
import Error from '../ApiStatus/Error';
import Navbar from '../Layout/Navbar';
import { getLoggedInUser } from "../services/AuthApi";
import CreateProduct from './CreateProduct';
import CreateCategory from './CreateCategory';




const AdminTools = () => {

  const { data: user, isLoading, isError } = useQuery('user', getLoggedInUser);


  if (isError || !user?.isAdmin) {
    return <Error message={"error"}/>
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
        <Navbar/>
      <h2>Admin Tools</h2>
      <CreateProduct />
      <CreateCategory />
    </div>
  );
};

export default AdminTools;
