import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "./middleware/auth/authApiSlice";
import { setCredentials } from "./middleware/auth/authSlice";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      console.log(userData);
      setEmail("");
      setPwd("");
      navigate("/");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="p-4">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1 className="text-xl text-center">Teacher Login</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-nowrap gap-4 mt-4"
      >
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          value={email}
          onChange={handleUserInput}
          placeholder="email@mail.com"
          autoComplete="off"
          className="p-2 rounded-lg border-2"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          placeholder="*****"
          value={pwd}
          className="p-2 rounded-lg border-2"
          required
        />
        <button className="border-2 mt-4 rounded-md shadow-lg h-12 bg-slate-700 text-white hover:bg-slate-200">
          Sign In
        </button>
      </form>
    </section>
  );
  return content;
}

export default Login;