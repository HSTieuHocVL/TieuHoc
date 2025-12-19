
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType, MessageAuthor } from './types';
import { getShuffledQuiz, QuizQuestion } from './data/quizData';
import { ChatMessage } from './components/ChatMessage';
import { QuizOptions } from './components/math/QuizOptions';
import { SendIcon } from './components/icons/SendIcon';
import { QuizStatus } from './components/math/QuizStatus';
import { shuffleArray } from './utils/shuffle';

export const MathAssistant: React.FC = () => {
    const [step, setStep] = useState('welcome'); // welcome, name, quiz, summary
    const [name, setName] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false);
    const [selection, setSelection] = useState<{ selected?: string; correct?: string }>({});

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    
    // Shuffle options when question changes
    useEffect(() => {
        if (quizQuestions.length > 0 && step === 'quiz') {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            setShuffledOptions(shuffleArray(currentQuestion.options));
        }
    }, [currentQuestionIndex, quizQuestions, step]);

    const addMessage = (author: MessageAuthor, text: string, type?: ChatMessageType['type']) => {
        setMessages(prev => [...prev, { author, text, type }]);
    };

    const startNewQuiz = () => {
        setQuizQuestions(getShuffledQuiz());
        setCurrentQuestionIndex(0);
        setScore(0);
        setIncorrectAnswers(0);
        setAttempts(0);
        setIsWaiting(false);
        setSelection({});
    };

    useEffect(() => {
        addMessage(MessageAuthor.ASSISTANT, 'Chào bạn! 👋 Cô là Cô Giáo Tận Tâm, trợ lý toán học của bạn hôm nay. Chúng ta cùng chinh phục thử thách toán học nhé! 🚀');
        startNewQuiz();
    }, []);

    const handleStart = () => {
        addMessage(MessageAuthor.ASSISTANT, 'Trước tiên, cho cô biết tên của con là gì nào? 😊');
        setStep('name');
    };

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setName(inputValue);
            addMessage(MessageAuthor.USER, inputValue);
            addMessage(MessageAuthor.ASSISTANT, `Tuyệt vời, ${inputValue}! Chúng ta cùng bắt đầu với câu hỏi đầu tiên nhé! ⭐`);
            setInputValue('');
            setStep('quiz');
        }
    };
    
    const nextQuestion = () => {
        setAttempts(0);
        setSelection({});
        setIsWaiting(false);
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setStep('summary');
            const correctCount = score / 2;
            let title = "Cần cố gắng hơn xíu nữa nha 💪";
            if (correctCount >= 9) title = "Thần đồng Toán học! 🏆";
            else if (correctCount >= 6) title = "Chiến binh chăm chỉ! 🏅";

            addMessage(MessageAuthor.ASSISTANT, `🎉 Chúc mừng ${name} đã hoàn thành thử thách! 🎉\n\nTổng điểm của con là: ${correctCount}/${quizQuestions.length}\nDanh hiệu của con: ${title}\n\nCon làm rất tốt! Hãy luôn giữ vững tinh thần học hỏi này nhé!`, 'summary');
        }
    };

    const handleAnswer = (option: string) => {
        if (isWaiting) return;
        setIsWaiting(true);
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const isCorrect = option === currentQuestion.correctAnswer;
        
        setSelection({ selected: option, correct: currentQuestion.correctAnswer });

        if (isCorrect) {
            addMessage(MessageAuthor.ASSISTANT, 'Đỉnh của chóp! Chính xác rồi, con được cộng 2 điểm!', 'correct');
            setScore(s => s + 2);
            timeoutRef.current = window.setTimeout(nextQuestion, 5000);
        } else {
            if (attempts === 0) {
                setIncorrectAnswers(prev => prev + 1);
                addMessage(MessageAuthor.ASSISTANT, `Hmm, chưa đúng rồi. Gợi ý của cô là:\n\n${currentQuestion.hint}\n\nCon hãy thử lại một lần nữa xem nào!`, 'hint');
                setAttempts(1);
                setIsWaiting(false); 
            } else {
                addMessage(MessageAuthor.ASSISTANT, `Rất tiếc vẫn chưa đúng.\n\nĐáp án đúng là "${currentQuestion.correctAnswer}". ${currentQuestion.explanation}\n\nĐừng lo, chúng ta qua câu tiếp theo nhé!`, 'incorrect');
                timeoutRef.current = window.setTimeout(nextQuestion, 5000);
            }
        }
    };

    const handleRestart = () => {
        setStep('welcome');
        setName('');
        setInputValue('');
        setMessages([]);
        addMessage(MessageAuthor.ASSISTANT, 'Chào bạn! 👋 Cô là Cô Giáo Tận Tâm, trợ lý toán học của bạn hôm nay. Chúng ta cùng chinh phục thử thách toán học nhé! 🚀');
        startNewQuiz();
    };

    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
        <div className="flex flex-col h-full">
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-4">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {step === 'quiz' && currentQuestion && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                             <QuizStatus 
                                current={currentQuestionIndex + 1}
                                total={quizQuestions.length}
                                correct={score / 2}
                                incorrect={incorrectAnswers}
                             />
                             <div>
                                <p className="font-bold mb-3 text-gray-800 dark:text-gray-200">Câu {currentQuestionIndex + 1}: {currentQuestion.question}</p>
                                <QuizOptions 
                                    options={shuffledOptions}
                                    onSelect={handleAnswer}
                                    disabled={isWaiting}
                                    selection={selection}
                                />
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>
            <footer className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-3xl mx-auto">
                    {step === 'welcome' && (
                        <button onClick={handleStart} className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                            Bắt đầu
                        </button>
                    )}
                    {step === 'name' && (
                         <form onSubmit={handleNameSubmit} className="relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Tên của con là..."
                                className="w-full p-3 pr-14 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-200 dark:bg-gray-700 dark:border-purple-500 dark:focus:ring-purple-400/50 transition-all text-gray-800 dark:text-gray-100"
                            />
                            <button
                                type="submit"
                                aria-label="Gửi tên"
                                disabled={!inputValue.trim()}
                                className="absolute top-1/2 right-2 -translate-y-1/2 bg-purple-500 text-white rounded-full p-2.5 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-purple-300 transition-colors"
                            >
                               <SendIcon />
                            </button>
                        </form>
                    )}
                     {step === 'summary' && (
                        <button onClick={handleRestart} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
                            Chơi lại
                        </button>
                    )}
                </div>
            </footer>
        </div>
    );
};
