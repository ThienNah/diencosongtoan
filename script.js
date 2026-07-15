function removeVietnameseTones(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "d")
        .toLowerCase();
}
const searchInput = document.getElementById('searchInput');
const itemList = document.getElementById('itemList');
const items = document.querySelectorAll('.item');
function filterProducts() {
    const filter = removeVietnameseTones(searchInput.value.trim());
    if (filter === '') {
        itemList.style.display = 'none';
        return;
    }
    itemList.style.display = 'block';
    items.forEach(function(item) {
        const text = removeVietnameseTones(item.textContent);
        if (text.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
searchInput.addEventListener('input', filterProducts);
searchInput.addEventListener('focus', filterProducts);
document.addEventListener('click', function(event) {
    if (!searchInput.contains(event.target) && !itemList.contains(event.target)) {
        itemList.style.display = 'none';
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const nutSanPham = document.getElementById('nutSanPham');
    const listSanPham = document.getElementById('listSanPham');
    if (!nutSanPham || !listSanPham) return;
    nutSanPham.addEventListener('click', function(event) {
        event.stopPropagation();
        listSanPham.classList.toggle('show');
    });
    document.addEventListener('click', function(event) {
        if (!nutSanPham.contains(event.target) && !listSanPham.contains(event.target)) {
            listSanPham.classList.remove('show');
        }
    });
});
