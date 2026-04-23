
let members = [];


if (sessionStorage.getItem('techMembers')) {
    members = JSON.parse(sessionStorage.getItem('techMembers'));
} else {
    sessionStorage.setItem('techMembers', JSON.stringify(members));
}

// ---------------------------------------------
// FUNGSI UNTUK HALAMAN UTAMA (index.html)
// ---------------------------------------------
function renderTable() {
    const tableBody = document.getElementById('membersTableBody');
    if (!tableBody) return; // Jika tidak di index.html, batalkan eksekusi
    
    tableBody.innerHTML = ''; // Kosongkan tabel dulu
    
    if (members.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center">Belum ada data anggota</td></tr>';
        return;
    }

    // Melakukan loop ke array JavaScript dan memasukkannya ke tabel
    members.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.interest}</td>
        `;
        tableBody.appendChild(row);
    });
}

// ---------------------------------------------
// FUNGSI UNTUK HALAMAN FORM (form.html)
// ---------------------------------------------
// Dipanggil oleh event onsubmit pada tag <form>
function handleMemberSubmit(event) {
    event.preventDefault(); // Mencegah reload halaman standar dari form submit
    
    // Menangkap data input dengan JavaScript
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const interestInput = document.getElementById('interest').value;
    
    // Menyimpan data ke object
    const newMember = {
        name: nameInput,
        email: emailInput,
        interest: interestInput
    };
    
    // Menyimpan data ke dalam array JavaScript (sementara)
    members.push(newMember);
    
    // Simpan ke sessionStorage agar persist ketika kembali ke index.html
    sessionStorage.setItem('techMembers', JSON.stringify(members));
    
    // Menampilkan hasil di bawah form
    const alertBox = document.getElementById('formAlert');
    alertBox.innerHTML = `Berhasil! <b>${nameInput}</b> telah ditambahkan ke komunitas.`;
    alertBox.style.display = 'block';
    
    // Menampilkan alert standard juga seperti yang diminta di soal (Opsional/Bonus)
    alert(`Data anggota baru atas nama ${nameInput} berhasil disimpan!`);
    
    // Mereset isi form
    document.getElementById('memberForm').reset();
    
    // Menghilangkan pesan alert setelah 5 detik
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 5000);
}

// ---------------------------------------------
// FUNGSI UNTUK HALAMAN MULTIMEDIA (gallery.html)
// ---------------------------------------------
// Event onclick sederhana untuk mengganti gambar beserta menampilkan alert info
function changeImage() {
    const imgObj = document.getElementById('galleryImage');
    const newSrc = 'https://images.unsplash.com/photo-1669023414180-4dcf35d943e1?auto=format&fit=crop&w=600&q=80'; 
    const oldSrc = 'https://images.unsplash.com/photo-1653387300291-bfa1eeb90e16?auto=format&fit=crop&w=600&q=80'; 
    
    // Memeriksa dan mengganti source gambar
    if (imgObj.src === oldSrc) {
        imgObj.src = newSrc;
        alert("Gambar berhasil diganti ke tema Cybersecurity!");
    } else {
        imgObj.src = oldSrc;
        alert("Gambar dikembalikan ke tema aktivitas Tech!");
    }
}

// Event onclick sederhana untuk kontrol Play/Pause Audio
function toggleAudio() {
    const audioObj = document.getElementById('galleryAudio');
    const btn = document.getElementById('audioBtn');
    
    if (audioObj.paused) {
        audioObj.play();
        btn.textContent = 'Pause Audio';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    } else {
        audioObj.pause();
        btn.textContent = 'Play Audio';
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');
    }
}

// Inisialisasi otomatis DOM sesuai halaman yang sedang dibuka
document.addEventListener('DOMContentLoaded', () => {
    // Render tabel otomatis jika membuka halaman index.html
    renderTable();
});
