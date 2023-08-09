if(localStorage.getItem("userLogin")) {
    alert("Bạn đã đăng nhập!")
    window.location.href='/'
}

const validate = {
    isEmail: function (emailString) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
    }
}

function register(eventForm) {
    /* Ngăn chặn hành vi mặc định của form (hành vi gọi tới action) */
    eventForm.preventDefault();

    if (!(validate.isEmail(eventForm.target.email.value))) {
        alert("Email không đúng định dạng!")
        return
    }

    if (eventForm.target.password.value != eventForm.target.password_confirm.value) {
        alert("Mật khẩu và mật khẩu nhập lại phải giống nhau!")
    }

    if (localStorage.getItem("users")) {
        // người thứ n
        let users = JSON.parse(localStorage.getItem("users"));

        if (users.find(user => user.email == eventForm.target.email.value)) {
            alert("Email đã tồn tại!")
            return
        }

        users.push(
            {
                id: Date.now() * Math.random(),
                email: eventForm.target.email.value,
                password: eventForm.target.password.value,
                phone_number: eventForm.target.phone_number.value,
                address: eventForm.target.address.value,
                avatar: eventForm.target.avatar.value
            }
        )

        localStorage.setItem("users", JSON.stringify(users)) // save

        alert("Đăng ký thành công")
        window.location.href = "./login.html"
    }else {
        // người dùng đầu tiên
        localStorage.setItem("users", JSON.stringify([
            {   
                id: Date.now() * Math.random(),
                email: eventForm.target.email.value,
                password: eventForm.target.password.value,
                phone_number: eventForm.target.phone_number.value,
                address: eventForm.target.address.value,
                avatar: eventForm.target.avatar.value
            }
        ]))

        alert("Đăng ký thành công")
        window.location.href = "./login.html"
    }
    //console.log("email validate", validate().isEmail(eventForm.target.email.value))
}

