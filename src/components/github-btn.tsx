import {
  GithubAuthProvider,
  signInWithPopup,
  //   signInWithRedirect,
} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

const Button = styled.span`
  margin-top: 50px;
  background-color: white;
  color: #2a292a;
  width: 100%;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      //! signInWithRedirect works on deployment env
      //   await signInWithRedirect(auth, provider);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/github-logo.svg" />
      Continue with GitHub
    </Button>
  );
}
