// import { useState } from "react";
// import axios from 'axios';

// export default function Axioss() {
//     const api = {
//         key: 'fbb7ee19b421484ff90da1b5a931a567',
//         base: "https://api.openweathermap.org/data/2.5/",
//     };

//     const [datas, setDatas] = useState("");
//     const [search, setSearch] = useState("");

//     const cherche = (e) => {
//         e.preventDefault();
//         setSearch(e.target.value)
//         if (search) {
//             axios.get(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
//                 .then(res => setDatas(res.data))
//         }
//     };

 

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>Weather App</h1>

//                 <form onChange={(e)=>cherche(e)}>
//                     <input type="text" placeholder="Enter city/town..."/>
//                 </form>

//                 {datas && (
//                     <div>
//                         <p>{datas.name}</p>
//                         <p>{datas.main.temp}°C</p>
//                         <p>{datas.weather[0].main}</p>
//                         <p>({datas.weather[0].description})</p>
//                     </div>
//                 )}
//             </header>
//         </div>
//     );
// }
import { useState } from "react";
import axios from 'axios';

export default function Axioss() {
    const api = {
        key: 'fbb7ee19b421484ff90da1b5a931a567',
        base: "https://api.openweathermap.org/data/2.5/",
    };

    const [datas, setDatas] = useState(null);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    const cherche = (e) => {
        e.preventDefault();
        setError(""); // Reset error message
        if (search) {
            axios.get(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
                .then(res => {
                    setDatas(res.data);
                })
                .catch(err => {
                    if (err.response && err.response.status === 404) {
                        setError("City not found. Please try again.");
                    } else {
                        console.error("Error fetching data:", err);
                        setError("An error occurred while fetching data.");
                    }
                });
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Weather App</h1>

                <form onSubmit={cherche}>
                    <input 
                        type="text" 
                        placeholder="Enter city/town..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <button type="submit">Search</button>
                </form>

                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

                {datas && !error && (
                    <div>
                        <p>{datas.name}</p>
                        <p>{datas.main.temp}°C</p>
                        <p>{datas.weather[0].main}</p>
                        <p>({datas.weather[0].description})</p>
                    </div>
                )}
            </header>
        </div>
    );
}