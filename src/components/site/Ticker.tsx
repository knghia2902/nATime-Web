export default function Ticker() {
  const items = [
    '07:58:12 \u00b7 CH\u1ea4M C\u00d4NG \u00b7 NV-0482 v\u00e0o ca \u2014 X\u01b0\u1edfng 2',
    '07:58:47 \u00b7 KI\u1ec2M SO\u00c1T RA V\u00c0O \u00b7 C\u1ed5ng B m\u1edf \u2014 Nh\u00e0 th\u1ea7u #114',
    '07:59:03 \u00b7 TR\u1ea0M C\u00c2N \u00b7 Xe 51C-224.19 \u2014 18.420 kg',
    '07:59:20 \u00b7 T\u00c0I S\u1ea2N \u00b7 Xe n\u00e2ng FL-07 \u2014 b\u1ea3o tr\u00ec c\u00f2n 3 ng\u00e0y',
  ];

  return (
    <div className="bg-graphite text-amber font-mono text-[12px] overflow-hidden border-b border-white/10">
      <div className="ticker-track py-1.5">
        <div className="flex shrink-0">
          {items.map((item, i) => (
            <span key={i}>
              <span className="px-6 whitespace-nowrap">{item}</span>
              <span className="px-6 whitespace-nowrap text-white/30">/</span>
            </span>
          ))}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {items.map((item, i) => (
            <span key={i}>
              <span className="px-6 whitespace-nowrap">{item}</span>
              <span className="px-6 whitespace-nowrap text-white/30">/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
