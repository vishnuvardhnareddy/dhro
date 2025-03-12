// Quiz JavaScript for Mock Test

// Sample quiz data
const quizData = {
    title: "General Knowledge Test",
    duration: 30, // minutes
    totalQuestions: 10,
    questions: [
        {
            id: 1,
            question: "What is the capital of France?",
            options: [
                "London",
                "Paris",
                "Berlin",
                "Madrid"
            ],
            correctAnswer: 1,
            explanation: "Paris is the capital and most populous city of France."
        },
        {
            id: 2,
            question: "Which planet is known as the Red Planet?",
            options: [
                "Venus",
                "Jupiter",
                "Mars",
                "Saturn"
            ],
            correctAnswer: 2,
            explanation: "Mars is often called the Red Planet due to its reddish appearance, which is caused by iron oxide (rust) on its surface."
        },
        {
            id: 3,
            question: "Who painted the Mona Lisa?",
            options: [
                "Vincent van Gogh",
                "Pablo Picasso",
                "Leonardo da Vinci",
                "Michelangelo"
            ],
            correctAnswer: 2,
            explanation: "The Mona Lisa was painted by Italian Renaissance artist Leonardo da Vinci between 1503 and 1519."
        },
        {
            id: 4,
            question: "What is the largest ocean on Earth?",
            options: [
                "Atlantic Ocean",
                "Indian Ocean",
                "Arctic Ocean",
                "Pacific Ocean"
            ],
            correctAnswer: 3,
            explanation: "The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth's surface."
        },
        {
            id: 5,
            question: "Which element has the chemical symbol 'O'?",
            options: [
                "Osmium",
                "Oxygen",
                "Oganesson",
                "Olivine"
            ],
            correctAnswer: 1,
            explanation: "Oxygen has the chemical symbol 'O'. It's the third most abundant element in the universe and essential for human respiration."
        },
        {
            id: 6,
            question: "Who wrote the play 'Romeo and Juliet'?",
            options: [
                "Charles Dickens",
                "Jane Austen",
                "William Shakespeare",
                "Mark Twain"
            ],
            correctAnswer: 2,
            explanation: "Romeo and Juliet was written by William Shakespeare around 1595. It's one of his most famous tragedies."
        },
        {
            id: 7,
            question: "What is the tallest mountain in the world?",
            options: [
                "K2",
                "Mount Kilimanjaro",
                "Mount Everest",
                "Matterhorn"
            ],
            correctAnswer: 2,
            explanation: "Mount Everest, located in the Himalayas, is the tallest mountain on Earth with a height of 8,848.86 meters (29,031.7 feet) above sea level."
        },
        {
            id: 8,
            question: "Which country is known as the Land of the Rising Sun?",
            options: [
                "China",
                "Thailand",
                "South Korea",
                "Japan"
            ],
            correctAnswer: 3,
            explanation: "Japan is known as the Land of the Rising Sun. The name 'Japan' in Japanese is 'Nippon' or 'Nihon', which means 'origin of the sun'."
        },
        {
            id: 9,
            question: "What is the largest organ in the human body?",
            options: [
                "Heart",
                "Liver",
                "Skin",
                "Brain"
            ],
            correctAnswer: 2,
            explanation: "The skin is the largest organ in the human body. It has an average area of about 2 square meters and makes up about 15% of body weight."
        },
        {
            id: 10,
            question: "Which of these is not a primary color?",
            options: [
                "Red",
                "Blue",
                "Green",
                "Yellow"
            ],
            correctAnswer: 3,
            explanation: "In the RGB color model (used for digital displays), the primary colors are Red, Green, and Blue. Yellow is a secondary color created by mixing red and green light."
        }
    ]
};

// Variables to track quiz state
let currentQuestionIndex = 0;
let userAnswers = Array(quizData.questions.length).fill(null);
let markedQuestions = [];
let visitedQuestions = [0]; // First question is visited by default
let timeRemaining = quizData.duration * 60; // Convert minutes to seconds
let timerInterval = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Update test title
    const testTitle = document.getElementById('test-title');
    if (testTitle) {
        testTitle.textContent = quizData.title;
    }

    // Update total questions
    const totalQuestionsElement = document.getElementById('total-questions');
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = quizData.questions.length;
    }

    // Start timer
    startTimer();

    // Setup question navigation
    setupQuestionNavigation();

    // Setup question palette
    setupQuestionPalette();

    // Load first question
    loadQuestion(0);

    // Setup mark question button
    const markQuestionBtn = document.getElementById('mark-question');
    if (markQuestionBtn) {
        markQuestionBtn.addEventListener('click', function() {
            toggleMarkQuestion(currentQuestionIndex);
        });
    }

    // Setup submit test button
    const submitTestBtn = document.getElementById('submit-test');
    if (submitTestBtn) {
        submitTestBtn.addEventListener('click', function() {
            // The confirmation is now handled by quiz-confirmation.js
            // No need to call submitTest() here as it's called from the confirmation modal
        });
    }

    // Setup end test button
    const endTestBtn = document.getElementById('end-test-btn');
    if (endTestBtn) {
        endTestBtn.addEventListener('click', function() {
            // The confirmation is now handled by quiz-confirmation.js
            // No need to call submitTest() here as it's called from the confirmation modal
        });
    }
    
    // Setup instructions button
    const instructionsBtn = document.getElementById('instructions-btn');
    if (instructionsBtn) {
        instructionsBtn.addEventListener('click', function() {
            const instructionsModal = new bootstrap.Modal(document.getElementById('instructionsModal'));
            instructionsModal.show();
        });
    }
    
    // Update test summary counters
    updateTestSummary();
});

// Function to start the timer
function startTimer() {
    const timerElement = document.getElementById('test-timer');
    if (!timerElement) return;

    updateTimerDisplay();
    
    timerInterval = setInterval(function() {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your test will be submitted automatically.');
            submitTest();
        }
    }, 1000);
}

// Function to update timer display
function updateTimerDisplay() {
    const timerElement = document.getElementById('test-timer');
    if (!timerElement) return;
    
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Change timer color when less than 5 minutes remaining
    if (timeRemaining < 300) {
        timerElement.parentElement.style.backgroundColor = '#f44336';
        timerElement.parentElement.style.color = 'white';
    }
}

// Function to setup question navigation
function setupQuestionNavigation() {
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    
    if (prevQuestionBtn) {
        prevQuestionBtn.addEventListener('click', function() {
            if (currentQuestionIndex > 0) {
                loadQuestion(currentQuestionIndex - 1);
            }
        });
    }
    
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function() {
            if (currentQuestionIndex < quizData.questions.length - 1) {
                loadQuestion(currentQuestionIndex + 1);
            }
        });
    }
}

// Function to setup question palette
function setupQuestionPalette() {
    const questionPalette = document.getElementById('question-palette');
    if (!questionPalette) return;
    
    questionPalette.innerHTML = '';
    
    for (let i = 0; i < quizData.questions.length; i++) {
        const paletteNumber = document.createElement('div');
        paletteNumber.className = 'palette-number';
        if (i === currentQuestionIndex) {
            paletteNumber.classList.add('current');
        }
        
        paletteNumber.textContent = i + 1;
        
        paletteNumber.addEventListener('click', function() {
            loadQuestion(i);
        });
        
        questionPalette.appendChild(paletteNumber);
    }
}

// Function to update question palette
function updateQuestionPalette() {
    const questionPalette = document.getElementById('question-palette');
    if (!questionPalette) return;
    
    const paletteNumberElements = questionPalette.querySelectorAll('.palette-number');
    
    paletteNumberElements.forEach((element, index) => {
        element.className = 'palette-number';
        
        if (index === currentQuestionIndex) {
            element.classList.add('current');
        }
        
        if (userAnswers[index] !== null) {
            element.classList.add('answered');
        } else if (visitedQuestions.includes(index)) {
            element.classList.add('not-answered');
        }
        
        if (markedQuestions.includes(index)) {
            element.classList.add('marked');
        }
    });
    
    // Update test summary counters
    updateTestSummary();
}

// Function to update test summary
function updateTestSummary() {
    const answeredCount = document.getElementById('answered-count');
    const notAnsweredCount = document.getElementById('not-answered-count');
    const markedCount = document.getElementById('marked-count');
    const notVisitedCount = document.getElementById('not-visited-count');
    
    if (answeredCount) {
        answeredCount.textContent = userAnswers.filter(answer => answer !== null).length;
    }
    
    if (notAnsweredCount) {
        notAnsweredCount.textContent = visitedQuestions.filter(index => userAnswers[index] === null).length;
    }
    
    if (markedCount) {
        markedCount.textContent = markedQuestions.length;
    }
    
    if (notVisitedCount) {
        notVisitedCount.textContent = quizData.questions.length - visitedQuestions.length;
    }
}

// Function to load a question
function loadQuestion(index) {
    if (!quizData.questions[index]) return;
    
    currentQuestionIndex = index;
    const question = quizData.questions[index];
    
    // Add to visited questions if not already visited
    if (!visitedQuestions.includes(index)) {
        visitedQuestions.push(index);
    }
    
    // Update question number
    const currentQuestionElement = document.getElementById('current-question');
    if (currentQuestionElement) {
        currentQuestionElement.textContent = index + 1;
    }
    
    // Update question content
    const questionContent = document.getElementById('question-content');
    if (questionContent) {
        questionContent.textContent = question.question;
    }
    
    // Update options
    const questionOptions = document.getElementById('question-options');
    if (questionOptions) {
        questionOptions.innerHTML = '';
        
        question.options.forEach((option, optionIndex) => {
            const optionItem = document.createElement('div');
            optionItem.className = 'option-item';
            if (userAnswers[index] === optionIndex) {
                optionItem.classList.add('selected');
            }
            
            optionItem.innerHTML = `
                <div class="option-radio">
                    <input type="radio" name="question${index}" id="option${index}_${optionIndex}" ${userAnswers[index] === optionIndex ? 'checked' : ''}>
                </div>
                <div class="option-text">
                    <label for="option${index}_${optionIndex}">${option}</label>
                </div>
            `;
            
            optionItem.addEventListener('click', function() {
                userAnswers[index] = optionIndex;
                
                // Update selected state
                questionOptions.querySelectorAll('.option-item').forEach(item => {
                    item.classList.remove('selected');
                });
                optionItem.classList.add('selected');
                
                // Update question palette
                updateQuestionPalette();
            });
            
            questionOptions.appendChild(optionItem);
        });
    }
    
    // Update mark button
    const markQuestionBtn = document.getElementById('mark-question');
    if (markQuestionBtn) {
        if (markedQuestions.includes(index)) {
            markQuestionBtn.classList.add('marked');
            markQuestionBtn.innerHTML = '<i class="fas fa-bookmark"></i> Unmark';
        } else {
            markQuestionBtn.classList.remove('marked');
            markQuestionBtn.innerHTML = '<i class="fas fa-bookmark"></i> Mark for Review';
        }
    }
    
    // Update navigation buttons
    const prevQuestionBtn = document.getElementById('prev-question');
    if (prevQuestionBtn) {
        prevQuestionBtn.disabled = index === 0;
    }
    
    const nextQuestionBtn = document.getElementById('next-question');
    if (nextQuestionBtn) {
        nextQuestionBtn.disabled = index === quizData.questions.length - 1;
    }
    
    // Update question palette
    updateQuestionPalette();
}

// Function to toggle mark question
function toggleMarkQuestion(index) {
    const markQuestionBtn = document.getElementById('mark-question');
    if (!markQuestionBtn) return;
    
    if (markedQuestions.includes(index)) {
        markedQuestions = markedQuestions.filter(q => q !== index);
        markQuestionBtn.classList.remove('marked');
        markQuestionBtn.innerHTML = '<i class="fas fa-bookmark"></i> Mark for Review';
    } else {
        markedQuestions.push(index);
        markQuestionBtn.classList.add('marked');
        markQuestionBtn.innerHTML = '<i class="fas fa-bookmark"></i> Unmark';
    }
    
    updateQuestionPalette();
}

// Function to submit the test
function submitTest() {
    clearInterval(timerInterval);
    
    // Calculate results
    let correctAnswers = 0;
    const testResults = [];
    
    quizData.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        if (isCorrect) {
            correctAnswers++;
        }
        
        testResults.push({
            questionId: question.id,
            userAnswer: userAnswer,
            correctAnswer: question.correctAnswer,
            isCorrect: isCorrect
        });
    });
    
    const scorePercentage = Math.round((correctAnswers / quizData.questions.length) * 100);
    const rankInfo = calculateRank(scorePercentage);
    
    // Create results HTML
    const resultsHTML = `
        <div class="test-results" style="display: block;">
            <div class="container">
                <div class="results-header">
                    <h2>Test Results: <span>${quizData.title}</span></h2>
                    <p>Completed on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="result-summary-card">
                            <h3>Score Summary</h3>
                            <div class="score-circle" style="--score-percentage: ${scorePercentage}%">
                                <div class="score-value">${scorePercentage}%</div>
                            </div>
                            <div class="score-details">
                                <div class="score-item">
                                    <p>Total Questions</p>
                                    <h4>${quizData.questions.length}</h4>
                                </div>
                                <div class="score-item">
                                    <p>Correct Answers</p>
                                    <h4>${correctAnswers}</h4>
                                </div>
                                <div class="score-item">
                                    <p>Incorrect Answers</p>
                                    <h4>${quizData.questions.length - correctAnswers}</h4>
                                </div>
                                <div class="score-item">
                                    <p>Time Taken</p>
                                    <h4>${formatTimeTaken(quizData.duration * 60 - timeRemaining)}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="result-analysis-card">
                            <h3>Performance Analysis</h3>
                            <div class="performance-chart">
                                <canvas id="performance-chart"></canvas>
                            </div>
                            <div class="strength-weakness">
                                <div class="strength-section">
                                    <h4>Strengths</h4>
                                    <ul id="strengths-list">
                                        ${scorePercentage >= 70 ? '<li>Good overall knowledge</li>' : ''}
                                        ${correctAnswers >= quizData.questions.length / 2 ? '<li>Answered majority of questions correctly</li>' : ''}
                                        <li>Quick response time on questions</li>
                                        ${scorePercentage >= 85 ? '<li>Excellent mastery of the subject</li>' : ''}
                                        ${scorePercentage >= 60 ? '<li>Solid foundation of knowledge</li>' : ''}
                                    </ul>
                                </div>
                                <div class="weakness-section">
                                    <h4>Areas for Improvement</h4>
                                    <ul id="weaknesses-list">
                                        ${scorePercentage < 70 ? '<li>Need to improve overall knowledge</li>' : ''}
                                        ${correctAnswers < quizData.questions.length / 2 ? '<li>Need to work on accuracy</li>' : ''}
                                        <li>Review questions that were answered incorrectly</li>
                                        ${scorePercentage < 60 ? '<li>Focus on core concepts and fundamentals</li>' : ''}
                                        ${scorePercentage < 40 ? '<li>Consider additional study materials and practice</li>' : ''}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Rank Prediction Section -->
                <div class="rank-prediction-card">
                    <h3>Your All India Rank</h3>
                    <div class="rank-container">
                        <div class="rank-badge">
                            <div class="rank-value">${rankInfo.rank}</div>
                        </div>
                        <div class="rank-details">
                            <h4 class="rank-title">${rankInfo.title}</h4>
                            <p class="rank-description">${rankInfo.description}</p>
                            
                            <div class="rank-percentile">
                                <div class="rank-percentile-bar" style="width: ${rankInfo.percentile}%"></div>
                            </div>
                            <div class="rank-percentile-labels">
                                <span>Bottom</span>
                                <span>25%</span>
                                <span>50%</span>
                                <span>75%</span>
                                <span>Top</span>
                            </div>
                            
                            <div class="rank-stats">
                                <div class="rank-stat-item">
                                    <p>Your Score</p>
                                    <h4>${scorePercentage}%</h4>
                                </div>
                                <div class="rank-stat-item">
                                    <p>Your Percentile</p>
                                    <h4>${rankInfo.percentile}%</h4>
                                </div>
                                <div class="rank-stat-item">
                                    <p>Average Score</p>
                                    <h4>65%</h4>
                                </div>
                                <div class="rank-stat-item">
                                    <p>Total Participants</p>
                                    <h4>${rankInfo.totalUsers}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="result-actions">
                    <button class="btn secondary-btn" id="review-answers-btn">Review Answers</button>
                    <button class="btn primary-btn" id="return-home-btn">Return to Home</button>
                    <button class="btn primary-btn" id="take-another-test-btn">Take Another Test</button>
                </div>
            </div>
        </div>
    `;
    
    // Replace test interface with results
    document.querySelector('.test-interface').style.display = 'none';
    document.body.insertAdjacentHTML('beforeend', resultsHTML);
    
    // Create performance chart
    createPerformanceChart(testResults);
    
    // Setup result action buttons
    setupResultActions(testResults);
    
    // Show toast notification
    showToast('Test submitted successfully!', 'success');
}

// Function to format time taken
function formatTimeTaken(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Function to calculate rank based on score percentage
function calculateRank(scorePercentage) {
    // Calculate rank out of 1 crore (10 million) users
    let rankNumber;
    let totalUsers = 10000000; // 1 crore users
    
    if (scorePercentage >= 95) {
        // Top 0.01%
        rankNumber = Math.floor(totalUsers * 0.0001);
    } else if (scorePercentage >= 90) {
        // Top 0.1%
        rankNumber = Math.floor(totalUsers * 0.001);
    } else if (scorePercentage >= 85) {
        // Top 1%
        rankNumber = Math.floor(totalUsers * 0.01);
    } else if (scorePercentage >= 80) {
        // Top 5%
        rankNumber = Math.floor(totalUsers * 0.05);
    } else if (scorePercentage >= 75) {
        // Top 10%
        rankNumber = Math.floor(totalUsers * 0.1);
    } else if (scorePercentage >= 70) {
        // Top 20%
        rankNumber = Math.floor(totalUsers * 0.2);
    } else if (scorePercentage >= 60) {
        // Top 40%
        rankNumber = Math.floor(totalUsers * 0.4);
    } else if (scorePercentage >= 50) {
        // Top 60%
        rankNumber = Math.floor(totalUsers * 0.6);
    } else if (scorePercentage >= 40) {
        // Top 80%
        rankNumber = Math.floor(totalUsers * 0.8);
    } else {
        // Bottom 20%
        rankNumber = Math.floor(totalUsers * 0.9);
    }
    
    // Add some randomness to make it more realistic
    rankNumber = Math.max(1, Math.floor(rankNumber + (Math.random() * 100 - 50)));
    
    // Format the rank number with commas
    const formattedRank = rankNumber.toLocaleString('en-IN');
    
    let title, description;
    
    if (rankNumber <= 100) {
        title = 'Exceptional Performer';
        description = 'You are among the top 100 performers out of 1 crore participants! Your understanding of the subject is truly exceptional.';
    } else if (rankNumber <= 1000) {
        title = 'Outstanding Performer';
        description = 'You are ranked in the top 1,000 out of 1 crore participants. This is an outstanding achievement that demonstrates excellent mastery of the material.';
    } else if (rankNumber <= 10000) {
        title = 'Excellent Performer';
        description = 'Your rank is in the top 10,000 out of 1 crore participants. This excellent performance shows a strong grasp of the subject matter.';
    } else if (rankNumber <= 100000) {
        title = 'Very Good Performer';
        description = 'You are in the top 1% of all participants, with a rank below 1 lakh. This is a very good performance that demonstrates solid understanding.';
    } else if (rankNumber <= 1000000) {
        title = 'Good Performer';
        description = 'Your rank is in the top 10% of all participants. This good performance shows a decent understanding of the concepts.';
    } else if (rankNumber <= 5000000) {
        title = 'Average Performer';
        description = 'You are in the middle range of all participants. With some more practice, you can significantly improve your ranking.';
    } else {
        title = 'Below Average Performer';
        description = 'There is significant room for improvement. With dedicated study and practice, you can enhance your understanding and improve your rank.';
    }
    
    return {
        rank: formattedRank,
        title: title,
        description: description,
        percentile: calculatePercentile(scorePercentage),
        totalUsers: '1,00,00,000'
    };
}

// Function to calculate percentile (simplified simulation)
function calculatePercentile(scorePercentage) {
    // This is a simplified calculation for demonstration
    // In a real application, this would be based on actual user data
    if (scorePercentage >= 95) return 99.99;
    if (scorePercentage >= 90) return 99.9;
    if (scorePercentage >= 85) return 99;
    if (scorePercentage >= 80) return 95;
    if (scorePercentage >= 75) return 90;
    if (scorePercentage >= 70) return 80;
    if (scorePercentage >= 60) return 60;
    if (scorePercentage >= 50) return 40;
    if (scorePercentage >= 40) return 20;
    return 10;
}

// Function to create performance chart
function createPerformanceChart(results) {
    const canvas = document.getElementById('performance-chart');
    if (!canvas) return;
    
    // Create chart
    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect', 'Unanswered'],
            datasets: [{
                data: [
                    results.filter(r => r.isCorrect).length,
                    results.filter(r => !r.isCorrect && r.userAnswer !== null).length,
                    results.filter(r => r.userAnswer === null).length
                ],
                backgroundColor: [
                    '#4caf50',
                    '#f44336',
                    '#e0e0e0'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Function to setup result action buttons
function setupResultActions(results) {
    // Review answers button
    const reviewAnswersBtn = document.getElementById('review-answers-btn');
    if (reviewAnswersBtn) {
        reviewAnswersBtn.addEventListener('click', function() {
            showAnswerReview(results);
        });
    }
    
    // Return home button
    const returnHomeBtn = document.getElementById('return-home-btn');
    if (returnHomeBtn) {
        returnHomeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Take another test button
    const takeAnotherTestBtn = document.getElementById('take-another-test-btn');
    if (takeAnotherTestBtn) {
        takeAnotherTestBtn.addEventListener('click', function() {
            window.location.reload();
        });
    }
}

// Function to show answer review
function showAnswerReview(results) {
    // Create review HTML
    let reviewHTML = `
        <div class="answer-review" style="display: block;">
            <div class="container">
                <div class="review-header">
                    <h2>Answer Review: <span>${quizData.title}</span></h2>
                    <button class="btn secondary-btn" id="back-to-results-btn">Back to Results</button>
                </div>
                <div class="review-questions" id="review-questions">
    `;
    
    // Add each question review
    quizData.questions.forEach((question, index) => {
        const result = results[index];
        const userAnswer = result.userAnswer !== null ? question.options[result.userAnswer] : 'Not answered';
        const correctAnswer = question.options[question.correctAnswer];
        const isCorrect = result.isCorrect;
        
        reviewHTML += `
            <div class="review-question">
                <div class="review-question-header">
                    <div class="review-question-number">Question ${index + 1}</div>
                    <div class="review-question-status ${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? 'Correct' : 'Incorrect'}</div>
                </div>
                <div class="review-question-content">${question.question}</div>
                <div class="review-options">
                    ${question.options.map((option, optionIndex) => `
                        <div class="option-item ${optionIndex === question.correctAnswer ? 'correct' : (optionIndex === result.userAnswer && !isCorrect ? 'incorrect' : '')}">
                            <div class="option-radio">
                                <input type="radio" disabled ${optionIndex === result.userAnswer ? 'checked' : ''}>
                                <span class="radio-checkmark"></span>
                            </div>
                            <div class="option-text">
                                <label>${option}</label>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="review-explanation">
                    <h5>Explanation</h5>
                    <p>${question.explanation}</p>
                </div>
            </div>
        `;
    });
    
    reviewHTML += `
                </div>
            </div>
        </div>
    `;
    
    // Hide results and show review
    document.querySelector('.test-results').style.display = 'none';
    document.body.insertAdjacentHTML('beforeend', reviewHTML);
    
    // Setup back to results button
    const backToResultsBtn = document.getElementById('back-to-results-btn');
    if (backToResultsBtn) {
        backToResultsBtn.addEventListener('click', function() {
            document.querySelector('.answer-review').style.display = 'none';
            document.querySelector('.test-results').style.display = 'block';
        });
    }
}
