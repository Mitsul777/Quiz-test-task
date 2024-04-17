import React from 'react';
import questionstest from './questionstest.json';

const Questions = () => {
    return (
        <div>
            {questionstest.map((question, index) => (
                <div key={index}>
                    <h3>{question.question}</h3>
                    <ul>
                        {question.answers.map((answer, answerIndex) => (
                            <li key={answerIndex}>{answer.text}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Questions;
