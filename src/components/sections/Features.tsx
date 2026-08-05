export default function Features() {
  const stats = [
    { value: '500+', label: 'doanh nghiệp đang vận hành nATime' },
    { value: '99.9%', label: 'thời gian hoạt động dịch vụ' },
    { value: '<200ms', label: 'độ trễ phản hồi máy chấm công' },
    { value: '24/7', label: 'hỗ trợ kỹ thuật & bản quyền' },
  ];

  const modules = [
    {
      num: '01',
      title: 'Chấm công & Ca kíp',
      desc: 'Quản lý dữ liệu chấm công từ vân tay, khuôn mặt hoặc thẻ từ. Tự động tính công, tăng ca và nghỉ phép theo quy chế riêng từng doanh nghiệp.',
    },
    {
      num: '02',
      title: 'Thiết bị & Kết nối',
      desc: 'Khai báo máy chấm công (MCC, FaceID), theo dõi trạng thái kết nối trực tuyến và thực hiện đồng bộ sự kiện tức thời.',
    },
    {
      num: '03',
      title: 'Kiểm soát ra vào (Access Control)',
      desc: 'Phân quyền truy cập cửa và khu vực hạn chế. Module chỉ bật khi gói bản quyền Professional được cấp phép.',
    },
    {
      num: '04',
      title: 'Tích hợp & Bảng lương',
      desc: 'Kết xuất dữ liệu bảng công tự động, mở API tích hợp trực tiếp sang phần mềm tính lương hoặc hệ thống ERP.',
    },
  ];

  return (
    <>
      {/* Stats Bar */}
      <section className="border-y hairline bg-white/40">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 divide-x hairline">
          {stats.map((stat, i) => (
            <div key={i} className={`px-6 ${i === 0 ? 'pl-0' : ''}`}>
              <p className="font-mono text-[28px] font-semibold text-ink">{stat.value}</p>
              <p className="font-body text-[13px] text-ink/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules Bento */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-3">TÍNH NĂNG NỔI BẬT</p>
        <h2 className="font-display font-bold text-[28px] md:text-[34px] text-ink max-w-lg mb-12">
          Quản lý toàn diện chấm công và thiết bị trên một nền tảng.
        </h2>
        <div className="grid md:grid-cols-2 gap-px bg-ink/10">
          {modules.map((mod) => (
            <div key={mod.num} className="bg-paper p-8 md:p-10">
              <span className="font-mono text-[11px] text-teal">{mod.num}</span>
              <h3 className="font-display font-bold text-[20px] text-ink mt-2 mb-3">{mod.title}</h3>
              <p className="font-body text-[14px] text-ink/65 leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
