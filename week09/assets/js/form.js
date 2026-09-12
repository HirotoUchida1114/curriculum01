const nameInput = document.getElementById("name");
const emailInput =document.getElementById("email");
const password = document.getElementById("password");
const agreeCheckbox = document.getElementById("agree");
console.log(agreeCheckbox.checked);

const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
if(nameInput.value.trim() === ""){
    alert("名前を入力してください")
    return;
}
if(emailInput.value.trim() === ""){
    alert("メールアドレスを入力してください")
    return;
}
if (password.value.trim().length < 8) {
    alert("パスワードは８文字以上で入力してください。")
    return;
}
if(!agreeCheckbox.checked){
    alert("利用規約に同意してください")
    return;
}




console.log(nameInput.value);
console.log(emailInput.value);
console.log(password.value);
console.log(agreeCheckbox.checked);
const message = document.getElementById("message"); 

message.textContent = "登録完了です";
message.className = "text-sm font-medium text-green-600";

});
