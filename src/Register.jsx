import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useInstructureRegisterMutation } from './api/apiEndpoints'
import SignatureCanvas from "react-signature-canvas";


const Register = () => {
  const [instructureRegister, {isLoading}] = useInstructureRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [imageURL, setImageURL] = useState(null);
  const sigCanvas = useRef();
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [pwd, setPwd] = useState('')

  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
    sigCanvas.current.clear();
  };

  const register = async (e) => {
    e.preventDefault()
    try {
      const data = await instructureRegister({
        email,
        name,
        school,
        pwd,
        signature:imageURL
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
      <div
        className="border-2 flex flex-col p-2 bg-slate-100"
      >
        <label>Email:</label>
        <input
          type="email"
          id="email"
          // ref={emailRef}
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
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
          value={name}
          onChange={(e)=>setName(e.target.value)}
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
          value={school}
          onChange={(e)=>setSchool(e.target.value)}
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
          value={pwd}
          onChange={(e)=>setPwd(e.target.value)}
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
        <div className="bg-slate-300 mt-3">
          <h2>Draw signature</h2>

          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 350, height: 150 }}
            ref={sigCanvas}
          />
        </div>
        <hr />
        <div className="ml-auto mt-3">
          <button
            className="bg-[#787575] mr-2 text-white p-2 hover:bg-gray-300 rounded-lg"
            onClick={() => sigCanvas.current.clear()}
          >
            Clear
          </button>
          <button
            className="bg-[#787575] mr-2 text-white p-2 hover:bg-gray-300 rounded-lg"
            onClick={create}
          >
            Save
          </button>
        </div>
        <button
          onClick={register}
          className="border-2 mt-4 rounded-md shadow-lg h-12 bg-slate-700 text-white hover:bg-slate-200"
        >
          Register
        </button>
      </div>
    </section>
  );
  return content;
};

export default Register;
