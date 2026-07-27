function removeVietnameseTones(str) {
  return str.normalize("NFD")
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
  function renderProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const isAdmin = urlParams.get('admin');
    if (!productId) return;
    const dataBuffer = {
      "ac-quy": { title: "Bình ắc quy chính hãng", img: "binh ac quy.jpg", info: "<p>Bình ắc quy dung lượng cao.</p>" },
      "dich-vu-su-chua": { title: "Dịch vụ sửa chữa mọi thứ bạn muốn", img: "nhung vi khach vui ve.jpg", info: "<p>Trạm sửa chữa cấp tốc.</p>" },
      "dynamo-12v": { title: "Dynamo / Đi na mô 12V", img: "dynamo.jpg", info: "<p>Dynamo 12V sạc bình ổn định.</p>" },
      "dynamo-24v": { title: "Dynamo / Đi na mô 24V", img: "dynamo.jpg", info: "<p>Dynamo 24V hiệu suất cao.</p>" },
      "den-led": { title: "Đèn pha LED siêu sáng", img: "den pha led.jpg", info: "<p>Đèn pha LED chống nước IP68.</p>" },
      "de-ma-ro-12v": { title: "Đề ma rơ 12V", img: "de ma ro.jpg", info: "<p>Củ đề 12V khởi động mượt mà.</p>" },
      "de-ma-ro-24v": { title: "Đề ma rơ 24V", img: "de ma ro.jpg", info: "<p>Đề ma rơ 24V máy tàu thủy.</p>" },
      "avr": { title: "Linh kiện mạch AVR", img: "avr.jpg", info: "<p>Mạch ổn định điện áp AVR.</p>" },
      "may-phat-dien": { title: "Máy phát điện", img: "may phat dien.jpg", info: "<p>Trao đổi máy phát điện đa dạng.</p>" },
      "mo-to": { title: "Mô tơ Điện cơ", img: "mo to.jpg", info: "<p>Mô tơ lõi đồng dày 100%.</p>" }
    }
    const product = dataBuffer[productId];
    if (!product) return;
    const pageTitleEl = document.getElementById('pageTitle');
    const productTitleEl = document.getElementById('productTitle');
    const productImgEl = document.getElementById('productImg');
    const productTextEl = document.getElementById('productText');
    const productDescBox = document.getElementById('productDescBox');
    const boxMuaHang = document.getElementById('boxMuaHang');
    const boxSuaChua = document.getElementById('boxSuaChua');
    const boxAdmin = document.getElementById('boxAdmin');
    const chinhSachBox = document.getElementById('chinhSachBox');
    const contactBox = document.querySelector('.contact-box');
    const btnBackBox = document.querySelector('.btn-back-box');
    const thanhHeader = document.querySelector('.shop-header')
    if (pageTitleEl) pageTitleEl.textContent = product.title + " - Điện cơ Song toàn";
    if (productTitleEl) { 
      productTitleEl.textContent = (isAdmin === "true" && productId === "dich-vu-su-chua") ? "Sổ Lịch Đặt Hàng & Sửa Chữa" : product.title;
    }
    if (productImgEl) {
      if (isAdmin === "true" || productId === "dich-vu-su-chua") {
        productImgEl.style.display = "none";
        productImgEl.src = "";
      } else {
        productImgEl.style.display = "block";
        productImgEl.src = product.img;
      }
    }
    if (productDescBox) {
      productDescBox.style.display = (isAdmin === "true" || productId === "dich-vu-su-chua") ? "none" : "block"; 
    } 
    if (productTextEl) productTextEl.innerHTML = product.info; 
    if (boxMuaHang) boxMuaHang.style.display = "none"; 
    if (boxSuaChua) boxSuaChua.style.display = "none"; 
    if (boxAdmin) boxAdmin.style.display = "none"; 
    if (isAdmin === "true" && productId === "dich-vu-su-chua") { 
      if (boxAdmin) boxAdmin.style.display = "block"; 
      if (chinhSachBox) chinhSachBox.style.display = "none"; 
      if (contactBox) contactBox.style.display = "none"; 
      if (btnBackBox) btnBackBox.style.display = "none"; 
      if (thanhHeader) thanhHeader.style.display = "none";
      renderAdminTable(); 
    } else { 
      if (chinhSachBox) chinhSachBox.style.display = "block"; 
      if (contactBox) contactBox.style.display = "block"; 
      if (btnBackBox) btnBackBox.style.display = "block"; 
      if (thanhHeader) thanhHeader.style.display = "flex";
      if (productId === "dich-vu-su-chua") { 
        if (boxSuaChua) boxSuaChua.style.display = "block"; 
      } else { 
        if (boxMuaHang) boxMuaHang.style.display = "block"; 
      } 
    } 
  } 
  function renderAdminTable() { 
    const container = document.getElementById('adminTableContent'); 
    if (!container) return; 
    let danhSach = JSON.parse(localStorage.getItem('danhSachDatLich')) || []; 
    if (danhSach.length === 0) { 
      container.innerHTML = "<p style='text-align:center;font-size:18px;color:#ffffff;padding:20px;margin:0;'>Hiện tại chưa có lịch đặt nào từ khách hàng.</p>"; 
      return; 
    } 
    let tableHtml = `<div style='overflow-x:auto;'> 
      <table class='admin-table'> 
        <tr> 
          <th>Thời gian</th> 
          <th>Sản phẩm</th> 
          <th>Ghe / Tàu</th> 
          <th>SĐT</th> 
          <th>Chi tiết</th> 
          <th>Thao tác</th> 
        </tr>`; 
    danhSach.forEach(function(item, index) { 
      tableHtml += `<tr> 
        <td>${item.time}</td> 
        <td style='font-weight:bold;color:#fa7f7f;'>${item.loai}</td> 
        <td>${item.ten}</td> 
        <td><a href='tel:${item.sdt}' style='color:#ffffff;'>📞 ${item.sdt}</a></td> 
        <td>${item.chitiet}</td> 
        <td><button class='btn-delete' data-index='${index}'>Xóa</button></td> 
      </tr>`; 
    }); 
    tableHtml += `</table></div> <button id='btnXoaHet' class='btn-delete-all'>Xóa hết sổ</button>`; 
    container.innerHTML = tableHtml; 
    document.querySelectorAll('.btn-delete').forEach(function(btn) { 
      btn.addEventListener('click', function() { 
        let idx = this.getAttribute('data-index'); 
        danhSach.splice(idx, 1); 
        localStorage.setItem('danhSachDatLich', JSON.stringify(danhSach)); 
        renderAdminTable(); 
      }); 
    });
    const btnXoaHet = document.getElementById('btnXoaHet'); 
    if (btnXoaHet) { 
      btnXoaHet.addEventListener('click', function() { 
        if (confirm('Bro có chắc muốn xóa sạch toàn bộ sổ không?')) { 
          localStorage.removeItem('danhSachDatLich'); 
          renderAdminTable(); 
        } 
      }); 
    } 
  }
  function saveBooking(loai, ten, sdt, chitiet) { 
    const now = new Date(); 
    const minStr = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes(); 
    const timeStr = now.getHours() + ":" + minStr + " " + now.getDate() + "/" + (now.getMonth() + 1); 
    let hienTai = JSON.parse(localStorage.getItem('danhSachDatLich')) || []; 
    hienTai.push({ time: timeStr, loai: loai, ten: ten, sdt: sdt, chitiet: chitiet }); 
    localStorage.setItem('danhSachDatLich', JSON.stringify(hienTai)); 
    const sdtCuaBa = "0392888997"; 
    const noiDungText = `ĐIỆN CƠ SONG TOÀN - ĐƠN MỚI!\nKhách: ${ten}\nSĐT: ${sdt}\nLoại: ${loai}\nChi tiết: ${chitiet.replace(/<br>/g, ' ')}`;
    const linkZalo = `https://zalo.me{sdtCuaBa}?text=${encodeURIComponent(noiDungText)}`;
    alert('Đã gửi thành công! Hệ thống sẽ mở Zalo để báo cho bạn!');
    window.open(linkZalo, '_blank');
  }
  const formMuaHang = document.getElementById('formMuaHang'); 
  if (formMuaHang) { 
    formMuaHang.addEventListener('submit', function(e) { 
      e.preventDefault(); 
      const title = document.getElementById('productTitle').textContent; 
      const ten = document.getElementById('txtTenMua').value.trim(); 
      const sdt = document.getElementById('txtSdtMua').value.trim(); 
      saveBooking(title, ten, sdt, "Đặt mua sản phẩm"); 
      formMuaHang.reset(); 
      renderProductData(); 
    }); 
  } 
  const formSuaChua = document.getElementById('formSuaChua'); 
  if (formSuaChua) { 
    formSuaChua.addEventListener('submit', function(e) { 
      e.preventDefault(); 
      const title = document.getElementById('productTitle').textContent; 
      const ten = document.getElementById('txtTenSua').value.trim(); 
      const sdt = document.getElementById('txtSdtSua').value.trim(); 
      const suaGi = document.getElementById('txtSuaGi').value.trim(); 
      const khiNao = document.getElementById('txtKhiNaoLay').value.trim(); 
      const lyDo = document.getElementById('txtLyDo').value.trim(); 
      const chiTietStr = "Sửa: " + suaGi + " <br>Lấy: " + khiNao + " <br>Bệnh: " + lyDo; 
      saveBooking(title, ten, sdt, chiTietStr); 
      formSuaChua.reset(); 
      renderProductData(); 
    }); 
  } 
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
      listSanPham.classList.remove('remove'); 
    } 
  }); 
  renderProductData(); 
});
