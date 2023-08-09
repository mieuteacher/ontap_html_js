if(localStorage.getItem("userLogin")) {
    alert("Bạn đã đăng nhập!")
    window.location.href='/'
}

function login(event) {
    event.preventDefault();
    let infor = {
        email: event.target.email.value,
        password: event.target.password.value,
    }

    if (localStorage.getItem("users")) {
        let users = JSON.parse(localStorage.getItem("users"));

        let user = users.find(user => user.email == infor.email);

        if(user) {
            if (user.password == infor.password) {
                // login thành công!
                localStorage.setItem("userLogin", user.id)
                alert("Bạn đã đăng nhập thành công!")
                window.location.href='/'
            }else {
                alert("Tài khoản or mật khẩu không chính xác!")
            }
        }else {
            alert("Người dùng không tồn tại!")
        }
    }else {
        alert("Sever bận!")
    }

}