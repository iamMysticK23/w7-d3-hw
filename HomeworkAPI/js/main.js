// function to retrieve F1 Data

const getF1Data = async (season, round)=> {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    console.log(response)
    console.log(response.data)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings

}

// function to create the F1 List with Position/Name/Nationality/Sponsor/Points
// the html is stored in a basic table

const createF1List = (position, name, nationality, sponsor, points) => {
    const html = `
        <tr>
            <td>${position}</td>
            <td>${name}</td>
            <td>${nationality}</td>
            <td>${sponsor}</td>
            <td>${points}</td>
        </tr>
    `
    return html
}

// The output table
const f1OutputTable = document.querySelector('#racer-info-table')

// Looks for form input and submission from user
// This is a part that I had to do research on because I wanted to figure out how the user uses a form for input
const form = document.querySelector('#racer-form')
form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const season = document.querySelector('#season').value
    const round = document.querySelector('#round').value


    // Waiting for user input
    await loadF1Data(season, round); 

    // Clearing data
    document.querySelector('#season').value = ''
    document.querySelector('#round').value = ''  
})

// Load F1 data
const loadF1Data = async (seasonInput, roundInput) => {
  
    clearF1Data();

    // using try/catch to handle any errors
    try {
        const racerInfo = await getF1Data(seasonInput, roundInput);
        const racerColumns = document.querySelector('#racer-info-table')
      

        // What shows up for each driver 
        racerInfo.forEach(driver => {
            const position = driver.position;
            const name = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
            const nationality = driver.Driver.nationality;
            const sponsor = driver.Constructors[0].name;
            const points = driver.points;

            const html = createF1List(position, name, nationality, sponsor, points);
            racerColumns.innerHTML += html; 
        });
    } catch (error) {
        console.error(error);

    }
}

// Clear F1 data
const clearF1Data = () => {
    const racerColumns = document.querySelector('#racer-info-table')
    racerColumns.innerHTML =''
}










