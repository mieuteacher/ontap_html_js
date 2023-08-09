let users = [
    {
        id: Date.now() * Math.random(),
        name: "Phước",
        address: "123"
    },
    {
        id: Date.now() * Math.random(),
        name: "Phương", 
        address: "123"
    },
    {
        id: Date.now() * Math.random(),
        name: "Hải",
        address: "123"
    }
]

/* Lưu users to local */
function saveToLocal() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users))
    }
}

saveToLocal();

function printUsers () {
    let users = JSON.parse(localStorage.getItem("users"));
    let tableContentString = ``;
    for (let i = 0; i < users.length; i++) {
        tableContentString += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${users[i].id}</td>
                <td>${users[i].name}</td>
                <td>${users[i].address}</td>
                <td>
                    <button onclick="deleteUser(${users[i].id})" type="button" class="btn btn-danger">Delete</button>
                    <button onclick="loadDataEdit(${users[i].id})" style="margin: 0 10px;" type="button" class="btn btn-primary">Edit</button>
                </td>
            </tr>
        `
    }

    let tableString = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">address</th>
                    <th scope="col">tools</th>
                </tr>
            </thead>
            <tbody>
                ${tableContentString}
            </tbody>
        </table>
    `;

    document.getElementById("table_user").innerHTML = tableString;
}

printUsers();

function addUser(event) {
    event.preventDefault();

    let loadingElement = document.getElementById("loading");
    loadingElement.classList.add("active");

    setTimeout(() => {
        loadingElement.classList.remove("active");

        if (event.target.name.value == "") {
            alert("Name không được bỏ trống!")
            return
        }
    
        if (event.target.address.value == "") {
            alert("Address không được bỏ trống!")
            return
        }
    
        let newUser = {
            id: Date.now() * Math.random(),
            name: event.target.name.value,
            address: event.target.address.value,
        }
    
        let users = JSON.parse(localStorage.getItem("users")); // get
    
        users.push(newUser); // xử lý
    
        localStorage.setItem("users", JSON.stringify(users)) // save
    
        printUsers(); // load lại data
    }, 1500)
}

function deleteUser(userId) {

    let loadingElement = document.getElementById("loading");
    loadingElement.classList.add("active");

    setTimeout(() => {
        let users = JSON.parse(localStorage.getItem("users")); // get
    
        users = users.filter(user => user.id != userId);
    
        localStorage.setItem("users", JSON.stringify(users)) // save
    
        printUsers(); // load lại data

        loadingElement.classList.remove("active");
    }, 1500)
}

function loadDataEdit(userId) {
    if (localStorage.getItem("users")) {
        let user = JSON.parse(localStorage.getItem("users")).find(user => user.id == userId);

        if(!user) {
            alert("Không tìm thấy người dùng!")
            return
        }

        const updateFormElement = document.getElementById("update_form");

        updateFormElement.querySelector(".update_form_id").value = user.id;
        updateFormElement.querySelector(".update_form_name").value = user.name;
        updateFormElement.querySelector(".update_form_address").value = user.address;
    }
}

function saveUser(event) {
    event.preventDefault();

    let loadingElement = document.getElementById("loading");
    loadingElement.classList.add("active");

    setTimeout(() => {
        loadingElement.classList.remove("active");

        if (event.target.name.value == "") {
            alert("Name không được bỏ trống!")
            return
        }
    
        if (event.target.address.value == "") {
            alert("Address không được bỏ trống!")
            return
        }
    
        let userUpdate = {
            id: event.target.id.value,
            name: event.target.name.value,
            address: event.target.address.value,
        }
    
        let users = JSON.parse(localStorage.getItem("users")); // get
    
        // for (let i = 0; i < users.length; i++) {
        //     if (users[i].id == userUpdate.id) {
        //         users[i] = userUpdate;
        //         break
        //     }
        // }

        // for (let i in users) {
        //     if (users[i].id == userUpdate.id) {
        //         users[i] = userUpdate;
        //         break
        //     }
        // }
        
        users = users.map((user, index) => {
            if(user.id  == userUpdate.id) {
                return userUpdate
            }
            return user
        })
    
        localStorage.setItem("users", JSON.stringify(users)) // save
    
        printUsers(); // load lại data
    }, 1500)
}

function logout() {
    if(confirm("Bạn có chắc chán muốn đăng xuất?")) {
        localStorage.removeItem("userLogin")
        window.location.reload();
    }
}

function checkLogin() {
    let email_displayEL = document.getElementById("email_display");
    let avatar_displayEL = document.getElementById("avatar_display");
    let btn_logoutEL = document.getElementById("btn_logout");
    let btn_loginEL = document.getElementById("btn_login");
    if(localStorage.getItem("userLogin")) {
        email_displayEL.style.display = "block";
        email_displayEL.innerText = JSON.parse(localStorage.getItem("users")).find(user => user.id == localStorage.getItem("userLogin")).email;
        avatar_displayEL.style.display = "block";
        avatar_displayEL.src = JSON.parse(localStorage.getItem("users")).find(user => user.id == localStorage.getItem("userLogin")).avatar;
        btn_logoutEL.style.display = "block";
        btn_loginEL.style.display = "none";
    }else {
        email_displayEL.style.display = "none";
        btn_logoutEL.style.display = "none";
        avatar_displayEL.style.display = "none";
        btn_loginEL.style.display = "block";
    }
}

checkLogin();

// function autoplay() {
//     let mp3Tag = document.getElementById("mp3Tag");
//     console.log("mp3Tag", mp3Tag)
//     mp3Tag.play();
//     // var audioTag = document.createElement('audio');
//     // audioTag.controls = true;
//     // audioTag.autoplay = true;

//     // // Tạo thẻ source và thiết lập thuộc tính src và type
//     // var sourceTag = document.createElement('source');
//     // sourceTag.src = '1.mp3';
//     // sourceTag.type = 'audio/mpeg';

//     // // Thêm thẻ source vào thẻ audio
//     // audioTag.appendChild(sourceTag);

//     // // document.appendChild(audioTag);
//     // audioTag.play();
// }

// autoplay();

// 1: laptop, 2: pc, 3: mobile

// let products = [
//     {
//         id: Date.now() * Math.random(),
//         category_id: 1,
//         name: "Laptop 1"
//     },
//     {
//         id: Date.now() * Math.random(),
//         category_id: 1,
//         name: "Laptop 2"
//     },
//     {
//         id: Date.now() * Math.random(),
//         category_id: 2,
//         name: "PC 1"
//     },
//     {
//         id: Date.now() * Math.random(),
//         category_id: 3,
//         name: "MB 1"
//     }
// ]


//localStorage.setItem("products", JSON.stringify(products))

function renderProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    let liString = ``;
    for (let i in products) {
        liString += `
            <li>
                <div>${products[i].name}</div>
                <div>${products[i].category_id}</div>
            </li>
        `
    }

    let htmlString = `
        <ul>
            ${liString}
        </ul>
    `

    document.getElementById("product_ul").innerHTML = htmlString;
}

renderProducts();