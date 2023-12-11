import SignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate()
  const sigCanvas = useRef();
  const [imageURL, setImageURL] = useState(null);
  const [teacherName, setTeacherName] = useState('');
  const [sclass, setsClass] = useState('')
  const [template, setTemplate] = useState(1)
  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
  };
  const saveDetails = () => {
    const details = {
      name: teacherName,
      class: sclass,
      template,
      signature: imageURL
    }
    sessionStorage.setItem('teacherDetails', JSON.stringify(details))
    navigate(`/template${template}`)
  }
  return (
    <main>
      <section className="mt-32 p-6 text-center flex flex-col">
        <h1 className="text-orange-500 text-2xl shadow-sm">
          NORTHFIED MONTESSORI REPORT CARD PORTAL
        </h1>
        <div className="flex flex-col align-middle items-start ml-4">
          <label className="-ml-4 flex align-middle">Teacher Name:</label>
          <input
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Name"
            className="ml-3 bg-slate-100 p-2 mt-2"
          />
          <label className="-ml-4">
            Class:
            <input
              value={sclass}
              onChange={(e) => setsClass(e.target.value)}
              placeholder="montesorri 1"
              className="ml-3 bg-slate-100 p-2 mt-2"
            />
          </label>
          <label className="-ml-4 mt-3">
            Template:
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="bg-slate-100"
            >
              <option>--choose--</option>
              <option>1</option>
              <option>2</option>
            </select>
          </label>
        </div>
        <div className="bg-slate-100 mt-3">
          <SignatureCanvas
            penColor="blue"
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
          onClick={saveDetails}
          className="mt-4 w-full p-3 rounded-md hover:bg-orange-300 bg-orange-500 text-white text-lg"
        >
          Continue
        </button>
        {/* <img src={imageURL} alt="signature" className="signature" /> */}
      </section>
    </main>
  );
};

export default LandingPage;
