'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';

interface ContentSection {
  heading?: { vi: string; en: string };
  paragraphs: { vi: string; en: string }[];
  bullets?: { vi: string; en: string }[];
  codeBlock?: {
    language: string;
    code: string;
  };
}

interface Post {
  id: string;
  category: 'updates' | 'guides' | 'tech';
  title: { vi: string; en: string };
  excerpt: { vi: string; en: string };
  date: string;
  author: {
    name: string;
    role: { vi: string; en: string };
    avatarColor: string;
  };
  readTime: { vi: string; en: string };
  sections: ContentSection[];
}

const MOCK_POSTS: Post[] = [
  {
    id: 'net10-migration',
    category: 'tech',
    title: {
      vi: 'Lộ trình chuyển dịch sang .NET 10 và tối ưu hiệu năng sinh trắc học real-time',
      en: 'Our .NET 10 Migration Roadmap & Real-time Biometrics Performance Optimization',
    },
    excerpt: {
      vi: 'Khám phá cách nATime nâng cấp hệ thống backend lên .NET 10, tối ưu hóa AOT compilation và giảm độ trễ xác thực vân tay & khuôn mặt xuống dưới 50ms cho các nhà máy lớn.',
      en: 'Discover how nATime upgraded its backend to .NET 10, optimizing Native AOT compilation and reducing fingerprint & face recognition latency to under 50ms for large-scale factories.',
    },
    date: '2026-07-10',
    author: {
      name: 'Nguyễn Minh Khang',
      role: { vi: 'Giám đốc Công nghệ (CTO)', en: 'Chief Technology Officer' },
      avatarColor: 'bg-indigo-600 text-white',
    },
    readTime: { vi: '8 phút đọc', en: '8 min read' },
    sections: [
      {
        heading: { vi: '1. Tại sao lại là .NET 10?', en: '1. Why .NET 10?' },
        paragraphs: [
          {
            vi: 'Hệ thống quản lý chấm công và kiểm soát ra vào quy mô lớn đòi hỏi tốc độ xử lý cực nhanh và tính ổn định cao. Khi phục vụ các nhà máy lớn với hơn 50.000 công nhân quẹt thẻ cùng lúc vào ca sáng, mỗi mili-giây trễ đều có thể gây ra hiện tượng ùn tắc nghiêm trọng tại cổng xoay an ninh. Vì lý do đó, đội ngũ kỹ sư nATime đã quyết định đi đầu trong việc nâng cấp hệ thống backend lên nền tảng .NET 10 mới nhất.',
            en: 'Large-scale time attendance and access control systems require ultra-fast processing speeds and high stability. When serving massive factories with over 50,000 workers clocking in simultaneously during the morning shift, every millisecond of latency can cause severe congestion at the security turnstiles. For this reason, the nATime engineering team decided to lead the way by upgrading our backend systems to the latest .NET 10 platform.',
          },
          {
            vi: 'Việc chuyển dịch này không chỉ mang lại các cải tiến về cú pháp lập trình mà quan trọng hơn là nâng cấp sâu rộng trong nhân runtime, cơ chế quản lý bộ nhớ (GC) và khả năng biên dịch tối ưu trực tiếp cho kiến trúc phần cứng x64 và ARM64.',
            en: 'This migration brings not only programming syntax improvements but, more importantly, deep upgrades in the runtime engine, garbage collection (GC) mechanism, and compiler optimizations designed directly for x64 and ARM64 hardware architectures.',
          },
        ],
      },
      {
        heading: { vi: '2. Tối ưu hóa vượt bậc với Native AOT Compilation', en: '2. Quantum Leap with Native AOT Compilation' },
        paragraphs: [
          {
            vi: 'Với .NET 10, tính năng biên dịch Native AOT (Ahead-Of-Time) đã đạt độ chín muồi vượt bậc. Thay vì biên dịch mã nguồn C# thành IL rồi chạy thông qua JIT (Just-In-Time) compiler như truyền thống, Native AOT biên dịch trực tiếp mã nguồn thành tệp thực thi mã máy nguyên bản tại thời điểm build.',
            en: 'With .NET 10, Native AOT (Ahead-Of-Time) compilation has reached a highly mature stage. Instead of compiling C# code to IL and executing it through the JIT (Just-In-Time) compiler, Native AOT compiles source code directly into machine-native binary at build time.',
          },
          {
            vi: 'Điều này mang lại ba lợi ích cốt lõi cho các dịch vụ API vi mô (microservices) phục vụ cổng kiểm soát:',
            en: 'This brings three core benefits to our microservices serving access control gates:',
          },
        ],
        bullets: [
          {
            vi: 'Thời gian khởi động lạnh (Cold Start) giảm từ khoảng 1.2 giây về gần như bằng 0 (dưới 10 mili-giây), giúp hệ thống tự động phục hồi tức thì nếu có sự cố xảy ra.',
            en: 'Cold start times dropped from 1.2 seconds to virtually zero (under 10ms), enabling instantaneous service recovery during failovers.',
          },
          {
            vi: 'Bộ nhớ RAM sử dụng (Memory Footprint) giảm tới 60%, cho phép vận hành nhiều container xử lý song song trên các cụm máy chủ Kubernetes giá rẻ.',
            en: 'Memory footprint reduced by 60%, allowing us to run more parallel container replicas on cost-effective Kubernetes nodes.',
          },
          {
            vi: 'Loại bỏ hoàn toàn độ trễ bất ngờ do JIT biên dịch mã nóng trong quá trình vận hành cao điểm.',
            en: 'Completely eliminates unpredictable latency spikes caused by JIT compiling code paths during peak operations.',
          },
        ],
        codeBlock: {
          language: 'xml',
          code: `<PropertyGroup>
  <PublishAot>true</PublishAot>
  <OptimizationPreference>Speed</OptimizationPreference>
  <IlcGenerateCompleteTypeMetadata>false</IlcGenerateCompleteTypeMetadata>
  <OptimizationLevel>O3</OptimizationLevel>
</PropertyGroup>`,
        },
      },
      {
        heading: { vi: '3. Kết quả đo lường thực tế tại nhà máy', en: '3. Real-world Benchmarks at Industrial Scale' },
        paragraphs: [
          {
            vi: 'Chúng tôi đã tiến hành kiểm thử thực tế với kịch bản tải mô phỏng 20.000 yêu cầu xác thực khuôn mặt và vân tay đồng thời mỗi giây (RPS). Dưới đây là kết quả đối sánh hiệu năng chi tiết giữa phiên bản cũ chạy .NET 8 và phiên bản mới chạy .NET 10:',
            en: 'We conducted live tests simulating 20,000 concurrent face and fingerprint authentication requests per second (RPS). Here is a detailed comparison of performance metrics between our legacy .NET 8 setup and the new .NET 10 engine:',
          },
        ],
        bullets: [
          {
            vi: 'Độ trễ trung bình (p95) giảm từ 110ms xuống còn 28ms. Độ trễ cực đại (p99) ổn định ở mức 42ms.',
            en: 'Average latency (p95) decreased from 110ms to 28ms. Max tail latency (p99) stabilized at 42ms.',
          },
          {
            vi: 'Khả năng chịu tải tối đa của một node máy chủ tăng từ 8.500 RPS lên 19.200 RPS không lỗi.',
            en: 'Maximum throughput of a single server node climbed from 8,500 RPS to 19,200 RPS with zero errors.',
          },
          {
            vi: 'Mức tiêu thụ CPU trung bình giảm 45% nhờ tận dụng các tập lệnh phần cứng SIMD mới được tối ưu hóa trong System.Runtime.Intrinsics của .NET 10.',
            en: 'Average CPU utilization fell by 45% by leveraging the newly optimized SIMD hardware intrinsics in .NET 10 System.Runtime.Intrinsics.',
          },
        ],
      },
      {
        heading: { vi: '4. Kết luận & Các bước tiếp theo', en: '4. Summary & What is next' },
        paragraphs: [
          {
            vi: 'Việc chuyển dịch sang .NET 10 là bước đi chiến lược giúp nATime đảm bảo cam kết SLA 99.99% cho các tập đoàn lớn. Trong giai đoạn tiếp theo, chúng tôi sẽ hoàn thành nâng cấp toàn bộ hệ thống báo cáo phân tích Big Data sang nền tảng này, mang đến những trải nghiệm quản trị tức thời và mượt mà hơn nữa.',
            en: 'Transitioning to .NET 10 is a strategic move that helps nATime deliver on its 99.99% SLA commitment for enterprise clients. In the next phase, we will complete the migration of our big data analytics pipeline to this platform, providing an even more instantaneous and fluid administrator experience.',
          },
        ],
      },
    ],
  },
  {
    id: 'sqlite-clean-room',
    category: 'updates',
    title: {
      vi: 'Kiến trúc SQLite Clean-room: Độc lập dữ liệu ngoại tuyến cho thiết bị Edge',
      en: 'SQLite Clean-room Architecture: Offline Data Independence for Edge Devices',
    },
    excerpt: {
      vi: 'nATime ra mắt cơ chế lưu trữ cục bộ mới dựa trên SQLite, cho phép các thiết bị chấm công Edge hoạt động độc lập và an toàn 100% ngay cả khi mất mạng.',
      en: 'nATime releases a new local storage mechanism built on SQLite, enabling Edge attendance devices to operate 100% independently and securely during network outages.',
    },
    date: '2026-06-28',
    author: {
      name: 'Trần Anh Tuấn',
      role: { vi: 'Trưởng nhóm Phần mềm Thiết bị', en: 'Embedded Software Lead' },
      avatarColor: 'bg-emerald-600 text-white',
    },
    readTime: { vi: '6 phút đọc', en: '6 min read' },
    sections: [
      {
        heading: { vi: '1. Thách thức mất kết nối ngoại tuyến', en: '1. The Challenge of Offline Disconnection' },
        paragraphs: [
          {
            vi: 'Trong thực tế vận hành tại Việt Nam, đặc biệt là ở các công trường xây dựng vùng sâu vùng xa hoặc các phân xưởng có tường bê tông dày, kết nối Wi-Fi/4G thường xuyên bị gián đoạn. Thiết bị chấm công nếu phụ thuộc hoàn toàn vào máy chủ đám mây để ra quyết định đóng/mở cửa sẽ ngay lập tức bị tê liệt, gây ảnh hưởng trực tiếp đến chuỗi vận hành.',
            en: 'In real-world deployments, especially at remote construction sites or workshops with thick concrete walls, Wi-Fi/4G connections drop frequently. If access gates depend entirely on cloud availability to make open/close decisions, they paralyze operations instantly when disconnected.',
          },
          {
            vi: 'nATime giải quyết vấn đề này bằng cách thiết kế lại lớp firmware điều khiển, đưa cơ sở dữ liệu SQLite siêu nhỏ gọn chạy trực tiếp trong vi mạch (Edge computing) để lưu trữ thông tin nhân viên và lịch sử ra vào ngoại tuyến.',
            en: 'nATime solves this by redesigning our controller firmware, embedding a lightweight SQLite database engine directly into the microprocessor level (Edge computing) to handle employee profiles and access logs offline.',
          },
        ],
      },
      {
        heading: { vi: '2. Giải pháp kỹ thuật SQLite Clean-room', en: '2. SQLite Clean-room Engineering' },
        paragraphs: [
          {
            vi: 'Chúng tôi gọi đây là kiến trúc Clean-room vì nó cô lập hoàn toàn môi trường lưu trữ cục bộ của thiết bị khỏi các kết nối mạng không an toàn. Cơ sở dữ liệu SQLite được tối ưu cấu hình ở chế độ WAL (Write-Ahead Logging) để tăng tốc độ ghi nhật ký lên đến 1.500 bản ghi/giây và tránh phân mảnh dữ liệu khi mất nguồn đột ngột.',
            en: 'We call this a clean-room architecture because it isolates the device local storage environment from insecure network connections. The SQLite engine is strictly optimized with Write-Ahead Logging (WAL) to reach write speeds of up to 1,500 logs/second and prevent corruption during sudden power failures.',
          },
          {
            vi: 'Toàn bộ dữ liệu sinh trắc học và thông tin cá nhân lưu trên Edge được mã hóa quân sự AES-256 thông qua tiện ích SQLCipher, khóa mã hóa được sinh ngẫu nhiên và bảo mật bên trong chip phần cứng bảo mật chuyên biệt.',
            en: 'All biometric templates and employee files on the Edge are military-grade AES-256 encrypted using SQLCipher. The decryption keys are dynamically generated and sealed inside a dedicated hardware security module (HSM).',
          },
        ],
        codeBlock: {
          language: 'sql',
          code: `-- Optimize SQLite for Edge devices
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA cache_size = 10000;
PRAGMA foreign_keys = ON;
-- Enable hardware-based DB encryption
PRAGMA key = 'device_specific_secured_key_hash';`,
        },
      },
      {
        heading: { vi: '3. Đồng bộ hai chiều thông minh khi trực tuyến trở lại', en: '3. Smart Bidirectional Recovery Sync' },
        paragraphs: [
          {
            vi: 'Khi kết nối Internet hoạt động trở lại, thiết bị nATime Gate không đồng bộ dồn dập để tránh làm nghẽn băng thông. Thay vào đó, một bộ hàng đợi ưu tiên (priority queue) sẽ xử lý đồng bộ các bản ghi chấm công lỗi trước, sau đó mới cập nhật danh sách nhân sự mới từ máy chủ trung tâm.',
            en: 'When the Internet is restored, the nATime Gate device does not trigger a massive push that could choke local bandwidth. Instead, an intelligent priority queue resolves high-priority attendance logs first, then pulls updated personnel rosters from the central server.',
          },
          {
            vi: 'Hệ thống hỗ trợ lưu trữ tới 100.000 nhật ký quẹt thẻ ngoại tuyến, tương đương với khả năng vận hành độc lập liên tiếp 30 ngày cho một nhà máy cỡ lớn mà không cần bất kỳ kết nối mạng nào.',
            en: 'The system can hold up to 100,000 card-swipe events offline, equivalent to running a major manufacturing plant independently for 30 consecutive days without network access.',
          },
        ],
      },
    ],
  },
  {
    id: 'anti-spoofing',
    category: 'guides',
    title: {
      vi: 'Cấu hình chống giả mạo khuôn mặt (Anti-Spoofing) bằng Camera 2D & 3D',
      en: 'Configuring Face Anti-Spoofing with 2D & 3D Cameras',
    },
    excerpt: {
      vi: 'Hướng dẫn chi tiết cách thiết lập các mức độ bảo mật chống ảnh chụp, video giả mạo trên thiết bị kiểm soát cửa nATime Gate, bảo vệ an ninh tối đa.',
      en: 'Detailed guide on setting up security levels against fake photos and videos on nATime Gate access control devices, ensuring maximum security.',
    },
    date: '2026-06-15',
    author: {
      name: 'Lê Hoàng Nam',
      role: { vi: 'Chuyên gia Giải pháp An ninh', en: 'Security Solutions Specialist' },
      avatarColor: 'bg-blue-600 text-white',
    },
    readTime: { vi: '5 phút đọc', en: '5 min read' },
    sections: [
      {
        heading: { vi: '1. Hiểm họa gian lận và xâm nhập trái phép', en: '1. The Danger of Fraud and Intrusions' },
        paragraphs: [
          {
            vi: 'Với sự phát triển của các thiết bị hiển thị độ phân giải cao và máy in màu chất lượng tốt, việc dùng ảnh thẻ của người khác hoặc phát lại video trên điện thoại trước camera chấm công là một trong những hành vi gian lận phổ biến nhất hiện nay. Nó phá vỡ tính trung thực của báo cáo chấm công và mở ra nguy cơ đột nhập phòng máy chủ, kho tiền hoặc văn phòng làm việc.',
            en: 'With the rise of ultra-high-resolution screens and high-quality color printers, presenting an employee photo card or playing back a video on a smartphone in front of a reader is one of the most common security breaches. It invalidates attendance data and exposes server rooms, vaults, or private offices to intrusion risks.',
          },
          {
            vi: 'Hệ thống nhận diện khuôn mặt của nATime tích hợp các mô hình học sâu phát hiện thực thể sống (Liveness Detection) để nhận diện và loại bỏ hoàn toàn các nỗ lực giả mạo này.',
            en: 'nATime face recognition terminals integrate deep learning-based Liveness Detection models to detect and immediately block these biometric spoofing attempts.',
          },
        ],
      },
      {
        heading: { vi: '2. Phân biệt Liveness Detection 2D và 3D', en: '2. Differentiating 2D and 3D Liveness Detection' },
        paragraphs: [
          {
            vi: 'Tùy vào phần cứng camera của thiết bị chấm công mà nATime hỗ trợ hai cơ chế chống giả mạo khác nhau:',
            en: 'Depending on the hardware camera modules of your terminals, nATime supports two distinct anti-spoofing mechanisms:',
          },
        ],
        bullets: [
          {
            vi: '2D Liveness (RGB): Phân tích kết cấu da, phản chiếu ánh sáng, viền màn hình và chuyển động siêu nhỏ của mắt dựa trên luồng video màu thông thường. Tiết kiệm chi phí, phù hợp văn phòng hành chính thông thường.',
            en: '2D Liveness (RGB): Analyzes skin texture, light scattering, screen border reflections, and micro-movements of eyes from standard color video feeds. Cost-effective, ideal for general offices.',
          },
          {
            vi: '3D Liveness (Structured Light / IR): Sử dụng chùm tia hồng ngoại chiếu lên khuôn mặt để đo bản đồ độ sâu 3D của các chi tiết (mũi, mắt, trán). Chặn đứng 100% ảnh chụp, video và các loại mặt nạ cao su silicon tinh vi.',
            en: '3D Liveness (Structured Light / IR): Projects an infrared dot matrix on the face to capture a 3D depth map of contours (nose, eyes, forehead). Defeats 100% of photos, videos, and complex silicon masks.',
          },
        ],
      },
      {
        heading: { vi: '3. Quy trình cấu hình trên bảng điều khiển nATime', en: '3. Step-by-Step Configuration on nATime Portal' },
        paragraphs: [
          {
            vi: 'Để thiết lập mức độ chống giả mạo cho hệ thống, quản trị viên thực hiện theo hướng dẫn sau:',
            en: 'To configure the anti-spoofing threshold levels, administrators should follow these steps:',
          },
        ],
        bullets: [
          {
            vi: 'Bước 1: Truy cập Quản lý Thiết bị -> Cấu hình thiết bị -> Chọn nhóm thiết bị cần cài đặt.',
            en: 'Step 1: Go to Device Management -> Device Settings -> Select the targeted device group.',
          },
          {
            vi: 'Bước 2: Tìm cài đặt "Liveness Verification" và chọn "Bật" (Enable).',
            en: 'Step 2: Locate the "Liveness Verification" parameter and switch it to "Enabled".',
          },
          {
            vi: 'Bước 3: Thiết lập ngưỡng nhạy cảm (Threshold Value) từ 0.7 đến 0.95. Giá trị mặc định khuyến nghị là 0.85.',
            en: 'Step 3: Adjust the threshold sensitivity from 0.70 to 0.95. The recommended default is 0.85.',
          },
          {
            vi: 'Bước 4: Lưu thay đổi. Bảng tham số sẽ được đồng bộ xuống các đầu đọc cổng chỉ trong 10 giây qua giao thức WebSocket.',
            en: 'Step 4: Click Save. The configuration updates will sync to the hardware in under 10 seconds via WebSockets.',
          },
        ],
      },
    ],
  },
  {
    id: 'webrtc-intercom',
    category: 'tech',
    title: {
      vi: 'Tích hợp giao thức WebRTC trong giám sát và đàm thoại video tại cổng kiểm soát',
      en: 'Integrating WebRTC for Intercom and Real-time Video Streaming at Gates',
    },
    excerpt: {
      vi: 'Khám phá cách nATime giải quyết bài toán đàm thoại video hai chiều độ trễ cực thấp (<200ms) giữa sảnh chờ và phòng điều khiển trung tâm sử dụng WebRTC.',
      en: 'Discover how nATime achieves ultra-low latency (<200ms) two-way video intercom between gate entryways and central control rooms using WebRTC.',
    },
    date: '2026-05-30',
    author: {
      name: 'Hoàng Văn Lâm',
      role: { vi: 'Kỹ sư Mạng & Truyền thông', en: 'Network & Comm Engineer' },
      avatarColor: 'bg-purple-600 text-white',
    },
    readTime: { vi: '7 phút đọc', en: '7 min read' },
    sections: [
      {
        heading: { vi: '1. Nhu cầu đàm thoại thời gian thực tại các chốt an ninh', en: '1. The Need for Real-time Communication at Security Gates' },
        paragraphs: [
          {
            vi: 'Khi có khách đến liên hệ công tác hoặc nhà thầu giao nhận hàng hóa tại các cổng an ninh nhà máy, họ thường không có sẵn thẻ từ hay thông tin sinh trắc học đăng ký trước. Lúc này, việc thiết lập một cuộc gọi video chất lượng cao từ thiết bị cổng về phòng điều khiển trung tâm là vô cùng cần thiết để bộ phận bảo vệ kiểm tra giấy tờ và mở cửa từ xa.',
            en: 'When visitors or contractors arrive at factory security checkpoints, they typically do not hold active access cards or registered biometric profiles. Establishing an instant, high-definition video call from the gate device to the central security desk is vital to verify credentials and trigger remote gate release.',
          },
          {
            vi: 'Để đảm bảo trải nghiệm mượt mà, cuộc gọi đàm thoại phải có độ trễ cực thấp và có khả năng hoạt động tốt trên các mạng nội bộ doanh nghiệp có thiết lập tường lửa phức tạp.',
            en: 'To guarantee a seamless experience, the call must feature ultra-low latency and traverse corporate networks loaded with strict firewall rules.',
          },
        ],
      },
      {
        heading: { vi: '2. Tại sao WebRTC thay thế vượt trội cho SIP/VoIP?', en: '2. Why WebRTC Outperforms Traditional SIP/VoIP?' },
        paragraphs: [
          {
            vi: 'Các hệ thống chuông cửa màn hình truyền thống thường chạy giao thức SIP/VoIP. Điểm yếu của SIP là khó cấu hình NAT traversal, yêu cầu máy chủ trung gian phức tạp và độ trễ truyền hình ảnh thường dao động từ 1.5 đến 3 giây.',
            en: 'Traditional video intercoms rely heavily on SIP/VoIP protocols. The pitfalls of SIP include complex NAT traversal setups, heavy central PBX dependencies, and latency that averages between 1.5 to 3.0 seconds.',
          },
          {
            vi: 'nATime đã tích hợp trực tiếp WebRTC vào firmware của thiết bị Gate và bảng điều khiển của nhân viên bảo vệ. Giao thức WebRTC thiết lập kết nối ngang hàng (Peer-to-Peer) trực tiếp giữa hai đầu thiết bị, giúp tối ưu hóa đường truyền dữ liệu.',
            en: 'nATime integrated WebRTC directly into the Gate hardware firmware and the administrator web-based console. WebRTC establishes direct peer-to-peer tunnels between endpoints, optimizing path efficiency.',
          },
        ],
        bullets: [
          {
            vi: 'Độ trễ truyền hình ảnh và âm thanh thực tế giảm xuống dưới 180ms, mang lại cảm giác đàm thoại tức thời như gọi điện thoại thông thường.',
            en: 'Real-world video and audio latency falls under 180ms, producing a direct, natural call feeling equivalent to standard cellular calls.',
          },
          {
            vi: 'Mã hóa luồng dữ liệu mặc định bằng giao thức SRTP và mã hóa tín hiệu DTLS, ngăn chặn hoàn toàn nguy cơ bị nghe trộm luồng camera.',
            en: 'Streams are fully encrypted by default with SRTP and secured signaling via DTLS, neutralizing any camera tapping risks.',
          },
          {
            vi: 'Tương thích 100% với các trình duyệt web hiện đại mà không cần cài đặt thêm plugin hay phần mềm bên thứ ba.',
            en: '100% compatible with modern web browsers without installing complex plugins or proprietary third-party software.',
          },
        ],
      },
      {
        heading: { vi: '3. Thiết lập kết nối vượt tường lửa bằng STUN/TURN', en: '3. NAT Traversal with STUN/TURN Services' },
        paragraphs: [
          {
            vi: 'Trong các tập đoàn lớn, các lớp mạng con (VLAN) thường được cô lập rất nghiêm ngặt để bảo mật. Để giải quyết việc truyền gói tin đa phương tiện xuyên qua các lớp bảo mật này, nATime triển khai một cụm máy chủ STUN/TURN phân tán có tính sẵn sàng cao.',
            en: 'Inside large enterprises, subnets (VLANs) are tightly isolated for security. To successfully stream video packages across these secure boundaries, nATime provisions a highly available distributed STUN/TURN server cluster.',
          },
          {
            vi: 'Khi hai thực thể không thể thiết lập kết nối ngang hàng trực tiếp, TURN server sẽ tự động làm cầu nối trung chuyển dữ liệu với độ trễ trễ gần như không đổi, đảm bảo tỷ lệ kết nối thành công đạt 99.9% trong mọi điều kiện hạ tầng mạng.',
            en: 'If a direct peer-to-peer path cannot be negotiated, the TURN server steps in as a relay node with minimal overhead, maintaining a 99.9% call connection success rate across diverse network topologies.',
          },
        ],
      },
    ],
  },
  {
    id: 'it-asset-rfid',
    category: 'guides',
    title: {
      vi: 'Đồng bộ hóa tài sản CNTT tự động thông qua hệ thống kiểm soát cửa',
      en: 'Automating IT Asset Sync via Physical Access Control Gates',
    },
    excerpt: {
      vi: 'Ngăn ngừa thất thoát thiết bị văn phòng bằng giải pháp tích hợp thông minh giữa thẻ RFID của laptop và lịch trình quẹt thẻ sinh trắc học của nhân viên.',
      en: 'Prevent office hardware leakage using a smart integration between laptop RFID tags and employee biometric gate logs.',
    },
    date: '2026-05-12',
    author: {
      name: 'Phan Thanh Sơn',
      role: { vi: 'Trưởng phòng Quản lý Sản phẩm', en: 'Product Management Lead' },
      avatarColor: 'bg-amber-600 text-white',
    },
    readTime: { vi: '6 phút đọc', en: '6 min read' },
    sections: [
      {
        heading: { vi: '1. Thất thoát tài sản: Nỗi đau đầu của bộ phận IT và Hành chính', en: '1. Asset Leakage: The IT & Operations Nightmare' },
        paragraphs: [
          {
            vi: 'Ở các công ty công nghệ lớn, lượng máy tính xách tay, thiết bị thử nghiệm (test devices), và tài sản CNTT có giá trị cực kỳ lớn. Các quy định kiểm kê thủ công bằng giấy tờ tại bàn bảo vệ thường gây phiền toái, xếp hàng chờ đợi lâu khi tan ca và rất dễ xảy ra sai sót hoặc thông đồng gian lận.',
            en: 'In large tech companies, the sheer volume of high-value laptops, test devices, and IT assets is immense. Manual verification processes using paper logs at security desks cause delays, long lines during exit hours, and are highly prone to human error or collusion.',
          },
          {
            vi: 'Bằng cách liên kết hệ thống Quản lý Tài sản (Asset Management) với Hệ thống Kiểm soát Ra vào (Access Control), nATime mang đến giải pháp tự động hóa hoàn toàn quy trình này thông qua công nghệ nhận dạng tần số vô tuyến (RFID).',
            en: 'By linking the Asset Management database directly with the Access Control system, nATime introduces a fully automated validation loop using Radio Frequency Identification (RFID) technology.',
          },
        ],
      },
      {
        heading: { vi: '2. Cơ chế tích hợp RFID và Sinh trắc học của nATime', en: '2. nATime Biometrics & RFID Integration Mechanics' },
        paragraphs: [
          {
            vi: 'Mỗi tài sản CNTT được cấp phát cho nhân viên sẽ được dán một tem RFID tầm xa siêu mỏng (UHF RFID tag). Mã số của tem này được gán duy nhất với số serial máy và hồ sơ nhân viên sở hữu trên cơ sở dữ liệu trung tâm.',
            en: 'Each IT asset assigned to an employee is fitted with an ultra-thin, long-range UHF RFID tag. The ID of this tag is bound to the hardware serial number and the employee owner file in the central database.',
          },
          {
            vi: 'Tại các cổng xoay an ninh hoặc cửa ra vào, chúng tôi tích hợp đầu đọc RFID UHF có anten định hướng quét trong phạm vi 1.5 - 2 mét. Khi nhân viên thực hiện xác thực khuôn mặt hoặc vân tay để mở cửa ra ngoài, đầu đọc RFID sẽ lập tức quét các tem tài sản đang mang theo người.',
            en: 'At the security turnstiles, we integrate directional UHF RFID readers with a sweep range of 1.5 to 2.0 meters. When the employee authenticates via face scan or fingerprint to unlock the gate, the RFID reader instantly scans for any carried tags.',
          },
        ],
      },
      {
        heading: { vi: '3. Quy trình xác thực tự động trong 200 mili-giây', en: '3. Automated Verification Flow in 200 Milliseconds' },
        paragraphs: [
          {
            vi: 'Hệ thống tự động thực hiện quy trình kiểm tra chéo cực nhanh:',
            en: 'The system runs a sub-second cross-reference check:',
          },
        ],
        bullets: [
          {
            vi: 'Bước 1: Nhận dạng danh tính nhân viên quẹt thẻ và các mã tài sản đi cùng qua cổng.',
            en: 'Step 1: Identify the employee through biometric validation and scan accompanying asset IDs.',
          },
          {
            vi: 'Bước 2: Truy vấn cơ sở dữ liệu: Thiết bị này có phải của nhân viên này không? Nhân viên đã tạo "Yêu cầu mang máy ra ngoài" được phê duyệt trên app nATime chưa?',
            en: 'Step 2: Query database: Is this device assigned to this individual? Has a "Gate Pass / Asset Exit" request been created and approved on the nATime mobile app?',
          },
          {
            vi: 'Bước 3: Nếu Hợp lệ, cổng mở bình thường, ghi nhận nhật ký xuất tài sản. Nếu Không hợp lệ, cổng khóa chặt, còi cảnh báo vang lên tại bàn bảo vệ và gửi thông báo khẩn cho IT Security.',
            en: 'Step 3: If valid, gate unlocks, registering the exit event. If invalid, gate remains locked, an audio alarm alerts the guard desk, and an alert is routed to IT Security.',
          },
        ],
      },
    ],
  },
];

function PostCover({ id }: { id: string }) {
  const containerClass = 'relative w-full h-full min-h-[200px] flex items-center justify-center bg-gradient-to-br transition-all duration-500 overflow-hidden';

  if (id === 'net10-migration') {
    return (
      <div className={`${containerClass} from-indigo-900 via-indigo-950 to-slate-950`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <svg className="w-16 h-16 text-indigo-400 relative z-10 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11a5 5 0 00-10 0c0 1.017.07 2.019.203 3m-2.118-.014a14.25 14.25 0 000 5.83M8.014 5.827a4.996 4.996 0 017.96 0m-7.96 0a14.25 14.25 0 000 5.83m1.34-3.44a14.16 14.16 0 011.113-2.753m0 0a13.947 13.947 0 011.062-2.213M14 3.857a14.017 14.017 0 00-2.753 9.57m0 0a13.99 13.99 0 033.44-2.04m0 0A13.91 13.91 0 0212 11m0 0c.231-.054.464-.105.7-.15" />
        </svg>
        <span className="absolute bottom-3 right-4 text-indigo-500/40 font-mono text-[10px] select-none tracking-wider">.NET 10 NATIVE AOT</span>
      </div>
    );
  }

  if (id === 'sqlite-clean-room') {
    return (
      <div className={`${containerClass} from-emerald-900 via-emerald-950 to-slate-950`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <svg className="w-16 h-16 text-emerald-400 relative z-10 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
        <span className="absolute bottom-3 right-4 text-emerald-500/40 font-mono text-[10px] select-none tracking-wider">SQLITE WAL SYNC</span>
      </div>
    );
  }

  if (id === 'anti-spoofing') {
    return (
      <div className={`${containerClass} from-blue-900 via-blue-950 to-slate-950`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <svg className="w-16 h-16 text-blue-400 relative z-10 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.5a3 3 0 11-6 0 3 3 0 016 0zM6.75 19.5a3.75 3.75 0 017.5 0H6.75z" />
        </svg>
        <span className="absolute bottom-3 right-4 text-blue-500/40 font-mono text-[10px] select-none tracking-wider">3D LIVENESS SECURE</span>
      </div>
    );
  }

  if (id === 'webrtc-intercom') {
    return (
      <div className={`${containerClass} from-purple-900 via-purple-950 to-slate-950`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <svg className="w-16 h-16 text-purple-400 relative z-10 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
        <span className="absolute bottom-3 right-4 text-purple-500/40 font-mono text-[10px] select-none tracking-wider">WEBRTC LOW LATENCY</span>
      </div>
    );
  }

  // default: it-asset-rfid
  return (
    <div className={`${containerClass} from-amber-900 via-amber-950 to-slate-950`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <svg className="w-16 h-16 text-amber-400 relative z-10 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
      <span className="absolute bottom-3 right-4 text-amber-500/40 font-mono text-[10px] select-none tracking-wider">UHF RFID SENSOR</span>
    </div>
  );
}

export default function BlogPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'updates' | 'guides' | 'tech'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPost]);

  const handleCopyLink = (postId: string) => {
    const shareUrl = `${window.location.origin}/blog#${postId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(postId);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCodeIndex(index);
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    });
  };

  // Filter posts
  const filteredPosts = MOCK_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch =
      t(post.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(post.excerpt).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured Post is always .NET 10 migration if the search/filters contain it
  const hasFeatured = filteredPosts.some((p) => p.id === 'net10-migration');
  const featuredPost = hasFeatured ? MOCK_POSTS.find((p) => p.id === 'net10-migration') : null;
  const gridPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== 'net10-migration')
    : filteredPosts;

  const categories: { key: 'all' | 'updates' | 'guides' | 'tech'; label: { vi: string; en: string } }[] = [
    { key: 'all', label: { vi: 'Tất cả', en: 'All' } },
    { key: 'updates', label: { vi: 'Cập nhật sản phẩm', en: 'Updates' } },
    { key: 'guides', label: { vi: 'Hướng dẫn', en: 'Guides' } },
    { key: 'tech', label: { vi: 'Công nghệ', en: 'Tech' } },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background relative overflow-hidden pt-12 pb-24">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        {/* Gradient glows */}
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mt-10 mb-16 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
              <span className="text-gradient">
                {t('Tin tức & Nhật ký Phát triển', 'Blog & Dev Logs')}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted">
              {t(
                'Cập nhật công nghệ mới nhất, cẩm nang vận hành và những ghi chép trực tiếp từ kỹ sư phát triển nATime.',
                'The latest tech breakthroughs, operating playbooks, and direct development logs from the nATime team.'
              )}
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border/60 pb-8 mb-12">
            
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.key
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                      : 'bg-card text-muted border-border hover:border-primary/30 hover:text-foreground'
                  }`}
                >
                  {t(cat.label)}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('Tìm kiếm bài viết...', 'Search articles...')}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full border border-border bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3.5 flex items-center text-muted hover:text-foreground cursor-pointer"
                  aria-label="Clear search"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Featured Post (Only if present and matching filters) */}
          {featuredPost && (
            <div className="mb-16 animate-fade-in-up">
              <div className="group bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Image/Mockup area */}
                  <div className="lg:col-span-7 overflow-hidden relative min-h-[300px]">
                    <PostCover id={featuredPost.id} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent lg:hidden" />
                  </div>

                  {/* Info area */}
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                      {/* Tag & Meta */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20">
                          {t('Nổi bật', 'Featured')} • {t(categories.find(c => c.key === featuredPost.category)?.label ?? { vi: '', en: '' })}
                        </span>
                        <span className="text-xs text-muted flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {t(featuredPost.readTime)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 
                        onClick={() => setSelectedPost(featuredPost)}
                        className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors duration-300 cursor-pointer"
                      >
                        {t(featuredPost.title)}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm sm:text-base text-muted mb-6 leading-relaxed line-clamp-4">
                        {t(featuredPost.excerpt)}
                      </p>
                    </div>

                    {/* Author & Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-border/60">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${featuredPost.author.avatarColor}`}>
                          {featuredPost.author.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{featuredPost.author.name}</div>
                          <div className="text-xs text-muted">{t(featuredPost.author.role)}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted font-mono">{featuredPost.date}</span>
                        <button
                          onClick={() => setSelectedPost(featuredPost)}
                          className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-hover group/btn cursor-pointer"
                        >
                          {t('Đọc thêm', 'Read more')}
                          <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid posts */}
          {gridPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {gridPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div>
                    {/* Visual Cover */}
                    <div className="relative overflow-hidden aspect-video">
                      <PostCover id={post.id} />
                      <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold tracking-wider rounded-full bg-slate-900/80 text-white border border-white/10 backdrop-blur-sm">
                        {t(categories.find(c => c.key === post.category)?.label ?? { vi: '', en: '' })}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 sm:p-8">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-muted mb-3 font-mono">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {t(post.readTime)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => setSelectedPost(post)}
                        className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-200 cursor-pointer"
                      >
                        {t(post.title)}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted line-clamp-3 leading-relaxed">
                        {t(post.excerpt)}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex items-center justify-between border-t border-border/50 pt-4 mt-auto">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${post.author.avatarColor}`}>
                        {post.author.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">{post.author.name}</div>
                        <div className="text-[10px] text-muted line-clamp-1">{t(post.author.role)}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-0.5 text-xs font-bold text-primary hover:text-primary-hover group/btn cursor-pointer"
                    >
                      {t('Đọc thêm', 'Read more')}
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-20 bg-card border border-border rounded-3xl p-8 max-w-lg mx-auto">
              <svg className="mx-auto h-12 w-12 text-muted mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('Không tìm thấy bài viết', 'No articles found')}
              </h3>
              <p className="text-sm text-muted mb-6">
                {t('Hãy thử thay đổi từ khóa tìm kiếm hoặc lọc theo danh mục khác.', 'Try changing your search terms or picking another category.')}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-5 py-2 text-sm font-semibold rounded-full bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer"
              >
                {t('Đặt lại bộ lọc', 'Reset filters')}
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Fullscreen Reading Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md transition-all duration-300 animate-fade-in">
          
          {/* Modal Container */}
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-[2rem] shadow-2xl animate-fade-in-up flex flex-col">
            
            {/* Sticky Header Actions */}
            <div className="sticky top-0 z-20 bg-card/85 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-1 uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                  {t(categories.find(c => c.key === selectedPost.category)?.label ?? { vi: '', en: '' })}
                </span>
                <span className="text-xs text-muted font-mono">{selectedPost.date}</span>
              </div>

              <div className="flex items-center gap-2">
                
                {/* Share Button */}
                <button
                  onClick={() => handleCopyLink(selectedPost.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full border border-border bg-background hover:bg-card-hover transition-all text-foreground cursor-pointer"
                  title={t('Sao chép liên kết bài viết', 'Copy link to share')}
                >
                  {copiedId === selectedPost.id ? (
                    <>
                      <svg className="h-3.5 w-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-success">{t('Đã chép!', 'Copied!')}</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-3.5 w-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.636-4.636a3 3 0 114.243 4.243l-4.636 4.636a3 3 0 11-4.243-4.243zm0 0L7.5 12" />
                      </svg>
                      <span>{t('Chia sẻ', 'Share')}</span>
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-full border border-border bg-background hover:bg-card-hover text-muted hover:text-foreground transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-10 lg:p-12 overflow-y-auto flex-1">
              
              {/* Cover visual inside post */}
              <div className="w-full rounded-2xl overflow-hidden mb-8 border border-border shadow-inner">
                <PostCover id={selectedPost.id} />
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-6 leading-tight">
                {t(selectedPost.title)}
              </h1>

              {/* Author header */}
              <div className="flex items-center gap-4 border-b border-border/60 pb-6 mb-8">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-base ${selectedPost.author.avatarColor}`}>
                  {selectedPost.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-base font-semibold text-foreground">{selectedPost.author.name}</div>
                  <div className="text-xs text-muted">{t(selectedPost.author.role)}</div>
                </div>
                <div className="ml-auto text-xs text-muted font-mono flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t(selectedPost.readTime)}
                </div>
              </div>

              {/* Excerpt panel */}
              <div className="border-l-4 border-primary pl-4 py-2 bg-primary/[0.03] rounded-r-xl mb-8">
                <p className="text-sm sm:text-base italic text-muted leading-relaxed">
                  {t(selectedPost.excerpt)}
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-8 text-foreground">
                {selectedPost.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    
                    {/* Subheading */}
                    {section.heading && (
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight pt-2">
                        {t(section.heading)}
                      </h2>
                    )}

                    {/* Paragraphs */}
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm sm:text-base text-muted leading-relaxed">
                        {t(p)}
                      </p>
                    ))}

                    {/* Bullets */}
                    {section.bullets && (
                      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-muted">
                        {section.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {t(b)}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Code Block */}
                    {section.codeBlock && (
                      <div className="relative group my-6 rounded-2xl overflow-hidden border border-border bg-slate-950 dark:bg-slate-900/40">
                        
                        {/* Tab header */}
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                          <span className="text-[10px] uppercase font-mono text-slate-400">
                            {section.codeBlock.language}
                          </span>
                          <button
                            onClick={() => handleCopyCode(section.codeBlock!.code, idx)}
                            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Copy code"
                          >
                            {copiedCodeIndex === idx ? (
                              <svg className="h-3.5 w-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-6 4h6m-3-3v6" />
                              </svg>
                            )}
                          </button>
                        </div>

                        {/* Code container */}
                        <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed scrollbar-none">
                          <code>{section.codeBlock.code}</code>
                        </pre>
                      </div>
                    )}

                  </div>
                ))}
              </div>

              {/* End Note */}
              <div className="mt-12 pt-8 border-t border-border/60 text-center">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 text-sm font-semibold rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-foreground transition-all cursor-pointer"
                >
                  {t('Đóng bài viết', 'Close article')}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
}
