const rowsContainer = document.getElementById('rows');
const addBtn = document.getElementById('addBtn');
const calcBtn = document.getElementById('calcBtn');
const resultBox = document.getElementById('result-box');

function createRow() {
    const tr = document.createElement('tr');
    tr.style.opacity = "0"; // For animation
    tr.innerHTML = `
        <td><input type="text" placeholder="Subject"></td>
        <td width="80"><input type="number" class="grade" step="0.25" placeholder="1.0"></td>
        <td width="80"><input type="number" class="unit" placeholder="3"></td>
        <td><button style="color:red; background:none; border:none; cursor:pointer;" onclick="this.parentElement.parentElement.remove()">✕</button></td>
    `;
    rowsContainer.appendChild(tr);
    // Smoothly fade in the new row
    setTimeout(() => { tr.style.opacity = "1"; tr.style.transition = "0.5s"; }, 10);
}

// Start with 4 rows
for(let i=0; i<4; i++) createRow();

addBtn.onclick = createRow;

calcBtn.onclick = () => {
    const grades = document.querySelectorAll('.grade');
    const units = document.querySelectorAll('.unit');
    
    let totalPoints = 0;
    let totalUnits = 0;

    grades.forEach((gInput, index) => {
        const g = parseFloat(gInput.value);
        const u = parseFloat(units[index].value);

        if (!isNaN(g) && !isNaN(u)) {
            totalPoints += (g * u);
            totalUnits += u;
        }
    });

    if (totalUnits > 0) {
        const gwa = totalPoints / totalUnits;
        document.getElementById('final-gwa').innerText = gwa.toFixed(2);
        
        // Show result with animation
        resultBox.classList.remove('hidden');
        resultBox.classList.add('show');

        const msg = document.getElementById('remark-msg');
        msg.innerText = gwa <= 1.5 ? "Dean's Lister Potential! 🏆" : "Keep it up, Scholar! 📚";
    } else {
        alert("Please enter grades and units.");
    }
};