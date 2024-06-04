import Day1 from './modules/Day1'
import Day2 from './modules/Day2'
import Day3 from './modules/Day3'
import { useState } from 'react'

function App() {
    const [daysValue, setDaysValue] = useState(1)

    return (
        <div>
            <div>
                <ul>
                    <li key={'day1'} onClick={(e) => setDaysValue(1)}>day1</li>
                    <li key={'day2'} onClick={(e) => setDaysValue(2)}>day2</li>
                    <li key={'day3'} onClick={(e) => setDaysValue(3)}>day3</li>
                </ul>
            </div>
            <div>
                { daysValue === 1 && <Day1></Day1> }
                { daysValue === 2 && <Day2></Day2> }
                { daysValue === 3 && <Day3></Day3> }
            </div>
        </div>
    )
};

export default App;
