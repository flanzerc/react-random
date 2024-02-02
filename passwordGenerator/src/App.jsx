import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [length, setLength] = useState(9)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState()

  const generatePassword = useCallback(() => {
    let password = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(numberAllowed) {
      str += '1234567890';
    }

    if(charAllowed) {
      str += '!@#$%^&*()~';
    }

    console.log('str.length', str.length)
    let genchar = '';
    for(let i = 1; i < length; i++) {
      genchar = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(genchar);
    }
    // password += genchar;
    console.log('pass', password);
    setPassword(password);
  },[length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  const passwordRef = useRef(null)

  // we can use the useCallback hook here as well, just like the password generator
  const copyPassToClipBoard = function() {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 5); // paft of the string
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
    <div 
      className='w-full max-w-md mx-auto shadow-md rounded-lg 
        px-4 py-8 text-orange-500 bg-slate-600'>
        
        <h1 className='text-2xl text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'> 
          <input 
            type='text' 
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />

            <button 
              className='outline-none bg-blue-700 text-white
              px-3 py-0.5 shrink-0'
              onClick={copyPassToClipBoard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
              <input
                type='checkbox'
                defaultChecked={charAllowed}
                id='charInput'
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
              />
              <label>Character</label>
          </div>
        </div>


    </div>
      
    </>
  )
}

export default App
