import Card from 'react-bootstrap/Card';

const Dashboard = () => {
  return (
    <Card className="text-center bg-light mt-5">
      <Card.Body className='p-5 mb-5'>
        <Card.Title className='text-dark mt-5 mb-2'>
           
                  MERN Authentication  
                
        </Card.Title>
        <Card.Text className='text-primary'>
          
            Simple App To Authenticate Users 


            <br />

            You have Successfully Logged in  
        </Card.Text>


         
      </Card.Body>
    </Card>
  )
}

export default Dashboard

