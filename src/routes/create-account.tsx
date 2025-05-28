import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Form, Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-component";

// const errors = {
//   "auth/email-already-in-use": "That email already exists",
// };

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  // update this form to use react-hook-form after finishing the course
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      // create an account
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(credentials.user);
      // set the name of the user
      await updateProfile(credentials.user, { displayName: name });
      // redirect to the homepage
      navigate("/");
    } catch (e) {
      // setError
      // console.log(e);
      if (e instanceof FirebaseError) {
        //* code is important
        // console.log(e.code, e.message);
        setError(e.message.replace("Firebase: ", ""));
      }
    } finally {
      setLoading(false);
    }

    // console.log(name, email, password);
  };
  return (
    <Wrapper>
      <Title>Join Sueweeter 🍭</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          onChange={onChange}
          type="submit"
          value={isLoading ? "Loading..." : "Create an Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account?&nbsp;<Link to={"/login"}>Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
