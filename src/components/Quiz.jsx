import React, { useState } from 'react';
import questionstest from './questionstest.json';
import styles from './Quiz.module.css';
import { FaCheckCircle, FaTimesCircle, FaCircle } from 'react-icons/fa';

export const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questionstest.length).fill(null));
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    const handleSubmitClick = (isCorrect) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = isCorrect;
        setAnswers(newAnswers);

        if (currentQuestionIndex < questionstest.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswerIndex(null);
        }
    };


    const currentQuestion = questionstest[currentQuestionIndex];

    return (
        <>
            <div className={styles.h3}>
                <h3>{currentQuestionIndex === questionstest.length - 1 ? 'Final' : `Question ${currentQuestionIndex + 1} of ${questionstest.length}`}</h3>
            </div>
            <div className={styles.separator}></div>
            {currentQuestion && (
                <div>
                    <h2>{currentQuestion.question}</h2>
                    <div>
                        <ul className={styles.ul}>
                            {currentQuestion.answers.map((answer, index) => (
                                <li key={index} className={styles.li}>
                                    <button
                                        className={styles.btn}
                                        onClick={() => {
                                            if (answers[currentQuestionIndex] !== null) {
                                                return; // Если ответ уже выбран, не делаем ничего
                                            }
                                            setSelectedAnswerIndex(index); // Устанавливаем новый выбранный ответ
                                        }}
                                        style={{ backgroundColor: selectedAnswerIndex === index ? '#008000' : 'cornflowerblue' }}
                                        disabled={answers[currentQuestionIndex] !== null}
                                    >
                                        {answer.text}
                                    </button>

                                </li>
                            ))}
                        </ul>
                        <button onClick={() => handleSubmitClick(currentQuestion.answers[selectedAnswerIndex]?.isCorrect)} disabled={selectedAnswerIndex === null}>Next</button>
                    </div>
                </div>
            )}
            <div className={styles.indicators}>
                {answers.map((answer, index) => (
                    <p key={index} className={answer === null ? styles.notAnswered : (answer ? styles.correct : styles.incorrect)} style={{ fontSize: '40px' }}>
                        {answer === null ? <FaCircle style={{ color: 'cornflowerblue' }} /> : (answer ? <FaCheckCircle style={{ color: 'green' }} /> : <FaTimesCircle style={{ color: 'red' }} />)}
                    </p>
                ))}
            </div>
        </>
    );
};
