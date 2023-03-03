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
    toolsContainer.innerHTML += `
          <div class="col">
              <div class="card h-100">
                <img src="${tool.image}" class="card-img-top p-3" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Features</h5>
                  <div id = "features-list">
                      <p>${tool.features[0] ? "1." + tool.features[0] : ""}</p>
                      <p>${tool.features[1] ? "2." + tool.features[1] : ""}</p>
                      <p>${tool.features[2] ? "3." + tool.features[2] : ""}</p>
                      <p>${tool.features[3] ? "4." + tool.features[3] : ""}</p>
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                  <div>
                      <h5 class="card-title">${tool.name}</h5>
                      <small class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${tool.published_in}</small>
                  </div>
                  <div>
                      <button class ="btn btn-light" data-bs-toggle="modal" data-bs-target="#toolDetailsModal"><i class="fa-solid fa-arrow-right text-danger"></i></button>
                  </div>
                </div>
              </div>
            </div>`;
  });
};
document.getElementById("btn-show-more").addEventListener("click", function () {
  loadAll(false);
});

loadAll(true);
