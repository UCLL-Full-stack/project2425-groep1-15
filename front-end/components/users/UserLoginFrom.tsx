import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

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

  const handleSubmit = async (event) => {
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

      localStorage.setItem(
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
      <h3>Log In</h3>
      {statusMessages && (
        <div>
          <ul>
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailInput" className="block mb-2 text-sm font-medium">
          Email
        </label>
        <div>
          <input
            id="emailInput"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError && <div className="test-red-800"> {emailError} </div>}
        </div>

        <label
          htmlFor="passwordInput"
          className="block mb-2 text-sm font-medium"
        >
          Password
        </label>
        <div>
          <input
            id="passwordInput"
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordError && (
            <div className="text-red-800"> {passwordError} </div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UserLoginForm;
