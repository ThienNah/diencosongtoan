function removeVietnameseTones(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "d")
        .toLowerCase();
}
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const itemList = document.getElementById('itemList');
    const nutSanPham = document.getElementById('nutSanPham');
    const listSanPham = document.getElementById('listSanPham');
    function filterProducts() {
        if (!searchInput || !itemList) return;
        const filter = removeVietnameseTones(searchInput.value.trim());
        if (filter === '') {
            itemList.style.display = 'none';
            return;
        }
        const items = document.querySelectorAll('.search-item');
        let hasResult = false;
        
        items.forEach(function(item) {
            const text = removeVietnameseTones(item.textContent);
            if (text.includes(filter)) {
                item.style.display = 'block';
                hasResult = true;
            } else {
                item.style.display = 'none';
            }
        });
        itemList.style.display = hasResult ? 'block' : 'none';
    }
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
        searchInput.addEventListener('focus', filterProducts);
    }
    if (nutSanPham && listSanPham) {
        nutSanPham.addEventListener('click', function(event) {
            event.stopPropagation();
            listSanPham.classList.toggle('show');
        });
    }
    document.addEventListener('click', function(event) {
        if (searchInput && itemList && !searchInput.contains(event.target) && !itemList.contains(event.target)) {
            itemList.style.display = 'none';
        }
        if (nutSanPham && listSanPham && !nutSanPham.contains(event.target) && !listSanPham.contains(event.target)) {
            listSanPham.classList.remove('show');
        }
    });
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (!productId) return;
    const dataBuffer = {
        "ac-quy": {
            title: "Bình ắc quy chính hãng",
            img: "ac-quy.jpg",
            info: "<p>Bình ắc quy lưu trữ điện năng dung lượng cao, tuổi thọ bền bỉ.</p><p>Phù hợp cho tàu cá, xe máy, ô tô và các thiết bị tích điện dự phòng.</p>"
        },
        "dich-vu-sua-chua": {
            title: "Dịch vụ sửa chữa mọi thứ bạn muốn",
            img: "nhung vi khach vui ve.jpg",
            info: "<p>Nhận quấn lại mô tơ, sửa chữa máy phát điện, dynamo, đề ma rơ cấp tốc.</p><p>Đội ngũ thợ tay nghề cao, kiểm tra bệnh máy chính xác, sửa nhanh lấy ngay tại cảng cá.</p>"
        },
        "dynamo-12v": {
            title: "Dynamo / Đi na mô 12V",
            img: "dynamo.jpg",
            info: "<p>Dynamo 12V phát điện sạc bình công suất ổn định, hoạt động êm ái.</p><p>Thiết kế cơ khí chính xác, chống ăn mòn muối biển, phù hợp cho tàu thuyền.</p>"
        },
        "dynamo-24v": {
            title: "Dynamo / Đi na mô 24V",
            img: "dynamo.jpg",
            info: "<p>Dynamo 24V hiệu suất cao dành cho các hệ thống máy lớn, xe tải, tàu cá.</p><p>Đảm bảo dòng điện sạc luôn mạnh mẽ và duy trì tuổi thọ cho hệ thống bình.</p>"
        },
        "den-led": {
            title: "Đèn pha LED siêu sáng",
            img: "den pha led.jpg",
            info: "<p>Đèn pha LED công suất lớn, chống nước chuẩn IP67/IP68.</p><p>Góc chiếu rộng, siêu tiết kiệm điện, chuyên dụng đánh bắt cá hoặc chiếu sáng nhà xưởng.</p>"
        },
        "de-ma-ro-12v": {
            title: "Đề ma rơ 12V",
            img: "de-ma-ro.jpg",
            info: "<p>Củ đề / Đề ma rơ 12V lực kéo mạnh, khởi động động cơ mượt mà.</p><p>Linh kiện chịu tải tốt, độ bền cao, ít hao bình.</p>"
        },
        "de-ma-ro-24v": {
            title: "Đề ma rơ 24V",
            img: "de-ma-ro.jpg",
            info: "<p>Đề ma rơ 24V chuyên dụng cho động cơ diesel tải trọng lớn, máy tàu thủy.</p><p>Khởi động mạnh mẽ trong mọi điều kiện thời tiết khắc nghiệt.</p>"
        },
        "avr": {
            title: "Linh kiện mạch AVR",
            img: "avr.jpg",
            info: "<p>Mạch điều tốc, tự động ổn định điện áp AVR cho máy phát điện.</p><p>Hàng chính hãng giúp bảo vệ các thiết bị điện không bị sốc áp.</p>"
        },
        "may-phat-dien": {
            title: "Máy phát điện công nghiệp & gia đình",
            img: "may-phat-dien.jpg",
            info: "<p>Cung cấp và trao đổi máy phát điện đa dạng công suất từ gia đình đến tàu biển.</p><p>Động cơ chạy dầu/xăng tiết kiệm nhiên liệu, hoạt động bền bỉ liên tục.</p>"
        },
        "mo-to": {
            title: "Mô tơ Điện cơ",
            img: "mo to.jpg",
            info: "<p>Mô tơ chất lượng cao, hiệu suất và hiệu năng tốt và độ bền cao.</p><p>Lõi đồng dày nguyên chất, chạy êm, ứng dụng rộng rãi trong sản xuất.</p>"
        }
    };
    const product = dataBuffer[productId];
    if (product) {
        const pageTitleEl = document.getElementById('pageTitle');
        const productTitleEl = document.getElementById('productTitle');
        const productImgEl = document.getElementById('productImg');
        const productInfoEl = document.getElementById('productInfo');
        if (pageTitleEl) pageTitleEl.textContent = product.title + " - Điện cơ Song toàn";
        if (productTitleEl) productTitleEl.textContent = product.title;
        if (productImgEl) {
            productImgEl.src = product.img;
            productImgEl.alt = "Hình ảnh " + product.title;
        }
        if (productInfoEl) productInfoEl.innerHTML = product.info;
    }
});
