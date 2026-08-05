export default function Features() {
  const stats = [
    { value: '120+', label: 'nh\u00e0 m\u00e1y \u0111ang v\u1eadn h\u00e0nh tr\u00ean nATime' },
    { value: '99.9%', label: 'th\u1eddi gian ho\u1ea1t \u0111\u1ed9ng h\u1ec7 th\u1ed1ng' },
    { value: '<200ms', label: '\u0111\u1ed9 tr\u1ec5 ghi nh\u1eadn s\u1ef1 ki\u1ec7n' },
    { value: '24/7', label: 'gi\u00e1m s\u00e1t v\u00e0 h\u1ed7 tr\u1ee3 k\u1ef9 thu\u1eadt' },
  ];

  const modules = [
    {
      num: '01',
      title: 'Ch\u1ea5m c\u00f4ng',
      desc: 'Ghi nh\u1eadn gi\u1edd v\u00e0o/ra b\u1eb1ng v\u00e2n tay, khu\u00f4n m\u1eb7t ho\u1eb7c th\u1ebb t\u1eeb. T\u1ef1 \u0111\u1ed9ng t\u00ednh c\u00f4ng, t\u0103ng ca v\u00e0 ngh\u1ec9 ph\u00e9p \u2014 kh\u00f4ng c\u1ea7n \u0111\u1ed1i so\u00e1t tay.',
    },
    {
      num: '02',
      title: 'Ki\u1ec3m so\u00e1t ra v\u00e0o',
      desc: 'Ph\u00e2n quy\u1ec1n c\u1eeda v\u00e0 khu v\u1ef1c theo t\u1eebng nh\u00e2n s\u1ef1, nh\u00e0 th\u1ea7u ho\u1eb7c kh\u00e1ch. Nh\u1eadt k\u00fd ra v\u00e0o ghi nh\u1eadn t\u1ee9c th\u00ec, tra c\u1ee9u theo th\u1eddi gian th\u1ef1c.',
    },
    {
      num: '03',
      title: 'Tr\u1ea1m c\u00e2n',
      desc: 'K\u1ebft n\u1ed1i tr\u1ef1c ti\u1ebfp \u0111\u1ea7u c\u00e2n \u0111i\u1ec7n t\u1eed. \u0110\u1ed1i chi\u1ebfu phi\u1ebfu c\u00e2n t\u1ef1 \u0111\u1ed9ng, ph\u00e1t hi\u1ec7n sai l\u1ec7ch kh\u1ed1i l\u01b0\u1ee3ng ngay t\u1ea1i c\u1ed5ng.',
    },
    {
      num: '04',
      title: 'Qu\u1ea3n l\u00fd t\u00e0i s\u1ea3n',
      desc: 'G\u1eafn m\u00e3 \u0111\u1ecbnh danh cho t\u1eebng thi\u1ebft b\u1ecb. Theo d\u00f5i v\u1ecb tr\u00ed, l\u1ecbch b\u1ea3o tr\u00ec v\u00e0 kh\u1ea5u hao theo th\u1eddi gian th\u1ef1c.',
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
        <p className="font-mono text-[12px] text-teal tracking-wide mb-3">B\u1ed0N MODULE</p>
        <h2 className="font-display font-bold text-[28px] md:text-[34px] text-ink max-w-lg mb-12">
          T\u1eebng module v\u1eadn h\u00e0nh \u0111\u1ed9c l\u1eadp, d\u1eef li\u1ec7u lu\u00f4n \u0111\u1ed3ng b\u1ed9.
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
