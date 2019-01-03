class App {
  constructor() {
    this.issues = [];
    this.setStatusClosed = this.setStatusClosed.bind(this);
    this.createIssue = this.createIssue.bind(this);
    this.saveIssue = this.saveIssue.bind(this);
    this.checkIfIssuesExist = this.checkIfIssuesExist.bind(this);
    this.fetchIssues = this.fetchIssues.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.deleteHtml = this.deleteHtml.bind(this);
  }
  setStatusClosed(id) {
    for (let issue of this.issues) {
      (issue.id === id) ? (issue.status = "Closed") : null;
      this.deleteHtml(id);
      this.fetchIssues();
    }
  }
  //! REFACTOR THIS, and check for duplicate html being produced
  createIssue(event) {
    event.preventDefault();
    const NewIssue = new Issue();
    this.saveIssue(NewIssue.issue);
    document.getElementById("issueInputForm").reset();
    this.fetchIssues();
  }
  //save issue
  saveIssue(issue) {
    this.checkIfIssuesExist(issue);
  }
  //check if we have issues
  checkIfIssuesExist(issue) {
    if (this.issues.length === 0) {
      this.issues.push(issue);
    } else {
      const issues = JSON.parse(localStorage.getItem("issues"));
      this.issues.push(issue);
    }
  }
  //create html for fetched issues
  fetchIssues() {
    for (let issue of this.issues) {
      this.createHtml(issue);
    }
  }
  // remove html
  deleteHtml(id) {
    var divToRemove = document.getElementById(`${id}`);
    divToRemove.remove(); // Removes the div with the appropriate id
  }
  //method for creating html
  // ! create HTML bare with document.createElment
  createHtml({
    id,
    description,
    job,
    assignedTo,
    status
  }) {
    const issuesList = document.getElementById("issuesList");
    issuesList.innerHTML += '';
    const issueCard = `<div class="well" id="${id}">
                                <h6>Issue ID:  ${id} </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-globe"></span> <a href="${job}">${job}</a></p>
                                <span class="glyphicon glyphicon-user"></span> ${assignedTo} </p>
                                <a href="#" class="btn btn-warning" id="close"onclick="InitApp.setStatusClosed('${id}')">Close</a>
                                <a href="#" class="btn btn-danger"id="delete" onclick="InitApp.deleteIssue('${id}')">Delete</a>
                                </div>`;
    issuesList.innerHTML += issueCard;
  }
  deleteIssue(id) {
    for (let i = 0; i < this.issues.length; i++) {
      if (this.issues[i].id === id) {
        console.log(this.issues[i].id);
        this.issues.splice(i, 1);
        this.deleteHtml(id);
      }
    }
    this.fetchIssues();
  }
}

class Issue extends App {
  constructor() {
    super();
    this.id = `${chance.guid()}`;
    this.desc = document.getElementById("issueDescInput").value;
    this.job = document.getElementById("issueJobInput").value;
    this.assignedTo = document.getElementById("issueAssignedToInput").value;
    this.status = "Open";
    this.issue = {
      id: this.id,
      description: this.desc,
      job: this.job,
      assignedTo: this.assignedTo,
      status: this.status
    };
  }

}

const InitApp = new App();
document
  .getElementById("issueInputForm")
  .addEventListener("submit", InitApp.createIssue);