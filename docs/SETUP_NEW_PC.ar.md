# تشغيل AIOLOGY Motion Studio على جهاز تاني (ويندوز)

الدليل ده بيوصّلك من جهاز فاضي لحد ما تفتح الاستوديو وتطلّع فيديو. كل خطوة فيه اتجرّبت على نسخة جديدة اتعملها clone من GitHub، إلا الخطوة الاختيارية الأخيرة (Codex) واللي مكتوب جنبها إنها ما اتجرّبتش.

## 1) اللي لازم يتنزّل مرة واحدة

| البرنامج | ليه | التحقق |
| --- | --- | --- |
| **Git** من [git-scm.com](https://git-scm.com) | عشان تنزّل المشروع | `git --version` |
| **Node.js LTS** من [nodejs.org](https://nodejs.org) (يفضّل 24، والحد الأدنى 22.20) | بيشغّل المشروع | `node -v` |
| **FFmpeg** (لازم `ffmpeg` و`ffprobe` يبقوا في PATH) | فحص الفيديو والصوت | `ffmpeg -version` و`ffprobe -version` |
| PowerShell 7 (اختياري) | بس لأمر تثبيت الـ Skill | `pwsh -v` |

بعد التثبيت اقفل الطرفية (Terminal) وافتح واحدة جديدة، عشان الـ PATH يتحدّث.

## 2) تنزيل المشروع وتثبيته

**مهم:** نزّله في مسار قصير زي `C:\AIOLOGY`. ويندوز مبيقبلش مسار أطول من 260 حرف، ولو المشروع في مسار طويل المتصفّح اللي بيرندر مش هيشتغل (شوف "حل المشاكل").

```powershell
git clone https://github.com/taherfarg/aiology-motion-studio.git C:\AIOLOGY
cd C:\AIOLOGY\aiology-motion-studio
npm ci
npx remotion browser ensure
npm run check
```

- `npm ci` بينزّل الإصدارات المثبّتة بالظبط (حوالي 15 ثانية بعد ما الإنترنت يكون شغال). متستخدمش `npm install` ولا `npm update`.
- `npx remotion browser ensure` بينزّل المتصفّح اللي بيرندر منه Remotion (مرة واحدة).
- `npm run check` بيفحص TypeScript والـ lint والاختبارات. المفروض يخلص بـ **16 اختبار ناجح**.

كل الأوامر اللي جاية بتتشغّل من جوه المجلد `aiology-motion-studio`.

## 3) افتح الاستوديو وشوف الفيديو

```powershell
npm run dev
```

افتح العنوان اللي بيظهر في الطرفية (غالبًا `http://localhost:3000`) واختار **Episode001Premium** من القايمة اللي على الشمال. لو بورت 3000 مشغول Remotion بيختار أول بورت فاضي (مثلًا 3002) ويكتب العنوان في الطرفية، فاستخدم العنوان اللي مكتوب.

## 4) اطلع الفيديو (Render)

```powershell
npm run render:episode-001-premium
```

- بيعمل مجلد `output\episode-001\` ويحط فيه `aiology-episode-001-premium-v6.mp4` (حوالي 7.6 ميجا، 1080×1920، 30 إطار/ثانية، فيه صوت).
- قاعدة المشروع: **متستبدلش تصدير قديم**. لو عايز نسخة تانية غيّر اسم الملف:

```powershell
npx remotion render src/index.ts Episode001Premium output/episode-001/aiology-episode-001-premium-v7.mp4 --codec=h264 --audio-codec=aac --crf=16 --pixel-format=yuv420p
```

افحص أي فيديو طالع:

```powershell
npm run export:check -- output/episode-001/aiology-episode-001-premium-v7.mp4
```

(للفيديوهات الصامتة زي النسخة القديمة v5 زوّد `--silent-preview` في الآخر.) نسخ جاهزة للمعاينة من غير رندر موجودة في `examples\episode-001\`.

## 5) أوامر مفيدة

```powershell
npm run sound:generate                                # يعيد توليد المؤثرات والموسيقى (النتيجة مطابقة للي على GitHub)
npm run episode:new -- episode-002-topic              # حلقة جديدة (مسودة)
npm run episode:validate -- episode-002-topic --draft # فحص المسودة
```

الحلقة الجديدة بتتعمل في `episodes\episode-002-topic\`. أضف السكريبت والتسجيل الصوتي الأصلي بتاعك، وكمّل الـ storyboard و`episode.json` حسب [دليل الإنتاج](REUSE_GUIDE.md). المشروع مبيولّدش أي صوت تعليق بالذكاء الاصطناعي: التعليق الصوتي لازم يكون تسجيلك أنت.

## 6) اختياري: Skill بتاع Codex (ويندوز) — ما اتجرّبش على النسخة الجديدة

لو بتستخدم Codex وعايز الـ Skill `$aiology-motion-studio` يبقى متاح (محتاج PowerShell 7):

```powershell
npm run skill:install
npx -y skills@latest add remotion-dev/skills -g -y -a codex
```

بعدها افتح محادثة جديدة. التفاصيل في [REUSE_GUIDE.md](REUSE_GUIDE.md).

## حل المشاكل

| المشكلة | السبب والحل |
| --- | --- |
| `Failed to launch the browser process` و`spawn ...chrome-headless-shell.exe ENOENT` | المسار أطول من 260 حرف. انقل المشروع لمسار قصير زي `C:\AIOLOGY` وأعد `npm ci` و`npx remotion browser ensure`. |
| تحذير `EBADENGINE ... required: node >=22.20.0` | نسخة Node عندك أقدم. المشروع اشتغل معايا بيها، لكن نزّل Node 24 LTS عشان تتفادى أي مشاكل. |
| `ffmpeg` أو `ffprobe` مش معروف | FFmpeg مش في PATH. أضفه، واقفل الطرفية وافتحها من جديد، وجرّب `ffmpeg -version`. |
| بورت 3000 مشغول | عادي. Remotion بيختار بورت تاني وبيكتبه في الطرفية. |
| `sha256sum --check` بيطلّع أخطاء فيها `\r` (لو بتستخدم Git Bash) | ملف `SHA256SUMS.txt` كان بينزل بنهايات سطور ويندوز. اتصلّح في آخر نسخة بـ `.gitattributes`، اعمل `git pull` أو clone جديد. |

## اللي مش على GitHub

مجلد `aiology-motion-studio\output\` (النسخ القديمة وأدلة المراجعة) مش بيترفع عن قصد (حجمه حوالي 117 ميجا وهو مُتجاهَل في `.gitignore`)، وبيتعمل من جديد أول ما ترندر. لو محتاج النسخ القديمة على الجهاز التاني انسخها يدوي أو من Release على GitHub لو اتعمل.
