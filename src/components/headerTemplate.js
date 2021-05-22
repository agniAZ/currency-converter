
let headerTemplate= document.getElementById('header');

let header = `
  
<div class="header col-12 mb-1">
<div class="row">
  <div class="col-1 ml-3 mr-3 p-1 d-flex" id="brand">
    <img src="./src/assets/img/adyen_logo.png" alt="Adyen Logo">
  </div>
  <div class="col pb-3 pt-3 title d-flex">
    <h1 class="m-0">
      Currency converter
    </h1>
  </div>
</div>

</div>
`;

headerTemplate.innerHTML = header;


