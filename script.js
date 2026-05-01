// 🔥 SY Radius GitHub Pages CMS
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
