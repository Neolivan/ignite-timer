import { useContext } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";



export function NewCycleForm(){
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  


    return (
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" list='task-sugestion' id="task" placeholder='De um nome para o seu projeto'
            {...register('task')}
            disabled={!!activeCycle}
            />
          <datalist id='task-sugestion'>
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput type="number" id="minutesAmount" placeholder='00' step={5} min={5} max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>
    )
}