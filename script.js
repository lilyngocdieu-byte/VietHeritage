document.addEventListener("DOMContentLoaded", () => {
  const placeData = {
    "ben-nha-rong": {
      title: "Bến Nhà Rồng",
      desc: "Di tích lịch sử nằm bên sông Sài Gòn, nơi người thanh niên Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911.",
      model: "model.glb"
    },
    "cho-binh-tay": {
      title: "Chợ Bình Tây",
      desc: "Ngôi chợ truyền thống lâu đời mang đậm dấu ấn kiến trúc và giao thương khu vực Chợ Lớn.",
      model: ""
    },
    "bao-tang": {
      title: "Bảo tàng chứng tích chiến tranh",
      desc: "Nơi lưu giữ và trưng bày nhiều tư liệu, hình ảnh, hiện vật lịch sử quan trọng tại TP.HCM.",
      model: ""
    },
    "dinh-doc-lap": {
      title: "Dinh Độc Lập",
      desc: "Di tích quốc gia đặc biệt gắn liền với dấu mốc lịch sử trọng đại của đất nước và kiến trúc hiện đại thập niên 1960.",
      model: ""
    },
    "nha-hat": {
      title: "Nhà hát Thành phố",
      desc: "Công trình nghệ thuật biểu diễn mang kiến trúc cổ điển Pháp nằm tại trung tâm Quận 1.",
      model: ""
    }
  };

  const enterBtn = document.querySelector("#heroExploreBtn");
  const backBtn = document.querySelector("#back-to-intro");
  const activeNameEl = document.querySelector("#activePlaceName");
  const placePills = document.querySelectorAll(".place-pill");
  const tocBtns = document.querySelectorAll(".toc-btn");
  // ===== Hiển thị mô hình 3D chỉ khi bấm tab "Mô hình 3D" =====
  const viewer = document.getElementById("heritageModel");
  let currentPlace = "ben-nha-rong";

  function loadModel() {
    const info = placeData[currentPlace];
    if (info && info.model) {
      if (viewer.getAttribute("src") !== info.model) {
        viewer.setAttribute("src", info.model);
      }
    } else {
      viewer.removeAttribute("src");
    }
  }function updateReportView(placeKey) {
  document.querySelectorAll(".report-wrap").forEach((report) => {
    report.style.display = report.dataset.report === placeKey ? "block" : "none";
  });
}
placePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    currentPlace = pill.dataset.place;
    if (activeNameEl) {
      activeNameEl.textContent = pill.textContent.trim();
    }
    placePills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    updateReportView(currentPlace);
  });
});

// Đồng bộ trạng thái báo cáo khi trang vừa tải xong
updateReportView(currentPlace);
  function openTab(name) {
    tocBtns.forEach(b => b.classList.toggle("active", b.dataset.tab === name));
    document.querySelectorAll(".tab-panel").forEach(p =>
      p.classList.toggle("active", p.id === "tab-" + name));
    if (name === "model") loadModel();
  }
  if (enterBtn) {
    enterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("explore-open");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      document.body.classList.remove("explore-open");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function selectPlace(key) {
    const info = placeData[key];
    if (!info) return;

    placePills.forEach((pill) => {
      pill.classList.toggle("active", pill.dataset.place === key);
    });

    if (activeNameEl) {
      activeNameEl.textContent = info.title;
    }
     currentPlace = key;                                   // ← mới
    if (document.getElementById("tab-model").classList.contains("active")) {
      loadModel();                                        // ← mới: đang ở tab 2 thì đổi mô hình luôn
    }
  }

  placePills.forEach((pill) => {
    pill.addEventListener("click", () => selectPlace(pill.dataset.place));
  });

  tocBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tocBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
    // ----- Chuyển tab và nạp mô hình khi bấm nút 2 -----
  document.querySelectorAll(".toc-btn").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".tab-panel").forEach((p) =>
        p.classList.toggle("active", p.id === "tab-" + b.dataset.tab)
      );
      const v = document.getElementById("heritageModel");
      if (b.dataset.tab === "model" && v && !v.getAttribute("src")) {
        v.setAttribute("src", "./model.glb");
      }
    });
  });
//chat
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// Bật / tắt hộp chat
chatToggle.onclick = () => chatBox.classList.toggle('hidden');
chatClose.onclick = () => chatBox.classList.add('hidden');

// Kho kiến thức mẫu (bạn tự bổ sung thêm)
const knowledge = [
  { keys: ['rồng', 'mái', 'lưỡng long'], answer: 'Trên nóc nhà có gắn đôi rồng đất nung tráng men xanh chầu mặt trăng (Lưỡng long chầu nguyệt), đó cũng là lý do nơi đây có tên gọi Bến Nhà Rồng.' },
  { keys: ['tàu', 'thuyền', 'bến'], answer: 'Đây là hình ảnh gợi nhớ con tàu Amiral Latouche-Tréville, nơi ngày 05/06/1911 người thanh niên Nguyễn Tất Thành đã ra đi tìm đường cứu nước.' },
  { keys: ['xây', 'năm', 'kiến trúc'], answer: 'Công trình được xây dựng từ năm 1862–1863 làm trụ sở hãng vận tải biển Messageries Maritimes, kết hợp kiến trúc phương Tây và mái ngói phương Đông.' }
];

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `msg ${sender}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Lưu lịch sử để AI nhớ mạch trò chuyện
let chatHistory = [];

async function handleSend() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";
  chatInput.disabled = true;
  chatSend.disabled = true;

  // Hiện trạng thái đang suy nghĩ
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "msg bot";
  loadingDiv.textContent = "Hướng dẫn viên AI đang trả lời...";
  chatMessages.appendChild(loadingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: chatHistory })
    });

    const data = await res.json();
    loadingDiv.remove();

    if (!res.ok) {
      addMessage("Hệ thống AI đang bận hoặc chưa chạy trên Vercel. Bạn thử lại sau vài giây nhé!", "bot");
    } else {
      addMessage(data.reply, "bot");
      chatHistory.push({ role: "user", parts: [{ text }] });
      chatHistory.push({ role: "model", parts: [{ text: data.reply }] });
    }
  } catch (err) {
    loadingDiv.remove();
    addMessage("Không kết nối được tới AI (lưu ý: tính năng AI chỉ hoạt động sau khi bạn đưa web lên Vercel).", "bot");
  } finally {
    chatInput.disabled = false;
    chatSend.disabled = false;
    chatInput.focus();
  }
}

function askQuick(question) {
  chatInput.value = question;
  handleSend();
}

chatSend.onclick = handleSend;
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
});