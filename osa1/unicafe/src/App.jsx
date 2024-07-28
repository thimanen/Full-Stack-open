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

const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value} 
    </div>
  )
}

const Statistics = (props) => {
  console.log(props)
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = props.all

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average(good, neutral, bad, all)} />
      <StatisticLine text="positive" value={positives(good, all) + " %"} />
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

      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App
