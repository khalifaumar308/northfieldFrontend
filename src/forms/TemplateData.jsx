import { useState, useEffect } from "react"
import { useSaveClassDataMutation } from "../api/apiEndpoints";
import { selectCurrentUser } from "../middleware/auth/authSlice";
import { useSelector } from "react-redux";
import { Template1, Template2 } from "../formTemplates";
import { useSaveStudentMutation } from "../api/apiEndpoints";
import { useDispatch } from "react-redux";
import { PDFViewer } from "@react-pdf/renderer";

// import { useDispatch } from "react-redux";


const TemplateData = () => {
  const [topic, setTopic] = useState('')
  const [subTopic, setSubTopic] = useState('')
  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState([]);
  const [statuss, setStatuss] = useState([]);
  const [notes, setNotes] = useState([]);
  const [sclass, setSclass] = useState("");

  const [subTopics, setSubTopics] = useState([])
  const [topics, setTopics] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [absent, setAbsent] = useState(0)
  
  const [template1, setTemplate1] = useState(true)
  //template2
  const [subject, setSubject] = useState('')
  const [subjects, setSubjects] = useState([])
  const [template, setTemplate] = useState(0)
  const [chooseTemplate, setChooseTemplate] = useState(false)

  const [preview, setPreview] = useState(false)
  const [viewButtons, setViewButtons] = useState(false)
  const [saveStudentMutation, saveData] = useSaveStudentMutation();
  
  const userData = JSON.parse(localStorage.getItem('userData')).user

  const areas = [
    "LIBRARY",
    "PHYSICAL EDUC.",
    "SCIENCE & NATURE",
    "ARTS",
  ]
  const ass = [
    "Neatness",
    "Following Instructions",
    "Independence",
    "Self Control",
    "Punctuality",
  ];

  const user = useSelector(selectCurrentUser);

  const [saveClassData, { isLoading, isSuccess, isError, error }] =
    useSaveClassDataMutation();
  
  // const { data:data, isFetching } = useGetClassDataQuery(sclass);

  const topicDivs = topics.map(({ topic, subtopics }, id) => {
    return (
      <div key={id} className="flex flex-col m-2 mt-4 bg-slate-100 p-2">
        <div className="bg-green-400 border-black border">{topic}</div>
        {id === 0 && (
          <div className="flex">
            <div className="w-2/3"></div>
            <div className="w-[10%]">Status</div>
            <div className="w-[30%]">Notes</div>
          </div>
        )}
        {subtopics.map(({ name, questions }, idq) => {
          return (
            <div key={idq} className="flex w-full border border-black">
              <div className="w-[30%] border-r border-black">{name}</div>
              <div className="flex flex-col w-full">
                {questions.map((ques, idqs) => {
                  return (
                    <div key={idqs} className="flex w-full">
                      <div className="w-[50%] border-r border-b border-black">
                        {ques}
                      </div>
                      <input
                        type="text"
                        name={`${id};${idq};${idqs};status`}
                        className="pl-1 w-[10%] border-r border-b border-black"
                      />
                      <input
                        type="text"
                        name={`${id};${idq};${idqs};notes`}
                        className="w-[40%] border-b border-black pl-1"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  })

  const saveReultTemplate1 = (e) => {
    e.preventDefault()
    const assesments = [];

    Object.keys(e.target).forEach(element => {
      const field = e.target[element]
      if (field.name) {
        const items = field.name.split(";");
        if (items[0] === "ass") {
          const assesment = {
            assessment: ass[Number(items[1])],
            rating: field.value,
          };
          assesments.push(assesment);
        } else {

          const [topicId, subtopicId, qid, heading] = field.name.split(";");
          topics[Number(topicId)]["subtopics"][Number(subtopicId)][heading][
            Number(qid)
          ] = field.value;
        }
      }
    });
    const details = {
      name,
      email,
      absent,
      teacher: userData.name,
      signature: userData.signature,
      class: sclass
    };
    console.log(details)
    const data = { details, topics, assesment:assesments };
    sessionStorage.setItem('data', JSON.stringify(data))
    document.getElementById('template1form').reset()
    setName('')
    setEmail('')
    setAbsent(0)
    setViewButtons(true)
    // console.log(topics)
  }

  const subjectDivs = subjects.map((sbj, id) => {
    return (
      <div key={id} className="flex w-full">
        <div className="w-[20.2%] border-y border-black border-r p-1 border-l">{sbj}</div>
        <input
          name={`${sbj};CA1`}
          type="number"
          min={0}
          max={15}
          className="border-black border-r w-[7%] p-1 border-b"
        />
        <input
          name={`${sbj};CA2`}
          type="number"
          min={0}
          max={15}
          className="border-black border-r w-[7%] p-1 border-b"
        />
        <input
          name={`${sbj};Proj`}
          type="number"
          min={0}
          max={10}
          className="border-black border-r w-[7%] p-1 border-b"
        />
        <input
          name={`${sbj};exam`}
          type="number"
          min={0}
          max={60}
          className="border-black border-r w-[9%] p-1 border-b"
        />
        <input
          name={`${sbj};total`}
          type="number"
          min={0}
          max={100}
          className="border-black border-r w-[8%] p-1 border-b"
        />
        <input
          name={`${sbj};average`}
          type="text"
          className="border-black border-r w-[12%] p-1 border-b"
        />
        <input
          name={`${sbj};comment`}
          type="text"
          className="border-black border-r border-b w-[30%]"
        />
      </div>
    );
  })

  const saveResultTemplate2 = (e) => {
    e.preventDefault()
    const specailAreas = {}
    areas.map(area => {
      const dt = { behavior: "", effort: "", skill: "" };
      specailAreas[area] = dt
    })
    const t2subjects = {}
    const assesments = []
    subjects.forEach(sb=>t2subjects[sb]={})
    Object.keys(e.target).forEach(element => {
      const field = e.target[element]
      if (field.name) {
        const items = field.name.split(';')
        if (items[0] === 'ass') {
          const assesment = { assessment:ass[Number(items[1])], rating:field.value };
          assesments.push(assesment)
        } else if (items[0] === 'area') {
          specailAreas[items[1]][items[2]] = field.value
        } else {
          const [sb, heading] = items
          t2subjects[sb][heading] = field.value
        }
      }
    });
    const details = {
      name,
      email,
      absent,
      teacher: userData.name,
      signature: userData.signature,
      class: sclass,
    };
    const data = {
      details,
      subjects: t2subjects,
      specailAreas,
      affectiveAssesment: assesments,
    };
    sessionStorage.setItem('data', JSON.stringify(data))
    document.getElementById('template2form').reset()
    setName('')
    setEmail('')
    setAbsent(0)
    setViewButtons(true)
    // console.log(topics)
  }

  const saveToApi = async (tpl) => {
    try {
      if (tpl === '1') {
        const userData = await saveClassData({ data:topics, template:tpl, class:sclass }).unwrap();
        console.log('saved', isSuccess, userData)
      } else {
        const dt = await saveClassData({ data: subjects, template:tpl, class:sclass }).unwrap();
        console.log(dt, isSuccess, 'saved')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const searchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/user/data?class=${sclass}`);
      if (res.status != 200) {
        alert("Class Data is not saved, proceed to choose template")
        setChooseTemplate(true)
        return []
      }
      const data = await res.json()
      console.log(data)
      if (data.template == '1') {
        setTopics(data.data)
        setTemplate('1')
      } else {
        setSubjects(data.data)
        setTemplate('2')
      }
    } catch (error) {
      console.log(error)
    }
    // console.log(await response.json())
    // console.log(response.status)
  }
  const areasDivs = areas.map((area, id) => {
    return (
      <div key={id} className="flex w-full">
        <div className="w-[39.8%] text-xs border-black border-b border-l">
          {area}
        </div>
        <input
          name={`area;${area};behavior`}
          className="w-[20%] text-xs border-black border-b border-l"
        />
        <input
          name={`area;${area};effort`}
          className="w-[20%] text-xs border-black border-b border-l"
        />
        <input
          name={`area;${area};skill`}
          className="w-[20%] text-xs border-r border-black border-b border-l"
        />
      </div>
    );
  });

  const assDivs = ass.map((ass, id) => {
    return (
      <div key={id} className="flex w-full">
        <div className="w-[60%] pl-1 border-black text-xs border-x border-b">
          {ass}
        </div>
        <input
          name={`ass;${id}`}
          className="w-[40%] border-black text-xs border-x border-b"
        />
      </div>
    );
  })

  const buttons = () => (
    <div className="flex mt-8 m-4 align-middle items-center">
      <button onClick={sendresult} className="text-white shadow-md p-2 rounded-md shadow-black bg-red-950 ml-4">
        Send Result
      </button>
      <button onClick={()=>setPreview(true)} className="text-white shadow-md p-2 rounded-md shadow-black bg-red-950 ml-4">
        Preview
      </button>
      <button
        onClick={() => setPreview(false)}
        className="p-2 text-white shadow-md rounded-md shadow-black bg-red-950 ml-4"
      >
        Return TO Form
      </button>
    </div>
  );

  const sendresult =async () => {
    const data = JSON.parse(sessionStorage.getItem('data'))
    await saveStudentMutation({...data, template:Number(template)})
  } 

  const content = saveData.isLoading?<h1>Sending Result</h1>:(
    <main>
      <section className="m-3 mb-6 bg-slate-100 p-2 flex align-middle items-center">
        <label>Class:</label>
        <input
          className="mr-3 ml-2 m-2 border-blue-100 border"
          placeholder="class"
          value={sclass}
          onChange={(e) => setSclass(e.target.value)}
        />
        <div className={`${!chooseTemplate && "hidden"}`}>
          <label>Template:</label>
          <select
            value={template}
            onChange={(e) => {
              setTemplate(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="0">---choose---</option>
            <option value="1">Montessori</option>
            <option value="2">Grade</option>
          </select>
        </div>
        <button
          onClick={searchData}
          className="ml-2 text-white bg-red-500 shadow-xl rounded-md p-1 shadow-gray hover:bg-red-300"
        >
          Search Data
        </button>
      </section>
      <section
        className={
          template === "1" ? "bg-slate-100 m-4 p-2 flex flex-col" : "hidden"
        }
      >
        <div className="flex flex-col">
          <label>
            Topic
            <input
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="ml-2 border border-black p-1 mr-2 mb-4"
            />
          </label>

          <label>
            Subtopic
            <input
              placeholder="Oral English"
              value={subTopic}
              onChange={(e) => setSubTopic(e.target.value)}
              className="ml-2 border border-black p-1 mr-2 mb-4"
            />
          </label>
        </div>
        <div className="flex align-middle items-center mb-6">
          <label>Note</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="ml-2 border border-black p-1 mr-2 mb-4"
          />
          <button
            onClick={() => {
              setQuestions([...questions, question]);
              setQuestion("");
              setStatuss([...statuss, ""]);
              setNotes([...notes, ""]);
            }}
            className="text-white bg-red-400 shadow-md rounded-md p-1 shadow-gray hover:bg-red-300"
          >
            Save
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              const sbData = {
                name: subTopic,
                questions: questions,
                status: statuss,
                notes: notes,
              };
              setSubTopics([...subTopics, sbData]);
              setSubTopic("");
              setQuestions([]);
              setStatuss([]);
              setNotes([]);
            }}
            className="text-white bg-red-400 shadow-md rounded-md p-1 shadow-gray hover:bg-red-300 mr-8"
          >
            Save Subtopic
          </button>
          <button
            onClick={() => {
              const topicData = { topic, subtopics: subTopics };
              setTopics([...topics, topicData]);
              setTopic("");
              setSubTopics([]);
            }}
            className="text-white bg-green-800 shadow-md rounded-md p-1 shadow-gray hover:bg-green-300"
          >
            Save Topic
          </button>
        </div>
        <button
          onClick={() => {
            saveToApi("1");
            console.log(topics);
          }}
          className="text-white bg-green-800 shadow-md rounded-md p-1 shadow-gray hover:bg-green-300 mt-8"
        >
          Save Class Data
        </button>
        {isLoading && <h1>Saving......</h1>}
      </section>
      <section className={template === "2" ? "bg-slate-100 m-4 p-2" : "hidden"}>
        <label>Subject:</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-1 ml-2"
          placeholder="Subject"
        />
        <button
          onClick={() => {
            setSubjects([...subjects, subject]);
            setSubject("");
          }}
          className="ml-2 text-white bg-red-400 shadow-md rounded-md p-1 shadow-gray hover:bg-red-300"
        >
          Save
        </button>
        <button
          onClick={() => {
            console.log(subjects, 1234567);
            saveToApi("2");
            console.log(subjects);
          }}
          className="text-white bg-green-800 shadow-md ml-4 rounded-md p-1 shadow-gray hover:bg-green-300 mt-8"
        >
          Save Class Data
        </button>
        {isLoading && <h1>Saving......</h1>}
      </section>
      <section className="bg-slate-100 mt-8 p-3 flex">
        <label>
          Name:
          <input
            name="details;name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student Name"
            className="p-1"
          />
        </label>
        <label className="ml-2">
          Absent days:
          <input
            name="details;absent"
            type="number"
            value={absent}
            onChange={(e) => setAbsent(e.target.value)}
            placeholder=""
            className="w-8 ml-2 p-1"
          />
        </label>
        <label className="ml-2">
          Email(parent):
          <input
            name="details;email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@mail.com"
            className=" ml-2 p-1"
          />
        </label>
      </section>
      <section id="template 1" className={template === "1" ? "flex" : "hidden"}>
        <form id="template1form" onSubmit={saveReultTemplate1}>
          {topicDivs}
          <div className=" ml-4 mt-14 mb-5">
            <div className="text-center items-center w-full flex border-black border bg-green-400 ">
              <div className="w-[60%] ">AFFECTIVE ASSESMENT</div>
              <div className="border-black border-l p-1 w-[40%]">RATING</div>
            </div>
            {assDivs}
          </div>
          <button
            type="submit"
            className="text-white ml-4 bg-red-600 p-1 rounded-md shadow-md shadow-gray"
          >
            Save Result{" "}
          </button>
        </form>
      </section>
      <section
        className={template === "2" ? "flex flex-col p-2 mt-6" : "hidden"}
      >
        <div className="flex text-sm w-full bg-green-500 border-black border">
          <div className="w-[20%] p-1">SUBJECT</div>
          <div className="w-[7%] p-1 border-black border-l">CA1(15)</div>
          <div className="w-[7%] p-1 border-black border-l">CA2(15)</div>
          <div className="w-[7%] p-1 border-black border-l">Proj(10)</div>
          <div className="w-[9%] p-1 border-black border-l">EXAM(60)</div>
          <div className="w-[8%] p-1 border-black border-l">TOTAL</div>
          <div className="w-[12%] p-1 border-black border-l">
            AVERAGE;[RANGE]
          </div>
          <div className="w-[30%] p-1 border-black border-l">
            TARGETS/COMMENT
          </div>
        </div>
        <div className="w-full flex flex-col text-xs">
          <form onSubmit={saveResultTemplate2} id="template2form">
            {subjectDivs}
            <div className="flex">
              <div className="w-[50%] p-2 flex flex-col mt-10">
                <div className="bg-green-400 p-1">SPECIAL AREAS</div>
                <div className="flex">
                  <div className="w-[40%] border-black border-l border-r border-b"></div>
                  <div className="w-[20%] text-xs p-1 border-black border-r border-b">
                    BEHAVIOR
                  </div>
                  <div className="w-[20%] text-xs p-1 border-black border-r border-b">
                    EFFORT
                  </div>
                  <div className="w-[20%] text-xs p-1 border-black border-r border-b">
                    SKILL
                  </div>
                </div>
                {areasDivs}
              </div>
              <div className="w-[15%]"></div>
              <div className="w-[35%] mt-14">
                <div className="text-center items-center w-full flex border-black border bg-green-400 ">
                  <div className="w-[60%] ">AFFECTIVE ASSESMENT</div>
                  <div className="border-black border-l p-1 w-[40%]">
                    RATING
                  </div>
                </div>
                {assDivs}
              </div>
            </div>
            <button className="text-sm mt-6 hover:bg-red-400 text-white bg-red-600 p-1 rounded-md shadow-md shadow-gray">
              Save Result
            </button>
          </form>
        </div>
      </section>
      <section className={`${template !== "2" && "hidden"}`}></section>
      {buttons()}
    </main>
  );

  return preview ? (
    <div>
      <PDFViewer>
      {template === '1'?<Template1 /> : <Template2 />}
      </PDFViewer>
      {buttons()}
    </div>): content
}

export default TemplateData