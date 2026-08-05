import Link from 'next/link';
import ReleaseDownload from '@/components/site/ReleaseDownload';
import PortalShell from './PortalShell';

export default function PortalDownloads() {
  return (
    <PortalShell title="Tải xuống" description="Bộ cài Windows và công cụ hỗ trợ đã xác minh chữ ký mã nguồn Authenticode.">
      <div className="space-y-10">
        <section>
          <p className="font-mono text-[11px] text-teal tracking-wide mb-5">04 / TẢI XUỐNG CÔNG CỤ</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border hairline bg-white p-5">
              <p className="font-mono text-[11px] text-ink/40 mb-2">AGENT WINDOWS</p>
              <h3 className="font-display font-bold text-[16px] text-ink mb-1">nATime Agent — Windows</h3>
              <p className="font-mono text-[12px] text-ink/50 mb-4">phiên bản 4.2.1 · 84 MB</p>
              <Link
                href="/download"
                className="border hairline font-body text-[13px] font-semibold px-4 py-2 w-full hover:bg-paper transition-colors block text-center text-ink"
              >
                Tải xuống
              </Link>
            </div>

            <div className="border hairline bg-white p-5">
              <p className="font-mono text-[11px] text-ink/40 mb-2">DRIVER THIẾT BỊ</p>
              <h3 className="font-display font-bold text-[16px] text-ink mb-1">Trình điều khiển máy chấm công</h3>
              <p className="font-mono text-[12px] text-ink/50 mb-4">phiên bản 2.0.4 · 12 MB</p>
              <Link
                href="/download"
                className="border hairline font-body text-[13px] font-semibold px-4 py-2 w-full hover:bg-paper transition-colors block text-center text-ink"
              >
                Tải xuống
              </Link>
            </div>

            <div className="border hairline bg-white p-5">
              <p className="font-mono text-[11px] text-ink/40 mb-2">TÀI LIỆU</p>
              <h3 className="font-display font-bold text-[16px] text-ink mb-1">Hướng dẫn triển khai</h3>
              <p className="font-mono text-[12px] text-ink/50 mb-4">cập nhật 2026 · PDF</p>
              <Link
                href="/docs"
                className="border hairline font-body text-[13px] font-semibold px-4 py-2 w-full hover:bg-paper transition-colors block text-center text-ink"
              >
                Xem tài liệu
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t hairline pt-8">
          <p className="font-mono text-[11px] text-teal tracking-wide mb-5">BẢN PHÁT HÀNH WINDOWS CÔNG KHAI</p>
          <ReleaseDownload locale="vi" />
        </section>
      </div>
    </PortalShell>
  );
}
