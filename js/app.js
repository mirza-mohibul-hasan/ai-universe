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
//  console.log(Array.isArray(tool.pricing));
//  console.log(Array.isArray(tool.integrations));

  let integrationsList;
    if(Array.isArray(tool.integrations)){
        const list= tool.integrations;
        integrationsList = list.map((f)=>`<li>${f}</li>`).join('');
        // console.log(integrationsList);
    }
    else{
      integrationsList = '<p class="">No Data Found</p>';
      // console.log(integrationsList);
    }
    // console.log(tool.features[1]['feature_name'])
    // console.log(tool.input_output_examples[0].input)
    // console.log(tool.input_output_examples[0].output)
    // console.log(Array.isArray(tool.input_output_examples));

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
    else{
      console.log('Accuracy not found');
    }
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
          <div class="row">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <div class="card border border-danger" style="background: rgba(235, 87, 87, 0.10);">
              <div class="card-body">
                <h5 class="card-title">${tool.description}</h5>
                <div id="price-container" class = "card-text d-flex justify-content-between fw-bold" style="gap:5px">
                
                <!-- {loadPrice(tool.pricing)} -->
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
                ${inputOutputList}
              </div>
            </div>
          </div>
        </div>
    `;
};

loadAll(true);
