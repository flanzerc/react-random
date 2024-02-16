import { useState} from 'react'
import { InputBox } from './components';
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {

    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);
    // get all the keys from the currency API call
    const currencyOptions = Object.keys(currencyInfo);
    const swap = () => {
        setFrom(to)
        setTo(from)
    }

    const convert = function() {
        setConvertedAmount(amount * currencyInfo[to])
    }

    // const resetTo = fucntion() {
    //     setTo(0);
    // }
    

    const BackgroundImage = 'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg';


    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('${BackgroundImage}')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                onAmountChange={(amount) => setAmount(amount)}
                                currencyOptions={currencyOptions}
                                onCurrencyChange={(currency) => {
                                    setFrom(currency);
                                    // setTo(0)
                                }}
                                selectCurrency={from}
                                
                                
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={currencyOptions}
                                onCurrencyChange={(currency) => setTo(currency)}
                                onAmountChange={(amount) => (setAmount(amount))}
                                selectCurrency={to}
                                isAmountDisabled

                                
                            />
                        </div>
                        <button type="submit" 
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
                            >
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default App
