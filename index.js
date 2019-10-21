(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.getElementById('data-panel')
  const classify = document.getElementById('classify')
  const Genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  function classifyall() {
    let htmlContent = ''

    for (let i in Genres) {

      htmlContent += `
     <a class="nav-link active" id='${i}' href="#">${Genres[i]}</a >
      `

    }
    classify.innerHTML = htmlContent
  }
  classifyall()

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    displayDataList(data)
  }).catch((err) => console.log(err))

  // listen to classify
  classify.addEventListener('click', (event) => {
    event.preventDefault()
    let results = []
    let b = Number(event.target.id)

    results = data.filter(movie => movie.genres.includes(b))
    console.log(b)
    displayDataList(results)

  })


  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      let something = ''
      for (let i = 0; i < item.genres.length; i++) {
        let x = `${item.genres[i]}`
        let y = `${Genres[x]}`
        something += `
        <span class="badge badge-light">${y}</span>
        `
      }
      htmlContent += `
      <div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h6>
              ${something}
            </div>
           </div>
        </div>
        </div >
      `

    })
    dataPanel.innerHTML = htmlContent


  }

})()

