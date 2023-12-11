import { useState } from "react"
import { useSaveStudentMutation } from "../api/apiEndpoints";
import { useDispatch } from "react-redux";
import { PDFViewer, renderToFile, PDFDownloadLink } from "@react-pdf/renderer";
import { Template2 } from "../formTemplates";


const Template2Form = () => {
  const [details, setDetails] = useState({})
  const [ctopic, setCtopic] = useState('')
  const [ca1, setCa1] = useState(0)
  const [ca2, setCa2] = useState(0)
  const [proj, setProj] = useState(0)
  const [exam, setExam] = useState(0);
  const [average, setAverage] = useState('')
  const [comment, SetComment] = useState('')
  const [topics, setTopics] = useState({})
  const [specailAreas, setSpecialAreas] = useState({});
  const [sudent, setStudent] = useState({})
  const [specailArea, setSpecialArea] = useState('')
  const [affectiveAss, setAffectiveAss] = useState({})
  const [preview, setPreview] = useState(false);
  const [download, setDownload] = useState(false);
  const [saveStudentMutation, { isLoading }] = useSaveStudentMutation();


  const saveDetail = (e) => {
    e.preventDefault()
    let capturedDetail = {}
    Object.keys(e.target).forEach(key => (capturedDetail[e.target[key].name] = e.target[key].value))
    setDetails(capturedDetail) 
  }

  const saveTopic = () => {
    const topicData = {
      CA1: ca1,
      CA2: ca2,
      Proj: proj,
      exam,
      average,
      comment
    }
    setTopics({ ...topics, [ctopic]: topicData })
    setCtopic('')
    setCa1(0)
    setCa2(0)
    setAverage('')
    SetComment('')
  }

  const saveSpecialArea = (e) => {
    e.preventDefault()
    let capturedDetail = {};
    Object.keys(e.target).forEach(
      (key) => (capturedDetail[e.target[key].name] = e.target[key].value)
    );
    setSpecialAreas({...specailAreas, [specailArea]:capturedDetail}); 
  }
  const saveAffectiveAss = (e) => {
    e.preventDefault()
    setAffectiveAss({ ...affectiveAss, [e.target.assesment.value]: e.target.rating.value })
  }
  const save = async () => {
    const studentData = {
      details: {
        ...details,
        signature: JSON.parse(sessionStorage.getItem("teacherDetails"))
          .signature,
      },
      subjects: topics,
      specailAreas:specailAreas,
      affectiveAssesment: affectiveAss,
      template:2
    };
    await saveStudentMutation(studentData);
  };
    const buttons = () => (
      <div className="flex sm:ml-[25%] mt-10">
        <button
          className="bg-green-500 hover:bg-green-300 text-white rounded-xl p-2 mt-6 mr-5"
          onClick={save}
        >
          Send Result
        </button>
        <button
          onClick={() => setPreview(!preview)}
          className="mr-5 hover:bg-green-300 bg-green-500 text-white rounded-xl p-2 mt-6"
        >
          Preview
        </button>
        <button
          onClick={() => setDownload(!download)}
          className="bg-green-500 hover:bg-green-300 text-white rounded-xl p-2 mt-6"
        >
          Download
        </button>
      </div>
    );
  const content = isLoading ? (<h1>Sending mail</h1>):(
    <div>
      <h1>NORTHFIELD MONTESSORI RESULT PORTAL</h1>
      <div className="bg-slate-100 m-3 border shadow-sm items-center flex flex-col">
        <form
          onSubmit={saveDetail}
          // style={{ display: view ? "none" : "flex" }}
          className="flex-col align-middle items-center p-4 flex"
        >
          <h2 className="text-2xl mb-2 text-orange-500">
            Teacher/Student Details
          </h2>
          <label htmlFor="teacher">Teacher Name</label>
          <input
            id="teacher"
            name="teacher"
            placeholder="Teacher name"
            className=" p-2 mb-2"
          />
          <label htmlFor="name">Student Name</label>
          <input
            id="name"
            name="name"
            placeholder="student name"
            className=" p-2 mb-2"
          />
          <label htmlFor="class">Class</label>
          <input
            id="class"
            name="class"
            placeholder="student class"
            className=" p-2 mb-2"
          />
          <label htmlFor="absent">Days Absent</label>
          <input
            id="absent"
            name="absent"
            placeholder="Days Absent"
            type="number"
            className=" p-2 mb-2"
          />
          <label htmlFor="email">Parent Email</label>
          <input
            id="email"
            name="email"
            placeholder="Parent email"
            type="email"
            className=" p-2 mb-2"
          />
          <button className="bg-orange-500 w-24 rounded-xl hover:bg-orange-300">
            save
          </button>
        </form>
      </div>
      <div className="p-8 bg-slate-100 m-3 border shadow-sm">
        {/* <form className="flex flex-col"> */}
        <label htmlFor="subject" className="mb-2">
          Subject
          <input
            name="subject"
            value={ctopic}
            onChange={(e) => setCtopic(e.target.value)}
            className=" p-1 ml-2 mb-2"
          />
        </label>
        <div>
          <label htmlFor="CA1">CA1:</label>
          <input
            name="CA1"
            placeholder="00"
            className="w-12 p-1 ml-2"
            type="number"
            value={ca1}
            onChange={(e) => setCa1(Number(e.target.value))}
          />
          <label htmlFor="CA2" className="ml-2">
            CA2:
          </label>
          <input
            name="CA2"
            placeholder="00"
            className="w-12 p-1 ml-2"
            type="number"
            value={ca2}
            onChange={(e) => setCa2(Number(e.target.value))}
          />
          <label htmlFor="Proj" className="ml-2">
            Proj:
          </label>
          <input
            name="Proj"
            placeholder="00"
            className="w-12 p-1 ml-2"
            type="number"
            value={proj}
            onChange={(e) => setProj(Number(e.target.value))}
          />
          <label htmlFor="exam" className="ml-2">
            Exam:
          </label>
          <input
            name="exam"
            placeholder="00"
            className="w-12 p-1 mt-2"
            type="number"
            value={exam}
            onChange={(e) => setExam(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="average" className="ml-2">
            Average:
          </label>
          <input
            name="average"
            placeholder="00:[00, 00]"
            className=" mb-3 w-34  p-1 mt-2"
            type="text"
            value={average}
            onChange={(e) => setAverage(e.target.value)}
          />
          <label className="" htmlFor="comment">
            Comment:
          </label>
          <textarea
            name="comment"
            placeholder="Comment"
            autoCorrect="on"
            spellCheck
            className=" 
            p-1 mt-4 w-[100%]"
            value={comment}
            onChange={(e) => SetComment(e.target.value)}
          />
        </div>
        <button
          onClick={saveTopic}
          className="bg-orange-500 text-white p-3 mt-4 w rounded-xl hover:bg-orange-300 w-[100%]"
        >
          Save Subject
        </button>
      </div>
      <div className="p-5 shadow-sm border m-3 bg-slate-100">
        <h1 className="mb-4 text-orange-500 text-xl text-center">
          Special Areas
        </h1>
        <label htmlFor="area">Area</label>
        <input
          name="area"
          placeholder="Special Area"
          className="p-2 mt-2 w-full h-10"
          value={specailArea}
          onChange={(e) => setSpecialArea(e.target.value)}
        />
        <form onSubmit={saveSpecialArea}>
          <div className="mt-3">
            <label htmlFor="behavior">Behavior:</label>
            <input name="behavior" placeholder="S" className="w-8 ml-2 p-2" />
            <label className="ml-2" htmlFor="effort">
              Effort:
            </label>
            <input name="effort" placeholder="S" className="w-8 ml-2 p-2" />
            <label className="ml-2" htmlFor="skill">
              Skill:
            </label>
            <input name="skill" placeholder="S" className="w-8 ml-2 p-2" />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-xl shadow-md mt-4 ml-[80%]"
          >
            Save
          </button>
        </form>
      </div>
      <div className="p-5 shadow-sm border m-3 bg-slate-100">
        <h1 className="mb-4 text-orange-500 text-xl text-center">
          Affective Assesments
        </h1>
        <form className="flex flex-col" onSubmit={saveAffectiveAss}>
          <label htmlFor="assesments">
            Assesment:
            <input name="assesment" placeholder="S" className="w-52 ml-2 p-2" />
          </label>
          <label className="ml-2 mt-3" htmlFor="rating">
            Rating:
            <input name="rating" placeholder="S" className="w-8 ml-2 p-2" />
          </label>
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-xl shadow-md mt-4 ml-[80%]"
          >
            Save
          </button>
        </form>
      </div>
      <button
        onClick={save}
        className="bg-green-500 mt-10 rounded-xl p-3 shadow-lg text-white ml-[50%]"
      >
        Save Record
      </button>
    </div>
  );

  return preview ? (
    <div className="w-full">
      <PDFViewer showToolbar>
        <Template2 />
      </PDFViewer>
      {buttons()}
    </div>
  ) : download ? (
    <div>
      <PDFDownloadLink document={<Template2 />} fileName="northfield.pdf">
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <button className="ml-[40%] mt-8 border-2 p-2 bg-orange-400">
              Download
            </button>
          )
        }
      </PDFDownloadLink>
      {buttons()}
    </div>
  ) : (
    content
  );
}

export default Template2Form