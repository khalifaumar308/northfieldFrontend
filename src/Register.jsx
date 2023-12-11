import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useInstructureRegisterMutation } from './api/apiEndpoints'

const Register = () => {
  const [instructureRegister, {isLoading}] = useInstructureRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const register = async (e) => {
    e.preventDefault()
    try {
      const data = await instructureRegister({
        email: e.target.email.value,
        name: e.target.name.value,
        school: e.target.school.value,
        pwd: e.target.pwd.value,
      }).unwrap();
      console.log(data)
      navigate('/login')
    } catch (err) {
     console.log(err)
  }

  }
  const content = isLoading ? (
    <h1>Registering.....</h1>

  ) : (
    <section className="mt-10 p-3">
      <h1>Instructor Register</h1>
      <form className="border-2 flex flex-col p-2 bg-slate-100" onSubmit={register}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          // ref={emailRef}
          // value={email}
          // onChange={handleUserInput}
          placeholder="email@mail.com"
          autoComplete="on"
          className="p-2 rounded-lg border-2"
          required
        />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          // ref={emailRef}
          // value={email}
          // onChange={handleUserInput}
          placeholder="Instructor Name"
          autoComplete="off"
          className="p-2 rounded-lg border-2"
          required
        />
        <label htmlFor="school">School Name:</label>
        <input
          type="text"
          id="school"
          // ref={emailRef}
          // value={email}
          // onChange={handleUserInput}
          placeholder="School Name"
          autoComplete="off"
          className="p-2 rounded-lg border-2"
          required
        />
        <label htmlFor="pwd">Password:</label>
        <input
          type="password"
          id="pwd"
          // ref={emailRef}
          // value={email}
          // onChange={handleUserInput}
          placeholder="********"
          autoComplete="off"
          className="p-2 rounded-lg border-2"
          required
        />

        <label htmlFor="pwd">Re-write Password:</label>
        <input
          type="password"
          id="pwd2"
          // ref={emailRef}
          // value={email}
          // onChange={handleUserInput}
          placeholder="********"
          autoComplete="off"
          className="p-2 rounded-lg border-2"
          required
        />
        <button type="submit" className="border-2 mt-4 rounded-md shadow-lg h-12 bg-slate-700 text-white hover:bg-slate-200">
          Register
        </button>
      </form>
    </section>
  );
  return content;
};

export default Register;
