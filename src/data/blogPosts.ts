export interface BlogPost {
  slug: string;
  category: string;
  tag: string;
  title: string;
  desc: string;
  date: string;
  readTime: string;
  coverImage: string;
  quote?: string;
  badge?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: {
    summary: string;
    sections: {
      heading: string;
      paragraphs: string[];
      bullets?: string[];
      callout?: {
        title: string;
        text: string;
      };
    }[];
  };
}

const defaultAuthor = {
  name: 'nATime',
  role: 'Hệ thống Quản lý Chấm công & IoT',
  avatar: '/logo.png',
};

export const featuredPost: BlogPost = {
  slug: 'dong-tam-group-tiet-kiem-40-phan-tram-phieu-can-giay',
  category: 'Trạm cân',
  tag: 'TRẠM CÂN · 12 phút đọc',
  title: 'Cách một nhà máy vật liệu xây dựng loại bỏ hoàn toàn phiếu cân giấy',
  desc: 'Từ đối soát thủ công mỗi ca đến đối chiếu tự động theo thời gian thực — hành trình triển khai trạm cân điện tử tại Đồng Tâm Group.',
  date: '04.08.2026',
  readTime: '12 phút',
  coverImage: '/blog/weighbridge_factory.jpg',
  quote: '"Giảm 40% thời gian đối soát phiếu cân sau 3 tháng triển khai nATime tại Đồng Tâm Group."',
  badge: 'Case study',
  author: defaultAuthor,
  content: {
    summary: 'Đồng Tâm Group - một trong những tập đoàn sản xuất vật liệu xây dựng hàng đầu đã số hóa thành công 100% quy trình cân xe tải, loại bỏ hoàn toàn phiếu cân giấy và giảm thiểu 40% thời gian xử lý thủ tục đối soát hàng hóa mỗi ngày.',
    sections: [
      {
        heading: '1. Bài toán thực tế tại hiện trường trạm cân',
        paragraphs: [
          'Tại các nhà máy sản xuất gạch và vật liệu xây dựng, trung bình mỗi ngày có từ 120 đến 180 lượt xe tải và container ra vào lấy hàng. Trước khi ứng dụng nATime, mọi thao tác đều được ghi chép thủ công trên phiếu cân 3 liên giấy carbon.',
          'Quy trình cũ bộc lộ nhiều điểm nghẽn nghiêm trọng: tài xế phải xuống xe xuất trình phiếu, nhân viên trạm cân gõ lại biển số và khối lượng bằng tay, dễ xảy ra sai sót dữ liệu và tắc nghẽn cục bộ tại cổng vào giờ cao điểm.',
        ],
        bullets: [
          'Thời gian xử lý trung bình mỗi lượt cân xe: 4 – 6 phút.',
          'Rủi ro gian lận khối lượng và tráo đổi biển số xe giữa các ca.',
          'Đối soát kế toán cuối ngày mất từ 2 – 3 giờ tổng hợp hóa đơn.',
        ],
      },
      {
        heading: '2. Giải pháp tích hợp toàn diện của nATime',
        paragraphs: [
          'nATime đã triển khai hệ thống trạm cân thông minh kết hợp phần cứng IoT và phần mềm On-Premise:',
          'Hệ thống kết nối trực tiếp với đầu cân điện tử thông qua giao thức RS-232/Modbus TCP, đồng bộ camera AI nhận diện biển số xe (ANPR) 2 chiều và cảm biến quang định vị vị trí xe trên bàn cân.',
        ],
        callout: {
          title: 'Công nghệ cốt lõi',
          text: 'Thuật toán khóa dữ liệu khối lượng tự động chỉ khi xe dừng đúng vị trí cảm biến và camera nhận diện khớp biển số đăng ký trước trong hệ thống ERP.',
        },
      },
      {
        heading: '3. Kết quả đo lường sau 3 tháng vận hành',
        paragraphs: [
          'Toàn bộ phiếu cân được số hóa tức thì, tự động đẩy dữ liệu sang phần mềm kế toán và phát hành phiếu điện tử qua mã QR cho tài xế.',
          'Thời gian thông xe mỗi lượt giảm từ 5 phút xuống còn dưới 45 giây. Ban giám đốc nhà máy có thể theo dõi biểu đồ khối lượng xuất nhập theo thời gian thực trên màn hình điều hành.',
        ],
        bullets: [
          'Giảm 40% thời gian đối soát kế toán và thủ tục xuất xưởng.',
          'Loại bỏ hoàn toàn 100% thất thoát và sai lệch số liệu cân.',
          'Hoạt động ổn định 24/7 không phụ thuộc vào kết nối Internet bên ngoài.',
        ],
      },
    ],
  },
};

export const blogArticles: BlogPost[] = [
  {
    slug: 'ba-sai-lam-pho-bien-khi-trien-khai-cham-cong-van-tay',
    category: 'Chấm công',
    tag: 'CHẤM CÔNG · 6 phút đọc',
    title: 'Ba sai lầm phổ biến khi triển khai chấm công vân tay tại nhà máy',
    desc: 'Từ chọn sai vị trí đầu đọc đến bỏ qua ca gãy — những lỗi khiến dữ liệu chấm công sai lệch.',
    date: '28.07.2026',
    readTime: '6 phút',
    coverImage: '/blog/fingerprint_biometrics.jpg',
    author: defaultAuthor,
    content: {
      summary: 'Triển khai chấm công vân tay tại nhà máy công nghiệp đòi hỏi sự tính toán kỹ lưỡng về môi trường sản xuất, luồng di chuyển của công nhân và quy chế ca kíp đặc thù.',
      sections: [
        {
          heading: 'Sai lầm 1: Lắp đặt đầu đọc tại vị trí có ánh nắng trực tiếp hoặc bụi dầu',
          paragraphs: [
            'Cảm biến quang học vân tay rất nhạy cảm với ánh sáng mạnh và bụi bẩn công nghiệp. Nhiều nhà máy lắp đầu đọc ngay cổng ngoài trời không mái che khiến tỉ lệ nhận diện thất bại lên đến 35%.',
            'Giải pháp: Bố trí máy tại khu vực có mái che, cách xa nguồn phát nhiệt và trang bị hộp bảo vệ chuyên dụng IP65.',
          ],
        },
        {
          heading: 'Sai lầm 2: Không cấu hình linh hoạt cho các ca gãy và ca đêm',
          paragraphs: [
            'Nhà máy thường có ca làm việc vắt qua 0h đêm hoặc ca gãy 3 tiếng. Nếu phần mềm chỉ tính công theo ngày cố định, dữ liệu giờ vào/ra sẽ bị phân mảnh và tính thiếu giờ công của người lao động.',
          ],
          callout: {
            title: 'Khuyến nghị kỹ thuật',
            text: 'nATime hỗ trợ thuật toán ghép cặp ca động (Dynamic Shift Matching), tự động nhận diện ca làm việc dựa trên khung giờ quẹt thẻ thực tế mà không cần khai báo trước.',
          },
        },
        {
          heading: 'Sai lầm 3: Bỏ qua năng lực xử lý khi hàng nghìn công nhân tan ca cùng lúc',
          paragraphs: [
            'Vào giờ tan ca, lưu lượng quẹt thẻ có thể lên đến 50 lượt/phút trên mỗi máy. Cần lựa chọn thiết bị có bộ nhớ đệm Offline và kết nối TCP/IP nội bộ tốc độ cao để không gây nghẽn hàng đợi.',
          ],
        },
      ],
    },
  },
  {
    slug: 'kiem-soat-nha-thau-phu-ra-vao-cong-truong',
    category: 'Vận hành',
    tag: 'VẬN HÀNH · 8 phút đọc',
    title: 'Kiểm soát nhà thầu phụ ra vào công trường: bài toán không chỉ là chiếc thẻ',
    desc: 'Khi có hàng chục nhà thầu phụ mỗi ngày, phân quyền theo khu vực trở thành yêu cầu bắt buộc.',
    date: '19.07.2026',
    readTime: '8 phút',
    coverImage: '/blog/turnstile_gate_faceid.jpg',
    author: defaultAuthor,
    content: {
      summary: 'Quản lý an ninh cho nhân sự nhà thầu phụ và khách vãng lai ra vào khu vực sản xuất đòi hỏi cơ chế cấp phát quyền truy cập tạm thời và thu hồi tự động chính xác theo giờ.',
      sections: [
        {
          heading: 'Thách thức trong quản lý nhà thầu ngắn hạn',
          paragraphs: [
            'Các đơn vị thi công bảo trì máy móc chỉ có mặt tại nhà máy trong vài ngày hoặc vài giờ. Việc phát thẻ nhựa truyền thống gây tốn kém, dễ mất mát và không kiểm soát được việc người ngoài đi lạc vào khu vực cấm.',
          ],
        },
        {
          heading: 'Giải pháp FaceID và mã QR định danh tạm thời',
          paragraphs: [
            'Với nATime, người quản lý có thể đăng ký khuôn mặt hoặc tạo mã QR truy cập có thời hạn trực tiếp trên hệ thống.',
            'Mỗi nhân sự chỉ được phép mở cửa ở đúng phân xưởng được phân công, và quyền truy cập sẽ tự động hết hiệu lực ngay khi hợp đồng kết thúc.',
          ],
          bullets: [
            'Phân quyền khu vực nghiêm ngặt theo cấp bậc.',
            'Cảnh báo tức thì nếu phát hiện cố tình mở cửa trái phép.',
            'Lưu trữ nhật ký hình ảnh đối chiếu khi cần điều tra.',
          ],
        },
      ],
    },
  },
  {
    slug: 'natime-ra-mat-api-tich-hop-luong-erp',
    category: 'Sản phẩm',
    tag: 'SẢN PHẨM · 4 phút đọc',
    title: 'nATime ra mắt API tích hợp trực tiếp với phần mềm lương',
    desc: 'Bảng công giờ có thể đẩy thẳng sang hệ thống lương, không cần xuất file trung gian.',
    date: '05.07.2026',
    readTime: '4 phút',
    coverImage: '/blog/api_erp_integration.jpg',
    author: defaultAuthor,
    content: {
      summary: 'Bộ REST API chuẩn OpenAPI của nATime cho phép doanh nghiệp kết nối dữ liệu chấm công thời gian thực với các hệ thống ERP hàng đầu như SAP, Bravo, FAST hay Base.vn.',
      sections: [
        {
          heading: 'Loại bỏ hoàn toàn công đoạn nhập liệu Excel thủ công',
          paragraphs: [
            'Trước đây, phòng nhân sự phải xuất file Excel từ máy chấm công, chỉnh sửa định dạng rồi mới nạp vào phần mềm tính lương. Quá trình này dễ xảy ra lỗi copy/paste và tốn nhiều ngày công vào cuối tháng.',
            'Thông qua nATime Webhook & REST API, dữ liệu công chuẩn hóa được truyền tự động theo thời gian thực hoặc theo lịch định kỳ.',
          ],
          callout: {
            title: 'Hỗ trợ bảo mật cao cấp',
            text: 'Xác thực API bằng JWT Token mã hóa RSA-256, phân quyền chi tiết theo từng Endpoint và ghi vết Audit Log toàn bộ các truy vấn dữ liệu.',
          },
        },
      ],
    },
  },
  {
    slug: 'vi-sao-nen-gan-ma-dinh-danh-xe-nang-tai-san',
    category: 'Trạm cân',
    tag: 'TÀI SẢN · 7 phút đọc',
    title: 'Vì sao nhà máy của bạn nên gắn mã định danh cho từng chiếc xe nâng',
    desc: 'Chi phí bảo trì đột xuất giảm rõ rệt khi lịch bảo trì được nhắc tự động.',
    date: '22.06.2026',
    readTime: '7 phút',
    coverImage: '/blog/forklift_asset_tracking.jpg',
    author: defaultAuthor,
    content: {
      summary: 'Quản lý tài sản công nghiệp bằng mã định danh IoT giúp tối ưu hóa tần suất sử dụng xe nâng, máy móc và giảm thiểu 60% chi phí sửa chữa đột xuất.',
      sections: [
        {
          heading: 'Thực trạng quản lý tài sản cơ giới tại kho bãi',
          paragraphs: [
            'Nhiều nhà máy không theo dõi được số giờ vận hành thực tế của từng xe nâng, dẫn đến tình trạng xe quá hạn bảo dưỡng dầu máy gây hỏng hóc động cơ giữa ca làm việc.',
          ],
        },
        {
          heading: 'Số hóa quản lý vòng đời tài sản',
          paragraphs: [
            'Bằng việc gắn thẻ RFID/QR và liên kết với phân hệ Quản lý tài sản nATime, người vận hành có thể quét mã kiểm tra tình trạng trước ca làm việc và nhận thông báo bảo trì tự động khi đạt số giờ quy định.',
          ],
        },
      ],
    },
  },
  {
    slug: 'doc-nhat-ky-ra-vao-5-dau-hieu-bat-thuong',
    category: 'Vận hành',
    tag: 'VẬN HÀNH · 5 phút đọc',
    title: 'Đọc nhật ký ra vào như một nhà điều tra: 5 dấu hiệu bất thường',
    desc: 'Những mẫu hình lặp lại trong nhật ký ra vào thường là dấu hiệu sớm của rủi ro an ninh.',
    date: '14.06.2026',
    readTime: '5 phút',
    coverImage: '/blog/security_access_logs.jpg',
    author: defaultAuthor,
    content: {
      summary: 'Nhật ký truy cập không chỉ là bảng chấm công mà còn là mỏ dữ liệu quý giá giúp phát hiện sớm các lỗ hổng an ninh nhà máy.',
      sections: [
        {
          heading: '5 mẫu hình rủi ro thường gặp',
          paragraphs: [
            '1. Quẹt thẻ ngoài giờ làm việc không có lệnh tăng ca.',
            '2. Một thẻ quẹt liên tiếp nhiều lần trong khoảng thời gian dưới 10 giây (dấu hiệu quẹt hộ).',
            '3. Quẹt thẻ vào nhưng không có dữ liệu quẹt ra tại cổng tương ứng (vi phạm Anti-passback).',
            '4. Thử mở cửa nhiều lần tại khu vực không có thẩm quyền.',
            '5. Nhân sự đã thôi việc nhưng tài khoản chưa được thu hồi.',
          ],
        },
      ],
    },
  },
  {
    slug: 'chuan-ket-noi-dau-can-dien-tu',
    category: 'Trạm cân',
    tag: 'TRẠM CÂN · 9 phút đọc',
    title: 'Chuẩn kết nối đầu cân điện tử: những gì đội IT nhà máy cần biết',
    desc: 'Hướng dẫn kỹ thuật để tích hợp đầu cân hiện có với hệ thống nATime.',
    date: '02.06.2026',
    readTime: '9 phút',
    coverImage: '/blog/indicator_hardware.jpg',
    author: defaultAuthor,
    content: {
      summary: 'Hướng dẫn chi tiết sơ đồ chân, tốc độ baud rate và cấu hình giao thức truyền thông phổ biến (Kingbird, Yaohua, Mettler Toledo) với nATime IoT Gateway.',
      sections: [
        {
          heading: 'Các chuẩn giao tiếp phổ biến của đầu hiển thị cân',
          paragraphs: [
            'Hầu hết các đầu cân công nghiệp đều trang bị cổng nối tiếp RS-232 hoặc RS-485. nATime cung cấp driver tương thích sẵn với hơn 30 dòng đầu cân thịnh hành trên thị trường.',
          ],
          bullets: [
            'RS-232: Khoảng cách truyền dưới 15m, thích hợp máy tính đặt cạnh đầu cân.',
            'RS-485: Khoảng cách truyền đến 1.200m, chống nhiễu công nghiệp vượt trội.',
            'Ethernet / Modbus TCP: Đồng bộ dữ liệu tốc độ cao trực tiếp vào mạng LAN nhà máy.',
          ],
        },
      ],
    },
  },
];

export function getAllPosts(): BlogPost[] {
  return [featuredPost, ...blogArticles];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
