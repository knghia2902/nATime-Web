const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=vn.natime.mobile';
const APK_URL = 'https://download.natime.vn/android/1.0.1/app-release.apk';

export default function MobilePreviewDownload({ locale }: { locale: 'vi' | 'en' }) {
  const vi = locale === 'vi';

  return (
    <article className="mt-6 rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 backdrop-blur">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-white/70">Android</p>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
              {vi ? 'Bản chính thức' : 'Official release'}
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-white">nATime Mobile 1.0.1</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            {vi
              ? 'Ứng dụng chấm công và tra cứu tài sản chính thức của nATime trên Google Play Store (Android 7.0 trở lên). Bạn cũng có thể tải file APK cài đặt trực tiếp cho các thiết bị nội bộ.'
              : 'Official attendance and asset tracking application on Google Play Store (Android 7.0+). You can also download the standalone APK for local deployment.'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-fit rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0a1628] hover:bg-white/85 transition-all shadow-[0_2px_12px_rgba(255,255,255,0.15)] cursor-pointer flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.03 2.03 0 0 1-.225-.972V2.786c0-.36.08-.693.224-.972zm11.235 11.238L5.795 22.096l10.222-5.901-1.173-3.143zm0-2.104l1.173-3.143L6.145 1.905l8.699 9.043zm2.234 1.052l3.415 1.972a1.35 1.35 0 0 1 0 2.336l-3.415 1.972-1.576-1.576 1.576-2.704z" />
            </svg>
            {vi ? 'Cài đặt từ Google Play' : 'Get it on Google Play'}
          </a>
          <a
            href={APK_URL}
            className="h-fit rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white/90 hover:bg-white/10 transition-all cursor-pointer"
          >
            {vi ? 'Tải APK trực tiếp' : 'Download APK'}
          </a>
        </div>
      </div>
      
      <dl className="mt-5 grid gap-3 border-t border-white/[0.08] pt-5 text-xs text-white/60 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-white">{vi ? 'Phát hành qua Google Play' : 'Google Play Package'}</dt>
          <dd className="mt-1 text-sky-400 font-mono">vn.natime.mobile</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">{vi ? 'Phiên bản' : 'Version'}</dt>
          <dd className="mt-1 text-white/70 font-mono">1.0.1 (Android 7.0+)</dd>
        </div>
      </dl>
    </article>
  );
}
