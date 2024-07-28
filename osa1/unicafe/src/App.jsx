import { useState } from 'react'

const Header = (props) => {
  console.log(props.header)
  return (
    <h1>
      {props.header}
    </h1>
  )
}

const Button = (props) => {
  console.log(props)
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const average = (good, neutral, bad, all) => {
  return (good - bad) / all
}

const positives = (good, all) => {
  return good / all * 100
}

const Statistics = (props) => {
  console.log(props)
  return (
  <div>
    average {average(props.good, props.neutral, props.bad, props.all)}<br />
    positive {positives(props.good, props.all)} %
  </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(good + updatedNeutral + bad)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(good + neutral + updatedBad)
  }

  return (
    <div>
      <Header header={'give feedback'} />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header header={'statistics'} />

      good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {all}<br />
      <Statistics good={good} neutral={neutral} bad={neutral} all={all} />
    </div>
  )
}

export default App
