const APK_URL = 'https://download.natime.vn/android/1.0.0/app-release.apk';
const APK_SHA256 = 'BECE71967FCB1846EA2B65C973194B7F6C859806233BFE655BCD13ADE541175F';

export default function MobilePreviewDownload({ locale }: { locale: 'vi' | 'en' }) {
  const vi = locale === 'vi';

  return (
    <article className="mt-6 rounded-xl border border-blue-200 bg-blue-50/70 p-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-blue-700">Android</p>
            <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
              {vi ? 'Bản thử nghiệm' : 'Preview build'}
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">nATime Mobile 1.0.0</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {vi
              ? 'APK ký số dùng để kiểm thử trước khi phát hành Google Play. Android 7.0 trở lên; cài đặt thủ công trên thiết bị thử nghiệm.'
              : 'Signed APK for testing before the Google Play release. Requires Android 7.0 or later and manual installation on a test device.'}
          </p>
        </div>
        <a
          href={APK_URL}
          className="h-fit shrink-0 rounded-md bg-blue-700 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800"
        >
          {vi ? 'Tải APK thử nghiệm' : 'Download preview APK'}
        </a>
      </div>
      <dl className="mt-5 grid gap-3 border-t border-blue-200 pt-5 text-xs text-slate-600 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-900">{vi ? 'Tệp' : 'File'}</dt>
          <dd className="mt-1">app-release.apk · 6.68 MB</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">SHA-256</dt>
          <dd className="mt-1 break-all font-mono">{APK_SHA256}</dd>
        </div>
      </dl>
    </article>
  );
}
