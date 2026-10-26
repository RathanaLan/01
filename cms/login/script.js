//ចុចរូបភ្នែកដើម្បីបង្ហាញ password (កែថ្មីឱ្យដើរគ្រប់ប៊ូតុង)
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-password');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // ទាញយក ID របស់ Input ពី data-target
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);

            if (passwordInput) {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // ប្តូររូបតំណាង
                this.textContent = type === 'password' ? '👁️' : '🙈';
            }
        });
    });
});
//រូបមន្តសម្រាប់លាក់ Element និងបង្ហាញពេលចុច
function hiddenElement(){
    const hidden = document.getElementById('hidden');
        if(hidden.style.display === "none" || hidden.style.display === ""){
            hidden.style.display = "flex";
        }else{
            hidden.style.display = "none";
        }
}

// funtion ដែលធ្វើឲ្យ corser ចុះក្រោមនៅពេលចុច Enter
document.addEventListener('keydown', function(e){
    if(e.key === "Enter"){
        //បញ្ឈប់ form មិនឲ្យ submit នៅពេលចុច Enter
        e.preventDefault();

        //ស្វែងរក Input ដែល focus ស្រាប់
        const currentInput = document.activeElement;
        if(currentInput.classList.contains('input-score')){
            const inputs = Array.from(document.querySelectorAll('.input-score'));
            const currentIndex = inputs.indexOf(currentInput);
            if(currentIndex + 1 < inputs.length){
                inputs[currentIndex + 1].focus();
            }
        }
    }
});

//បង្ហាញរូបថតភ្លាមៗ
function previewImage(input){
    const file = input.files[0];
    const preview = document.getElementById('imagePreview');
    const icon =document.getElementById('placeholderIcon');

    if(file){
        const reader = new FileReader();
            reader.onload = function(e){
                preview.src = e.target.result;
                preview.style.display = 'block';
                if(icon){
                    icon.style.display = 'none';
                }
            }
        reader.readAsDataURL(file);
    }
}

function toggleAttendance(el) {
    const label = el.querySelector('.status-label');
    const studentId = el.querySelector('.std-id').value; // ទាញយក ID សិស្ស
    let newStatus = '';

    // ១. ប្តូរស្ថានភាពក្នុង UI
    if (el.classList.contains('status-present')) {
        el.classList.replace('status-present', 'status-permission');
        newStatus = 'ច្បាប់';
    } else if (el.classList.contains('status-permission')) {
        el.classList.replace('status-permission', 'status-absent');
        newStatus = 'អត់ច្បាប់';
    } else {
        el.classList.replace('status-absent', 'status-present');
        newStatus = 'វត្តមាន';
    }
    label.innerText = newStatus;

    // ២. ផ្ញើទិន្នន័យទៅ Database តាមរយៈ AJAX
    saveToDatabase(studentId, newStatus);
}

function saveToDatabase(id, status) {
    try {
        let students = JSON.parse(localStorage.getItem('cms_students') || '[]');
        students.forEach(function(s) { if (s.id == id) s.status = status; });
        localStorage.setItem('cms_students', JSON.stringify(students));
    } catch(e){}

    let formData = new FormData();
    formData.append('student_id', id);
    formData.append('status', status);

    fetch('update_attendance_ajax.php', {
        method: 'POST',
        body: formData
    })
    .then(function(response) { return response.text(); })
    .then(function(data) {
        console.log("Database Response:", data);
    })
    .catch(function(error) {
        console.log("Attendance saved locally in LiveServer mode");
    });
}