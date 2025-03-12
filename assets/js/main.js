// Mock Test Website JavaScript

// Sample test data
const mockTests = {
    mathematics: {
        title: "Mathematics Test",
        duration: 60, // minutes
        totalQuestions: 50,
        questions: [
            {
                id: 1,
                question: "What is the value of x in the equation 2x + 5 = 15?",
                options: [
                    "x = 5",
                    "x = 10",
                    "x = 7.5",
                    "x = 5.5"
                ],
                correctAnswer: 0,
                explanation: "To solve for x, subtract 5 from both sides: 2x = 10. Then divide both sides by 2: x = 5."
            },
            {
                id: 2,
                question: "If a triangle has sides of length 3, 4, and 5, what type of triangle is it?",
                options: [
                    "Equilateral",
                    "Isosceles",
                    "Scalene",
                    "Right-angled"
                ],
                correctAnswer: 3,
                explanation: "A triangle with sides 3, 4, and 5 is a right-angled triangle, as it satisfies the Pythagorean theorem: 3² + 4² = 5²."
            },
            {
                id: 3,
                question: "What is the area of a circle with radius 4 units?",
                options: [
                    "8π square units",
                    "16π square units",
                    "4π square units",
                    "12π square units"
                ],
                correctAnswer: 1,
                explanation: "The area of a circle is given by the formula A = πr². With r = 4, we get A = π × 4² = 16π square units."
            },
            // More questions would be added here in a real application
        ]
    },
    science: {
        title: "Science Test",
        duration: 45, // minutes
        totalQuestions: 40,
        questions: [
            {
                id: 1,
                question: "What is the chemical symbol for gold?",
                options: [
                    "Go",
                    "Gd",
                    "Au",
                    "Ag"
                ],
                correctAnswer: 2,
                explanation: "The chemical symbol for gold is Au, which comes from the Latin word 'aurum'."
            },
            {
                id: 2,
                question: "Which of the following is NOT a state of matter?",
                options: [
                    "Solid",
                    "Liquid",
                    "Gas",
                    "Energy"
                ],
                correctAnswer: 3,
                explanation: "The three common states of matter are solid, liquid, and gas. Plasma is sometimes considered a fourth state. Energy is not a state of matter."
            },
            {
                id: 3,
                question: "What is the process by which plants make their own food using sunlight?",
                options: [
                    "Photosynthesis",
                    "Respiration",
                    "Transpiration",
                    "Digestion"
                ],
                correctAnswer: 0,
                explanation: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water."
            },
            // More questions would be added here in a real application
        ]
    },
    english: {
        title: "English Test",
        duration: 30, // minutes
        totalQuestions: 35,
        questions: [
            {
                id: 1,
                question: "Which of the following is a correct sentence?",
                options: [
                    "She don't like ice cream.",
                    "They was going to the store.",
                    "He doesn't want to go.",
                    "We is happy about the news."
                ],
                correctAnswer: 2,
                explanation: "The correct sentence is 'He doesn't want to go.' It uses the proper subject-verb agreement."
            },
            {
                id: 2,
                question: "What is the plural form of 'child'?",
                options: [
                    "Childs",
                    "Children",
                    "Childes",
                    "Child"
                ],
                correctAnswer: 1,
                explanation: "The plural form of 'child' is 'children'. It's an irregular plural that doesn't follow the standard rule of adding 's'."
            },
            {
                id: 3,
                question: "Which word is a synonym for 'happy'?",
                options: [
                    "Sad",
                    "Angry",
                    "Joyful",
                    "Tired"
                ],
                correctAnswer: 2,
                explanation: "Joyful is a synonym for happy, meaning experiencing or expressing joy."
            },
            // More questions would be added here in a real application
        ]
    },
    // Other subjects would be defined similarly
};

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Carousel
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialIndicators = document.querySelectorAll('.testimonial-indicators span');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        testimonialIndicators[index].classList.add('active');
        currentTestimonial = index;
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });

        nextButton.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });

        testimonialIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
    }

    // Exam Selection in Modal
    const examSelectCards = document.querySelectorAll('.exam-select-card');
    const startSelectedExamBtn = document.getElementById('startSelectedExam');
    let selectedExam = null;

    if (examSelectCards.length > 0 && startSelectedExamBtn) {
        examSelectCards.forEach(card => {
            card.addEventListener('click', () => {
                examSelectCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedExam = card.getAttribute('data-exam');
                startSelectedExamBtn.removeAttribute('disabled');
            });
        });

        startSelectedExamBtn.addEventListener('click', () => {
            if (selectedExam) {
                startTest(selectedExam);
            }
        });
    }

    // Start Test from Cards on Main Page
    const startTestButtons = document.querySelectorAll('.start-test-btn');
    if (startTestButtons.length > 0) {
        startTestButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const examCard = button.closest('.exam-card');
                if (examCard) {
                    const examType = examCard.getAttribute('data-exam');
                    startTest(examType);
                }
            });
        });
    }

    // Test Interface Variables
    let currentTest = null;
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let markedQuestions = [];
    let visitedQuestions = [];
    let testTimer = null;
    let timeRemaining = 0;

    // Test Interface Elements
    const testInterface = document.querySelector('.test-interface');
    const mainContent = document.querySelector('body > *:not(.test-interface):not(.test-results):not(.answer-review)');
    const testTitle = document.getElementById('test-title');
    const testTimer = document.getElementById('test-timer');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    const questionContent = document.getElementById('question-content');
    const questionOptions = document.getElementById('question-options');
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    const markQuestionBtn = document.getElementById('mark-question');
    const paletteNumbers = document.getElementById('palette-numbers');
    const submitTestBtn = document.getElementById('submit-test');
    const endTestBtn = document.getElementById('end-test-btn');

    // Function to start the test
    function startTest(examType) {
        if (!mockTests[examType]) {
            alert('Test not available');
            return;
        }

        // Hide main content and show test interface
        if (mainContent) mainContent.style.display = 'none';
        if (testInterface) testInterface.style.display = 'block';

        // Initialize test variables
        currentTest = mockTests[examType];
        currentQuestionIndex = 0;
        userAnswers = Array(currentTest.questions.length).fill(null);
        markedQuestions = [];
        visitedQuestions = [0]; // First question is visited by default

        // Update test interface
        if (testTitle) testTitle.textContent = currentTest.title;
        if (totalQuestionsElement) totalQuestionsElement.textContent = currentTest.questions.length;

        // Initialize timer
        timeRemaining = currentTest.duration * 60; // Convert minutes to seconds
        updateTimer();
        if (testTimer) {
            clearInterval(testTimer);
            testTimer = setInterval(updateTimer, 1000);
        }

        // Generate question palette
        generateQuestionPalette();

        // Load first question
        loadQuestion(0);

        // Close any open modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();
        });
    }

    // Function to update the timer
    function updateTimer() {
        if (timeRemaining <= 0) {
            clearInterval(testTimer);
            submitTest();
            return;
        }

        timeRemaining--;
        const hours = Math.floor(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;

        if (testTimer) {
            testTimer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    // Function to generate question palette
    function generateQuestionPalette() {
        if (!paletteNumbers) return;

        paletteNumbers.innerHTML = '';
        for (let i = 0; i < currentTest.questions.length; i++) {
            const paletteNumber = document.createElement('div');
            paletteNumber.className = 'palette-number';
            paletteNumber.textContent = i + 1;
            
            if (i === currentQuestionIndex) {
                paletteNumber.classList.add('current');
            }
            
            paletteNumber.addEventListener('click', () => {
                loadQuestion(i);
            });
            
            paletteNumbers.appendChild(paletteNumber);
        }
    }

    // Function to update question palette
    function updateQuestionPalette() {
        if (!paletteNumbers) return;

        const paletteNumberElements = paletteNumbers.querySelectorAll('.palette-number');
        
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
    }

    // Function to load a question
    function loadQuestion(index) {
        if (!currentTest || !currentTest.questions[index]) return;

        currentQuestionIndex = index;
        const question = currentTest.questions[index];

        // Add to visited questions if not already visited
        if (!visitedQuestions.includes(index)) {
            visitedQuestions.push(index);
        }

        // Update question number
        if (currentQuestionElement) {
            currentQuestionElement.textContent = index + 1;
        }

        // Update question content
        if (questionContent) {
            questionContent.textContent = question.question;
        }

        // Update options
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
                
                optionItem.addEventListener('click', () => {
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
        if (prevQuestionBtn) {
            prevQuestionBtn.disabled = index === 0;
        }
        
        if (nextQuestionBtn) {
            nextQuestionBtn.disabled = index === currentTest.questions.length - 1;
        }

        // Update question palette
        updateQuestionPalette();
    }

    // Event listeners for test navigation
    if (prevQuestionBtn) {
        prevQuestionBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                loadQuestion(currentQuestionIndex - 1);
            }
        });
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            if (currentQuestionIndex < currentTest.questions.length - 1) {
                loadQuestion(currentQuestionIndex + 1);
            }
        });
    }

    if (markQuestionBtn) {
        markQuestionBtn.addEventListener('click', () => {
            if (markedQuestions.includes(currentQuestionIndex)) {
                markedQuestions = markedQuestions.filter(q => q !== currentQuestionIndex);
                markQuestionBtn.classList.remove('marked');
                markQuestionBtn.innerHTML = '<i class="fas fa-bookmark"></i> Mark for Review';
            } else {
                markedQuestions.push(currentQuestionIndex);
                markQuestionBtn.classList.add('marked');
                markQuestionBtn.innerHTML = '<i class="fas fa-bookmark"></i> Unmark';
            }
            
            updateQuestionPalette();
        });
    }

    if (submitTestBtn) {
        submitTestBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to submit the test? You cannot change your answers after submission.')) {
                submitTest();
            }
        });
    }

    if (endTestBtn) {
        endTestBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to end the test? This will submit your current answers.')) {
                submitTest();
            }
        });
    }

    // Function to submit the test
    function submitTest() {
        clearInterval(testTimer);
        
        // Calculate results
        let correctAnswers = 0;
        const testResults = [];
        
        currentTest.questions.forEach((question, index) => {
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
        
        const scorePercentage = Math.round((correctAnswers / currentTest.questions.length) * 100);
        
        // Show results
        showTestResults(testResults, correctAnswers, scorePercentage);
    }

    // Test Results Elements
    const testResults = document.querySelector('.test-results');
    const resultTestTitle = document.getElementById('result-test-title');
    const testCompletionDate = document.getElementById('test-completion-date');
    const scorePercentage = document.getElementById('score-percentage');
    const resultTotalQuestions = document.getElementById('result-total-questions');
    const resultCorrectAnswers = document.getElementById('result-correct-answers');
    const resultIncorrectAnswers = document.getElementById('result-incorrect-answers');
    const resultTimeTaken = document.getElementById('result-time-taken');
    const strengthsList = document.getElementById('strengths-list');
    const weaknessesList = document.getElementById('weaknesses-list');
    const reviewAnswersBtn = document.getElementById('review-answers-btn');
    const returnHomeBtn = document.getElementById('return-home-btn');
    const takeAnotherTestBtn = document.getElementById('take-another-test-btn');

    // Function to show test results
    function showTestResults(results, correctAnswers, percentage) {
        // Hide test interface and show results
        if (testInterface) testInterface.style.display = 'none';
        if (testResults) testResults.style.display = 'block';
        
        // Update result elements
        if (resultTestTitle) resultTestTitle.textContent = currentTest.title;
        
        const now = new Date();
        if (testCompletionDate) {
            testCompletionDate.textContent = now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        
        if (scorePercentage) scorePercentage.textContent = `${percentage}%`;
        if (resultTotalQuestions) resultTotalQuestions.textContent = currentTest.questions.length;
        if (resultCorrectAnswers) resultCorrectAnswers.textContent = correctAnswers;
        if (resultIncorrectAnswers) resultIncorrectAnswers.textContent = currentTest.questions.length - correctAnswers;
        
        const timeTaken = (currentTest.duration * 60) - timeRemaining;
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        if (resultTimeTaken) resultTimeTaken.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Analyze strengths and weaknesses
        analyzePerformance(results);
        
        // Create performance chart
        createPerformanceChart(results);
    }

    // Function to analyze performance
    function analyzePerformance(results) {
        if (!strengthsList || !weaknessesList) return;
        
        strengthsList.innerHTML = '';
        weaknessesList.innerHTML = '';
        
        // This is a simplified analysis - in a real app, you would have more sophisticated analysis
        if (results.filter(r => r.isCorrect).length > results.filter(r => !r.isCorrect).length) {
            const li = document.createElement('li');
            li.textContent = 'Overall good performance across the test';
            strengthsList.appendChild(li);
        } else {
            const li = document.createElement('li');
            li.textContent = 'Need to improve overall understanding of the subject';
            weaknessesList.appendChild(li);
        }
        
        // Add some generic strengths and weaknesses for demo purposes
        const strengths = [
            'Good time management',
            'Strong understanding of core concepts',
            'Excellent performance in calculation-based questions'
        ];
        
        const weaknesses = [
            'Need to review theoretical concepts',
            'Improve accuracy in complex problems',
            'Pay more attention to details in questions'
        ];
        
        strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });
        
        weaknesses.forEach(weakness => {
            const li = document.createElement('li');
            li.textContent = weakness;
            weaknessesList.appendChild(li);
        });
    }

    // Function to create performance chart
    function createPerformanceChart(results) {
        const canvas = document.getElementById('performance-chart');
        if (!canvas) return;
        
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded');
            return;
        }
        
        // Destroy existing chart if any
        if (window.performanceChart) {
            window.performanceChart.destroy();
        }
        
        // Create new chart
        window.performanceChart = new Chart(canvas, {
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

    // Answer Review Elements
    const answerReview = document.querySelector('.answer-review');
    const reviewTestTitle = document.getElementById('review-test-title');
    const reviewQuestions = document.getElementById('review-questions');
    const backToResultsBtn = document.getElementById('back-to-results-btn');

    // Function to show answer review
    function showAnswerReview() {
        if (!currentTest) return;
        
        // Hide results and show review
        if (testResults) testResults.style.display = 'none';
        if (answerReview) answerReview.style.display = 'block';
        
        // Update review title
        if (reviewTestTitle) reviewTestTitle.textContent = currentTest.title;
        
        // Generate review questions
        if (reviewQuestions) {
            reviewQuestions.innerHTML = '';
            
            currentTest.questions.forEach((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                const reviewQuestion = document.createElement('div');
                reviewQuestion.className = 'review-question';
                
                reviewQuestion.innerHTML = `
                    <div class="review-question-header">
                        <div class="review-question-number">Question ${index + 1}</div>
                        <div class="review-question-status ${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? 'Correct' : 'Incorrect'}</div>
                    </div>
                    <div class="review-question-content">${question.question}</div>
                    <div class="review-options">
                        ${question.options.map((option, optionIndex) => `
                            <div class="option-item ${optionIndex === question.correctAnswer ? 'correct' : (optionIndex === userAnswer && !isCorrect ? 'incorrect' : '')}">
                                <div class="option-radio">
                                    <input type="radio" disabled ${optionIndex === userAnswer ? 'checked' : ''}>
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
                `;
                
                reviewQuestions.appendChild(reviewQuestion);
            });
        }
    }

    // Event listeners for result actions
    if (reviewAnswersBtn) {
        reviewAnswersBtn.addEventListener('click', showAnswerReview);
    }

    if (returnHomeBtn) {
        returnHomeBtn.addEventListener('click', () => {
            // Hide results and show main content
            if (testResults) testResults.style.display = 'none';
            if (answerReview) answerReview.style.display = 'none';
            if (mainContent) mainContent.style.display = 'block';
        });
    }

    if (takeAnotherTestBtn) {
        takeAnotherTestBtn.addEventListener('click', () => {
            // Show exam modal
            const examModal = document.getElementById('examModal');
            if (examModal) {
                const modal = new bootstrap.Modal(examModal);
                modal.show();
            }
            
            // Hide results
            if (testResults) testResults.style.display = 'none';
            if (answerReview) answerReview.style.display = 'none';
        });
    }

    if (backToResultsBtn) {
        backToResultsBtn.addEventListener('click', () => {
            // Hide review and show results
            if (answerReview) answerReview.style.display = 'none';
            if (testResults) testResults.style.display = 'block';
        });
    }

    // Form submission handlers
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality would be implemented with a backend.');
            this.reset();
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration functionality would be implemented with a backend.');
            this.reset();
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});
