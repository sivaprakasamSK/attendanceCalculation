'use client'

import axios from "axios";
import { useState } from "react"

export default function AttendanceEntry() {

    const [absentHours, setAbsentHours] = useState<string>("");
    const [regno, setRegno] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleCheckboxChange = (option: string) => {
        setSelectedOption(option === selectedOption ? "" : option);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption("input");
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="space-x-12">
                <label>Enter the reg</label>
                <input type="text"
                    onChange={(e) => {
                        setRegno(e.target.value)
                    }}
                    className="border border-black"
                />

            </div>
            <div className="space-x-12">
                <label>half day absent</label>
                <input
                    type="checkbox"
                    onChange={() => {
                        handleCheckboxChange("checkbox2")
                        setAbsentHours("4");
                    }}
                    disabled={selectedOption != "" && selectedOption !== "checkbox2"}
                />

            </div>
            <div className="space-x-12">
                <label>How many hours Absent</label>
                <input
                    type="text"
                    placeholder="Type here"
                    onChange={(e) => {
                        handleInputChange(e);
                        setAbsentHours(e.target.value)
                    }}
                    disabled={selectedOption != "" && selectedOption !== "input"}
                    className="border border-black"
                />
            </div>
            <div >
                <button onClick={async () => {
                    const res = await axios.post("/api/attendanceupdate", {
                        regno: parseInt(regno),
                        absentHours: parseInt(absentHours)
                    })
                    if (res.status >= 200 && res.status < 300) {
                        alert("updated");
                    } else {
                        alert("not updated re-enter");
                    }
                    setAbsentHours("");
                    setRegno("");
                    setSelectedOption("");
                }}>Submit</button>
            </div>
        </div>
    );
}