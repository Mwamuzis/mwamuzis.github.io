document.addEventListener("DOMContentLoaded", () => {
    const checklistData = [
      { task: "Initialize Express App", status: "Not Started", notes: "npm run dev" },
      { task: "Install Dependencies", status: "Done", notes: "Dependencies in package.json" }
    ];
  
    const savedChecklist = JSON.parse(localStorage.getItem("projectChecklist")) || checklistData;
    populateChecklist(savedChecklist);
  
    function populateChecklist(checklist) {
      const checklistElement = document.getElementById("checklist");
      checklistElement.innerHTML = "";
      checklist.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.task}</td>
          <td>
            <select data-index="${index}" onchange="updateStatus(${index}, this.value)">
              <option value="Not Started" ${item.status === "Not Started" ? "selected" : ""}>Not Started</option>
              <option value="In Progress" ${item.status === "In Progress" ? "selected" : ""}>In Progress</option>
              <option value="Done" ${item.status === "Done" ? "selected" : ""}>Done</option>
            </select>
          </td>
          <td>${item.notes}</td>
        `;
        checklistElement.appendChild(row);
      });
    }
  
    window.updateStatus = (index, status) => {
      savedChecklist[index].status = status;
      localStorage.setItem("projectChecklist", JSON.stringify(savedChecklist));
      populateChecklist(savedChecklist);
    };
  });
  