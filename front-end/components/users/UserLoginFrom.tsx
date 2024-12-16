import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginStyles from "../../styles/Login.module.css";

const UserLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [emailError, setEmailError] = useState<String | null>(null);
  const [passwordError, setPasswordError] = useState<String | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!email && email.trim() === "") {
      setEmailError("Incorrect Password or Email");
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError("Incorrect Password or Email");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const user = { email: email, password };
    const response = await UserService.loginUser(user);

    if (response.status === 200) {
      setStatusMessages([
        {
          message: "login successful",
          type: "success",
        },
      ]);

      const user = await response.json();

      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          token: user.token,
          email: user.email,
          username: user.username,
          role: user.role,
          numPosts: user.numPosts,
        })
      );
    }

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <>
      <div className={LoginStyles.page}>
        <h3 className={LoginStyles.title}>Log In</h3>

        <form onSubmit={handleSubmit} className={LoginStyles.form}>
          <label htmlFor="emailInput" className={LoginStyles.field}>
            Email
          </label>
          <div className={LoginStyles.input}>
            <input
              id="emailInput"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={LoginStyles.inputText}
            />
            {emailError && (
              <div className={LoginStyles.error}> {emailError} </div>
            )}
          </div>

          <label htmlFor="passwordInput" className={LoginStyles.field}>
            Password
          </label>
          <div className={LoginStyles.input}>
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={LoginStyles.inputText}
            />
            {passwordError && (
              <div className={LoginStyles.error}> {passwordError} </div>
            )}
          </div>
          <button type="submit" className={LoginStyles.submit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserLoginForm;
