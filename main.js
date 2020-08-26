let total = 0;
let open = 0;
let close = 0;

document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';  
  const description = currentIssue.description;
  const strikeDescription = description.strike();
  currentIssue.description = strikeDescription;
  localStorage.setItem('issues', JSON.stringify(issues));
  close++;
  open--;
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  total--; open--; close--;
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues')); 
  const issuesList = document.getElementById('issuesList');
  const tracker = document.getElementById('tracker');
  tracker.innerHTML = '';
  issuesList.innerHTML = '';

  total = issues.length;
  for (let i = 0; i < issues.length; i++) {
    if(issues[i].status === 'Open'){
      open++;
    }
    else if(issues[i].status === 'Closed'){
      close++;
    }
    
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  console.log(total, open, close);
  tracker.innerHTML += `<span>Total Case:<span class="text-primary"> ${total}</span> Closed: <span class="text-warning"> ${close}</span> Open: <span class="text-danger"> ${open}</span> </span>`;

}
