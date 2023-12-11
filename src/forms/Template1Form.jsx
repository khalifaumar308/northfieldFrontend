import { useState, useRef } from "react"
import { useSaveStudentMutation } from "../api/apiEndpoints";
import { useDispatch } from "react-redux";
import { PDFViewer, renderToFile, PDFDownloadLink } from "@react-pdf/renderer";
import Template1 from "../formTemplates/Template1";

const Template1Form = () => {
  const savedTopic = sessionStorage.getItem('topic')
  const savedSubTopic = sessionStorage.getItem("subtopic");
  const subTopicss = JSON.parse(sessionStorage.getItem('subtopics'))
  const topics = JSON.parse(sessionStorage.getItem("topics"));
  const [view, setView] = useState(false)
  const [detail, setDetail] = useState({ name: '', class: '', teacher: '', email:'' })
  const [topic, setTopic] = useState(savedTopic?savedTopic:'')
  const [subTopic, setSubTopic] = useState(savedSubTopic ? savedSubTopic : "");
  const [questions, setQuestions] = useState([])
  const [subTopics, setSubTopics] = useState(subTopicss?subTopicss: [])
  const [Topics, setTopics] = useState(topics ? topics : []);
  const [assesment, setAssessment] = useState([])

  const [saveStudentMutation, { isLoading }] = useSaveStudentMutation();
  const dispatch = useDispatch();
  const [openModel, setOpenModal] = useState(false);
  const sigCanvas = useRef();
  const [imageURL, setImageURL] = useState(null);

  const [preview, setPreview] = useState(false)  
  const [download, setDownload] = useState(false)

  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
    setOpenModal(false);
  };

  const saveDetail = (e) => {
    e.preventDefault()
    const dt = {
      name: e.target.name.value,
      class: e.target.class.value,
      teacher: e.target.teacher.value,
      email: e.target.email.value,
      absent: e.target.absent.value,
    };
    setDetail(dt);

    sessionStorage.setItem('details', JSON.stringify(dt))
    console.log(detail)
    setView(!view)
  }

  const saveQuestion = (e) => {
    e.preventDefault()
    const quest = {
      question: e.target.question.value,
      status: e.target.status.value,
      note: e.target.note.value
    }
    setQuestions([...questions, quest])
    e.target.question.value = '';
    e.target.status.value = '';
    e.target.note.value = '';
  }

  const saveSubTopic = () => {
    const savedSTopics = JSON.parse(sessionStorage.getItem("subtopics"));
    const toUse = savedSTopics? savedSTopics: []
    // console.log(savedSTopic)
    const subtopics = [...toUse, { [subTopic]: questions }];
    sessionStorage.setItem('subtopics',JSON.stringify(subtopics));
    setSubTopics(subTopics)
    sessionStorage.removeItem('subtopic')
    setSubTopic('')
  };

  const saveTopic = () => {
    const savedTopic = JSON.parse(sessionStorage.getItem("topics"));
    const toUse = savedTopic ? savedTopic : []
    const topics = [
      ...toUse,
      { [topic]: JSON.parse(sessionStorage.getItem("subtopics")) },
    ];
    sessionStorage.setItem('topics', JSON.stringify(topics));
    setTopics(topics)
    sessionStorage.removeItem('topic')
    sessionStorage.removeItem("subtopic");
    setTopic('')
  };

  const saveAssesment = (e) => {
    e.preventDefault()
    const ass = {
      assesment: e.target.assesment.value,
      rating: e.target.rating.value
    }
    setAssessment([...assesment, ass])
    e.target.assesment.value = "";
    e.target.rating.value = "";
  }

  const saveStudent = async () => {
    const topics = JSON.parse(sessionStorage.getItem('subjects'))
    let stds = JSON.parse(sessionStorage.getItem('students'))
    stds = stds ? stds : []
    const dtls = JSON.parse(sessionStorage.getItem("details"))
    const student = {
      details: {
        ...dtls,
        signature: JSON.parse(sessionStorage.getItem("teacherDetails"))
          .signature,
      },
      topics: JSON.parse(sessionStorage.getItem("topics")),
      assesment: assesment,
      template: 1,
    };
    try {
      await saveStudentMutation(student)
      const stdss = [...stds, student]
      sessionStorage.setItem('students', JSON.stringify(stdss))
      sessionStorage.removeItem("topic");
      sessionStorage.removeItem("topics");
      sessionStorage.removeItem("subtopic");
      sessionStorage.removeItem("subtopics");
    } catch (error) {
      console.log(error)
    }
  }

  const buttons = () => (
    <div className="flex sm:ml-[25%] mt-10">
      <button
        className="bg-green-500 hover:bg-green-300 text-white rounded-xl p-2 mt-6 mr-5"
        onClick={saveStudent}
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

  const content = isLoading ? (
    <h1>Sending Result...</h1>
  ) : (
    <div className="p-6 flex flex-col">
      <h1>NORTHFIELD MONTESSORI RESULT PORTAL</h1>
      <div className=" border shadow-sm items-center flex flex-col bg-slate-100">
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
            className="p-2 mb-2"
          />
          <label htmlFor="name">Student Name</label>
          <input
            id="name"
            name="name"
            placeholder="student name"
            className="p-2 mb-2"
          />
          <label htmlFor="class">Class</label>
          <input
            id="class"
            name="class"
            placeholder="student class"
            className="p-2 mb-2"
          />
          <label htmlFor="absent">Days Absent</label>
          <input
            id="absent"
            name="absent"
            placeholder="Days Absent"
            type="number"
            className="p-2 mb-2"
          />
          <label htmlFor="email">Parent Email</label>
          <input
            id="email"
            name="email"
            placeholder="Parent email"
            type="email"
            className="p-2 mb-2"
          />
          <button className="bg-orange-500 p-2 text-white w-24 rounded-xl hover:bg-orange-300">
            save
          </button>
        </form>
      </div>
      <div className="mt-6 border-2 p-3">
        <div>
          <div className="flex flex-col items-center bg-slate-100">
            <h1 className="text-2xl mb-2 text-orange-500">Topic Details</h1>
            <div className="flex-col align-middle items-center p-2 flex">
              <label>Topic Name</label>
              <input
                placeholder="Topic Name"
                value={topic}
                onChange={(e) => {
                  const ctopic = e.target.value;
                  sessionStorage.setItem("topic", ctopic);
                  setTopic(ctopic);
                }}
                className="p-2 mb-2"
              />
              <label>Sub-topic </label>
              <input
                placeholder="sub-topic"
                value={subTopic}
                onChange={(e) => {
                  const cSubTopic = e.target.value;
                  sessionStorage.setItem("subtopic", cSubTopic);
                  setSubTopic(cSubTopic);
                }}
                className="p-2 mb-2"
              />
              <form onSubmit={saveQuestion} className="flex flex-col">
                <label>Question</label>
                <textarea
                  name="question"
                  placeholder="question"
                  className="p-1"
                />
                <label>status</label>
                <input name="status" placeholder="status" className="p-1" />
                <label>Note</label>
                <textarea name="note" placeholder="Note" className="p-1 w-56" />
                <button className="bg-orange-500 mb-4 text-white p-2 mt-2 rounded-xl hover:bg-orange-300 w-[100%]">
                  Save Question
                </button>
              </form>
            </div>
          </div>
          <div className="flex items-center align-middle ">
            <button
              className="mr-6 bg-orange-500 text-white rounded-xl p-2"
              onClick={saveSubTopic}
            >
              Save Sub-topic
            </button>
            <button
              className="mr-6 bg-orange-500 text-white rounded-xl p-2 w-28"
              onClick={saveTopic}
            >
              Save topic
            </button>
          </div>
          {/* <label>Topic:</label>
          <input placeholder="topic"  /> */}
        </div>
      </div>
      <div className="border-2 mt-4 bg-slate-100 p-2 flex flex-col align-middle items-center">
        <h2 className="text-2xl mb-2 text-orange-500">Effective Assessment</h2>
        <form onSubmit={saveAssesment} className="flex flex-col">
          <label htmlFor="assesment">
            Assessment
            <input
              placeholder="Assesment"
              name="assesment"
              id="assesment"
              className=" p-1 w-56 ml-4"
            />
          </label>
          <label htmlFor="rating" className="mt-2">
            Rating
            <input
              className="p-1 w-56 ml-4"
              placeholder="rating"
              name="rating"
              id="rating"
            />
          </label>
          <button className=" bg-orange-500 text-white rounded-xl p-2 mt-3">
            Save Assesment
          </button>
        </form>
      </div>
      {buttons()}
    </div>
  );

  return preview ? (
    <div className="w-full">
      <PDFViewer showToolbar>
        <Template1 />
      </PDFViewer>
      {buttons()}
    </div>
  ) : download ? (
    <div>
      <PDFDownloadLink document={<Template1 />} fileName="northfield.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : <button className="ml-[40%] mt-8 border-2 p-2 bg-orange-400">Download</button>
        }
      </PDFDownloadLink>
      {buttons()}
    </div>
  ) : (
    content
  );
}

export default Template1Form