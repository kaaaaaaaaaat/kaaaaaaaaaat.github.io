function fetchGradeData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");
    //create a new request for HTTP data
    let xhr = new XMLHttpRequest();
    // this is the address on the machine we are asking for data
    let apiRoute = "/api/grades";
    // when the request changes status, we run this anonymous function
    xhr.onreadystatechange = function(){
        let results;
        // check if we are done
        if(xhr.readyState === xhr.DONE){
            //check if we are successful
            if(xhr.status !== 200){
                console.error(`Could not get grades.
                    Status: ${xhr.status}`);
            }
            // and then call the function to update the HTML with our data
        populateGradebook(JSON.parse(xhr.responseText));
        }
    }.bind(this);
    xhr.open("get", apiRoute, true);
    xhr.send();
}

function populateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);
    let tableElm = document.getElementById("gradebook"); //get gradebook table element
        data.forEach(function(assignment){
            let row = document.createElement("tr");
            let columns = [];
            columns.name = document.createElement("td");
            columns.name.appendChild(
                document.createTextNode(assignment.last_name + ", " + assignment.first_name)
            );
            columns.grade= document.createElement('td');
            columns.grade.appendChild(
                document.createTextNode(assignment.total_grade)
            );
            row.appendChild(columns.name);
            row.appendChild(columns.grade)
            tableElm.appendChild(row);
        });  
        
}
// Call the stubs to demonstrate the workflow
fetchGradeData();
