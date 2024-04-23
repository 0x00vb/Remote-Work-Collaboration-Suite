import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mobile } from '../../utils/Responsive';

import { loginUser, signinUser } from '../../api/auth';

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(90, 90, 90, 0.774);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primaryBackground};
  box-shadow: 0px 10px 12px 1px gray;
  ${mobile({ width: "75%"})}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 16px;
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
  border: 1px solid gray;
  border-radius: 10px;
  transition: all 0.3s;
  &:focus{
    border: 0.5px solid ${({ theme }) => theme.darkPurple};
    box-shadow: 0 0 3px ${({ theme }) => theme.darkPurple};
  }
`;

const Button = styled.button`
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.sidebarBackground};
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 10px;
  &:hover{
    
  }

  &:disabled{
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`

const Login = ({ setLoginVisible }) => {
    const [loginPage, setLoginPage] = useState(true);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setLoginVisible(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await loginUser(username, password);
        if(response.status === 200){
          localStorage.setItem('token', response.data.token);
          const test = localStorage.getItem('token');
          handleSuccess(response.data.message);
          setIsLoading(false);
          setTimeout(() => {
              navigate('/');
          }, 1000);
        }else{
          handleError(response.data.message);
        }
        setUsername("");
        setPassword("");
    }

    const handleSignin = async (e) => {
        e.preventDefault();
        if(password != confirmPassword){
            handleError("Passwords don't match!");
            return;
        }
        const { status, message } = await signinUser(email, username, password);
        if (status === 200) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(message);
        }
        setEmail("");
        setUsername("");
        setPassword("");
        setCPassword("");
    }

    const handleError = (err) => {
        toast.error(err, {
          position: "bottom-left",
        });
      }
    
      const handleSuccess = (msg) => {
        toast.success(msg, {
          position: "bottom-right",
        });
      }

  return (
    <Container>
      {
        loginPage ?
          <Wrapper ref={wrapperRef}>
            <Title>Login</Title>
            <Form>
              <Input placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
              <Input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
              <Button onClick={handleLogin}>Login</Button>
              
              <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
              <Link onClick={() => setLoginPage(false)}>CREATE A NEW ACCOUNT</Link>
            </Form>
          </Wrapper>
        : 
        <Wrapper ref={wrapperRef}>
          <Title>Register</Title>
          <Form>
            <Input placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <Input placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
              <Input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
              <Input placeholder="Confirm password" type="password" value={confirmPassword} onChange={e => setCPassword(e.target.value)}/>
              <Button onClick={handleSignin}>Sign in</Button>
              
              <Link onClick={() => setLoginPage(true)}>Already have an account?</Link>
          </Form>
        </Wrapper>
      }
      <ToastContainer/>
    </Container>
  )
}

export default Login
