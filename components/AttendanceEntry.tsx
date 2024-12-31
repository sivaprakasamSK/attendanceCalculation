'use client'

import axios from "axios";
import { useState } from "react"

export default function AttendanceEntry({ regno }: { regno: number }) {

    const [absentHours, setAbsentHours] = useState<string>("");

    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleCheckboxChange = (option: string) => {
        setSelectedOption(option === selectedOption ? "" : option);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption("input");
    };

    return (
        <div className="flex flex-col items-center space-y-4">

            <div>
                reg no {regno}
            </div>
            <div>

                <label>
                    <input
                        type="checkbox"
                        checked={selectedOption === "checkbox1"}
                        onChange={() => {
                            handleCheckboxChange("checkbox1");
                            setAbsentHours("0");
                        }}
                        disabled={selectedOption != "" && selectedOption !== "checkbox1"}
                    />
                    full day present
                </label>
            </div>
            <div>

                <label>
                    <input
                        type="checkbox"
                        checked={selectedOption === "checkbox2"}
                        onChange={() => {
                            handleCheckboxChange("checkbox2")
                            setAbsentHours("4");
                        }}
                        disabled={selectedOption != "" && selectedOption !== "checkbox2"}
                    />
                    half day present
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="text"
                        placeholder="Type here"
                        onChange={(e) => {
                            handleInputChange(e);
                            setAbsentHours(e.target.value)
                        }}
                        disabled={selectedOption != "" && selectedOption !== "input"}
                    />
                </label>
            </div>
            <div>
                <button onClick={async () => {
                    const res = await axios.post("/api/attendanceupdate", {
                        regno:regno,
                        absentHours: parseInt(absentHours)
                    })
                    setAbsentHours("");
                    setSelectedOption("");
                }}>Submit</button>
            </div>
        </div>
    );
}