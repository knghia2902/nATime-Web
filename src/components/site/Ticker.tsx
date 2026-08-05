export default function Ticker() {
  const items = [
    '07:58:12 · CHẤM CÔNG · NV-0482 vào ca — Xưởng 2',
    '07:58:47 · KIỂM SOÁT RA VÀO · Cổng B mở — Nhà thầu #114',
    '07:59:03 · ĐỒNG BỘ THIẾT BỊ · MCC Gate-01 — 128 sự kiện mới',
    '07:59:20 · BẢN QUYỀN · Kích hoạt thành công — Standard License',
  ];

  return (
    <div className="bg-graphite text-amber font-mono text-[12px] overflow-hidden border-b border-white/10">
      <div className="ticker-track py-1.5">
        <div className="flex shrink-0">
          {items.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 whitespace-nowrap">{item}</span>
              <span className="px-6 whitespace-nowrap text-white/30">/</span>
            </span>
          ))}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {items.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 whitespace-nowrap">{item}</span>
              <span className="px-6 whitespace-nowrap text-white/30">/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
