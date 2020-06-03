const formState = [
    {
        tarif: 'Економ від 129 ₽',
        options: ['Eконом Опція 1', 'Eконом Опція 2', 'Eконом Опція 3']
    },
    {
        tarif: 'Не економ від 200 ₽',
        options: ['Не економ Опція 1', 'Не економ Опція 2', 'Не економ Опція 3', 'Не економ Опція 4']
    },
    {
        tarif: 'Депутатський вибір 500 ₽',
        options: ['Депутатська Опція 1', ' Депутатська Опція 2']
    }
]

const allState = {
    from: '',
    to: '',
    phone: '',
    tarif: 'Економ від 129 ₽',
    options: ['Eконом Опція 1'],
    comment: ''
}
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

class Tarif{
    constructor(array, state = allState){
        this.array = array;
        this.state = state;
        this.showTarifs = this.showTarifs.bind(this)
        this.validFrom = this.validFrom.bind(this)
        this.validTo = this.validTo.bind(this)
        this.validPhone = this.validPhone.bind(this)
    }
    showTarifs(){
        let tarifHtml = '';
        const tarif = document.querySelector('#form-tarif');
        this.array.map(tarif =>{
            tarifHtml += `<option value="${tarif.tarif}">${tarif.tarif}</option>`;
        })
        tarif.innerHTML = tarifHtml;
    }
    showOptions(chosenTarif){
        let optionHtml = '';
        const option = document.querySelector('#form-option');
        //console.log('chosenTarif', chosenTarif)
        let options = formState.filter( e => {
            return e.tarif == chosenTarif
        })
        //console.log('options', options)
        options[0].options.map(option =>{
            optionHtml += `<option value="${option}">${option}</option>`;
        })
        option.innerHTML = optionHtml;
    }
    validFrom(){
        const from = document.querySelector("#form-from");
        let valid = false;
        countries.map(e=>{
            if(e === from.value){
                valid = true;
            }         
        })
        return valid
    }
    validTo(){
        const to = document.querySelector("#form-to");
        let valid = false;
        countries.map(e=>{
            if(e === to.value){
                valid = true;
            }         
        })
        return valid
    }
    validPhone(){
        const phone = document.querySelector("#form-phone");
        let number = parseInt(phone.value);
        let valid = false;
        if(!Number.isNaN(number) && phone.value.length>8){
            valid = true
        }
        return valid;
    }
    isValid(){
        if(this.state.from == '' || !this.validFrom()){
            const from = document.querySelector("#form-from");
            const ele = document.createElement("div");
            
            ele.className = "wrong";
            ele.innerHTML = "wrong location";
            from.parentNode.insertBefore(ele, from.nextSibling);
            setTimeout(() => {const wrong = document.querySelector(".wrong");wrong.remove()}, 2000)
        }
        if(this.state.to == '' || !this.validTo()){
            const to = document.querySelector("#form-to");
            const ele = document.createElement("div");
            
            ele.className = "wrong";
            ele.innerHTML = "wrong location";
            to.parentNode.insertBefore(ele, to.nextSibling);

            setTimeout(() => {const wrong = document.querySelector(".wrong");wrong.remove()}, 2000)
        }
        if(this.state.phone == '' || !this.validPhone()){
            const phone = document.querySelector("#form-phone");
            const ele = document.createElement("div");
            
            ele.className = "wrong";
            ele.innerHTML = "wrong phone";
            phone.parentNode.insertBefore(ele, phone.nextSibling);

            setTimeout(() => {const wrong = document.querySelector(".wrong");wrong.remove()}, 2000)
        }
        if(this.validPhone() && this.validTo() && this.validFrom()){
            console.log('allState', allState)
        }
    }
}

let form = new Tarif(formState);
form.showTarifs();
form.showOptions(allState.tarif)

function changeTarif(val){
    allState.tarif = val;
    form.showOptions(val);
}
function selectOption(val){
    allState.options = val;
}

function changeDistanation(){
    const from = document.querySelector('#form-from');
    const to = document.querySelector('#form-to');
    const temp  = to.value;
    to.value = from.value;
    from.value = temp;
}
function addFrom(val){
    allState.from = val
}
function addTo(val){
    allState.to = val
}
function addPhone(val){
    allState.phone = val
}
function showComment(e){
    e.preventDefault();
    const comment = document.querySelector('#comment');
    const commentBlock = document.querySelector('#for-comment');
    commentBlock.classList.toggle('for-comment');
    console.log('add commnet', comment.value)
}
function addComment(val){
    allState.comment = val;
    console.log('allState', allState)
}

let menu = {active: false};
function togleMenu(){
    console.log('togle');
    const header = document.querySelector('#header');
    const icon = document.querySelector('#menu-icon');
    if(!menu.active){
        menu.active = true;
        icon.innerText = 'x'
    }else{
        menu.active = false;
        icon.innerText = '☰'
    }
    header.classList.toggle('menu-opened');
    
}

function checkForm(e){
    e.preventDefault();
    form.isValid()
}