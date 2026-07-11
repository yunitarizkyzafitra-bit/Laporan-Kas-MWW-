<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      body { background-color: #f5f5f5; padding: 20px; }
      .card-panel { border-radius: 15px; margin-bottom: 20px; }
      .logo-img { width: 80px; display: block; margin: 0 auto 20px; }
      .eye-icon { position: absolute; right: 10px; top: 12px; cursor: pointer; }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Input Transaksi -->
      <div class="card-panel">
        <img src="URL_LOGO_ANDA_DI_DRIVE" class="logo-img" alt="Logo">
        <h5 class="center-align">Keuangan MWW</h5>
        <input type="text" id="uraian" placeholder="Uraian">
        <input type="text" id="keterangan" placeholder="Keterangan">
        <input type="number" id="debit" placeholder="Debit">
        <input type="number" id="kredit" placeholder="Kredit">
        <button class="btn green" onclick="simpan()">Simpan Transaksi</button>
      </div>

      <!-- Ganti PIN -->
      <div class="card-panel">
        <h6>Ganti PIN</h6>
        <input type="text" id="username" placeholder="Username">
        <div style="position:relative"><input type="password" id="oldPin" placeholder="PIN Lama"><span class="eye-icon" onclick="toggle('oldPin')">👁️</span></div>
        <div style="position:relative"><input type="password" id="newPin" placeholder="PIN Baru"><span class="eye-icon" onclick="toggle('newPin')">👁️</span></div>
        <div style="position:relative"><input type="password" id="confirmPin" placeholder="Konfirmasi PIN"><span class="eye-icon" onclick="toggle('confirmPin')">👁️</span></div>
        <button class="btn blue" onclick="prosesGantiPin()">Ganti PIN</button>
      </div>

      <!-- Grafik -->
      <div class="card-panel">
        <h6>Ringkasan Saldo</h6>
        <canvas id="grafikKeuangan"></canvas>
      </div>
    </div>

    <script>
      function toggle(id) {
        var x = document.getElementById(id);
        x.type = (x.type === "password") ? "text" : "password";
      }

      function simpan() {
        var data = { uraian: document.getElementById('uraian').value, keterangan: document.getElementById('keterangan').value, debit: document.getElementById('debit').value, kredit: document.getElementById('kredit').value };
        google.script.run.withSuccessHandler(function(msg) { alert(msg); location.reload(); }).inputTransaksi(data);
      }

      function prosesGantiPin() {
        var u = document.getElementById('username').value, l = document.getElementById('oldPin').value, b = document.getElementById('newPin').value, k = document.getElementById('confirmPin').value;
        if (b !== k) { alert("PIN baru tidak cocok!"); return; }
        google.script.run.withSuccessHandler(alert).gantiPinPengurus(u, l, b);
      }

      google.script.run.withSuccessHandler(function(d) {
        new Chart(document.getElementById('grafikKeuangan').getContext('2d'), {
          type: 'bar', data: { labels: ['Pemasukan', 'Pengeluaran'], datasets: [{ data: [d.debit, d.kredit], backgroundColor: ['#4caf50', '#f44336'] }] }
        });
      }).getRingkasan();
    </script>
  </body>
</html>
