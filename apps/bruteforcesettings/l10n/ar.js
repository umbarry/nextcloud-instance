OC.L10N.register(
    "bruteforcesettings",
    {
    "Brute-force settings" : "إعدادات كاشف هجمات القوة الكاسحة Brute-force",
    "Whitelist IPs" : "القائمة البيضاء لعناوين IP",
    "Brute-force protection is meant to protect Nextcloud servers from attempts to\nguess account passwords in various ways. Besides the obvious \"*let's try a big\nlist of commonly used passwords*\" attack, it also makes it harder to use\nslightly more sophisticated attacks via the reset password form or trying to\nfind app password tokens.\n\nIf triggered, brute-force protection makes requests coming from an IP on a\nbrute-force protected controller with the same API slower for a 24 hour period.\n\nWith this app, the admin can exempt an IP address or range from this\nprotection which can be useful for testing purposes or when there are false\npositives due to a lot of accounts on one IP address." : "تهدف3\nBrute-force protection  إلى حماية خوادم Nextcloud من محاولات\nتخمين كلمات مرور الحساب بطرق مختلفة. إلى جانب ما هو واضح \"* فلنحاول بشكل كبير\nهجوم قائمة كلمات المرور شائعة الاستخدام*\"، كما أنه يزيد من صعوبة استخدامها\nهجمات أكثر تعقيدًا قليلاً عبر نموذج إعادة تعيين كلمة المرور أو محاولة القيام بذلك\nالعثور على الرموز المميزة لكلمة مرور التطبيق.\n\nإذا تم تشغيلها، فإن حماية القوة الغاشمة تقدم طلبات قادمة من عنوان IP على ملف\nوحدة التحكم المحمية من القوة الغاشمة بنفس واجهة برمجة التطبيقات (API) أبطأ لمدة 24 ساعة.\n\nباستخدام هذا التطبيق، يمكن للمسؤول استثناء عنوان IP أو النطاق من هذا\nالحماية التي يمكن أن تكون مفيدة لأغراض الاختبار أو عندما يكون هناك خطأ\nالإيجابيات بسبب وجود الكثير من الحسابات على عنوان IP واحد.",
    "Brute-force IP whitelist" : "القائمة البيضاء لعناوين IP للقوة الكاسحة Brute-force",
    "To whitelist IP ranges from the brute-force protection specify them below. Note that any whitelisted IP can perform authentication attempts without any throttling. For security reasons, it is recommended to whitelist as few hosts as possible or ideally even none at all." : "لإدراج نطاقات IP في القائمة البيضاء للحماية من هجمات القوة الكاسحة. حددها أدناه. لاحظ أن أي عنوان IP مدرج في القائمة البيضاء مسموحٌ له بمحاولة المصادقة دون أي تقييد. لأسباب أمنية، يُوصى بإدراج أقل عددٍ ممكنٍ من المضيفين في القائمة البيضاء، أو لا شيء على الإطلاق من الناحية المثالية.",
    "Add a new whitelist" : "إضِف قائمة بيضاء جديدة",
    "IP address" : "عنوان IP",
    "Mask" : "القناع",
    "Add" : "إضافة",
    "Your remote address was identified as \"{remoteAddress}\" and is throttled at the moment by {delay}ms." : "تم تحديد عنوانك القَصِيّ على أنه \"{remoteAddress}\" و يتم التحكم فيه حاليًا بمقدار {delay} مللي ثانية.",
    "Your remote address was identified as \"{remoteAddress}\" and is bypassing brute-force protection." : "تمّ التعرُّف على عنونك البعيد كـ \"{remoteAddress}\" و قد تمّ تمكينه من تخطِّي حاجز \"مكافحة هجمات القوة الكاسحة\".",
    "Your remote address was identified as \"{remoteAddress}\" and is not actively throttled at the moment." : "تم تحديد عنوانك القَصِيّ على أنه \"{remoteAddress}\" و لا يتم التحكم فيه بشكل نشط في الوقت الحالي.",
    "There was an error adding the IP to the whitelist." : "حدث خطأ أثناء إضافة عنوان الـ IP إلى القائمة البيضاء",
    "Delete entry for {subnet}" : "حذف مدخل لـ {subnet}.",
    "Add new whitelist" : "إضافة إلى القائمة البيضاء"
},
"nplurals=6; plural=n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 && n%100<=99 ? 4 : 5;");
