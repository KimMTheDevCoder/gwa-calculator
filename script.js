const rowsArea = document.getElementById('rows-area');
const addBtn = document.getElementById('add-row-btn');
const calcBtn = document.getElementById('calc-btn');
const resultBox = document.getElementById('result-display');

// Function para sa paggawa ng bagong row na may animation
function addSubjectRow() {
    const tr = document.createElement('tr');
    tr.style.opacity = '0';
    tr.style.transform = 'translateX(-20px)';
    
    tr.innerHTML = `
        <td><input type="text" placeholder="Subject Name"></td>
        <td><input type="number" class="grade-input" step="0.25" placeholder="1.0"></td>
        <td><input type="number" class="unit-input" placeholder="3"></td>
        <td><button class="del-btn" onclick="removeRow(this)">✕</button></td>
    `;
    
    rowsArea.appendChild(tr);
    
    // Smooth entrance animation
    setTimeout(() => {
        tr.style.transition = 'all 0.4s ease';
        tr.style.opacity = '1';
        tr.style.transform = 'translateX(0)';
    }, 10);
}

function removeRow(btn) {
    const row = btn.parentElement.parentElement;
    row.style.opacity = '0';
    row.style.transform = 'scale(0.8)';
    setTimeout(() => row.remove(), 300);
}

// Default rows sa simula
for(let i=0; i<3; i++) addSubjectRow();

addBtn.onclick = addSubjectRow;

calcBtn.onclick = () => {
    const grades = document.querySelectorAll('.grade-input');
    const units = document.querySelectorAll('.unit-input');
    
    let totalWeightedGrades = 0;
    let totalUnits = 0;

    grades.forEach((gInput, index) => {
        const grade = parseFloat(gInput.value);
        const unit = parseFloat(units[index].value);

        // Conditional Logic: I-check kung valid numbers
        if (!isNaN(grade) && !isNaN(unit)) {
            totalWeightedGrades += (grade * unit);
            totalUnits += unit;
        }
    });

    if (totalUnits > 0) {
        const gwa = totalWeightedGrades / totalUnits;
        const gwaOutput = document.getElementById('gwa-output');
        const badge = document.getElementById('status-badge');
        const remark = document.getElementById('remark-text');

        gwaOutput.innerText = gwa.toFixed(4);
        
        // Show result card
        resultBox.classList.remove('hidden');
        resultBox.classList.add('show');

        // Conditional Statements para sa Remarks (PH Standard)
        if (gwa <= 1.25) {
            badge.innerText = "PRESIDENT'S LISTER";
            badge.className = "badge pass";
            remark.innerText = "Grades that touch the heavens! Keep shining. ";
        } else if (gwa <= 1.75) {
            badge.innerText = "DEAN'S LISTER";
            badge.className = "badge pass";
            remark.innerText = "Amazing performance! You're a top achiever. 🎓";
        } else if (gwa <= 3.0) {
            badge.innerText = "PASSED";
            badge.className = "badge pass";
            remark.innerText = "Good job! You've successfully passed the semester.";
        } else {
            badge.innerText = "FAILED / NEEDS IMPROVEMENT";
            badge.className = "badge fail";
            remark.innerText = "Don't give up. Failures are lessons in disguise.";
        }
    } else {
        alert("Please enter valid grades and units before calculating.");
    }
};