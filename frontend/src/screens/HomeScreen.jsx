import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {

  const { userInfo } = useSelector((state) => state.auth )
  const navigate = useNavigate()

  useEffect(()=>{
      if(userInfo){
          console.log("userInfo : ",userInfo)
          navigate('/dashboard')
      }

  }, [navigate, userInfo])
  return (
    <Card className="text-center bg-light mt-5">
      <Card.Body className='p-5 mb-5'>
        <Card.Title className='text-dark mt-5 mb-2'>
           
                  MERN Authentication  
                
        </Card.Title>
        <Card.Text className='text-dark'>
          
            Simple App To Authenticate Users 
         
        </Card.Text>
        <LinkContainer to='/login'>
           <Button className='mt-2' variant="primary">Login</Button>
        </LinkContainer>
        
            <br /><br />

        <LinkContainer to="/register">
           <Button variant="primary">Register</Button>
        </LinkContainer>
         
      </Card.Body>
    </Card>
  );
}

export default HomeScreen;