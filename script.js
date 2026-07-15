function removeVietnameseTones(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase();
}
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const itemList = document.getElementById('itemList');
    const items = document.querySelectorAll('.search-item');
    const nutSanPham = document.getElementById('nutSanPham');
    const listSanPham = document.getElementById('listSanPham');

    function filterProducts() {
        if (!searchInput || !itemList) return;
        const filter = removeVietnameseTones(searchInput.value.trim());
        if (filter === '') { itemList.style.display = 'none'; return; }
        let hasResult = false;
        items.forEach(function(item) {
            const text = removeVietnameseTones(item.textContent);
            if (text.includes(filter)) { item.style.display = 'block'; hasResult = true; } 
            else { item.style.display = 'none'; }
        });
        itemList.style.display = hasResult ? 'block' : 'none';
    }
    if (searchInput) { searchInput.addEventListener('input', filterProducts); searchInput.addEventListener('focus', filterProducts); }
    if (nutSanPham && listSanPham) { nutSanPham.addEventListener('click', function(event) { event.stopPropagation(); listSanPham.classList.toggle('show'); }); }
    document.addEventListener('click', function(event) {
        if (searchInput && itemList && !searchInput.contains(event.target) && !itemList.contains(event.target)) { itemList.style.display = 'none'; }
        if (nutSanPham && listSanPham && !nutSanPham.contains(event.target) && !listSanPham.contains(event.target)) { listSanPham.classList.remove('show'); }
    });
});
