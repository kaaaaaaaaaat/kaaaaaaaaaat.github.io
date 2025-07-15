// TODO: fetch data from postgresql database 
function fetchGradeData() {
    // this function will query the postgresql database and return grade data
    console.log("fetching grade data...");
	// create a new request for HTTP data!!!
	let xhr = new XMLHttpRequest();
    // this is the address on the machine we are asking for data :P
    let apiRoute = "/api/grades";
    // when the request changes status, this anonymous function is run
    xhr.onreadystatechange = function(){
        let results;
        // check if we are done
        if(xhr.readyState === xhr.DONE){
            // make sure that we are successful!
            if(xhr.status !== 200){
                console.error(`could not get grades :(.
                    status: ${xhr.status})`);
            }
            // then we call the function to update the HTML with data
            populateGradebook(JSON.parse(xhr.responseText));
        }
    }.bind(this);
    xhr.open("get", apiRoute, true);
    xhr.send()
}

// populate the table with grade data
function populateGradebook(data) {
    // this function will take the retrieved grade data and populate the table
    console.log("populating gradebook with data! one moment...", data);
    let tableElm = document.getElementById("gradebook").getElementsByTagName("tbody")[0];
        data.forEach(function(assignment){ //for each row of data we are passed in
            let row = document.createElement("tr");//create table row element
            let columns = []; // place to stick columns of info!
            columns.name = document.createElement('td'); // first columns table data will be the name
            columns.name.appendChild(
                    // concantenate the full name: last_name. first_name"
                    document.createTextNode(assignment.last_name + ", " + assignment.first_name)
            );
            columns.grade = document.createElement('td');
            //letter grades with condition solution
            let letterGrade;
            if (assignment.total_grade >= 90) {
                letterGrade = 'A'
            } else if (assignment.total_grade >= 80) {
                letterGrade = 'B'
            } else if (assignment.total_grade >= 70) {
                letterGrade = 'C'
            } else if (assignment.total_grade >= 60) {
                letterGrade = 'D'
            } else {
                letterGrade = 'F'
            }

            columns.grade.appendChild(
                //just put the name in text. please also figure out letter grade right here.
                //show me a solution with conditions, and show me a solution with a javascript switch statement
                document.createTextNode(letterGrade)
            );
            
            //add the table data to the table row
            row.appendChild(columns.name);
            row.appendChild(columns.grade);
            //add the row to the table itself to make the data visible
            tableElm.appendChild(row);
        });
}

// todo remove this
// call the stubs to demonstrate the workflow
const gradeData = fetchGradeData();
populateGradebook(gradeData);
// end remove
