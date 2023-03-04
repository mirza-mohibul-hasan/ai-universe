const loadAll = async (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayAll(data.data.tools, dataLimit);
};

const displayAll = (tools, dataLimit) => {
  const toolsContainer = document.getElementById("tools-container");
  toolsContainer.innerText = "";

  if (dataLimit === true) {
    tools = tools.slice(0, 6);
    document.getElementById("show-more").classList.remove("d-none");
  } else {
    document.getElementById("show-more").classList.add("d-none");
  }

  tools.forEach((tool) => {
   let list= tool.features;
   const featureList = list.map((f)=>`<li>${f}</li>`).join('');

// console.log(featureList);
    
    toolsContainer.innerHTML += `
          <div class="col">
              <div class="card h-100">
                <img src="${tool.image}" class="card-img-top p-3" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Features</h5>
                  <div id = "features-list">
                    <ol>${featureList}<ol>
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                  <div>
                      <h5 class="card-title">${tool.name}</h5>
                      <small class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${
                        tool.published_in
                      }</small>
                  </div>
                  <div>
                      <button onclick="loadToolDetails('${
                        tool.id
                      }')" class ="btn btn-light" data-bs-toggle="modal" data-bs-target="#toolDetailsModal"><i class="fa-solid fa-arrow-right text-danger"></i></button>
                  </div>
                </div>
              </div>
            </div>`;
  });
};
document.getElementById("btn-show-more").addEventListener("click", function () {
  loadAll(false);
});

const loadToolDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displaytoolDetails(data.data);
};
const displaytoolDetails = (tool) => {
 console.log(Array.isArray(tool.pricing));
  
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
          <div class="row">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <div class="card border border-danger" style="background: rgba(235, 87, 87, 0.10);">
              <div class="card-body">
                <h5 class="card-title">${tool.description}</h5>
                <div id="price-container" class = "card-text d-flex justify-content-between fw-bold" style="gap:5px">
                
                <!-- {loadPrice(tool.pricing)} -->
                <div class="bg-white rounded p-2 text-success d-flex justify-content-center align-items-center" style="flex:1;">
                    <div>
                        <p>${(Array.isArray(tool.pricing))? tool.pricing[0]?.price : 'Free of Cost/'}  </p>
                        <p>${(Array.isArray(tool.pricing))? tool.pricing[0]?.plan :'Basic'}</p>
                    </div>
                  </div>
                  <div class="bg-white rounded p-2 text-warning d-flex justify-content-center align-items-center" style="flex:1;">
                    <div>
                        <p>${(Array.isArray(tool.pricing))? tool.pricing[1]?.price : 'Free of Cost/'}  </p>
                        <p>${(Array.isArray(tool.pricing))? tool.pricing[1]?.plan :'Pro'}</p>
                    </div>
                  </div>
                  <div class="bg-white rounded p-2 text-danger d-flex justify-content-center align-items-center text-center" style="flex:1;">
                    <div>
                        <p>${(Array.isArray(tool.pricing))? tool.pricing[2]?.price : 'Free of Cost/'}  </p>
                        <p>${(Array.isArray(tool.pricing))? tool.pricing[2]?.plan :'Enterprise'}</p>
                    </div>
                  </div>
                  
                </div>
                <!-- DownSection End -->
                <div class="d-flex justify-content-between m-3">
                    <ul>
                        <h5 class="card-title">Features</h5>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul>
                        <h5 class="card-title">Integrations</h5>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <!-- DownSection End -->
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <p class="text-end" style="position: absolute;right:1;">Accuracy</p>
                <img src="${tool.image_link[0]}" alt="" class="img-fluid rounded ">
                <h5></h5>
              </div>
            </div>
          </div>
        </div>
    `;
};

loadAll(true);
