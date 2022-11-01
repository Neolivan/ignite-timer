import { differenceInSeconds } from "date-fns";
import { createContext, useState, useReducer, useEffect } from "react";
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";


interface CreateCycleData{
    task: string,
    minutesAmount: number
}



interface CyclesContentType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    marCurrentCyclesAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void

}





export const CyclesContext = createContext({} as CyclesContentType)

interface CyclesContextProviderProps {
    children: React.ReactNode
}

export function CyclesContextProvider({children} : CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer( cyclesReducer , {
      cycles: [],
      activeCycleId: null,
    }, () =>{
      const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
      if (storageStateAsJSON) {
        return JSON.parse(storageStateAsJSON)
      }
    })

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(()=>{
      if (activeCycle) {
        return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      }
      return 0
    })
    
    useEffect(() =>{
      const stateJSON = JSON.stringify(cyclesState)


      localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])
    
    

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function marCurrentCyclesAsFinished() {
      dispatch(markCurrentCycleAsFinishedAction())
    }

    
  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)

  }

  function interruptCurrentCycle() {

    dispatch(interruptCurrentCycleAction())

  }

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                activeCycleId,
                marCurrentCyclesAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle,
                cycles,
            }}>
                {children}
        </CyclesContext.Provider>
    )

}