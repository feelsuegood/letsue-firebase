//post-tweet-from.tsx

import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.textColor};
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.textColor};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: ${({ theme }) => theme.textColor};
  color: ${({ theme }) => theme.bgColor};
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // console.log(e);
    // console.log(e.target.value);
    // console.log("-----------------");
    // console.log(files);
    // only accept one file
    //[x] chode challenge: add size limitaiton
    if (files && files.length === 1) {
      if (files[0].size > MAX_FILE_SIZE) {
        alert("Please upload image file less than 1MB");
        e.target.value = "";
        return;
      }
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    // validation check -> if failed, kill the func
    if (!user || isLoading || tweet === "" || tweet.length > 180) {
      return;
    }
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        // user id
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(
          storage,
          // `tweets/${user.uid}-${user.displayName}/${doc.id}`,
          `tweets/${user.uid}/${doc.id}`,
        );
        try {
          const result = await uploadBytes(locationRef, file);
          // console.log(result);
          const url = await getDownloadURL(result.ref);
          await updateDoc(doc, { photo: url });
          setFile(null);
        } catch (e) {
          console.log("😱", e);
          // console.log(auth.currentUser?.uid);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTweet("");
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?"
      />
      <AttachFileButton htmlFor="file">
        {file ? "Photo added ✅" : "Add photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}
