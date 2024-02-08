import React, { useEffect, useState } from 'react';
import './advice.css';
import { useNavigate} from 'react-router-dom';


const AdvicePage = () => {
    const [quizData, setQuizData] = useState(null);

    useEffect(() => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem('quizScores');
        if (storedData) {
            setQuizData(JSON.parse(storedData));
        }
    }, []);

    const navigate = useNavigate();
    const getLicence = () => {
         navigate(`/licence`)
    }

    return (
        <div className="advice-container">
            <h2>Quiz Advice and Scores</h2>
            {quizData && (
                <div>
                    <h3>Scores:</h3>
                    <p>Total Score: {quizData.score}</p>
                    <h3>Performance Breakdown:</h3>
                    <ul>
                        {Object.entries(quizData.sectionScores).map(([section, score]) => (
                            <li key={section}>{section}: {score}</li>
                        ))}
                    </ul>
                    <h3>Advice for Improvement:</h3>
                    {Object.entries(quizData.advice).map(([section, adviceArray]) => (
                        <div key={section}>
                            <h4>{section}</h4>
                            <ul>
                                {adviceArray.map((advice, index) => (
                                    <li key={index}>{advice}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {quizData.score > 0 ? (
                        <button onClick={getLicence} className="advice-button">Get Driving Licence</button>
                    ) : (
                        <div className="advice-warn">You Are Not Allowed For Licence, Try again next time</div>
                    )}
                </div>
            )}
            {!quizData && <p>No data available.</p>}
        </div>
    );
};

export default AdvicePage;
