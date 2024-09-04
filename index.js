let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
// localStorage.setItem("myLeads","www.example.com");
// localStorage.setItem("myLeads",JSON.stringify(myLeads));
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
// console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
  // console.log(true);
} else {
  // console.log(false);
}

// const tabs = [
//   {
//     url: "https://www.linkedin.com/in/per-harald-borgen/",
//   },
// ];

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true,
    function(tabs) {
      myLeads.push(tabs[0].url);
      inputEl.value = "";
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
      // console.log(tabs);
      tabBtn.style.backgroundColor="red";
    },
  });

  
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // listItems += "<li><a href='#' target='_blank'>" + myLeads[i] + "</a></li>";
    listItems += `<li>
    <a href='${leads[i]}' target='_blank'> ${leads[i]} </a>
    </li>`;
    //   ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";
    // console.log(myLeads[i]);
    //   const li=document.createElement('li');
    //   li.textContent=myLeads[i]
    //   ulEl.append(li)
    // console.log(listItems)
  }

  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  //   console.log("button clicked");
  myLeads.push(inputEl.value);

  //   console.log(myLeads);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
