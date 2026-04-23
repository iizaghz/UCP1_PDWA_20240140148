
// AMBIL DATA DARI STORAGE
let anggota = JSON.parse(localStorage.getItem("anggota")) || [];


// TAMPILKAN DI INDEX
document.addEventListener("DOMContentLoaded", function(){

  let table = document.getElementById("tableAnggota");

  if(table){
    anggota.forEach(data => {
      let row = table.insertRow();
      row.insertCell(0).innerText = data.nama;
      row.insertCell(1).innerText = data.email;
      row.insertCell(2).innerText = data.minat;
    });
  }

  
  // FORM SUBMIT
  let form = document.getElementById("formAnggota");

  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();

      let nama = document.getElementById("nama").value;
      let email = document.getElementById("email").value;
      let minat = document.getElementById("minat").value;

      let dataBaru = {nama, email, minat};

      anggota.push(dataBaru);

      // SIMPAN KE LOCALSTORAGE
      localStorage.setItem("anggota", JSON.stringify(anggota));

      alert("Data berhasil ditambahkan!");

      form.reset();

      // AUTO PINDAH KE HOME
      window.location.href = "index.html";
    });
  }

});