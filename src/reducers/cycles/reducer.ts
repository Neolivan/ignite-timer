import { ActionTypes } from "./actions"
import { produce } from'immer'

export interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
}

interface CyclesState {
    cycles: Cycle[],
    activeCycleId: string | null,
}



export function cyclesReducer(state: CyclesState, action: any){
      
    switch(action.type){
      case ActionTypes.ADD_NEW_CYCLE:
        return produce(state, draft =>{
          draft.cycles.push(action.payload.newCycle),
          draft.activeCycleId = action.payload.newCycle.id
        })
      case ActionTypes.INTERRUPT_CURRENT_CYCLE:
        {
          const currentCyclesIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)
        if (currentCyclesIndex < 0) {
          return state
        }
          return produce(state, draft =>{
            draft.cycles[currentCyclesIndex].interruptedDate =new Date()
            draft.activeCycleId = null
          })
        }
      case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
        {
          const currentCyclesIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)
        if (currentCyclesIndex < 0) {
          return state
        }
          return produce(state, draft =>{
            draft.cycles[currentCyclesIndex].finishedDate =new Date()
            draft.activeCycleId = null
          })
        }
      default:
        return state

    }
    
  }