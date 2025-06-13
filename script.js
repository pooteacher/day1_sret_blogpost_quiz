let questions = [];
let currentQuestion = 0;
let selectedOption = null;
let isAnswered = false;

// Handle CSV file upload
document.getElementById('csv-file').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log("PapaParse raw results:", results.data);

                questions = results.data
                    .filter(row =>
                        row.question &&
                        row.option1 && row.option2 &&
                        row.option3 && row.option4 &&
                        row.answer &&
                        !isNaN(parseInt(row.answer, 10))
                    )
                    .map(row => ({
                        question: row.question.trim(),
                        options: [
                            row.option1.trim(),
                            row.option2.trim(),
                            row.option3.trim(),
                            row.option4.trim()
                        ],
                        answer: parseInt(row.answer, 10) - 1 // convert to 0-based index
                    }));

                if (questions.length === 0) {
                    alert("CSV loaded, but no valid questions found. Please check your file format and data.");
                    return;
                }

                currentQuestion = 0;
                selectedOption = null;
                isAnswered = false;
                renderQuestion();
            },
            error: function (err) {
                alert("Error parsing CSV: " + err.message);
                console.error("PapaParse error:", err);
            }
        });
    }
});

function renderQuestion() {
    if (!questions.length) {
        document.getElementById('quiz-progress').textContent = "0/0";
        document.getElementById('quiz-question').textContent = "";
        document.getElementById('quiz-options').innerHTML = "";
        document.getElementById('next-btn').style.display = "none";
        return;
    }

    isAnswered = false;
    selectedOption = null;

    const q = questions[currentQuestion];
    document.getElementById('quiz-progress').textContent = `${currentQuestion + 1}/${questions.length}`;
    document.getElementById('quiz-question').textContent = q.question;

    const optionsList = document.getElementById('quiz-options');
    optionsList.innerHTML = ""; // clear previous options

    q.options.forEach((option, idx) => {
        const li = document.createElement('li');
        li.className = 'quiz-option';
        li.innerHTML = `<span class="bullet">•</span><span class="option-text">${option}</span>`;
        li.onclick = function () {
            if (!isAnswered) {
                selectOption(idx);
            }
        };
        optionsList.appendChild(li);
    });

    document.getElementById('next-btn').style.display = "none";
}

function selectOption(idx) {
    selectedOption = idx;
    isAnswered = true;

    const q = questions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');

    options.forEach((li, i) => {
        li.onclick = null; // disable further clicking
        li.classList.remove('selected', 'correct', 'incorrect');
        // Remove any previous tick
        let tick = li.querySelector('.tick');
        if (tick) tick.remove();

        if (i === q.answer) {
            li.classList.add('correct');
            // Add green tick only to the correct answer
            const tickSpan = document.createElement('span');
            tickSpan.className = 'tick';
            tickSpan.textContent = '✔';
            li.appendChild(tickSpan);
        }
        if (i === selectedOption && selectedOption !== q.answer) {
            li.classList.add('incorrect');
        }
    });

    document.getElementById('next-btn').style.display = "";
}

document.getElementById('next-btn').addEventListener('click', function () {
    if (!isAnswered) {
        alert("કૃપા કરીને વિકલ્પ પસંદ કરો (Please select an option)");
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        selectedOption = null;
        isAnswered = false;
        renderQuestion();
    } else {
        showQuizEnd();
    }
});

function showQuizEnd() {
    document.getElementById('quiz-progress').textContent = "સમાપ્ત (Finished)";
    document.getElementById('quiz-question').textContent = "ક્વિઝ પૂર્ણ (Quiz Complete)!";
    document.getElementById('quiz-options').innerHTML = "";
    document.getElementById('next-btn').style.display = "none";
}
