const loadData = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    const catNews = data.data.news_category;
    displayHeading(catNews);
}

const displayHeading = (categories) =>{
    const newsContainer = document.getElementById('cat-news');
    categories.forEach(item => {
       const div = document.createElement('div');
       div.innerHTML = `
       <button onclick = "loadAllNews('${item.category_id}')" class="font-semibold text-2xl bg-yellow-50 rounded-lg p-2">
            ${item.category_name}
          </button>
       `
       newsContainer.appendChild(div);
    });
}

const loadAllNews = async (id) =>{
    document.getElementById('loading-spinner').classList.remove('hidden')
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    const mainNews = data.data;
    // console.log(mainNews);
    const allNewsContainer = document.getElementById('all-news-container');
    allNewsContainer.textContent = '';
    // if(mainNews.length === 0){
    //   // document.getElementById('loading-spinner').classList.add('hidden');

    //   alert('no data found')
    // }
    mainNews.forEach(item =>{
      // console.log(item.details);
    document.getElementById('loading-spinner').classList.add('hidden');
    document.getElementById('no-data').classList.remove('hidden');

        // handleNews(item.category_id);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-3/4 bg-base-100 shadow-xl mt-5">
            <div class="card-body">
              <div class="lg:flex">
                <img
                  class="w-52"
                  src="${item.thumbnail_url}"
                />
                <div class="lg:pl-20">
                  <h1 class="card-title mb-10">${item.title
                  }</h1>
                  <p>${item.details.slice(0, 300)}</p>
                </div>
              </div>
              <div class="flex justify-between">
                  <div class="flex">
                      <img
                        class="w-10 rounded-full"
                        src="${item.author.img}"
                        alt=""
                      />
                      <div class="ml-3">
                        <p>${item.author.name}</p>
                        <p>${item.author.published_date}</p>
                        
                      </div>
                    </div>
                  <div class="flex gap-2 p-4">
                      <img src="eye.png" alt="" />
                      <p>${item.total_view}</p>
                  </div>
                  <div>
                  <button onclick = "showDetailsModal('${item._id}')" class = "btn">Details</button>
                  </div>
            </div>
          </div>
        </div> 
        `
        allNewsContainer.appendChild(div);
    })
}


const handleSearch = () =>{
    const searchInput = document.getElementById('search-input').value;
    if (searchInput) {
        loadAllNews(searchInput)
    }
    else {
        alert('please search a valid id');
    }

}

const showDetailsModal = async (id) =>{
  // console.log(id);

  const res = await fetch (`https://openapi.programming-hero.com/api/news/${id}`);
  const data = await res.json();
  const dataId =  data?.data[0]?.title;  
  const dataDetails = data?.data[0]?.details;
  const modalDetails = document.getElementById('modal-details');
  modalDetails.innerText = dataDetails;
  const modalHeading = document.getElementById('modal-heading');
  modalHeading.innerText = dataId;
  
  // show the modal
  my_modal_5.showModal()
}

loadAllNews();

loadData();

