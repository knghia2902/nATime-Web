const APK_URL = 'https://download.natime.vn/android/1.0.0/app-release.apk';
const APK_SHA256 = 'BECE71967FCB1846EA2B65C973194B7F6C859806233BFE655BCD13ADE541175F';

export default function MobilePreviewDownload({ locale }: { locale: 'vi' | 'en' }) {
  const vi = locale === 'vi';

  return (
    <article className="mt-6 rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 backdrop-blur">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-white/70">Android</p>
            <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-400">
              {vi ? 'Bản thử nghiệm' : 'Preview build'}
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-white">nATime Mobile 1.0.0</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            {vi
              ? 'APK ký số dùng để kiểm thử trước khi phát hành Google Play. Android 7.0 trở lên; cài đặt thủ công trên thiết bị thử nghiệm.'
              : 'Signed APK for testing before the Google Play release. Requires Android 7.0 or later and manual installation on a test device.'}
          </p>
        </div>
        <a
          href={APK_URL}
          className="h-fit shrink-0 rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0a1628] hover:bg-white/85 transition-all shadow-[0_2px_12px_rgba(255,255,255,0.15)] cursor-pointer"
        >
          {vi ? 'Tải APK thử nghiệm' : 'Download preview APK'}
        </a>
      </div>
      <dl className="mt-5 grid gap-3 border-t border-white/[0.08] pt-5 text-xs text-white/60 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-white">{vi ? 'Tệp' : 'File'}</dt>
          <dd className="mt-1 text-white/70 font-mono">app-release.apk · 6.68 MB</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">SHA-256</dt>
          <dd className="mt-1 break-all font-mono text-white/70">{APK_SHA256}</dd>
        </div>
      </dl>
    </article>
  );
}
