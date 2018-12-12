 class App {
    constructor(){
        this.issues =[];
        this.setStatusClosed = this.setStatusClosed.bind(this);
        this.createIssue = this.createIssue.bind(this);
        this.saveIssue = this.saveIssue.bind(this);
        this.checkIfIssuesExist = this.checkIfIssuesExist.bind(this);
        this.fetchIssues = this.fetchIssues.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
    }
    setStatusClosed(id) {
        for(let issue of this.issues) {
         ((issue.id == id) ? issue.status = "Closed" : null);
        this.fetchIssues();
        }
    }
    //createissue 
    createIssue(event) {
        event.preventDefault(); 
        const newIssue = new Issue();
        this.saveIssue(newIssue.issue);
        document.getElementById('issueInputForm').reset();
        this.fetchIssues();
    }
    //save issue
    saveIssue(issue){
        this.checkIfIssuesExist(issue);
      
    }
    //check if we have issues
    checkIfIssuesExist(issue){
        if (localStorage.getItem('issues') === null) {
            this.issues.push(issue);
          } else {
            const issues = JSON.parse(localStorage.getItem('issues'));
            this.issues.push(issue);
          }
    }
    //create html for fetched issues
    fetchIssues(){

    for (let issue of this.issues) {
      this.createHtml(issue);
    }
    }
    //method for creating html
    createHtml({id, description, job, assignedTo, status} = {}){
        const issuesList = document.getElementById('issuesList');
        const issueCard =       `<div class="well" id="${id}">
                                <h6>Issue ID:  ${id} </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-globe"></span> <a href="${job}">${job}</a></p>
                                <span class="glyphicon glyphicon-user"></span> ${assignedTo} </p>
                                <a href="#" class="btn btn-warning" onclick="InitApp.setStatusClosed(${id})">Close</a>
                                <a href="#" class="btn btn-danger" onclick="InitApp.deleteIssue(${id})">Delete</a>
                                </div>`;
        issuesList.innerHTML += issueCard;
    }
     deleteIssue(id) {
        for(let i = 0; i <this.issues.length; i++) {
          if (this.issues[i].id === id) {
            this.issues[i].splice(i, 1);
          }
        }
        this.fetchIssues();
      }

  }


  class Issue extends App {
    constructor(){
        super();
        this.id = chance.guid();
        this.desc = document.getElementById('issueDescInput').value;
        this.job = document.getElementById('issueJobInput').value;
        this.assignedTo = document.getElementById('issueAssignedToInput').value;
        this.status = 'Open';
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
  document.getElementById('issueInputForm').addEventListener('submit', InitApp.createIssue);


 