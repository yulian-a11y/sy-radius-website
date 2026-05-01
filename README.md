<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SY Radius - Portal Berita Terkini</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <a href="index.html" class="logo">
                <span>🌐</span> SY Radius
            </a>
            <nav>
                <a href="admin.html" class="admin-link">⚙️ Admin</a>
            </nav>
        </div>
    </header>

    <main class="container">
        <div class="hero">
            <h1>Berita Terkini</h1>
            <p>Update 24 jam dari SY Radius</p>
        </div>
        <div class="news-grid" id="newsGrid">
            <div class="loading">🔥 Memuat berita terbaru...</div>
        </div>
    </main>

    <script src="script.js"></script>
</body>
</html><!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terminal Admin - SY Radius</title>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="terminal-mode">
    <div class="container">
        <div class="terminal-header">
            <h1>🖥️ SY RADIUS TERMINAL v1.0</h1>
            <p>root@syradius:~# <a href="index.html">[HOME]</a></p>
        </div>

        <!-- Password Modal -->
        <div id="passwordModal" class="modal">
            <div class="modal-content">
                <h2>🔐 SY Radius Admin</h2>
                <input type="password" id="adminPass" placeholder="Password...">
                <button onclick="checkPassword()">ENTER</button>
            </div>
        </div>

        <!-- Admin Panel (hidden awal) -->
        <div id="adminPanel" style="display:none;">
            <div class="admin-section">
                <h3>➕ Tambah Berita Baru</h3>
                <form id="addNewsForm">
                    <input type="text" name="judul" placeholder="Judul berita" required>
                    <textarea name="isi" placeholder="Isi berita lengkap" required></textarea>
                    <input type="url" name="media_url" placeholder="URL gambar (opsional)">
                    <button type="submit">🚀 Publish</button>
                </form>
            </div>

            <div class="admin-section">
                <h3>📋 Daftar Berita</h3>
                <div id="newsList"></div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script>
        function checkPassword() {
            if (document.getElementById('adminPass').value === 'radius2024') {
                document.getElementById('passwordModal').style.display = 'none';
                document.getElementById('adminPanel').style.display = 'block';
                loadAdminData();
            } else {
                alert('❌ Password salah!');
            }
        }
    </script>
</body>
</html>// 🔥 SY Radius GitHub Pages CMS
class SYRadiusCMS {
    constructor() {
        // GANTI INI dengan URL repo data Anda!
        this.DATA_URL = 'https://raw.githubusercontent.com/YOUR_USERNAME/sy-radius-data/main/data.json';
        this.init();
    }

    async init() {
        await this.loadData();
        this.renderFrontend();
        this.renderAdmin();
    }

    async loadData() {
        try {
            const res = await fetch(this.DATA_URL);
            const data = await res.json();
            this.articles = data.articles || [];
        } catch(e) {
            console.error('Load data gagal:', e);
            this.articles = [];
        }
    }

    renderFrontend() {
        const grid = document.getElementById('newsGrid');
        if (!grid) return;
        
        grid.innerHTML = this.articles.map(a => `
            <article class="news-card">
                <div class="card-image">
                    <img src="${a.media_url || 'https://via.placeholder.com/350x250/d73027/ffffff?text=SY+Radius'}" 
                         alt="${a.judul}" loading="lazy">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${a.judul}</h3>
                    <p class="card-excerpt">${a.isi.substring(0, 120)}...</p>
                    <span class="card-date">${new Date(a.tanggal).toLocaleDateString('id-ID')}</span>
                </div>
            </article>
        `).join('') || '<div class="empty-state">📭 Belum ada berita</div>';
    }

    renderAdmin() {
        const list = document.getElementById('newsList');
        if (!list) return;
        
        list.innerHTML = this.articles.map((a, i) => `
            <div class="news-item">
                <h4>${a.judul}</h4>
                <p>${a.isi.substring(0, 100)}...</p>
                <button onclick="cms.deleteNews(${i})" class="btn-danger">🗑️ Hapus</button>
            </div>
        `).join('');
    }

    async addNews(formData) {
        const newArticle = {
            judul: formData.judul,
            isi: formData.isi,
            media_url: formData.media_url || '',
            tanggal: Date.now()
        };
        this.articles.unshift(newArticle);
        await this.saveData();
        this.renderAdmin();
        alert('✅ Berita ditambahkan!');
    }

    async deleteNews(index) {
        if (confirm('Hapus berita ini?')) {
            this.articles.splice(index, 1);
            await this.saveData();
            this.renderAdmin();
            alert('✅ Dihapus!');
        }
    }

    async saveData() {
        // Untuk demo - di produksi edit manual data.json
        console.log('Data baru:', this.articles);
        // TODO: Kirim ke repo data via GitHub API (advanced)
    }
}

// Global instance
let cms;

// Start CMS
document.addEventListener('DOMContentLoaded', () => {
    cms = new SYRadiusCMS();
});
