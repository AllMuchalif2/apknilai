document.addEventListener('DOMContentLoaded', () => {
    let no = 1;

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = event.target;
        
        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
            return;
        }

        const nim = document.getElementById('nim').value;
        const nama = document.getElementById('nama').value;
        const presensiTeori = parseFloat(document.getElementById('preT').value);
        const tugasTeori = parseFloat(document.getElementById('tgsT').value);
        const utsTeori = parseFloat(document.getElementById('utsT').value);
        const uasTeori = parseFloat(document.getElementById('uasT').value);
        const presensiPraktek = parseFloat(document.getElementById('preP').value);
        const tugasPraktek = parseFloat(document.getElementById('tgsP').value);
        const utsPraktek = parseFloat(document.getElementById('utsP').value);
        const uasPraktek = parseFloat(document.getElementById('uasP').value);


        const presensi = ((presensiTeori + presensiPraktek) / 2).toFixed(2);
        const tugas = ((tugasTeori + tugasPraktek) / 2).toFixed(2);
        const uts = ((utsTeori + utsPraktek) / 2).toFixed(2);
        const uas = ((uasTeori + uasPraktek) / 2).toFixed(2);

        const nilaiAkhir = funcNAkhir(presensi, tugas, uts, uas);
        const grade = funcGrade(nilaiAkhir);

        const tableBody = document.getElementById('isiTable');
        const newRow = document.createElement('tr');

        const fields = [no++, nim, nama, presensi, tugas, uts, uas, nilaiAkhir, grade];
        fields.forEach(field => {
            const cell = document.createElement('td');
            cell.textContent = field;
            newRow.appendChild(cell);
        });

        tableBody.appendChild(newRow);

        batalIsi();
    });

    document.getElementById('batal').addEventListener('click', function() {
        batalIsi();
    });
    document.getElementById('reset').addEventListener('click', function() {
        resetTabel();
    });

    function batalIsi() {
        document.getElementById('form').reset();
        document.getElementById('form').classList.remove('was-validated');
    }

    function resetTabel() {
        const tableBody = document.getElementById('isiTable');
        tableBody.innerHTML = '';
        no = 1;
    }

    function funcNAkhir(presensi, tugas, uts, uas) {
        return (presensi * 0.1 + tugas * 0.2 + uts * 0.3 + uas * 0.4).toFixed(2);
    }

    function funcGrade(nilaiAkhir) {
        if (nilaiAkhir >= 80) return 'A';
        if (nilaiAkhir >= 70) return 'B';
        if (nilaiAkhir >= 60) return 'C';
        if (nilaiAkhir >= 50) return 'D';
        return 'E';
    }
});
