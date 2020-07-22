let parametersbox = document.getElementById("parametersBox");
let addedparams = 0;
function getlementfromstring(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}
parametersbox.style.display = "none";
let params = document.getElementById("params");
let json1 = document.getElementById("json");
params.addEventListener("click", function (e) {
    document.getElementById("requestjsonbox").style.display = "none";
    document.getElementById("parametersBox").style.display = "block";
})
json1.addEventListener("click", function (e) {
    document.getElementById("requestjsonbox").style.display = "block";
    document.getElementById("parametersBox").style.display = "none";
})
let addparam = document.getElementById("addParam");
addparam.addEventListener("click", function (e) {
    let string = `<div class="form-row my-3">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedparams + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedparams + 2}" placeholder="Enter Parameter ${addedparams + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedparams + 2}" placeholder="Enter Parameter ${addedparams + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam">-</button>
</div>`;
    let paramsbox = document.getElementById("paramsbox");
    let paramelement = getlementfromstring(string);
    paramsbox.appendChild(paramelement);
    let deleteparam = document.getElementsByClassName("deleteParam");
    for (item of deleteparam) {
        item.addEventListener("click", function (e) {
            e.target.parentElement.remove();
        })
    }
    addedparams++;
})
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    document.getElementById("responsejsontext").value = "Please wait... Fetching response";
    let url = document.getElementById("url").value;
    let requestype = document.querySelector("input[name='requestype']:checked").value;
    let contentype = document.querySelector("input[name='contentype']:checked").value;
    if (contentype == 'params') {
        let data = {};
        for (i = 0; i < addedparams + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        JSON.stringify(data);
    }
    else{
        data=document.getElementById("requestjsontext").value;
    }
    if(requestype=='GET'){
        fetch(url,{
            method:'GET',
        }).then(response=>response.text()).then((text)=>{
            document.getElementById("responsejsontext").value=text;
        });
    }
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        }).then(response=>response.text()).then((text)=>{
            document.getElementById("responsejsontext").value=text;
        });
    }
})