import { HandPalm, Play } from 'phosphor-react'
import {  useContext   } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'
import { NewCycleForm } from './components/NewCycleForm'







interface NewCycleFormData {
  task: string,
  minutesAmount: number
}


export function Home() {

  const { activeCycle,createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const {  handleSubmit, watch , reset } = newCycleForm

  function handleCreateNewCycle(data : NewCycleFormData){
      createNewCycle(data)
      reset()
  }
 


  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        

          <FormProvider {...newCycleForm}>
            <NewCycleForm /> 
          </FormProvider>
          <Countdown />




        {activeCycle ? (
          <StopCountdownButton type="button" onClick={() => interruptCurrentCycle()} >
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit" >
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}

      </form>
    </HomeContainer>
  )
}