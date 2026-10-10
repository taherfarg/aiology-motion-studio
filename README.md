# AIOLOGY Motion Studio

استوديو Remotion لإنتاج فيديوهات تعليمية عن الذكاء الاصطناعي بالعربية المصرية، بخلفية بيضاء وحركة توضح الفكرة، ومكونات قابلة لإعادة الاستخدام.

المشروع الكامل موجود في [`aiology-motion-studio/`](aiology-motion-studio/). الحلقة الأولى لها تجربة صامتة محسّنة مدتها **52 ثانية، 1080×1920، 30 FPS**. توقيتها مؤقت؛ النسخة المصحوبة بصوت تُضبط على تسجيل صاحب القناة.

[الفيديو الجديد (Premium v6 مع تصميم صوتي)](aiology-motion-studio/examples/episode-001/aiology-episode-001-premium-v6.mp4) · [الفيديو الصامت المحسّن](aiology-motion-studio/examples/episode-001/aiology-episode-001-director-v5.mp4) · [الإصدارات والملفات القابلة للتحميل](https://github.com/taherfarg/aiology-motion-studio/releases) · [دليل الاستخدام](docs/REUSE_GUIDE.md)

## التشغيل

المتطلبات: Node.js LTS متوافق مع `>=22.20.0`، وGit، وFFmpeg/FFprobe. النسخة المستخدمة في التحقق هي Node **24.21.0**. PowerShell 7 مطلوب لأوامر تثبيت الـ Skill على Windows؛ تشغيل npm مباشرة متاح أيضًا.

```powershell
git clone https://github.com/taherfarg/aiology-motion-studio.git AIOLOGY
cd AIOLOGY/aiology-motion-studio
npm ci
npx remotion browser ensure
npm run check
npm run dev
```

افتح عنوان Remotion الذي يظهر في الطرفية، واختَر **Episode001DirectorCut**. لعمل تصدير جديد:

```powershell
npm run render:episode-001-director
npm run export:check -- output/episode-001/aiology-episode-001-director-v5.mp4 --silent-preview
```

المجلد `output/` لا يأتي مع Git؛ أول تصدير ينشئه. التصدير يرفض استبدال ملف موجود؛ غيّر اسم الملف عند إعادة التصدير. الفيديو المرفق للمعاينة موجود في `examples/episode-001/`.

## المحتويات

- كود React/TypeScript/Remotion، ومكتبة النصوص العربية والرسوم والحركة.
- الحلقة الأولى: النص، storyboard، توقيت التجربة، الكابشن، وملاحظات المراجعة.
- هوية AIOLOGY وقواعد الحركة والصوت والجودة والتصدير.
- Skill دائم في `.agents/skills/aiology-motion-studio/` داخل مجلد المشروع.
- قوالب وأوامر إنشاء الحلقات والتحقق والمعاينة والتصدير، وlockfile للإصدارات.
- خطوط Cairo المحلية وترخيصها، والفيديو المحسّن وصورة مراجعة المشاهد.
- GitHub Actions لفحص TypeScript وlint والاختبارات وتجميع المشروع.

## حلقة جديدة

```powershell
npm run episode:new -- episode-002-topic
npm run episode:validate -- episode-002-topic --draft
```

أضف النص وتسجيلك الأصلي في مجلد الحلقة، ثم أكمل الأهداف وstoryboard و`episode.json` حسب [دليل الإنتاج](aiology-motion-studio/.agents/skills/aiology-motion-studio/references/workflow.md). قبل تصدير الحلقة النهائية، يلزم تسجيل حقيقي وتوقيت تمت مراجعته؛ النظام يحتفظ بهذا الشرط. لا توجد أصوات مولّدة أو خدمات TTS.

## استخدام Codex بعد ذلك

افتح **مجلد `aiology-motion-studio` الداخلي** كمشروع في Codex؛ فيه AGENTS.md والـ Skill الأصلي. على Windows:

```powershell
npm run skill:install
npx -y skills@latest add remotion-dev/skills -g -y -a codex
npm run verify
```

ابدأ محادثة جديدة واختَر `$aiology-motion-studio`. مثبّت الـ Skill يحافظ على مصدر واحد بواسطة junction، ويرفض استبدال Skill مختلف موجود بالفعل. راجع [تعليمات النقل والتشغيل](docs/REUSE_GUIDE.md) إذا غيّرت مكان المشروع.

## المراجعة والتراخيص

[مراجعة النسخة المحسّنة](aiology-motion-studio/episodes/episode-001/DIRECTOR_REVIEW.md) تسجل العيوب التي صُححت والفحوص الفعلية. [تقرير الإعداد](aiology-motion-studio/SETUP_REPORT.md) سجل تاريخي لمرحلة التأسيس، وليس وصفًا لحالة الحلقة الحالية.

المشروع يستخدم `UNLICENSED` للمحتوى الأصلي؛ لم يُضَف ترخيص مفتوح جديد. Cairo مرخص وفق SIL OFL، واعتماديات الطرف الثالث لها تراخيصها الخاصة. `private: true` في package.json يمنع نشر حزمة npm بالخطأ؛ المستودع على GitHub عام حسب اختيار صاحب المشروع.
