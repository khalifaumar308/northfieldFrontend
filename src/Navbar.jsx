import {logo} from "./assets"
const Navbar = () => {
  return (
    <div className="flex flex-row p-3">
      <img className="w-20" src={logo} />
      <a href="/login" className=" p-3 border-1
       rounded-sm bg-slate-800 text-white w-20 ml-8 mr-8">
        Login
      </a>
      <a href="/register" className="p-3 border-1 rounded-sm bg-slate-800 text-white w-24 mr-8">
        Register
      </a>
    </div>
  );
}

export default Navbar