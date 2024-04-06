import { useState, useCallback, useEffect , useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charectersAllowed, setCharectersAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbersAllowed) str += "0123456789"
    if (charectersAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numbersAllowed, charectersAllowed, setPassword])


  // function copyPassword(){
  //   useCallback(() => {
  //     window.navigator.clipboard.writeText(password)
  //   } , [password])
  // }

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  } ,[length,numbersAllowed,charectersAllowed,passwordGenerator])



  return (
    <>
      <h1 className='text-4xl text-center'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg bg-gray-700 my-8 px-4 text-orange-500 text-center'>
        <div className="flex  rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className="outline-none bg-gray-700  w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPassword}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input className='mb-3 cursor-pointer'
              type="range" I
              min={6}
              max={100}
              value={length}
              onChange={(h) => {setLength(h.target.value)}}
            />
            <label className='mb-3'>Length:{length}</label>


            <input className='mb-3'
            type='checkbox'
            defaultChecked={numbersAllowed}
            id='numberInput'
            onChange={() => setNumbersAllowed((prev) => !prev)}  
            />
            <label className='mb-3' htmlFor='numberInput'>Numbers</label>


            <input className='mb-3'
            type='checkbox'
            defaultChecked={charectersAllowed}
            id='charecterInput'
            onChange={() => setCharectersAllowed((prev) => !prev)}  
            />
            <label className='mb-3' htmlFor='charectersInput'>Charecters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
