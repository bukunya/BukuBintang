# Dokumentasi Bookstar

## Tech Stack, Tools, and Deployment Front End

1. Next.js
2. TypeScript
3. Node
4. ShadCN/UI
5. Git
6. GitHub
7. Vercel

## Fitur-fitur dan Halaman

1. Halaman utama `bookstar.afif.dev`
2. Halaman shop `bookstar.afif.dev/shop`
3. Halaman produk `bookstar.afif.dev/shop/:id`
4. Halaman wishlist `bookstar.afif.dev/wishlist`
5. Halaman cart `bookstar.afif.dev/cart`
6. Halaman lain `about, blog, contact`
7. Top Loader
8. Search functionality
9. Rekomendasi buku berdasarkan buku yang dilihat saat ini
10. Daftar buku yang pernah dilihat
11. LocalStorage untuk menyimpan data secara lokal
12. Responsive design

## Cara kerja rekomendasi

`app/shop/for-you.tsx`

1. Pengguna memilih buku yang ingin dilihat
2. Sistem mengambil data "tags" yang ada di API
3. Menggunakan API untuk meng-query dengan memasukkan tags paling atas ke API bagian genre
4. Jika ada (>1), tampilkan semua yang ada dengan memfilter mengecualikan buku yang sedang dibuka
5. Jika buku dengan genre/tags yang sama kurang dari 8 buku atau tidak ada, maka gunakan API random_books untuk memunculkan sisa buku yang kurang sehingga target yang di fetch adalah 8 buku
6. Gunakan pembatas sebanyak 16 kali percobaan memanggil API random_books supaya tidak memunculkan potensi infinite loop

## Cara kerja pagination

`app/shop/page.tsx`, `app/search/page.tsx`, `app/cart/page.tsx`, `app/wishlist/page.tsx`

1. Sistem menggunakan state untuk menyimpan halaman saat ini (page) dan total halaman (totalPages)
2. Pada saat fetch data, tambahkan parameter "page" ke query string API untuk mengambil data sesuai halaman
3. API mengembalikan data buku untuk halaman tersebut beserta informasi pagination seperti totalPages
4. Fungsi handlePageChange atau setCurrentPage mengubah nilai halaman dan memicu useEffect untuk fetch data ulang
5. Komponen pagination menampilkan nomor halaman dengan ellipsis untuk navigasi yang efisien, menunjukkan halaman aktif dan tombol previous/next
6. Untuk cart dan wishlist, pagination dilakukan secara lokal dengan membagi array dari localStorage menjadi chunk berdasarkan itemsPerPage (8 item per halaman)

## Cara kerja wishlist dan cart

`app/wishlist/page.tsx`, `app/cart/page.tsx`, `components/shop/hero.tsx`

1. Data wishlist dan cart disimpan di localStorage sebagai array objek buku dengan properti lengkap (id, title, coverImage, dll)
2. Pada load halaman, sistem mengambil data dari localStorage dan menyimpannya ke state
3. Fungsi addToWishlist/addToCart menambahkan buku ke array jika belum ada, atau menghapus jika sudah ada (toggle behavior)
4. Fungsi removeFromWishlist/removeFromCart menghapus buku berdasarkan id dari array
5. Custom event "cartWishlistUpdate" dipicu setelah perubahan untuk update real-time di halaman lain
6. Tombol toggle di halaman produk (hero.tsx) menggunakan fungsi ini untuk menambah/hapus dari wishlist/cart dengan feedback visual (icon berubah)
7. Pagination dilakukan secara lokal dengan itemsPerPage=8, menghitung totalPages berdasarkan panjang array
