
function displayResults(responseJson) {
    // if there are previous results, remove them
    $('#user-repos').removeClass('hidden');
    console.log(responseJson);
    $('#user-repos-list').empty();

    $('#results').append(`<h2>${responseJson.length} Search Results</h2>`);
    // iterate through the articles array, stopping at the max number of results
    for (let i = 0; i < responseJson.length; i++) {
        $('#user-repos-list').append(`
        <li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3></li>
        `
        )
    };
};

function listUserRepo(userHandle) {
    const searchURL = `https://api.github.com/users/${userHandle}/repos`;

    fetch(searchURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        let userHandle = $("#js-search-term").val();
        listUserRepo(userHandle);
    });
}

$(watchForm);