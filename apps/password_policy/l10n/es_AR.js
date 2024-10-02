OC.L10N.register(
    "password_policy",
    {
    "Password is expired, please use forgot password method to reset" : "La contraseña ha expirado, por favor, use el método de \"olvidé mi contraseña\" para restablecerla.",
    "Password must not have been used recently before." : "La contraseña no debe haber sido utilizada recientemente.",
    "Password is among the 1,000,000 most common ones. Please make it unique." : "Esta contraseña está entre el 1.000.000 de contraseñas más comunes. Por favor, hágala única.",
    "Password is present in compromised password list. Please choose a different password." : "La contraseña está en el listado de contraseñas comprometidas. Por favor seleccione una contraseña diferente.",
    "Password needs to be at least %s characters long." : "La contraseña debe tener al menos %s caracteres.",
    "Password needs to contain at least one numeric character." : "La contraseña debe contener al menos un número.",
    "Password needs to contain at least one special character." : "La contraseña necesita contener al menos un caracter especial.",
    "Password needs to contain at least one lower and one upper case character." : "La contraseña debe contener al menos una minúscula y una mayúscula.",
    "Password policy" : "Política de contraseñas",
    "Allows admins to configure a password policy" : "Permite a los administradores configurar una política de contraseñas.",
    "Allow admin to define certain pre-conditions for password, e.g. enforce a minimum length" : "Permite al administrador definir ciertas condiciones previas para la contraseña, como por ejemplo forzar una longitud mínima.",
    "Minimum password length" : "Longitud mínima de la contraseña.",
    "User password history" : "Historial de contraseñas del usuario.",
    "Number of days until user password expires" : "Número de días hasta que la contraseña del usuario expire.",
    "Number of login attempts before the user account will be disabled until manual action is taken. (0 for no limit)" : "Número de intentos de inicio de sesión antes de que la cuenta de usuario se deshabilite hasta que se tomen medidas manualmente. (0 para sin límite)",
    "Please note, this option is meant to protect attacked accounts. Disabled accounts have to be re-enabled manually by administration. Attackers that try to guess passwords of accounts will have their IP address blocked by the bruteforce protection independent from this setting." : "Por favor, tenga en cuenta que esta opción está diseñada para proteger cuentas bajo ataque. Las cuentas deshabilitadas deben ser habilitadas manualmente por la administración. Se bloquearán las direcciones IP de los atacantes que intenten adivinar las contraseñas de las cuentas por la protección contra fuerza bruta, independientemente de esta configuración.",
    "Forbid common passwords" : "Restringir contraseñas comunes",
    "Enforce upper and lower case characters" : "Imponer caracteres en mayúsculas y minúsculas",
    "Enforce numeric characters" : "Imponer caracteres numéricos",
    "Enforce special characters" : "Imponer caracteres especiales",
    "Check password against the list of breached passwords from haveibeenpwned.com" : "Verifica la contraseña contra la lista de contraseñas comprometidas de haveibeenpwned.com",
    "This check creates a hash of the password and sends the first 5 characters of this hash to the haveibeenpwned.com API to retrieve a list of all hashes that start with those. Then it checks on the Nextcloud instance if the password hash is in the result set." : "Esta comprobación crea un hash de las contraseñas y envía los 5 primeros caracteres de este hash a la API de haveibeenpwned.com para recuperar una lista de todos los hashes que comienzan de esa forma. Después se comprueba en la instancia de Nextcloud si el hash de la contraseña está en el conjunto de resultados.",
    "Unknown error" : "Error desconocido",
    "Minimal length has to be a non negative number" : "La longitud mínima debe ser un número no negativo",
    "History size has to be a non negative number" : "El tamaño del historial debe ser un número no negativo",
    "Expiration days have to be a non negative number" : "Los días de caducidad deben ser ser un número no negativo",
    "Maximum login attempts have to be a non negative number" : "El número máximo de intentos de inicio de sesión debe ser un número no negativo",
    "Settings saved" : "Configuraciones guardadas",
    "Error while saving settings" : "Error al guardar la configuración",
    "Please note, that this option is meant to protect attacked accounts. Disabled accounts have to be re-enabled manually by administration. Attackers that try to guess passwords of accounts will have their IP address blocked by the bruteforce protection independent from this setting." : "Por favor, tenga en cuenta que esta opción está diseñada para proteger cuentas bajo ataque. Las cuentas deshabilitadas deben ser habilitadas manualmente por la administración. Se bloquearán las direcciones IP de los atacantes que intenten adivinar las contraseñas de las cuentas por la protección contra fuerza bruta, independientemente de esta configuración."
},
"nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;");
