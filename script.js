let problems = JSON.parse(localStorage.getItem("problems")) || [
    { name: "Two Sum", difficulty: "Easy", solved: false },
    { name: "Reverse Linked List", difficulty: "Easy", solved: false },
    { name: "Binary Search", difficulty: "Easy", solved: false },
    { name: "Merge Intervals", difficulty: "Medium", solved: false },
    { name: "LRU Cache", difficulty: "Hard", solved: false }
];

let currentFilter = "all";

const list = document.getElementById("problem-list");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

function renderProblems() {
    list.innerHTML = "";

    const filtered = problems.filter(p => {
        if (currentFilter === "solved") return p.solved;
        if (currentFilter === "unsolved") return !p.solved;
        return true;
    });

    filtered.forEach((problem, index) => {
      const li = document.createElement("li");
if (problem.solved) {
    li.style.opacity = "0.6";
}


        li.innerHTML = `
            <div>
                <strong>${problem.name}</strong>
                <span class="tag ${problem.difficulty.toLowerCase()}">
                    ${problem.difficulty}
                </span>
            </div>
           <button onclick="toggleSolved(${index})">
    ${problem.solved ? "Undo" : "Mark Solved"}
</button>

        `;

        list.appendChild(li);
    });

    updateProgress();
    saveData();
}

function toggleSolved(index) {
    problems[index].solved = !problems[index].solved;
    renderProblems();
}

function updateProgress() {
    const solvedCount = problems.filter(p => p.solved).length;
    const total = problems.length;

    progressText.textContent = `Solved: ${solvedCount} / ${total}`;
    progressFill.style.width = `${(solvedCount / total) * 100}%`;
}

function setFilter(filter) {
    currentFilter = filter;
    renderProblems();
}

function saveData() {
    localStorage.setItem("problems", JSON.stringify(problems));
}

renderProblems();
function addProblem() {
    const nameInput = document.getElementById("problem-name");
    const difficultySelect = document.getElementById("problem-difficulty");

    const name = nameInput.value.trim();
    const difficulty = difficultySelect.value;

    if (name === "") {
        alert("Please enter a problem name");
        return;
    }

    problems.push({
        name,
        difficulty,
        solved: false
    });

    nameInput.value = "";
    renderProblems();
}
