document.addEventListener("DOMContentLoaded", function () {
    const applicationForm = document.getElementById("applicationForm");
    const applicationTable = document.getElementById("applicationTable");
    const tbody = applicationTable.querySelector("tbody");
    const addButton = document.getElementById("addButton");
    const saveButton = document.getElementById("saveButton");
    const loadFileInput = document.getElementById("loadFileInput");
    const loadButton = document.getElementById("loadButton");
  
    addButton.addEventListener("click", function (event) {
      event.preventDefault();
  
      const companyInput = document.getElementById("company");
      const positionInput = document.getElementById("position");
      const statusSelect = document.getElementById("status");
      const notesInput = document.getElementById("notes");
  
      const company = companyInput.value.trim();
      const position = positionInput.value.trim();
      const status = statusSelect.value;
      const notes = notesInput.value.trim();
  
      if (company === "" || position === "" || status === "") {
        alert("Please fill in all fields.");
        return;
      }
  
      const row = document.createElement("tr");
  
      const companyCell = document.createElement("td");
      companyCell.textContent = company;
  
      const positionCell = document.createElement("td");
      positionCell.textContent = position;
  
      const statusCell = document.createElement("td");
      statusCell.textContent = status;
      statusCell.classList.add("editable");
  
      const notesCell = document.createElement("td");
      notesCell.textContent = notes;
  
      const actionCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        row.remove();
      });
  
      actionCell.appendChild(deleteButton);
  
      row.appendChild(companyCell);
      row.appendChild(positionCell);
      row.appendChild(statusCell);
      row.appendChild(notesCell);
      row.appendChild(actionCell);
  
      tbody.appendChild(row);
  
      companyInput.value = "";
      positionInput.value = "";
      statusSelect.value = "";
      notesInput.value = "";
    });
  
    saveButton.addEventListener("click", function () {
      saveTable();
    });
  
    loadButton.addEventListener("click", function () {
      const files = loadFileInput.files;
      if (files && files.length > 0) {
        const file = files[0];
        loadTable(file);
      }
    });
  
    function saveTable() {
      const tableData = Array.from(tbody.rows).map(function (row) {
        return Array.from(row.cells).map(function (cell) {
          return cell.textContent;
        });
      });
  
      const jsonData = tableData.map(rowData => JSON.stringify(rowData)).join('\n');
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "job_applications.json";
      link.click();
    }
  
    function loadTable(file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const jsonData = event.target.result;
        const tableData = parseJsonData(jsonData);
  
        tbody.innerHTML = "";
  
        tableData.forEach(function (rowData) {
          const row = document.createElement("tr");
  
          rowData.forEach(function (cellData, index) {
            const cell = document.createElement("td");
            cell.textContent = cellData;
            if (index === 2) {
              cell.classList.add("editable");
            }
            row.appendChild(cell);
          });
  
          const actionCell = document.createElement("td");
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", function () {
            row.remove();
          });
  
          actionCell.appendChild(deleteButton);
          row.appendChild(actionCell);
  
          tbody.appendChild(row);
        });
      };
  
      reader.readAsText(file);
    }
  
    function parseJsonData(jsonData) {
      const jsonRegex = /(\[.*?\])/g;
      const matches = jsonData.match(jsonRegex);
  
      if (matches) {
        const tableData = matches.map(match => {
          const parsedData = JSON.parse(match);
          return parsedData.filter(data => data !== "Delete");
        });
        return tableData;
      }
  
      return [];
    }
  
    // Function to create a status dropdown
    function createStatusDropdown(selectedStatus) {
      const statusSelect = document.createElement("select");
      statusSelect.classList.add("status-select");
  
      const statusOptions = [
        { value: "", label: "Select" },
        { value: "Applied", label: "Applied" },
        { value: "Interview", label: "Interview" },
        { value: "Offer", label: "Offer" },
        { value: "Rejected", label: "Rejected" }
      ];
  
      statusOptions.forEach(function (option) {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.label;
  
        if (option.value === selectedStatus) {
          optionElement.selected = true;
        }
  
        statusSelect.appendChild(optionElement);
      });
  
      return statusSelect;
    }
  
    // Function to toggle the status dropdown
    function toggleStatusDropdown(cell) {
      const currentStatus = cell.textContent;
      const statusSelect = createStatusDropdown(currentStatus);
  
      statusSelect.addEventListener("change", function () {
        cell.textContent = this.value;
      });
  
      cell.innerHTML = "";
      cell.appendChild(statusSelect);
      statusSelect.focus();
    }
  
    // Event delegation for status field editing
    applicationTable.addEventListener("click", function (event) {
      const target = event.target;
      const isStatusCell = target.classList.contains("editable");
  
      if (isStatusCell) {
        toggleStatusDropdown(target);
      }
    });
  });
  
  const swiftUpElements = document.querySelectorAll('.swift-up-text');
  
  swiftUpElements.forEach(elem => {
    const words = elem.textContent.split(' ');
    elem.innerHTML = '';
  
    words.forEach((el, index) => {
      words[index] = `<span><i>${words[index]}</i></span>`;
    });
  
    elem.innerHTML = words.join(' ');
  
    const children = document.querySelectorAll('span > i');
    children.forEach((node, index) => {
      node.style.animationDelay = `${index * 0.2}s`;
    });
  });