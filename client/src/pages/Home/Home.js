import UploadData from '../uploadData/uploadData';
import Events from '../Events/Events';
import "./Home.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import NoUser from '../../components/NoUser/NoUser';
const Home = () => {
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const getRole = async () => {
      try {
        if (!userId) {
          console.log("Please login or register");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost/api/user/${userId}`);
        setAdmin(response.data.userRole);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    getRole();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return (
        <div>
            <NoUser/>
        </div>
    )
  }

  return (
    <div className='home-container'>
      {admin && <UploadData />}
      <Events />
    </div>
  );
};

export default Home;
