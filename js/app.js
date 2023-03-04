/* Created by Mirza Mohibul Hasan*/
const loadAll = async (dataLimit, isSort) => {
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayAll(data.data.tools, dataLimit, isSort);
};

const displayAll = (tools, dataLimit, isSort) => {
  const toolsContainer = document.getElementById("tools-container");
  toolsContainer.innerText = "";
  //Show only 6 item or more
  if (dataLimit === true) {
    tools = tools.slice(0, 6);
    document.getElementById("show-more").classList.remove("d-none");
  } else {
    document.getElementById("show-more").classList.add("d-none");
  }
  // sort card by date
  if(isSort){
    tools.sort((a, b) => {
        let da = new Date(a.published_in);
        let db = new Date(b.published_in);
        return db - da;
    });
}

  tools.forEach((tool) => {
    //For feature list on card
   let list= tool.features;
   const featureList = list.map((feature)=>`<li>${feature}</li>`).join('');
    
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
  toggleSpinner(false);
};
//For Specific tool details
const loadToolDetails = async (id) => {
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displaytoolDetails(data.data);
};
const displaytoolDetails = (tool) => {
  // Integration list
  let integrationsList;
  if(Array.isArray(tool.integrations)){
      const list= tool.integrations;
      integrationsList = list.map((f)=>`<li>${f}</li>`).join('');
  }
  else{
    integrationsList = '<p class="">No Data Found</p>';
  }

    //Input and
    let inputOutputList;
    if(Array.isArray(tool.input_output_examples)){
      inputOutputList = `<h5 class="text-center">${tool.input_output_examples[0].input}</h5>
      <p class="text-center">${tool.input_output_examples[0].output}</p>`
    }
    else{
      inputOutputList = `<h5 class="text-center">Can you give any example?</h5>
      <p class="text-center">No! Not Yet! Take a break!!!</p>`
    }
    // Accuracy calculation
    let calculatedAccuracy = 0;
    if(tool.accuracy.score !== null){
      calculatedAccuracy = tool.accuracy.score * 100;
    }
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
          <div class="row">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <div class="card border border-danger" style="background: rgba(235, 87, 87, 0.10);">
              <div class="card-body">
                <h5 class="card-title">${tool.description}</h5>
                <div id="price-container" class = "card-text d-flex justify-content-between fw-bold" style="gap:5px">
            
                <div class="bg-white rounded p-2 text-success d-flex justify-content-center align-items-center text-center" style="flex:1;">
                    <div>
                        <p>${(Array.isArray(tool.pricing))? tool.pricing[0]?.price : 'Free of Cost/'}  </p>
                        <p>${(Array.isArray(tool.pricing))? tool.pricing[0]?.plan :'Basic'}</p>
                    </div>
                  </div>
                  <div class="bg-white rounded p-2 text-warning d-flex justify-content-center align-items-center text-center" style="flex:1;">
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
                        <li class ="${tool.features[1]?'':'d-none'}">${tool.features[1]?tool.features[1]['feature_name']:''}</li>
                        <li class ="${tool.features[2]?'':'d-none'}">${tool.features[1]?tool.features[2]['feature_name']:''}</li>
                        <li class ="${tool.features[3]?'':'d-none'}">${tool.features[3]?tool.features[3]['feature_name']:''}</li>
                        <li class ="${tool.features[4]?'':'d-none'}">${tool.features[4]?tool.features[4]['feature_name']:''}</li>
                        <li class ="${tool.features[5]?'':'d-none'}">${tool.features[5]?tool.features[5]['feature_name']:''}</li>
                    </ul>
                    <ul>
                        <h5 class="card-title">Integrations</h5>
                        ${integrationsList}
                    </ul>
                </div>
                <!-- DownSection End -->
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <p class="fw-semibold text-white ${tool.accuracy.score === null?'d-none':''}" style="position: absolute;    right: 27px; top: 23px; background-color: #EB5757; padding: 5px; border-radius: 10px;">${calculatedAccuracy}% accuracy</p>
                <img src="${tool.image_link[0]}" alt="" class="img-fluid rounded ">
                <div class="mx-auto mt-3" style="width:90%;">${inputOutputList}</div>
              </div>
            </div>
          </div>
        </div>
    `;
    toggleSpinner(false);
};

/* Spinner Function */
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

//Sorting and Showall value
let showAll = false;
let sortDate = false;

// Calling Show All Button
document.getElementById("btn-show-more").addEventListener("click", function () {
  toggleSpinner(true);
  showAll = true;
  if(sortDate == true){
    loadAll(false, true);
  }
  else{
    loadAll(false, false);
  }
});

// Calling Sort Button
document.getElementById('btn-sort-date').addEventListener('click',function(){
  toggleSpinner(true);
  sortDate = true;
  if(showAll == true){
    loadAll(false, true)
  }
  else{
    loadAll(true, true);
  }
})
