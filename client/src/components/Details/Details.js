
import {useState} from 'react';

import './Details.css';

function Details({selectedSchool, programs, highest_degree, locale, carnegie}) {
    const [distance, setDistance] = useState(0);
    
    if (selectedSchool) {
        const url = "https://"+selectedSchool["inst_url"];
        const filtered = programs.filter(function(program) {
            return (selectedSchool["programs"].indexOf(program.program_id) !== -1);
        })

        const calcCrow = (lat1_degree, lon1_degree, lat2_degree, lon2_degree) => {
          var R = 6371; // km
          var dLat = toRad(lat2_degree-lat1_degree);
          var dLon = toRad(lon2_degree-lon1_degree);
          var lat1 = toRad(lat1_degree);
          var lat2 = toRad(lat2_degree);
    
          var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c;
          return d.toFixed(1);
        }
    
        function toRad(Value) 
        {
            return Value * Math.PI / 180;
        }

        const successHandler = position => {
            const curLat = position.coords.latitude;
            const curLong = position.coords.longitude;
            const curDistance = calcCrow(curLat, curLong, selectedSchool["latitude"], selectedSchool["longitude"]);
            setDistance(curDistance);
        };
    
        const errorHandler = error => console.error("error ",error.message);
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler);

        return (
            <div className="Details">
                <table>
                    <tbody>
                        <tr>
                            {selectedSchool["institution"] &&
                                <td colSpan="2">Institution Name: {selectedSchool["institution"]}</td>
                            }
                        </tr>
                        <tr>
                            {selectedSchool["inst_url"] &&
                                <td>URL: <a href={url}>{selectedSchool["inst_url"]}</a></td>
                            }
                            {selectedSchool["highest_degree"] &&
                                <td>Highest Degree Awarded: {highest_degree[selectedSchool["highest_degree"]]}</td>
                            }
                        </tr>
                        <tr>
                            {selectedSchool["locale"] &&
                                <td colSpan="2">Locale of institution: {locale[selectedSchool["locale"]].description}</td>
                            }
                        </tr>
                        <tr>
                            {selectedSchool["ccsizset"] &&
                                <td colSpan="2">Carnegie Classification: {carnegie[selectedSchool["ccsizset"]]}</td>
                            }
                        </tr>
                        <tr>
                            {selectedSchool["city"] &&
                                <td>City: {selectedSchool["city"]}</td>
                            }
                            {selectedSchool["state"] &&
                                <td>State: {selectedSchool["state"]}</td>
                            }
                        </tr>
                        <tr>
                            {selectedSchool["zip"] &&
                                <td>Zip: {selectedSchool["zip"]}</td>
                            }
                            {selectedSchool["latitude"] && selectedSchool["longitude"] &&
                                <td>Distance from School: {distance}km</td>
                            }
                        </tr>
                        <tr>
                            {selectedSchool["sat_avg"] &&
                                <td>Average SAT Score: {selectedSchool["sat_avg"]}</td>
                            }
                            {selectedSchool["adm_rate"] &&
                                <td>Admissions Rate: {selectedSchool["adm_rate"]}</td>
                            }
                        </tr>
                        {filtered.length > 0 &&
                            <tr>
                                <td colSpan="2">
                                    <table>
                                        <tbody>
                                            <tr><th>Programs</th></tr>
                                            {filtered.map((program, index) => {
                                                return (
                                                    <tr key={index}><td>{program.description}</td></tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        }
                    </tbody>

                </table>
            </div>
        )
    } else {
        return <div />
    }
}

export default Details;
