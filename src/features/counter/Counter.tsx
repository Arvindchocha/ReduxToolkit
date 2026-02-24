import { decrement, increment, reset } from "./counterSlice"
import { useAppDispatch, useAppSelector } from "../../app/hook"

export default function Counter(){
      const count = useAppSelector((state)=>state.counter.value)
  const dispatch = useAppDispatch()
    return(
         <div className="card">
        <button onClick={() => dispatch(increment())}>
          count +
        </button>
         <button onClick={() => dispatch(decrement())}>
          count -
        </button>
         <button onClick={() => dispatch(reset())}>
          Reset
        </button>
        <p>
         {count}
        </p>
      </div>
    )
}