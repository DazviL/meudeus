const { useState, useEffect } = require("react");


function PomodoroTimer(){
  const [minutos, setMinutos] = useState(25);
  const [segundos, setSegundos] = useState(0);
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let intervalo;

    if(isRunning){
      intervalo = setInterval(() => {
        if (segundos === 0){
          if (minutos === 0){
            clearInterval(intervalo);
            if(!isBreak){
              handleTimerEnd();
            }else{
              handleBreakEnd();
            }
          }else{
            setMinutos((contagemRegressiva) => contagemRegressiva - 1);

            setSegundos(59);
          }
        }
        else{
          clearInterval(intervalo)
        }
        return()=> clearInterval(intervalo);
      },[isRunning, minutos, segundos, isBreak]);
      
      const handleStartTimer = () => {
        setIsRunning(true)
      }
      const handleStopTimer = () => {
        setIsRunning(false)
      }
      const handleRestartTimer = () => {
        setIsRunning(false)
        setMinutos(25)
        setSegundos(0)
        setIsBreak(false)
      }
      const handleTimerEnd = () => {
        alert('Tempo Esgotado! Tire 5 minutos livres!')
        setMinutos(5)
        setSegundos(0)
        setIsBreak(true)
        setIsRunning(true)
      }
      const handleBreakEnd = () => {
        alert('Hora de voltar ao trabalho!')
        setMinutos(25)
        setSegundos(0)
        setIsBreak(false)
        setIsRunning(true)
      }
      return(
        <div>
        <h1>Pomodoro Timer</h1>
        <div className="timer">
          {minutos < 10 ? `0${minutos}` : minutos} : {segundos < 10 ? `0${segundos}` : segundos}
          </div>
          <div className="buttons">
            {!isRunning ? (
              <button onClick={handleStartTimer}>Iniciar</button>
            ) : (<button onClick={handleStopTimer}>Parar</button>) }
            <button onClick={handleRestartTimer}>Reiniciar</button></div></div>
      )
    }
  })
}

export default PomodoroTimer;
