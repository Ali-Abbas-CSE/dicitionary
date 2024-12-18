let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const getData = async (searchValue) => {
    try {
        let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`)
        if (!data.ok) throw new Error("Word not found");

        let jsonData = await data.json();

        document.querySelector(".text").innerHTML = "";

        let div = document.createElement("div");
        div.classList.add("detail");
        div.innerHTML = `
        <h2>Word: <span>${jsonData[0].word}</span></h2>
        <p></p>
        <p>Word :<span></span></p>
        <p>Meaning : <span>${jsonData[0].meanings[0].definitions[0].definition}</span></p>
       <p>Example: <span>${jsonData[0].meanings[0].definitions[0].example || "No example available"}</span></p>
            <p>Synonyms: <span>${jsonData[0].meanings[0].definitions[0].synonyms?.join(", ") || "No synonyms available"}</span></p>
`            ;

        document.querySelector(".text").appendChild(div);
        console.log(jsonData);
    } catch (error) {
        console.error("Error:", error.message);
        alert("Word not found. Please try again");
    }
};
searchBtn.addEventListener('click', function () {
    let searchValue = searchInput.value.trim();
    if (searchValue === "") {
        alert("Enter Something to search");
    } else {
        getData(searchValue);
    }
})