import { useState } from "react"
import { useGetClassDataQuery, useSaveClassDataMutation } from "../api/apiEndpoints";
import { useDispatch } from "react-redux";


const TemplateData = () => {
  const [topic, setTopic] = useState('')
  const [subTopic, setSubTopic] = useState('')
  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState([]);
  const [statuss, setStatuss] = useState([]);
  const [notes, setNotes] = useState([]);

  const [subTopics, setSubTopics] = useState([])
  const [topics, setTopics] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [absent, setAbsent] = useState(0)
  
  const [template1, setTemplate1] = useState(true)
  //template2
  const [subject, setSubject] = useState('')
  const [subjects, setSubjects] = useState([])

  const [saveClassData, { isLoading, isSuccess, isError, error }] =
    useSaveClassDataMutation();

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
    Object.keys(e.target).forEach(element => {
      const field = e.target[element]
      if (field.name) {
        const [topicId, subtopicId, qid, heading] = field.name.split(";");
        topics[Number(topicId)]["subtopics"][Number(subtopicId)][heading][
          Number(qid)
        ] = field.value;
      }
    });
    const details = {
      name, email, absent
    }
    const data = {details, topics}
    sessionStorage.setItem('data', JSON.stringify(data))
    document.getElementById('template1form').reset()
    setName('')
    setEmail('')
    setAbsent(0)
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
    const t2subjects = {}
    subjects.forEach(sb=>t2subjects[sb]={})
    Object.keys(e.target).forEach(element => {
      const field = e.target[element]
      if (field.name) {
        const [sb, heading] = field.name.split(';')
        t2subjects[sb][heading] = field.value
      }
    });
    const details = {
      name, email, absent
    }
    const data = {details, subjects:t2subjects}
    sessionStorage.setItem('data', JSON.stringify(data))
    document.getElementById('template2form').reset()
    setName('')
    setEmail('')
    setAbsent(0)
    // console.log(topics)
  }

  const saveToApi = async (data) => {
    try {
      const userData = await saveClassData({ topics, template:'1', class:"sf2" }).unwrap();
      console.log('saved', isSuccess)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <section className={template1 ? "bg-slate-100 m-4 p-2" : "hidden"}>
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
            saveToApi(topics)
            console.log(topics);
          }}
          className="text-white bg-green-800 shadow-md rounded-md p-1 shadow-gray hover:bg-green-300 mt-8"
        >
          Save Class Data
        </button>
        {isLoading&&<h1>Saving......</h1>}
      </section>
      <section className={!template1 ? "bg-slate-100 m-4 p-2" : "hidden"}>
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
      <section id="template 1" className={template1 ? "flex" : "hidden"}>
        <form id="template1form" onSubmit={saveReultTemplate1}>
          {topicDivs}
          <button
            type="submit"
            className="bg-red-600 p-1 rounded-md shadow-md shadow-gray"
          >
            Save Result{" "}
          </button>
        </form>
      </section>
      <section className={!template1 ? "flex flex-col p-2 mt-6" : "hidden"}>
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
            <button className="text-sm mt-6 hover:bg-red-400 text-white bg-red-600 p-1 rounded-md shadow-md shadow-gray">
              Save Result
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default TemplateData