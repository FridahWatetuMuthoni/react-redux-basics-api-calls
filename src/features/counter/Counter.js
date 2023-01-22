import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByAmount } from './counterSlice'
import { useState } from 'react'

function Counter() {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState(0)
    const addValue = Number(incrementAmount) || 0

    const resetAll = () => {
        setIncrementAmount(0)
        dispatch(reset())
    }

    const addAmount = () => {
        //we pass the payload as an arguement
        dispatch(incrementByAmount(addValue))
    }

  return (
      <section className='counter'>
          <h1>{count}</h1>
          <div className='buttons'>
            <button className='btn' onClick={() => dispatch(increment())}>+</button>
              <button className='btn' onClick={() => dispatch(decrement())}>-</button>
              <button className='btn' onClick={resetAll}>Reset</button>
              <div className='input'>
                  <input type="text" value={incrementAmount} name="amount" id="" onChange={e => setIncrementAmount(e.target.value)} />
                  <button onClick={addAmount}>Add Amount</button>
              </div>
          </div>
    </section>
  )
}

export default Counter