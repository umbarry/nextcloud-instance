OC.L10N.register(
    "files_versions",
    {
    "Versions" : "Версии",
    "This application automatically maintains older versions of files that are changed." : "Приложение служит для обработки старых версий изменённых файлов.",
    "Name this version" : "Обозначить версию",
    "Edit version name" : "Изменить название версии",
    "Compare to current version" : "Сравнить с текущей версией",
    "Restore version" : "Востановить версию",
    "Download version" : "Скачать версию",
    "Delete version" : "Удалить версию",
    "Current version" : "Текущая версия",
    "Initial version" : "Первоначальная версия",
    "Version name" : "Название версии",
    "Named versions are persisted, and excluded from automatic cleanups when your storage quota is full." : "Именованные версии исключены из автоматического удаления старых версий файлов при исчерпании квоты дискового пространства.",
    "Remove version name" : "Удалить название версии",
    "Save version name" : "Сохранить название версии",
    "Initial version restored" : "Восстановлена первоначальная версия",
    "Version restored" : "Версия восстановлена",
    "Could not restore version" : "Не удалось восстановить версию",
    "Could not delete version" : "Не удалось удалить версию",
    "${version.label} restored" : "Восстановлена версия «${version.label}»",
    "This application automatically maintains older versions of files that are changed. When enabled, a hidden versions folder is provisioned in every user's directory and is used to store old file versions. A user can revert to an older version through the web interface at any time, with the replaced file becoming a version. The app automatically manages the versions folder to ensure the user does not run out of Quota because of versions.\n\t\tIn addition to the expiry of versions, the versions app makes certain never to use more than 50% of the user's currently available free space. If stored versions exceed this limit, the app will delete the oldest versions first until it meets this limit. More information is available in the Versions documentation." : "Это приложение предназначено для автоматического управления предыдущими версиями изменённых файлов. При включении этого приложения в каталогах пользователей создаются скрытые папки, предназначенные для хранения предыдущих версий изменённых файлов. Выбор нужной предыдущей версии и возврат к ней выполняется через веб-интерфейс, при этом актуальная версия файла будет заменена выбранной версией. Приложение также автоматически управляет глубиной хранения версий файлов, чтобы не превышать выделенные для пользователя квоты.\n\t\tПомимо управления сроком хранения предыдущих версий, приложение следит за тем, что бы общий размер сохранённых версий файлов не превышал 50% выделенного пользователю дискового пространства. При превышении такого лимита будет запущен механизм удаления самых старых версий файлов. Удаление будет производиться до тех пор, пока общий размер всех сохранённых версий файлов вновь не станет менее 50% от квоты использования дискового пространства. Дополнительная информация приведена в руководстве к приложению «Версии»."
},
"nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);");
