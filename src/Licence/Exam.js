import React, { useState } from 'react';
import './Exam.css';
import { useNavigate} from 'react-router-dom';
import Header from '../Header';

const Quiz = () => {
    const sections = [
        {
          title: 'Traffic Rules',
          questions: [
            {
              question: 'What does a red traffic light mean?',
              options: ['Stop', 'Go', 'Slow down', 'Turn right'],
              correctAnswer: 'Stop'
            },
            {
              question: 'What does a yield sign mean?',
              options: ['Slow down', 'Merge', 'Stop if traffic is coming', 'Speed up'],
              correctAnswer: 'Stop if traffic is coming'
            },
            {
              question: 'What should you do when you see a school bus stopped with its red lights flashing?',
              options: ['Stop, proceed when lights stop flashing', 'Honk and pass', 'Speed up', 'Ignore'],
              correctAnswer: 'Stop, proceed when lights stop flashing'
            },
            {
              question: 'What is the maximum speed limit in a residential area?',
              options: ['20 mph', '30 mph', '40 mph', '50 mph'],
              correctAnswer: '20 mph'
            }
          ]
        },
        {
          title: 'Road Signs',
          questions: [
            {
              question: 'What does a green arrow signal mean?',
              options: ['Turn right', 'Turn left', 'Go straight', 'Stop'],
              correctAnswer: 'Turn in the direction of the arrow'
            },
            {
              question: 'What does a blue sign with a white H symbol indicate?',
              options: ['Hospital ahead', 'Highway exit', 'Helipad', 'Hotel'],
              correctAnswer: 'Hospital ahead'
            },
            {
              question: 'What does a triangular orange sign with an exclamation mark mean?',
              options: ['Pedestrian crossing', 'Traffic signal ahead', 'School zone', 'Warning'],
              correctAnswer: 'Warning'
            }
          ]
        },
        {
          title: 'Safe Driving Practices',
          questions: [
            {
              question: 'When should you use your headlights?',
              options: ['Only at night', 'During the day in fog or rain', 'Never', 'Only in the city'],
              correctAnswer: 'During the day in fog or rain'
            },
            {
              question: 'What is the proper following distance behind another vehicle?',
              options: ['One car length', 'Two seconds', 'At least three car lengths', 'Tailgate'],
              correctAnswer: 'Two seconds'
            },
            {
              question: 'What should you do if you experience a tire blowout while driving?',
              options: ['Brake hard', 'Steer straight and slow down gradually', 'Speed up', 'Turn sharply'],
              correctAnswer: 'Steer straight and slow down gradually'
            },
            {
              question: 'What is the purpose of the blind spot in a vehicle?',
              options: ['To improve visibility', 'To create more space', 'To eliminate glare', 'To reduce fuel consumption'],
              correctAnswer: 'To create more space'
            }
          ]
        }
      ];
      

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [advice, setAdvice] = useState({});

  const handleAnswerChange = (sectionIndex, questionIndex, selectedOption) => {
    setAnswers({
      ...answers,
      [sectionIndex]: {
        ...answers[sectionIndex],
        [questionIndex]: selectedOption
      }
    });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    let sectionScores = {};
    let advice = {};

    sections.forEach((section, sectionIndex) => {
      let sectionScore = 0;
      let adviceSection = [];

      section.questions.forEach((question, questionIndex) => {
        if (question.correctAnswer === answers[sectionIndex]?.[questionIndex]) {
          calculatedScore++;
          sectionScore++;
        } else {
          adviceSection.push(`In ${section.title}, Question ${questionIndex + 1} should be answered as '${question.correctAnswer}'.`);
        }
      });

      sectionScores[section.title] = sectionScore;
      advice[section.title] = adviceSection;
    });

    setScore(calculatedScore);
    setAdvice(advice);

    // Store scores and advice in localStorage
    localStorage.setItem('quizScores', JSON.stringify({ score: calculatedScore, sectionScores, advice }));
    navigate(`/performance`);
};

const navigate = useNavigate();
  


  return (
    <>
    <Header/>
    <div className='quiz-container'>
      <h2>Driver's Education Quiz</h2>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h3>{section.title}</h3>
          {section.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <h4>{question.question}</h4>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    id={`q${sectionIndex}${questionIndex}option${optionIndex}`}
                    name={`q${sectionIndex}${questionIndex}`}
                    value={option}
                    checked={answers[sectionIndex]?.[questionIndex] === option}
                    onChange={() => handleAnswerChange(sectionIndex, questionIndex, option)}
                  />
                  <label htmlFor={`q${sectionIndex}${questionIndex}option${optionIndex}`}>{option}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
      {score !== null && (
        <div className='quiz-score'>
          <h2>Your Score: {score} out of {sections.reduce((total, section) => total + section.questions.length, 0)}</h2>
        </div>
      )}
    </div>
    </>
  );
};

export default Quiz;
