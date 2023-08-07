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
