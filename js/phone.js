const loeadfun = async (searchfiledvalue, datalimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchfiledvalue}`;
  const res = await fetch(url);
  const data = await res.json();
  displayphone(data.data, datalimit);
};

const displayphone = (phones, datalimit) => {
  let container = document.getElementById("phone-container");
  container.innerHTML = "";

  const showall = document.getElementById("show-all");
  // let lenghtt = phones.lenght;
  // phones.forEach((datalimit, lenghtt) => {
  //     if (datalimit && lenghtt > 10) {
  //         phones = phones.slice(0, 10)
  //     //   console.log(element);
  //       showall.classList.remove('d-none')
  //     }else{
  //         showall.classList.add('d-none')
  //     }
  //   });

  if (datalimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showall.classList.remove("d-none");
  } else {
    showall.classList.add("d-none");
  }

  // condition no phone found
  let nophone = document.getElementById("text-warning");
  if (phones.length === 0) {
    nophone.classList.remove("d-none");
    toggleloader(false);
  } else {
    nophone.classList.add("d-none");
  }

  phones.forEach((phone) => {
    let div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card p-3">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.brand}</h5>
                          <p class="card-text">${phone.phone_name}</p>
                          <p class="card-text">this is a best phone ever. iam so lukhy to have u in my life. haha</p>
                          <button onclick="loadphonedetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">show details</button>
                          
                          </div>
                      </div>
        `;
    container.appendChild(div);
    toggleloader(false);
  });
};

const proccesssearch = (datalimit) => {
  toggleloader(true);
  let searchfiled = document.getElementById("floatingInput");
  let searchfiledvalue = searchfiled.value;
  loeadfun(searchfiledvalue, datalimit);
  // searchfiled.value= ''
};

// btuuuon search-------------
document.getElementById("btn-search").addEventListener("click", () => {
  // toggleloader(true)
  // let searchfiled = document.getElementById('floatingInput');
  // let searchfiledvalue = searchfiled.value;
  // loeadfun(searchfiledvalue)
  proccesssearch(10);
  // searchfiled.value= ''
});

// search input field with keyboard
document.getElementById("floatingInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    proccesssearch(10);
  }
});

const toggleloader = (isloader) => {
  const loader = document.getElementById("loader");
  if (isloader) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

document.getElementById("btn-show-all").addEventListener("click", () => {
  proccesssearch();
});

const loadphonedetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  // console.log(url)
  const res = await fetch(url);
  const data = await res.json();
  modaldetails(data.data);
//   console.log(id)
};

const modaldetails = (data) =>{
// console.log(data)
document.getElementById('exampleModalLabel').innerText = data.name;
document.getElementById('storage-item').innerText = data.mainFeatures.storage;
document.getElementById('display-size').innerText = data.mainFeatures.displaySize;
document.getElementById('relesed-item').innerText = data.releaseDate? data.releaseDate : 'No Release Date Found';
console.log(data)
}

loeadfun('a')
