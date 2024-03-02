import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timeInMinutes: 0,
}

class Stopwatch extends Component {
  state = initialState

  clearTimerInterval = () => clearInterval(this.intervalId)

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onIncreasingMinutes = () => {
    const {timeElapsedInSeconds} = this.state

    if (timeElapsedInSeconds === 60) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
    }
  }

  incrementTimeElapsedInSeconds = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartTimer = () => {
    const {isTimerRunning} = this.state

    if (!isTimerRunning) {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState({isTimerRunning: true}, this.onIncreasingMinutes)
  }

  getTimeInStringFormat = () => {
    const {timeInMinutes, timeElapsedInSeconds} = this.state

    const stringifiedMinutes =
      timeInMinutes > 9 ? timeInMinutes : `0${timeInMinutes}`
    const stringifiedSeconds =
      timeElapsedInSeconds > 9
        ? timeElapsedInSeconds
        : `0${timeElapsedInSeconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onClickingStartButton = () => {
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    this.onStartTimer()
  }

  stopClock = () => {
    this.clearTimerInterval()
  }

  render() {
    const {isTimerRunning} = this.state
    console.log(isTimerRunning)

    return (
      <div className="app-container">
        <h1 className="heading">Stopwatch</h1>

        <div className="timer-container">
          <div className="icon-text-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="watch-image"
            />
            <p className="parag">Timer</p>
          </div>
          <h1 className="parag-seconds">{this.getTimeInStringFormat()}</h1>
          <div className="buttons-container">
            <button
              type="button"
              className="start-btn"
              onClick={this.onClickingStartButton}
            >
              Start
            </button>
            <button type="button" className="stop-btn" onClick={this.stopClock}>
              Stop
            </button>
            <button
              type="button"
              className="reset-btn"
              onClick={this.onResetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
