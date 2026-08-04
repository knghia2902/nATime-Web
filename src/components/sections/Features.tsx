'use client';

import { motion } from 'motion/react';
import {
  Clock,
  ShieldCheck,
  Cpu,
  UsersThree,
  Truck,
  Laptop,
  ChartLineUp,
  DeviceMobile,
  CheckCircle,
} from '@phosphor-icons/react';
import { useLanguage } from '@/lib/i18n';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      id: 'attendance',
      title: t('Chấm công thông minh', 'Smart Attendance'),
      desc: t('Tự động đối soát ca kíp, tính giờ công, tăng ca và phạt đi muộn/về sớm dựa trên ca làm việc cấu hình sẵn.', 'Auto-reconcile shifts, calculate working hours, overtime, and late/early penalties based on configured shifts.'),
      icon: Clock,
      span: 'col-span-1 md:col-span-2 lg:col-span-2',
      bullets: [
        t('Đối soát ca kíp linh hoạt theo ngày/tuần', 'Flexible daily/weekly shift reconciliation'),
        t('Tính giờ công & tăng ca thời gian thực', 'Real-time hours & overtime calculation'),
        t('Xuất báo cáo Excel tổng hợp tự động', 'Automated Excel summary report exports'),
        t('Xử lý ca làm việc qua đêm chính xác', 'Accurate overnight shift processing'),
      ],
    },
    {
      id: 'devices',
      title: t('Quản lý Thiết bị IoT', 'IoT Device Management'),
      desc: t('Giám sát trạng thái online/offline, đồng bộ vân tay và FaceID từ xa qua mạng nội bộ.', 'Monitor online/offline status, remote sync fingerprints and FaceID over LAN.'),
      icon: Cpu,
      span: 'col-span-1 md:col-span-1 lg:col-span-1',
      bullets: [
        t('Trạng thái thiết bị thời gian thực', 'Real-time device status tracking'),
        t('Đồng bộ vân tay & FaceID từ xa', 'Remote fingerprint & FaceID sync'),
        t('Cập nhật cấu hình hàng loạt', 'Batch configuration updates'),
      ],
    },
    {
      id: 'gate',
      title: t('Kiểm soát Cổng ra vào', 'Gate Access Control'),
      desc: t('Tích hợp barie, cổng xoay, phân quyền ra vào theo ca kíp và mốc thời gian.', 'Integrate barriers, turnstiles, time-based and shift-based access permissions.'),
      icon: ShieldCheck,
      span: 'col-span-1 md:col-span-1 lg:col-span-1',
      bullets: [
        t('Tích hợp barie & cổng xoay', 'Barrier & turnstile integration'),
        t('Cảnh báo ra vào bất thường', 'Abnormal access alerts'),
        t('Đồng bộ quyền ra vào tức thời', 'Instant access permission sync'),
      ],
    },
    {
      id: 'mobile',
      title: t('Ứng dụng Di động', 'Mobile Companion App'),
      desc: t('Nhân viên tra cứu bảng công, lịch làm việc và nộp đơn từ nghỉ phép trực tiếp trên điện thoại.', 'Employees check timesheets, work schedules, and submit leave requests directly on mobile.'),
      icon: DeviceMobile,
      span: 'col-span-1 md:col-span-2 lg:col-span-2',
      bullets: [
        t('Lịch làm việc & ngày công hàng tháng', 'Monthly work schedule & timesheet'),
        t('Đăng ký nghỉ phép & OT trực tiếp', 'Direct leave & OT application'),
        t('Quét mã QR kiểm tra tài sản', 'Asset QR scanner integration'),
      ],
    },
    {
      id: 'assets',
      title: t('Quản lý Tài sản CNTT', 'IT Asset Management'),
      desc: t('Theo dõi cấu hình phần cứng, bàn giao thiết bị và cấp mã QR riêng cho từng tài sản.', 'Track hardware specs, device handovers, and assign unique QR codes per asset.'),
      icon: Laptop,
      span: 'col-span-1 md:col-span-1 lg:col-span-1',
      bullets: [
        t('Lưu cấu hình CPU, RAM, SSD', 'Track CPU, RAM, SSD specs'),
        t('Mã QR riêng cho từng tài sản', 'Unique QR code per asset'),
        t('Lịch sử bàn giao phòng ban', 'Department handover history'),
      ],
    },
    {
      id: 'contractors',
      title: t('Nhà thầu & Khách ra vào', 'Contractors & Visitors'),
      desc: t('Đăng ký khách, cấp thẻ tạm thời và quản lý danh sách nhân sự nhà thầu ra vào công trình.', 'Visitor registration, temporary pass issuance, and contractor personnel management.'),
      icon: UsersThree,
      span: 'col-span-1 md:col-span-1 lg:col-span-1',
      bullets: [
        t('Đăng ký & cấp thẻ tạm thời', 'Registration & temp pass issuance'),
        t('Lịch sử ra vào cổng an ninh', 'Security gate access logs'),
        t('Phê duyệt nhân sự nhà thầu', 'Contractor personnel approval'),
      ],
    },
    {
      id: 'reports',
      title: t('Báo cáo & Biểu đồ', 'Reports & Analytics'),
      desc: t('Dashboard phân tích trực quan, báo cáo định kỳ tự động và truy xuất lịch sử dữ liệu.', 'Visual analytics dashboard, automated periodic reports, and data history retrieval.'),
      icon: ChartLineUp,
      span: 'col-span-1 md:col-span-1 lg:col-span-1',
      bullets: [
        t('Biểu đồ tỉ lệ đúng giờ', 'Punctuality rate charts'),
        t('Xuất báo cáo Excel/PDF định kỳ', 'Scheduled Excel/PDF auto-export'),
        t('Báo cáo hiệu suất thiết bị', 'Device performance reports'),
      ],
    },
    {
      id: 'weighbridge',
      title: t('Trạm cân Xe tải', 'Weighbridge Integration'),
      desc: t('Ghi nhận khối lượng từ đầu cân điện tử, liên kết phiếu cân với đơn hàng giao nhận.', 'Auto weight recording from indicator scales, linked to delivery order tickets.'),
      icon: Truck,
      span: 'col-span-1 md:col-span-1 lg:col-span-1',
      bullets: [
        t('Ghi nhận khối lượng tự động', 'Automatic weight logging'),
        t('Đối chiếu cân vào và ra', 'Entry and exit weight reconciliation'),
        t('Nhận diện biển số xe', 'License plate recognition'),
      ],
    },
  ];

  return (
    <section id="features" className="relative bg-background py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Vertical Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t('Phân hệ Cốt lõi', 'Core System Modules')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {t(
              'Hệ thống quản lý tập trung toàn bộ hoạt động chấm công, thiết bị và kiểm soát ra vào doanh nghiệp.',
              'Centralized system managing all enterprise attendance, device, and access operations.'
            )}
          </p>
        </motion.div>

        {/* Bento Grid (Clean Card Layout without giant images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-3xl border border-border/80 bg-card p-7 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between ${item.span}`}
              >
                <div>
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary transition-transform group-hover:scale-110">
                    <Icon size={24} weight="duotone" />
                  </div>

                  <h3 className="text-xl font-extrabold text-foreground mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted mb-6">
                    {item.desc}
                  </p>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-border/60">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2.5 text-xs font-semibold text-foreground/90">
                      <CheckCircle size={16} className="text-emerald-500 shrink-0" weight="fill" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
