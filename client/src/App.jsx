import { useEffect, useState } from "react";

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [prevAnswer, setPrevAnswer] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion(e.target.elements.question.value);
  }
  useEffect(()=>{
    const getAnswer = async () => {
      let response = await fetch(`http://127.0.0.1:5000/ask?q=${question}`)
      response = await response.json()
      setAnswer(response.answers)
      setPrevAnswer ( prev => prev + answer)
    }
    question !== '' && getAnswer()
    setQuestion('')
  },[question])

  
  return (
    <>
    <p>
      {prevAnswer}
      <br/>
      <strong>{answer}</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <input name="question" type="text" />
        <input type="submit" value="Ask" />
      </form>
    </>
  )
}

export default App;
