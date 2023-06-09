import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";


const ProfileScreen = () =>{
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.auth )

    const [updateProfile, {isLoading}] = useUpdateUserMutation()

    useEffect(()=>{
       setName(userInfo.name)
       setEmail(userInfo.email)

    }, [userInfo.name, userInfo.email])

    const submitHandler = async(e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
        }else{
            try{
                const res = await updateProfile({name, email, password}).unwrap()
                // setName(res.name)
                // setEmail(res.email)
                console.log(" Res : ", res);
                dispatch(setCredentials(res))
                toast.success('Successfully Updated')
                // navigate('/profile')
            }catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }        
    }

    return(
        <FormContainer> 
            <h2 className="text-center">Update Profile</h2>

            <Form onSubmit={ submitHandler }> 
            <Form.Group className="my-2" controlId='email'>
                    <Form.Label>Name</Form.Label>

                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={ (e)=> setName(e.target.value) }></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId='email'>
                    <Form.Label>Email Address</Form.Label>

                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={ (e)=> setEmail(e.target.value) }></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId='password'>
                    <Form.Label>New Password</Form.Label>
                    
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={ (e)=> setPassword(e.target.value) }></Form.Control>
                </Form.Group>


                <Form.Group className="my-2" controlId='confirm-password'>
                    <Form.Label>Confirm New Password</Form.Label>
                    
                    <Form.Control type="password" placeholder="Enter Password Again" value={confirmPassword} onChange={ (e)=> setConfirmPassword(e.target.value) }></Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary' className='w-100 mt-3'>
                    Update 
                </Button>

               
            </Form>
        </FormContainer>
    )
}

export default ProfileScreen