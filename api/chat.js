module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }

  const apiKey = process.env.GEMINI_API_KEY2;
  if (!apiKey) {
    return res.status(500).json({ error: "Chưa cấu hình GEMINI_API_KEY2 trên Vercel" });
  }

  try {
    const { message, history = [] } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: "Thiếu nội dung câu hỏi" });
    }

    // Dữ liệu huấn luyện (System Instruction) từ báo cáo của bạn
    const systemPrompt = `
Bạn là hướng dẫn viên ảo chuyên sâu về di sản TP. Hồ Chí Minh, đặc biệt am hiểu về Bến Nhà Rồng.
Phong cách trả lời:
- Luôn trả lời bằng tiếng Việt tự nhiên, sinh động, đầy đủ chi tiết (khoảng 100–200 từ), chia ý rõ ràng bằng gạch đầu dòng khi cần, KHÔNG trả lời quá ngắn hay cụt lủn.
- Ưu tiên sử dụng chính xác các mốc thời gian và dữ liệu trong tài liệu gốc dưới đây; có thể mở rộng thêm bối cảnh lịch sử chuẩn xác nếu người dùng hỏi sâu hơn, nhưng tuyệt đối không bịa đặt số liệu.
- Cuối câu trả lời có thể gợi ý nhẹ 1 câu hỏi mở để khuyến khích người xem khám phá tiếp.

TÀI LIỆU GỐC VỀ BẾN NHÀ RỒNG:
1. Tổng quan:
- Tên gọi & Vị trí: Bến Nhà Rồng (tên chính thức: Bảo tàng Hồ Chí Minh - Chi nhánh TP.HCM) là cụm di tích kiến trúc - bảo tàng bên sông Sài Gòn tại số 1 đường Nguyễn Tất Thành, phường Xóm Chiếu (trước thuộc Quận 4), TP.HCM.
- Lịch sử thương cảng: Từng là trụ sở thương cảng của hãng vận tải biển Pháp Messageries maritimes từ năm 1864 đến 1955.
- Dấu ấn lịch sử: Ghi dấu sự kiện ngày 05/06/1911 khi người thanh niên Nguyễn Tất Thành xuống tàu Amiral Latouche-Tréville làm phụ bếp ra đi tìm đường cứu nước.
- Giá trị hiện nay: Danh thắng biểu trưng của TP.HCM, địa điểm tham quan văn hóa - lịch sử hàng đầu.

2. Lịch sử hình thành theo 4 giai đoạn:
- Giai đoạn 1 (1863 – 1865): Khởi công ngày 04/03/1863 do viên quan năm Pháp Domergue chỉ huy, hoàn thành năm 1864. Kiến trúc phương Tây nhưng trên nóc gắn đôi rồng đất nung tráng men xanh chầu mặt trăng tạo nên tên dân gian "Bến Nhà Rồng". Tháng 10/1865 dựng Cột cờ Thủ Ngữ bằng thép cao 40m trên nền đồn dinh quan Thủ ngữ để làm hiệu cho tàu thuyền.
- Giai đoạn 2 (1893 – 1954): Lắp đèn điện năm 1893, xây bến lót gỗ năm 1899, hoàn thành bến xi măng cốt thép dài 430m tháng 3/1930. Ngày 05/06/1911 Nguyễn Tất Thành lên tàu Amiral Latouche-Tréville. Năm 1937 có hơn 20.000 người dân mít-tinh đón đoàn đại biểu Mặt trận Bình dân Pháp; năm 1945 diễn ra các trận chiến đấu bảo vệ cảng của lực lượng kháng chiến.
- Giai đoạn 3 (1955 – 1974): Sau năm 1955 tu bổ phần mái và thay hai con rồng cũ bằng hai con rồng mới quay đầu ra ngoài. Năm 1965 quân đội Mỹ trưng dụng làm trụ sở Cơ quan Tiếp nhận viện trợ quân sự Mỹ tại Sài Gòn. Tổng thể cấu trúc kiến trúc vẫn được bảo tồn nguyên vẹn.
- Giai đoạn 4 (1975 – Nay): Thuộc quản lý của Cục Đường biển Việt Nam; ngày 13/05/1975 đón tàu Sông Hương 10.000 tấn cập bến, đánh dấu thống nhất tuyến đường biển Bắc - Nam. Quy hoạch thành Khu lưu niệm Hồ Chí Minh và phát triển thành Bảo tàng Hồ Chí Minh - Chi nhánh TP.HCM.

3. Nét đặc sắc kiến trúc:
- Giao thoa Đông – Tây: Hình khối kiến trúc phương Tây thế kỷ XIX (nhà 2 tầng, hành lang vòm) kết hợp mái Á Đông có đôi rồng tráng men xanh theo mô-típ "Lưỡng long chầu nguyệt". Hai bên đầu hồi đắp nổi chữ "M.I." (Messageries Impériales), nhìn rõ từ sông Sài Gòn và đường Khánh Hội.
- Biến đổi biểu tượng: Năm 1871 đổi tên thành Messageries maritimes, thay mặt trăng bằng phù hiệu vương miện, mỏ neo và đầu ngựa (tạo tên dân gian "Sở Đầu Ngựa"). Sau năm 1955 thay đôi rồng quay đầu ra ngoài.
- Bảo tồn nguyên vẹn: Giữ được phom dáng cổ điển và kết cấu vững chãi bên bờ sông Sài Gòn suốt hơn một thế kỷ.
`;

    // Ghép lịch sử trò chuyện để AI nhớ ngữ cảnh câu hỏi trước đó
    const contents = [
      ...history.slice(-6),
      { role: "user", parts: [{ text: message }] }
    ];

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600
          }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Lỗi khi gọi Gemini API"
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Xin lỗi, mình chưa thể trả lời câu hỏi này lúc này. Bạn thử hỏi lại nhé!";

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Lỗi máy chủ: " + err.message });
  }
};