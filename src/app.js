
const url = 'https://api.tvmaze.com/shows'
let prevBtn = document.getElementById('previousBtn')
let nextBtn = document.getElementById('nextBtn')

let movieList = []
const loadMovies = async () =>{
    const response = await fetch(url)
    const data = await response.json();
    movieList = data.reverse()   
}
let currentPage = 1
let itemsPerPage = 8

async function displayPages(){
    await loadMovies()
    
    let startIndex= (currentPage-1) *itemsPerPage;
    let endIndex= startIndex + itemsPerPage;
    
    let itemsToShow = movieList.slice(startIndex,endIndex)
    const genCon = document.getElementById('gencon')
    genCon.innerHTML ="" 
    
    itemsToShow.forEach(movie =>{
        let container = document.createElement('div')
        let imgTag = document.createElement('img')
        let nameTag = document.createElement('h2')
        let likeComm = document.createElement('div')

        imgTag.src = movie.image.medium
        imgTag.style.borderRadius = '9px'
        imgTag.style.marginBottom = '29px'

        nameTag.textContent = movie.name
        nameTag.style.textAlign = 'center'
        
        
        container.appendChild(imgTag)
        container.appendChild(nameTag)
        // container.appendChild(likeComm)
        genCon.appendChild(container)
        
        container.classList.add('card')
        
        //implementing popup
        likeComm.classList.add('popup')
        let closeBtn = document.createElement('button')
        let overlay = document.createElement('div')
        let thumbNail = document.createElement('img')
        thumbNail.className = 'thumb'
        thumbNail.src = movie.image.medium
        let description = document.createElement('p')
        description.innerHTML = movie.summary
        
        likeComm.appendChild(closeBtn)
        likeComm.append(thumbNail,description)
        overlay.className = 'overlay'
        overlay.appendChild(likeComm)
        
        closeBtn.textContent = 'X'
        closeBtn.classList.add('closePopup')
        
        
        imgTag.addEventListener('click',()=>{
            overlay.style.display ='block'
        })
        closeBtn.addEventListener('click',()=>{
            likeComm.style.display = 'none'
            overlay.style.display ='none'

        })
    
        container.appendChild(overlay)

    })
    hideBtns()
    
    
}
displayPages()





prevBtn.addEventListener('click',()=>{
    currentPage--
    displayPages()
});
nextBtn.addEventListener('click', () =>{
    currentPage++
    displayPages()
})

function hideBtns (){
    if (currentPage === 1){
        prevBtn.style.display = 'none';
    }else{
        prevBtn.style.display = 'initial'
    };

    let pageLimit =Math.ceil( movieList.length / itemsPerPage);
    if(currentPage === pageLimit){
        nextBtn.style.display = 'none';
    }else{
        nextBtn.style.display = 'initial'
    }
    console.log(pageLimit);
}








