  
  
  document.addEventListener('DOMContentLoaded', () => {
    // تحديد الصفحة الحالية
    const isSettingsPage = window.location.pathname.includes('settings.html');
    const isVerifyPage = window.location.pathname.includes('verify.html');
    const isIndexPage = !isSettingsPage && !isVerifyPage;

    // زر "عودة" داخل مودال الإعدادات
    const returnFromSettingsBtn = document.getElementById("return-from-settings");
    if (returnFromSettingsBtn) {
        returnFromSettingsBtn.addEventListener("click", () => {
            document.getElementById("pin-modal-settings").style.display = "none";
            localStorage.setItem('isPinVerified', 'false'); // إلغاء التحقق عند العودة
        });
    }

    // زر "عودة" داخل مودال إلغاء الحماية
    const returnFromDeactivateBtn = document.getElementById("return-from-deactivate");
    if (returnFromDeactivateBtn) {
        returnFromDeactivateBtn.addEventListener("click", () => {
            document.getElementById("pin-modal-index").style.display = "none";
            localStorage.setItem('isPinVerified', 'false'); // إلغاء التحقق عند العودة
        });
    }

    // ✅ مراقبة خروج المستخدم من التطبيق
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // المستخدم خرج من التطبيق
            localStorage.setItem('protectionPaused', 'true');
            localStorage.setItem('isPinVerified', 'false'); // إعادة ضبط التحقق
        } else {
            // رجع للتطبيق
            const wasPaused = localStorage.getItem('protectionPaused') === 'true';
            const isVerified = localStorage.getItem('isPinVerified') === 'true';

            if (wasPaused && !isVerified) {
                localStorage.setItem('protectionPaused', 'false');
				
                const modal = document.getElementById('pin-modal-index');
                if (modal) {
                    modal.style.display = 'flex'; // عرض مودال كلمة السر
                }
            }
        }
    });


  
  const defaultSounds = {
    'alert.mp3': 'assets/alert.mp3',
    'alert2.mp3': 'assets/alert2.mp3',
    'alert3.mp3': 'assets/alert3.mp3'
};

  
  
  
  
    // Localization strings for multiple languages.
    const translations = {
        'en': {
            'h1_settings': 'Personal Protection Settings',
            'p_settings': 'Motion Protection System',
            'h3_account': 'Account Settings',
            'label_name': 'Name:',
            'placeholder_name': 'Enter your name',
            'label_mobile': 'Mobile Number:',
            'placeholder_mobile': 'Enter mobile number',
            'h3_pin': 'Set PIN',
            'label_new_pin': 'New PIN:',
            'placeholder_new_pin': 'Enter PIN',
            'label_confirm_pin': 'Confirm PIN:',
            'placeholder_confirm_pin': 'Re-enter PIN',
            'h3_sound': 'Alert Sound Settings',
            'label_sound_select': 'Choose an alert sound:',
            'option_sound1': 'Alert 1',
            'option_sound2': 'Alert 2',
            'option_sound3': 'Alert 3',
            'option_custom': 'Custom Sound',
            'label_sound_file': 'Upload custom sound file:',
            'save_btn': 'Save Settings',
            'h1_index': 'Motion Protection System',
            'p_index': 'Your personal safety companion',
            'status_inactive': 'Protection is Inactive',
            'status_active': '✅ Protection is Active...',
            'status_arming': '⏳ Arming Protection...',
            'status_ready': '⚡ Protection is Ready. First motion will trigger alert!',
            'label_sound_index': 'Alert Sound:',
            'h4_sensitivity': 'Motion Sensitivity',
            'label_x': 'Axis X:',
            'label_y': 'Axis Y:',
            'label_z': 'Axis Z:',
            'activate_btn': 'Activate Protection',
            'deactivate_btn': 'Deactivate Protection',
            'settings_btn': 'Settings',
            'modal_pin_title': 'Enter PIN',
            'modal_pin_placeholder': 'PIN',
            'modal_pin_submit': 'OK',
            'modal_pin_forgot': 'Forgot PIN?',
            'modal_message_ok': 'OK',
            'h1_verify': 'Forgot PIN?',
            'p_verify': 'Please enter the registered mobile number and name to verify.',
            'label_recovery_mobile': 'Mobile Number:',
            'placeholder_recovery_mobile': 'Enter mobile number',
            'verify_btn': 'Verify',
            'h3_reset_pin': 'Reset PIN',
            'label_new_pin_recovery': 'New PIN:',
            'placeholder_new_pin_recovery': 'Enter new PIN',
            'label_confirm_pin_recovery': 'Confirm PIN:',
            'placeholder_confirm_pin_recovery': 'Re-enter PIN',
            'save_new_pin_btn': 'Save New PIN',
            'back_btn': 'Back',
            'select_language': 'Select Language:',
            'option_ar': 'Arabic',
            'option_en': 'English',
            'option_fr': 'French',
            'option_de': 'German',
            'option_es': 'Spanish',
            'option_it': 'Italian',
            'option_zh': 'Chinese',
            'option_hi': 'Hindi',
            'label_recovery_username': 'Name:',
            'placeholder_recovery_username': 'Enter your name',
            'custom_sound_success': 'Custom sound file uploaded successfully!',
            'settings_saved': 'Settings saved successfully. Redirecting to home page.',
            'pin_mismatch': 'PINs do not match. Please re-enter.',
            'pin_length_error': 'PIN must be at least 4 characters or numbers long.',
            'fill_all_fields': 'Please fill in all required fields.',
            'initial_setup': 'Please set up your security settings first.',
            'incorrect_pin': 'Incorrect PIN!',
            'deactivation_success': 'Protection deactivated successfully!',
            'verification_success': 'Verification successful!',
            'verification_error': 'Incorrect data. Please try again.',
            'pin_save_success': 'New PIN saved successfully. Redirecting to home page.',
            'motion_detected': 'Motion Detected!',
            'visibility_alert': 'App closed or screen locked. Triggering alarm!',
            'manual_deactivation': 'Please enter your PIN to deactivate.',
            'auto_deactivation': 'First motion detected. Please enter your PIN to deactivate.'
        },
        'ar': {
            'h1_settings': 'إعدادات الحماية الشخصية',
            'p_settings': 'نظام الحماية ضد الحركة',
            'h3_account': 'إعدادات الحساب',
            'label_name': 'الاسم:',
            'placeholder_name': 'أدخل اسمك',
            'label_mobile': 'رقم الموبايل:',
            'placeholder_mobile': 'أدخل رقم الموبايل',
            'h3_pin': 'إعداد كلمة السر',
            'label_new_pin': 'كلمة السر الجديدة:',
            'placeholder_new_pin': 'أدخل كلمة السر',
            'label_confirm_pin': 'إعادة إدخال كلمة السر:',
            'placeholder_confirm_pin': 'أعد إدخال كلمة السر',
            'h3_sound': 'إعدادات صوت التنبيه',
            'label_sound_select': 'اختر صوت التنبيه:',
            'option_sound1': 'تنبيه 1',
            'option_sound2': 'تنبيه 2',
            'option_sound3': 'تنبيه 3',
            'option_custom': 'صوت مخصص',
            'label_sound_file': 'رفع ملف صوتي مخصص:',
            'save_btn': 'حفظ الإعدادات',
            'h1_index': 'نظام الحماية ضد الحركة',
            'p_index': 'رفيقك في الأمان الشخصي',
            'status_inactive': 'الحماية متوقفة',
            'status_active': '✅ الحماية مفعلة...',
            'status_arming': '⏳ جارٍ تفعيل الحماية...',
            'status_ready': '⚡ الحماية جاهزة. أول حركة ستطلق التنبيه!',
            'label_sound_index': 'صوت التنبيه:',
            'h4_sensitivity': 'حساسية الحركة',
            'label_x': 'محور X:',
            'label_y': 'محور Y:',
            'label_z': 'محور Z:',
            'activate_btn': 'تفعيل الحماية',
            'deactivate_btn': 'إلغاء الحماية',
            'settings_btn': 'الإعدادات',
            'modal_pin_title': 'أدخل كلمة السر',
            'modal_pin_placeholder': 'كلمة السر',
            'modal_pin_submit': 'موافق',
            'modal_pin_forgot': 'نسيت كلمة السر؟',
            'modal_message_ok': 'موافق',
            'h1_verify': 'نسيت كلمة السر؟',
            'p_verify': 'برجاء إدخال رقم الموبايل والاسم المسجل للتحقق.',
            'label_recovery_mobile': 'رقم الموبايل:',
            'placeholder_recovery_mobile': 'أدخل رقم الموبايل',
            'verify_btn': 'تحقق',
            'h3_reset_pin': 'إعادة تعيين كلمة السر',
            'label_new_pin_recovery': 'كلمة السر الجديدة:',
            'placeholder_new_pin_recovery': 'أدخل كلمة السر الجديدة',
            'label_confirm_pin_recovery': 'إعادة إدخال كلمة السر:',
            'placeholder_confirm_pin_recovery': 'أعد إدخال كلمة السر',
            'save_new_pin_btn': 'حفظ كلمة السر الجديدة',
            'back_btn': 'رجوع',
            'select_language': 'اختيار اللغة:',
            'option_ar': 'العربية',
            'option_en': 'الإنجليزية',
            'option_fr': 'الفرنسية',
            'option_de': 'الألمانية',
            'option_es': 'الإسبانية',
            'option_it': 'الإيطالية',
            'option_zh': 'الصينية',
            'option_hi': 'الهندية',
            'label_recovery_username': 'الاسم:',
            'placeholder_recovery_username': 'أدخل اسمك',
            'custom_sound_success': 'تم تحميل ملف الصوت المخصص بنجاح!',
            'settings_saved': 'تم حفظ الإعدادات بنجاح.',
            'pin_mismatch': 'كلمتا السر غير متطابقتين. يرجى إعادة الإدخال.',
            'pin_length_error': 'يجب أن تكون كلمة السر 4 أحرف أو أرقام على الأقل.',
            'fill_all_fields': 'يرجى ملء جميع الحقول المطلوبة.',
            'initial_setup': 'يرجى إعداد إعدادات الحماية الخاصة بك أولاً.',
            'incorrect_pin': 'كلمة سر غير صحيحة!',
            'deactivation_success': 'تم إلغاء تفعيل الحماية بنجاح!',
            'verification_success': 'تم التحقق بنجاح!',
            'verification_error': 'بيانات غير صحيحة. يرجى المحاولة مرة أخرى.',
            'pin_save_success': 'تم حفظ كلمة السر الجديدة بنجاح.',
            'motion_detected': 'تم الكشف عن حركة!',
            'visibility_alert': 'تم إغلاق التطبيق أو قفل الشاشة. جاري إطلاق التنبيه!',
            'manual_deactivation': 'الرجاء إدخال كلمة السر لإلغاء التفعيل.',
            'auto_deactivation': 'تم الكشف عن أول حركة. الرجاء إدخال كلمة السر لإلغاء التفعيل.'
        },
        'fr': {
            'h1_settings': 'Paramètres de protection personnelle',
            'p_settings': 'Système de protection contre les mouvements',
            'h3_account': 'Paramètres du compte',
            'label_name': 'Nom:',
            'placeholder_name': 'Entrez votre nom',
            'label_mobile': 'Numéro de mobile:',
            'placeholder_mobile': 'Entrez le numéro de mobile',
            'h3_pin': 'Définir le code PIN',
            'label_new_pin': 'Nouveau code PIN:',
            'placeholder_new_pin': 'Entrez le code PIN',
            'label_confirm_pin': 'Confirmer le code PIN:',
            'placeholder_confirm_pin': 'Saisir à nouveau le code PIN',
            'h3_sound': 'Paramètres du son d\'alerte',
            'label_sound_select': 'Choisissez un son d\'alerte:',
            'option_sound1': 'Alerte 1',
            'option_sound2': 'Alerte 2',
            'option_sound3': 'Alerte 3',
            'option_custom': 'Son personnalisé',
            'label_sound_file': 'Télécharger un fichier son personnalisé:',
            'save_btn': 'Enregistrer les paramètres',
            'h1_index': 'Système de protection contre les mouvements',
            'p_index': 'Votre compagnon de sécurité personnelle',
            'status_inactive': 'Protection inactive',
            'status_active': '✅ Protection active...',
            'status_arming': '⏳ Activation de la protection...',
            'status_ready': '⚡ Protection prête. Le premier mouvement déclenchera l\'alerte !',
            'label_sound_index': 'Son d\'alerte:',
            'h4_sensitivity': 'Sensibilité au mouvement',
            'label_x': 'Axe X:',
            'label_y': 'Axe Y:',
            'label_z': 'Axe Z:',
            'activate_btn': 'Activer la protection',
            'deactivate_btn': 'Désactiver la protection',
            'settings_btn': 'Paramètres',
            'modal_pin_title': 'Entrer le code PIN',
            'modal_pin_placeholder': 'Code PIN',
            'modal_pin_submit': 'OK',
            'modal_pin_forgot': 'Code PIN oublié?',
            'modal_message_ok': 'OK',
            'h1_verify': 'Code PIN oublié?',
            'p_verify': 'Veuillez entrer le numéro de mobile et le nom enregistrés pour vérifier.',
            'label_recovery_mobile': 'Numéro de mobile:',
            'placeholder_recovery_mobile': 'Entrez le numéro de mobile',
            'verify_btn': 'Vérifier',
            'h3_reset_pin': 'Réinitialiser le code PIN',
            'label_new_pin_recovery': 'Nouveau code PIN:',
            'placeholder_new_pin_recovery': 'Entrez le nouveau code PIN',
            'label_confirm_pin_recovery': 'Confirmer le code PIN:',
            'placeholder_confirm_pin_recovery': 'Saisir à nouveau le code PIN',
            'save_new_pin_btn': 'Enregistrer le nouveau code PIN',
            'back_btn': 'Retour',
            'select_language': 'Sélectionner la langue:',
            'option_ar': 'Arabe',
            'option_en': 'Anglais',
            'option_fr': 'Français',
            'option_de': 'Allemand',
            'option_es': 'Espagnol',
            'option_it': 'Italien',
            'option_zh': 'Chinois',
            'option_hi': 'Hindi',
            'label_recovery_username': 'Nom:',
            'placeholder_recovery_username': 'Entrez votre nom',
            'custom_sound_success': 'Fichier son personnalisé téléchargé avec succès!',
            'settings_saved': 'Paramètres enregistrés avec succès.',
            'pin_mismatch': 'Les codes PIN ne correspondent pas. Veuillez les saisir à nouveau.',
            'pin_length_error': 'Le code PIN doit comporter au moins 4 caractères ou chiffres.',
            'fill_all_fields': 'Veuillez remplir tous les champs requis.',
            'initial_setup': 'Veuillez d\'abord configurer vos paramètres de sécurité.',
            'incorrect_pin': 'Code PIN incorrect!',
            'deactivation_success': 'Protection désactivée avec succès!',
            'verification_success': 'Vérification réussie!',
            'verification_error': 'Données incorrectes. Veuillez réessayer.',
            'pin_save_success': 'Nouveau code PIN enregistré avec succès.',
            'motion_detected': 'Mouvement détecté !',
            'visibility_alert': 'Application fermée ou écran verrouillé. Déclenchement de l\'alarme !',
            'manual_deactivation': 'Veuillez entrer votre code PIN pour désactiver.',
            'auto_deactivation': 'Premier mouvement détecté. Veuillez entrer votre code PIN pour désactiver.'
        },
        'de': {
            'h1_settings': 'Persönliche Schutzeinstellungen',
            'p_settings': 'Bewegungsschutzsystem',
            'h3_account': 'Kontoeinstellungen',
            'label_name': 'Name:',
            'placeholder_name': 'Geben Sie Ihren Namen ein',
            'label_mobile': 'Handynummer:',
            'placeholder_mobile': 'Geben Sie die Handynummer ein',
            'h3_pin': 'PIN festlegen',
            'label_new_pin': 'Neue PIN:',
            'placeholder_new_pin': 'PIN eingeben',
            'label_confirm_pin': 'PIN bestätigen:',
            'placeholder_confirm_pin': 'PIN erneut eingeben',
            'h3_sound': 'Alarmsound-Einstellungen',
            'label_sound_select': 'Wählen Sie einen Alarmsound:',
            'option_sound1': 'Alarm 1',
            'option_sound2': 'Alarm 2',
            'option_sound3': 'Alarm 3',
            'option_custom': 'Benutzerdefinierter Sound',
            'label_sound_file': 'Benutzerdefinierte Audiodatei hochladen:',
            'save_btn': 'Einstellungen speichern',
            'h1_index': 'Bewegungsschutzsystem',
            'p_index': 'Ihr persönlicher Sicherheitsbegleiter',
            'status_inactive': 'Schutz ist inaktiv',
            'status_active': '✅ Schutz ist aktiv...',
            'status_arming': '⏳ Schutz wird aktiviert...',
            'status_ready': '⚡ Schutz ist bereit. Die erste Bewegung löst den Alarm aus!',
            'label_sound_index': 'Alarmsound:',
            'h4_sensitivity': 'Bewegungsempfindlichkeit',
            'label_x': 'Achse X:',
            'label_y': 'Achse Y:',
            'label_z': 'Achse Z:',
            'activate_btn': 'Schutz aktivieren',
            'deactivate_btn': 'Schutz deaktivieren',
            'settings_btn': 'Einstellungen',
            'modal_pin_title': 'PIN eingeben',
            'modal_pin_placeholder': 'PIN',
            'modal_pin_submit': 'OK',
            'modal_pin_forgot': 'PIN vergessen?',
            'modal_message_ok': 'OK',
            'h1_verify': 'PIN vergessen?',
            'p_verify': 'Bitte geben Sie die registrierte Handynummer und den Namen zur Überprüfung ein.',
            'label_recovery_mobile': 'Handynummer:',
            'placeholder_recovery_mobile': 'Handynummer eingeben',
            'verify_btn': 'Überprüfen',
            'h3_reset_pin': 'PIN zurücksetzen',
            'label_new_pin_recovery': 'Neue PIN:',
            'placeholder_new_pin_recovery': 'Neue PIN eingeben',
            'label_confirm_pin_recovery': 'PIN bestätigen:',
            'placeholder_confirm_pin_recovery': 'PIN erneut eingeben',
            'save_new_pin_btn': 'Neue PIN speichern',
            'back_btn': 'Zurück',
            'select_language': 'Sprache auswählen:',
            'option_ar': 'Arabisch',
            'option_en': 'Englisch',
            'option_fr': 'Französisch',
            'option_de': 'Deutsch',
            'option_es': 'Spanisch',
            'option_it': 'Italienisch',
            'option_zh': 'Chinesisch',
            'option_hi': 'Hindi',
            'label_recovery_username': 'Name:',
            'placeholder_recovery_username': 'Geben Sie Ihren Namen ein',
            'custom_sound_success': 'Benutzerdefinierte Audiodatei erfolgreich hochgeladen!',
            'settings_saved': 'Einstellungen erfolgreich gespeichert.',
            'pin_mismatch': 'PINs stimmen nicht überein. Bitte erneut eingeben.',
            'pin_length_error': 'PIN muss mindestens 4 Zeichen oder Zahlen lang sein.',
            'fill_all_fields': 'Bitte füllen Sie alle erforderlichen Felder aus.',
            'initial_setup': 'Bitte richten Sie zuerst Ihre Sicherheitseinstellungen ein.',
            'incorrect_pin': 'Falsche PIN!',
            'deactivation_success': 'Schutz erfolgreich deaktiviert!',
            'verification_success': 'Überprüfung erfolgreich!',
            'verification_error': 'Falsche Daten. Bitte versuchen Sie es erneut.',
            'pin_save_success': 'Neue PIN erfolgreich gespeichert.',
            'motion_detected': 'Bewegung erkannt!',
            'visibility_alert': 'App geschlossen oder Bildschirm gesperrt. Alarm wird ausgelöst!',
            'manual_deactivation': 'Bitte geben Sie Ihre PIN ein, um die Deaktivierung durchzuführen.',
            'auto_deactivation': 'Erste Bewegung erkannt. Bitte geben Sie Ihre PIN ein, um die Deaktivierung durchzuführen.'
        },
        'es': {
            'h1_settings': 'Configuración de protección personal',
            'p_settings': 'Sistema de protección de movimiento',
            'h3_account': 'Configuración de la cuenta',
            'label_name': 'Nombre:',
            'placeholder_name': 'Introduce tu nombre',
            'label_mobile': 'Número de móvil:',
            'placeholder_mobile': 'Introduce el número de móvil',
            'h3_pin': 'Establecer PIN',
            'label_new_pin': 'Nuevo PIN:',
            'placeholder_new_pin': 'Introduce el PIN',
            'label_confirm_pin': 'Confirmar PIN:',
            'placeholder_confirm_pin': 'Vuelve a introducir el PIN',
            'h3_sound': 'Configuración de sonido de alerta',
            'label_sound_select': 'Elige un sonido de alerta:',
            'option_sound1': 'Alerta 1',
            'option_sound2': 'Alerta 2',
            'option_sound3': 'Alerta 3',
            'option_custom': 'Sonido personalizado',
            'label_sound_file': 'Subir archivo de sonido personalizado:',
            'save_btn': 'Guardar configuración',
            'h1_index': 'Sistema de protección de movimiento',
            'p_index': 'Tu compañero de seguridad personal',
            'status_inactive': 'La protección está inactiva',
            'status_active': '✅ La protección está activa...',
            'status_arming': '⏳ Activando protección...',
            'status_ready': '⚡ Protección lista. ¡El primer movimiento activará la alerta!',
            'label_sound_index': 'Sonido de alerta:',
            'h4_sensitivity': 'Sensibilidad al movimiento',
            'label_x': 'Eje X:',
            'label_y': 'Eje Y:',
            'label_z': 'Eje Z:',
            'activate_btn': 'Activar protección',
            'deactivate_btn': 'Desactivar protección',
            'settings_btn': 'Configuración',
            'modal_pin_title': 'Introducir PIN',
            'modal_pin_placeholder': 'PIN',
            'modal_pin_submit': 'OK',
            'modal_pin_forgot': '¿Olvidaste el PIN?',
            'modal_message_ok': 'OK',
            'h1_verify': '¿Olvidaste el PIN?',
            'p_verify': 'Por favor, introduce el número de móvil y el nombre registrados para verificar.',
            'label_recovery_mobile': 'Número de móvil:',
            'placeholder_recovery_mobile': 'Introduce el número de móvil',
            'verify_btn': 'Verificar',
            'h3_reset_pin': 'Restablecer PIN',
            'label_new_pin_recovery': 'Nuevo PIN:',
            'placeholder_new_pin_recovery': 'Introduce el nuevo PIN',
            'label_confirm_pin_recovery': 'Confirmar PIN:',
            'placeholder_confirm_pin_recovery': 'Vuelve a introducir el PIN',
            'save_new_pin_btn': 'Guardar nuevo PIN',
            'back_btn': 'Atrás',
            'select_language': 'Seleccionar idioma:',
            'option_ar': 'Árabe',
            'option_en': 'Inglés',
            'option_fr': 'Francés',
            'option_de': 'Alemán',
            'option_es': 'Español',
            'option_it': 'Italiano',
            'option_zh': 'Chino',
            'option_hi': 'Hindi',
            'label_recovery_username': 'Nombre:',
            'placeholder_recovery_username': 'Introduce tu nombre',
            'custom_sound_success': 'Archivo de sonido personalizado subido con éxito!',
            'settings_saved': 'Configuración guardada con éxito.',
            'pin_mismatch': 'Los PINs no coinciden. Por favor, vuelve a introducirlos.',
            'pin_length_error': 'El PIN debe tener al menos 4 caracteres o números.',
            'fill_all_fields': 'Por favor, rellena todos los campos obligatorios.',
            'initial_setup': 'Por favor, configura tus ajustes de seguridad primero.',
            'incorrect_pin': 'PIN incorrecto!',
            'deactivation_success': 'Protección desactivada con éxito!',
            'verification_success': 'Verificación exitosa!',
            'verification_error': 'Datos incorrectos. Por favor, inténtalo de nuevo.',
            'pin_save_success': 'Nuevo PIN guardado con éxito.',
            'motion_detected': 'Movimiento detectado!',
            'visibility_alert': 'Aplicación cerrada o pantalla bloqueada. ¡Activando la alarma!',
            'manual_deactivation': 'Por favor, introduce tu PIN para desactivar.',
            'auto_deactivation': 'Primer movimiento detectado. Por favor, introduce tu PIN para desactivar.'
        },
        'it': {
            'h1_settings': 'Impostazioni di protezione personale',
            'p_settings': 'Sistema di protezione dal movimento',
            'h3_account': 'Impostazioni account',
            'label_name': 'Nome:',
            'placeholder_name': 'Inserisci il tuo nome',
            'label_mobile': 'Numero di cellulare:',
            'placeholder_mobile': 'Inserisci il numero di cellulare',
            'h3_pin': 'Imposta PIN',
            'label_new_pin': 'Nuovo PIN:',
            'placeholder_new_pin': 'Inserisci il PIN',
            'label_confirm_pin': 'Conferma PIN:',
            'placeholder_confirm_pin': 'Reinserisci il PIN',
            'h3_sound': 'Impostazioni audio di avviso',
            'label_sound_select': 'Scegli un suono di avviso:',
            'option_sound1': 'Avviso 1',
            'option_sound2': 'Avviso 2',
            'option_sound3': 'Avviso 3',
            'option_custom': 'Suono personalizzato',
            'label_sound_file': 'Carica file audio personalizzato:',
            'save_btn': 'Salva impostazioni',
            'h1_index': 'Sistema di protezione dal movimento',
            'p_index': 'Il tuo compagno di sicurezza personale',
            'status_inactive': 'La protezione è inattiva',
            'status_active': '✅ La protezione è attiva...',
            'status_arming': '⏳ Attivazione della protezione...',
            'status_ready': '⚡ Protezione pronta. Il primo movimento attiverà l\'avviso!',
            'label_sound_index': 'Suono di avviso:',
            'h4_sensitivity': 'Sensibilità al movimento',
            'label_x': 'Asse X:',
            'label_y': 'Asse Y:',
            'label_z': 'Asse Z:',
            'activate_btn': 'Attiva protezione',
            'deactivate_btn': 'Disattiva protezione',
            'settings_btn': 'Impostazioni',
            'modal_pin_title': 'Inserisci PIN',
            'modal_pin_placeholder': 'PIN',
            'modal_pin_submit': 'OK',
            'modal_pin_forgot': 'Hai dimenticato il PIN?',
            'modal_message_ok': 'OK',
            'h1_verify': 'Hai dimenticato il PIN?',
            'p_verify': 'Inserisci il numero di cellulare e il nome registrati per verificare.',
            'label_recovery_mobile': 'Numero di cellulare:',
            'placeholder_recovery_mobile': 'Inserisci il numero di cellulare',
            'verify_btn': 'Verifica',
            'h3_reset_pin': 'Reimposta PIN',
            'label_new_pin_recovery': 'Nuovo PIN:',
            'placeholder_new_pin_recovery': 'Inserisci il nuovo PIN',
            'label_confirm_pin_recovery': 'Conferma PIN:',
            'placeholder_confirm_pin_recovery': 'Reinserisci il PIN',
            'save_new_pin_btn': 'Salva nuovo PIN',
            'back_btn': 'Indietro',
            'select_language': 'Seleziona lingua:',
            'option_ar': 'Arabo',
            'option_en': 'Inglese',
            'option_fr': 'Francese',
            'option_de': 'Tedesco',
            'option_es': 'Spagnolo',
            'option_it': 'Italiano',
            'option_zh': 'Cinese',
            'option_hi': 'Hindi',
            'label_recovery_username': 'Nome:',
            'placeholder_recovery_username': 'Inserisci il tuo nome',
            'custom_sound_success': 'File audio personalizzato caricato con successo!',
            'settings_saved': 'Impostazioni salvate con successo.',
            'pin_mismatch': 'I PIN non corrispondono. Riprova.',
            'pin_length_error': 'Il PIN deve contenere almeno 4 caratteri o numeri.',
            'fill_all_fields': 'Si prega di compilare tutti i campi richiesti.',
            'initial_setup': 'Per favore, configura prima le tue impostazioni di sicurezza.',
            'incorrect_pin': 'PIN errato!',
            'deactivation_success': 'Protezione disattivata con successo!',
            'verification_success': 'Verifica riuscita!',
            'verification_error': 'Dati errati. Riprova.',
            'pin_save_success': 'Nuovo PIN salvato con successo.',
            'motion_detected': 'Movimento rilevato!',
            'visibility_alert': 'App chiusa o schermo bloccato. Avviso attivato!',
            'manual_deactivation': 'Inserisci il tuo PIN per disattivare.',
            'auto_deactivation': 'Primo movimento rilevato. Inserisci il tuo PIN per disattivare.'
        },
        'zh': {
            'h1_settings': '个人防护设置',
            'p_settings': '移动保护系统',
            'h3_account': '账户设置',
            'label_name': '姓名:',
            'placeholder_name': '输入您的姓名',
            'label_mobile': '手机号码:',
            'placeholder_mobile': '输入手机号码',
            'h3_pin': '设置PIN码',
            'label_new_pin': '新PIN码:',
            'placeholder_new_pin': '输入PIN码',
            'label_confirm_pin': '确认PIN码:',
            'placeholder_confirm_pin': '重新输入PIN码',
            'h3_sound': '警报声音设置',
            'label_sound_select': '选择警报声音:',
            'option_sound1': '警报 1',
            'option_sound2': '警报 2',
            'option_sound3': '警报 3',
            'option_custom': '自定义声音',
            'label_sound_file': '上传自定义声音文件:',
            'save_btn': '保存设置',
            'h1_index': '移动保护系统',
            'p_index': '您的个人安全伴侣',
            'status_inactive': '保护已停止',
            'status_active': '✅ 保护已激活...',
            'status_arming': '⏳ 正在激活保护...',
            'status_ready': '⚡ 保护已就绪。首次移动将触发警报！',
            'label_sound_index': '警报声音:',
            'h4_sensitivity': '运动灵敏度',
            'label_x': 'X轴:',
            'label_y': 'Y轴:',
            'label_z': 'Z轴:',
            'activate_btn': '激活保护',
            'deactivate_btn': '停止保护',
            'settings_btn': '设置',
            'modal_pin_title': '输入PIN码',
            'modal_pin_placeholder': 'PIN码',
            'modal_pin_submit': '确定',
            'modal_pin_forgot': '忘记PIN码？',
            'modal_message_ok': '确定',
            'h1_verify': '忘记PIN码？',
            'p_verify': '请输入注册的手机号码和姓名进行验证。',
            'label_recovery_mobile': '手机号码:',
            'placeholder_recovery_mobile': '输入手机号码',
            'verify_btn': '验证',
            'h3_reset_pin': '重置PIN码',
            'label_new_pin_recovery': '新PIN码:',
            'placeholder_new_pin_recovery': '输入新PIN码',
            'label_confirm_pin_recovery': '确认PIN码:',
            'placeholder_confirm_pin_recovery': '重新输入PIN码',
            'save_new_pin_btn': '保存新PIN码',
            'back_btn': '返回',
            'select_language': '选择语言:',
            'option_ar': '阿拉伯语',
            'option_en': '英语',
            'option_fr': '法语',
            'option_de': '德语',
            'option_es': '西班牙语',
            'option_it': '意大利语',
            'option_zh': '中文',
            'option_hi': '印地语',
            'label_recovery_username': '姓名:',
            'placeholder_recovery_username': '输入您的姓名',
            'custom_sound_success': '自定义声音文件上传成功！',
            'settings_saved': '设置保存成功。',
            'pin_mismatch': 'PIN码不匹配。请重新输入。',
            'pin_length_error': 'PIN码必须至少包含4个字符或数字。',
            'fill_all_fields': '请填写所有必填字段。',
            'initial_setup': '请先设置您的安全设置。',
            'incorrect_pin': 'PIN码不正确！',
            'deactivation_success': '保护已成功停止！',
            'verification_success': '验证成功！',
            'verification_error': '数据不正确。请重试。',
            'pin_save_success': '新PIN码保存成功。',
            'motion_detected': '检测到运动！',
            'visibility_alert': '应用程序已关闭或屏幕已锁定。正在触发警报！',
            'manual_deactivation': '请输​​入您的PIN码以停用。',
            'auto_deactivation': '检测到首次运动。请输​​入您的PIN码以停用。'
        },
        'hi': {
            'h1_settings': 'व्यक्तिगत सुरक्षा सेटिंग्स',
            'p_settings': 'मोशन प्रोटेक्शन सिस्टम',
            'h3_account': 'खाता सेटिंग्स',
            'label_name': 'नाम:',
            'placeholder_name': 'अपना नाम दर्ज करें',
            'label_mobile': 'मोबाइल नंबर:',
            'placeholder_mobile': 'मोबाइल नंबर दर्ज करें',
            'h3_pin': 'पिन सेट करें',
            'label_new_pin': 'नया पिन:',
            'placeholder_new_pin': 'पिन दर्ज करें',
            'label_confirm_pin': 'पिन की पुष्टि करें:',
            'placeholder_confirm_pin': 'पिन दोबारा दर्ज करें',
            'h3_sound': 'अलर्ट ध्वनि सेटिंग्स',
            'label_sound_select': 'एक अलर्ट ध्वनि चुनें:',
            'option_sound1': 'अलर्ट 1',
            'option_sound2': 'अलर्ट 2',
            'option_sound3': 'अलर्ट 3',
            'option_custom': 'कस्टम ध्वनि',
            'label_sound_file': 'कस्टम ध्वनि फ़ाइल अपलोड करें:',
            'save_btn': 'सेटिंग्स सहेजें',
            'h1_index': 'मोशन प्रोटेक्शन सिस्टम',
            'p_index': 'आपका व्यक्तिगत सुरक्षा साथी',
            'status_inactive': 'सुरक्षा निष्क्रिय है',
            'status_active': '✅ सुरक्षा सक्रिय है...',
            'status_arming': '⏳ सुरक्षा सक्रिय हो रही है...',
            'status_ready': '⚡ सुरक्षा तैयार है। पहली गति पर अलर्ट चालू होगा!',
            'label_sound_index': 'अलर्ट ध्वनि:',
            'h4_sensitivity': 'मोशन संवेदनशीलता',
            'label_x': 'एक्सिस एक्स:',
            'label_y': 'एक्सिस वाई:',
            'label_z': 'एक्सिस जेड:',
            'activate_btn': 'सुरक्षा सक्रिय करें',
            'deactivate_btn': 'सुरक्षा निष्क्रिय करें',
            'settings_btn': 'सेटिंग्स',
            'modal_pin_title': 'पिन दर्ज करें',
            'modal_pin_placeholder': 'पिन',
            'modal_pin_submit': 'ठीक है',
            'modal_pin_forgot': 'पिन भूल गए?',
            'modal_message_ok': 'ठीक है',
            'h1_verify': 'पिन भूल गए?',
            'p_verify': 'सत्यापन के लिए कृपया पंजीकृत मोबाइल नंबर और नाम दर्ज करें।',
            'label_recovery_mobile': 'मोबाइल नंबर:',
            'placeholder_recovery_mobile': 'मोबाइल नंबर दर्ज करें',
            'verify_btn': 'सत्यापित करें',
            'h3_reset_pin': 'पिन रीसेट करें',
            'label_new_pin_recovery': 'नया पिन:',
            'placeholder_new_pin_recovery': 'नया पिन दर्ज करें',
            'label_confirm_pin_recovery': 'पिन की पुष्टि करें:',
            'placeholder_confirm_pin_recovery': 'पिन दोबारा दर्ज करें',
            'save_new_pin_btn': 'नया पिन सहेजें',
            'back_btn': 'वापस',
            'select_language': 'भाषा चुनें:',
            'option_ar': 'अरबी',
            'option_en': 'अंग्रेज़ी',
            'option_fr': 'फ्रेंच',
            'option_de': 'जर्मन',
            'option_es': 'स्पेनिश',
            'option_it': 'इतालवी',
            'option_zh': 'चीनी',
            'option_hi': 'हिन्दी',
            'label_recovery_username': 'नाम:',
            'placeholder_recovery_username': 'अपना नाम दर्ज करें',
            'custom_sound_success': 'कस्टम ध्वनि फ़ाइल सफलतापूर्वक अपलोड की गई!',
            'settings_saved': 'सेटिंग्स सफलतापूर्वक सहेजी गईं।',
            'pin_mismatch': 'पिन मेल नहीं खाते। कृपया दोबारा दर्ज करें।',
            'pin_length_error': 'पिन कम से कम 4 वर्ण या संख्याएँ लंबी होनी चाहिए।',
            'fill_all_fields': 'कृपया सभी आवश्यक फ़ील्ड भरें।',
            'initial_setup': 'कृपया पहले अपनी सुरक्षा सेटिंग्स सेट करें।',
            'incorrect_pin': 'गलत पिन!',
            'deactivation_success': 'सुरक्षा सफलतापूर्वक निष्क्रिय कर दी गई!',
            'verification_success': 'सत्यापन सफल!',
            'verification_error': 'गलत डेटा। कृपया फिर से प्रयास करें।',
            'pin_save_success': 'नया पिन सफलतापूर्वक सहेजा गया।',
            'motion_detected': 'गति का पता चला!',
            'visibility_alert': 'ऐप बंद या स्क्रीन लॉक हो गई। अलार्म चालू हो रहा है!',
            'manual_deactivation': 'कृपया निष्क्रिय करने के लिए अपना पिन दर्ज करें।',
            'auto_deactivation': 'पहली गति का पता चला। कृपया निष्क्रिय करने के लिए अपना पिन दर्ज करें।'
        }
    };
    
    let currentLang = localStorage.getItem('language') || 'ar';
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        updateUIWithTranslation();
    }
    
    function updateUIWithTranslation() {
        const t = translations[currentLang];
        
        if (isSettingsPage) {
            document.getElementById('h1-settings').textContent = t.h1_settings;
            document.getElementById('p-settings').textContent = t.p_settings;
            document.getElementById('h3-account').textContent = t.h3_account;
            document.getElementById('label-name').textContent = t.label_name;
            document.getElementById('user-name').placeholder = t.placeholder_name;
            document.getElementById('label-mobile').textContent = t.label_mobile;
            document.getElementById('mobile-number').placeholder = t.placeholder_mobile;
            document.getElementById('h3-pin').textContent = t.h3_pin;
            document.getElementById('label-new-pin').textContent = t.label_new_pin;
            document.getElementById('new-pin').placeholder = t.placeholder_new_pin;
            document.getElementById('label-confirm-pin').textContent = t.label_confirm_pin;
            document.getElementById('confirm-pin').placeholder = t.placeholder_confirm_pin;
            document.getElementById('h3-sound').textContent = t.h3_sound;
            document.getElementById('label-sound-select').textContent = t.label_sound_select;
            document.getElementById('sound-option-1-settings').textContent = t.option_sound1;
            document.getElementById('sound-option-2-settings').textContent = t.option_sound2;
            document.getElementById('sound-option-3-settings').textContent = t.option_sound3;
            document.getElementById('sound-option-custom-settings').textContent = t.option_custom;
            document.getElementById('label-sound-file').textContent = t.label_sound_file;
            document.getElementById('save-settings-btn').textContent = t.save_btn;
            document.getElementById('message-modal-ok').textContent = t.modal_message_ok;
            document.getElementById('label-language').textContent = t.select_language;
            document.getElementById('lang-option-en').textContent = t.option_en;
            document.getElementById('lang-option-ar').textContent = t.option_ar;
            document.getElementById('lang-option-fr').textContent = t.option_fr;
            document.getElementById('lang-option-de').textContent = t.option_de;
            document.getElementById('lang-option-es').textContent = t.option_es;
            document.getElementById('lang-option-it').textContent = t.option_it;
            document.getElementById('lang-option-zh').textContent = t.option_zh;
            document.getElementById('lang-option-hi').textContent = t.option_hi;
        }
        
        if (isIndexPage) {
            document.getElementById('h1-index').textContent = t.h1_index;
            document.getElementById('p-index').textContent = t.p_index;
            document.getElementById('activateButton').textContent = t.activate_btn;
            document.getElementById('deactivateButton').textContent = t.deactivate_btn;
            document.getElementById('settingsButton').textContent = t.settings_btn;
            document.getElementById('motionStatus').textContent = t.status_inactive;
            document.getElementById('h4-sensitivity').textContent = t.h4_sensitivity;
            document.getElementById('label-x').textContent = t.label_x;
            document.getElementById('label-y').textContent = t.label_y;
            document.getElementById('label-z').textContent = t.label_z;
            
            // Pin Modal for Deactivation
            document.getElementById('pin-modal-title-index').textContent = t.modal_pin_title;
            document.getElementById('pin-input-index').placeholder = t.modal_pin_placeholder;
            document.getElementById('pin-submit-btn-index').textContent = t.modal_pin_submit;
            
            // Pin Modal for Settings
            document.getElementById('pin-modal-title-settings').textContent = t.modal_pin_title;
            document.getElementById('pin-input-settings').placeholder = t.modal_pin_placeholder;
            document.getElementById('pin-submit-btn-settings').textContent = t.modal_pin_submit;
            document.getElementById('pin-forgot-btn').textContent = t.modal_pin_forgot;

            // Message Modal
            document.getElementById('message-modal-ok').textContent = t.modal_message_ok;
        }

        if (isVerifyPage) {
            document.getElementById('h1-verify').textContent = t.h1_verify;
            document.getElementById('p-verify').textContent = t.p_verify;
            document.getElementById('label-recovery-username').textContent = t.label_recovery_username;
            document.getElementById('recovery-username').placeholder = t.placeholder_recovery_username;
            document.getElementById('label-recovery-mobile').textContent = t.label_recovery_mobile;
            document.getElementById('recovery-mobile').placeholder = t.placeholder_recovery_mobile;
            document.getElementById('verify-mobile-btn').textContent = t.verify_btn;
            document.getElementById('h3-reset-pin').textContent = t.h3_reset_pin;
            document.getElementById('label-new-pin-recovery').textContent = t.label_new_pin_recovery;
            document.getElementById('new-recovery-pin').placeholder = t.placeholder_new_pin_recovery;
            document.getElementById('label-confirm-pin-recovery').textContent = t.label_confirm_pin_recovery;
            // Correction for a missing element in your HTML. `placeholder_confirm_pin_recovery` is a key, not an ID.
            document.getElementById('confirm-recovery-pin').placeholder = t.placeholder_confirm_pin_recovery;
            document.getElementById('save-new-pin-btn').textContent = t.save_new_pin_btn;
            document.getElementById('back-btn').textContent = t.back_btn;
            document.getElementById('message-modal-ok').textContent = t.modal_message_ok;
        }
    }
    
    setLanguage(currentLang);

    function showMessageModal(title, message) {
        const modal = document.getElementById('message-modal');
        document.getElementById('message-title').textContent = title;
        document.getElementById('message-text').textContent = message;
        modal.style.display = 'flex';
    }

    function hideMessageModal() {
        document.getElementById('message-modal').style.display = 'none';
    }

    window.hideMessageModal = hideMessageModal;

    if (isSettingsPage) {
        const saveSettingsBtn = document.getElementById('save-settings-btn');
        const userNameInput = document.getElementById('user-name');
        const mobileNumberInput = document.getElementById('mobile-number');
        const newPinInput = document.getElementById('new-pin');
        const confirmPinInput = document.getElementById('confirm-pin');
        const customSoundFile = document.getElementById('custom-sound-file');
        const customSoundFileContainer = document.getElementById('custom-sound-file-container');
        const soundSelector = document.getElementById('sound-select-settings');
        const langSelector = document.getElementById('lang-selector');
        
        let customSoundBase64 = null;
        
        langSelector.value = currentLang;
        langSelector.addEventListener('change', (e) => {
           setLanguage(e.target.value);
        });

        // Play sound preview when a selection is made
        soundSelector.addEventListener('change', function() {
            if (this.value === 'custom') {
                customSoundFileContainer.style.display = 'block';
            } else {
                customSoundFileContainer.style.display = 'none';
                const audio = new Audio(defaultSounds[this.value]);
                audio.play().catch(e => console.error('Audio playback failed:', e));
            }
        });
        
        customSoundFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    customSoundBase64 = e.target.result;
                    showMessageModal(translations[currentLang].h3_sound, translations[currentLang].custom_sound_success);
                    
                    // Play custom sound preview
                    const audio = new Audio(customSoundBase64);
                    audio.play().catch(e => console.error('Audio playback failed:', e));
                };
                reader.readAsDataURL(file);
            }
        });
  
        loadSettings();

        saveSettingsBtn.addEventListener('click', () => {
            const userName = userNameInput.value.trim();
            const mobileNumber = mobileNumberInput.value.trim();
            const newPin = newPinInput.value.trim();
            const confirmPin = confirmPinInput.value.trim();

            if (!userName || !mobileNumber || !newPin || !confirmPin) {
                showMessageModal(translations[currentLang].save_btn, translations[currentLang].fill_all_fields);
                return;
            }

            if (newPin !== confirmPin) {
                showMessageModal(translations[currentLang].save_btn, translations[currentLang].pin_mismatch);
                return;
            }
            
            if (newPin.length < 4) {
                showMessageModal(translations[currentLang].save_btn, translations[currentLang].pin_length_error);
                return;
            }

            const savedSettings = JSON.parse(localStorage.getItem('motionAlertSettings')) || {};
            let selectedSound = soundSelector.value;
            if (selectedSound === 'custom') {
                selectedSound = customSoundBase64 || savedSettings.sound;
            }

            const settings = {
                userName: userName,
                mobileNumber: mobileNumber,
                securityPin: newPin,
                sound: selectedSound || 'alert.mp3', 
                threshold: savedSettings.threshold || { x: 10, y: 10, z: 10 },
                language: currentLang
            };

            localStorage.setItem('motionAlertSettings', JSON.stringify(settings));
            
            showMessageModal(translations[currentLang].save_btn, translations[currentLang].settings_saved);
            setTimeout(() => {
                 window.location.href = 'index.html';
            }, 2000);
           
        });

        function loadSettings() {
            const savedSettings = JSON.parse(localStorage.getItem('motionAlertSettings'));
            if (savedSettings) {
                userNameInput.value = savedSettings.userName || '';
                mobileNumberInput.value = savedSettings.mobileNumber || '';
                newPinInput.value = '';
                confirmPinInput.value = '';
                setLanguage(savedSettings.language || 'ar');
                if (savedSettings.sound && savedSettings.sound.startsWith('data:')) {
                    soundSelector.value = 'custom';
                    customSoundFileContainer.style.display = 'block';
                } else {
                    soundSelector.value = savedSettings.sound || 'alert.mp3';
                    customSoundFileContainer.style.display = 'none';
                }
            } else {
                soundSelector.value = 'alert.mp3';
                customSoundFileContainer.style.display = 'none';
            }
        }
    }

    if (isIndexPage) {
        let audio = new Audio();
        let alertEnabled = false; // Manual activation state
        let isArmed = false; // Automatic activation state
        let idleTimer; // Timer for automatic activation
        let wakeLock = null;
        let notificationPermission = 'default';
        let currentThreshold = { x: 10, y: 10, z: 10 };

        const activateBtn = document.getElementById('activateButton');
        const deactivateBtn = document.getElementById('deactivateButton');
        const motionStatus = document.getElementById('motionStatus');
        const settingsBtn = document.getElementById('settingsButton');

        const sliderX = document.getElementById('sensitivity-x');
        const sliderY = document.getElementById('sensitivity-y');
        const sliderZ = document.getElementById('sensitivity-z');
        const valueX = document.getElementById('value-x');
        const valueY = document.getElementById('value-y');
        const valueZ = document.getElementById('value-z');
        const plusX = document.getElementById('plus-x');
        const minusX = document.getElementById('minus-x');
        const plusY = document.getElementById('plus-y');
        const minusY = document.getElementById('minus-y');
        const plusZ = document.getElementById('plus-z');
        const minusZ = document.getElementById('minus-z');

        const pinModalDeactivate = document.getElementById('pin-modal-index');
        const pinInputDeactivate = document.getElementById('pin-input-index');
        const pinSubmitBtnDeactivate = document.getElementById('pin-submit-btn-index');
        
        const pinModalSettings = document.getElementById('pin-modal-settings');
        const pinInputSettings = document.getElementById('pin-input-settings');
        const pinSubmitBtnSettings = document.getElementById('pin-submit-btn-settings');
        const pinForgotBtn = document.getElementById('pin-forgot-btn');
        
        let savedSettings = JSON.parse(localStorage.getItem('motionAlertSettings'));
        if (!savedSettings || !savedSettings.securityPin) {
            showMessageModal(translations[currentLang].h1_index, translations[currentLang].initial_setup);
            window.location.href = 'settings.html';
            return;
        }

        function saveSettings() {
             savedSettings.threshold = currentThreshold;
             localStorage.setItem('motionAlertSettings', JSON.stringify(savedSettings));
        }

        function loadSettings() {
            savedSettings = JSON.parse(localStorage.getItem('motionAlertSettings'));
            if (savedSettings) {
                currentThreshold = savedSettings.threshold;
                setLanguage(savedSettings.language || 'ar');
                if (savedSettings.sound && savedSettings.sound.startsWith('data:')) {
                     audio.src = savedSettings.sound;
                } else {
                     audio.src = defaultSounds[savedSettings.sound] || defaultSounds['alert.mp3'];
                }

                sliderX.value = currentThreshold.x;
                sliderY.value = currentThreshold.y;
                sliderZ.value = currentThreshold.z;

                valueX.textContent = currentThreshold.x;
                valueY.textContent = currentThreshold.y;
                valueZ.textContent = currentThreshold.z;
            }
        }
        
        settingsBtn.addEventListener('click', () => {
             pinModalSettings.style.display = 'flex';
             pinInputSettings.value = '';
             pinInputSettings.focus();
        });
        
        pinSubmitBtnSettings.addEventListener('click', function() {
            const enteredPin = pinInputSettings.value;
            const savedSettings = JSON.parse(localStorage.getItem('motionAlertSettings'));
            const savedPin = savedSettings.securityPin;

            if (enteredPin === savedPin) {
                 window.location.href = 'settings.html';
            } else {
                showMessageModal(translations[currentLang].modal_pin_title, translations[currentLang].incorrect_pin);
                pinInputSettings.value = '';
            }
        });
        
        // This is a correction to the original logic. The "Forgot PIN" button should not be tied to the settings modal.
        // It is more logical to have it on the page directly, but since the original code puts it here, we will fix the logic.
        pinForgotBtn.addEventListener('click', function() {
            // Hide the current modal before navigating
            pinModalSettings.style.display = 'none'; 
            window.location.href = 'verify.html';
        });

        sliderX.addEventListener('input', () => {
            currentThreshold.x = parseInt(sliderX.value);
            valueX.textContent = sliderX.value;
            saveSettings();
        });
        sliderY.addEventListener('input', () => {
            currentThreshold.y = parseInt(sliderY.value);
            valueY.textContent = sliderY.value;
            saveSettings();
        });
        sliderZ.addEventListener('input', () => {
            currentThreshold.z = parseInt(sliderZ.value);
            valueZ.textContent = sliderZ.value;
            saveSettings();
        });
        
        // Plus/Minus button event listeners
        plusX.addEventListener('click', () => {
            let val = parseInt(sliderX.value);
            if (val < 100) {
                sliderX.value = val + 1;
                sliderX.dispatchEvent(new Event('input'));
            }
        });
        minusX.addEventListener('click', () => {
            let val = parseInt(sliderX.value);
            if (val > 1) {
                sliderX.value = val - 1;
                sliderX.dispatchEvent(new Event('input'));
            }
        });
        plusY.addEventListener('click', () => {
            let val = parseInt(sliderY.value);
            if (val < 100) {
                sliderY.value = val + 1;
                sliderY.dispatchEvent(new Event('input'));
            }
        });
        minusY.addEventListener('click', () => {
            let val = parseInt(sliderY.value);
            if (val > 1) {
                sliderY.value = val - 1;
                sliderY.dispatchEvent(new Event('input'));
            }
        });
        plusZ.addEventListener('click', () => {
            let val = parseInt(sliderZ.value);
            if (val < 100) {
                sliderZ.value = val + 1;
                sliderZ.dispatchEvent(new Event('input'));
            }
        });
        minusZ.addEventListener('click', () => {
            let val = parseInt(sliderZ.value);
            if (val > 1) {
                sliderZ.value = val - 1;
                sliderZ.dispatchEvent(new Event('input'));
            }
        });


        function requestNotificationPermission() {
            if ('Notification' in window) {
                Notification.requestPermission().then(permission => {
                    notificationPermission = permission;
                });
            }
        }
        
        function sendNotification(message) {
          if (notificationPermission === 'granted') {
              new Notification('🚨 Motion Alert!', {
                  body: message
              });
          }
        }

        async function requestWakeLock() {
          try {
            if ('wakeLock' in navigator) {
              wakeLock = await navigator.wakeLock.request('screen');
              wakeLock.addEventListener('release', () => {
                  requestWakeLock();
              });
            }
          } catch (err) {
            console.error(`Wake Lock Error: ${err.name}, ${err.message}`);
          }
        }

        function releaseWakeLock() {
          if (wakeLock !== null) {
            wakeLock.release();
            wakeLock = null;
          }
        }
        
        function resetIdleTimer() {
            clearTimeout(idleTimer);
            if (!alertEnabled) {
                isArmed = false;
                motionStatus.textContent = translations[currentLang].status_inactive;
                motionStatus.style.backgroundColor = '#006400';
                idleTimer = setTimeout(armProtection, 30000); // 30 seconds idle timer
            }
        }

        function armProtection() {
            if (!alertEnabled) {
                isArmed = true;
                motionStatus.textContent = translations[currentLang].status_ready;
                motionStatus.style.backgroundColor = '#B8860B';
            }
        }

        function updateUI(status) {
            const t = translations[currentLang];
            if (status === 'active') {
                activateBtn.disabled = true;
                deactivateBtn.disabled = false;
                motionStatus.textContent = t.status_active;
                motionStatus.style.color = '#fff';
                motionStatus.style.backgroundColor = '#8B0000';
                sliderX.disabled = true;
                sliderY.disabled = true;
                sliderZ.disabled = true;
                plusX.disabled = true;
                minusX.disabled = true;
                plusY.disabled = true;
                minusY.disabled = true;
                plusZ.disabled = true;
                minusZ.disabled = true;
            } else { // status === 'inactive'
                activateBtn.disabled = false;
                deactivateBtn.disabled = true;
                motionStatus.textContent = t.status_inactive;
                motionStatus.style.color = '#fff';
                motionStatus.style.backgroundColor = '#006400';
                sliderX.disabled = false;
                sliderY.disabled = false;
                sliderZ.disabled = false;
                plusX.disabled = false;
                minusX.disabled = false;
                plusY.disabled = false;
                minusY.disabled = false;
                plusZ.disabled = false;
                minusZ.disabled = false;
            }
        }
        
        // Key change here: Ensure audio is ready to play on activation.
        activateBtn.addEventListener('click', function() {
          alertEnabled = true;
          isArmed = false; // Manual activation overrides auto-arming
          clearTimeout(idleTimer);
          updateUI('active');
          requestWakeLock();
          // This gesture satisfies the browser's autoplay policy.
          audio.load();
          audio.play().catch(e => console.log('Audio playback prevented:', e));
          audio.pause();
          audio.currentTime = 0;
        });
        
        deactivateBtn.addEventListener('click', function() {
            pinModalDeactivate.style.display = 'flex';
            pinInputDeactivate.value = '';
            pinInputDeactivate.focus();
        });
        
        pinSubmitBtnDeactivate.addEventListener('click', function() {
            const enteredPin = pinInputDeactivate.value;
            const savedSettings = JSON.parse(localStorage.getItem('motionAlertSettings'));
            const savedPin = savedSettings.securityPin;
            if(enteredPin === savedPin) {
                alertEnabled = false;
                isArmed = false;
                updateUI('inactive');
                releaseWakeLock();
                pinModalDeactivate.style.display = 'none';
                showMessageModal(translations[currentLang].modal_pin_title, translations[currentLang].deactivation_success);
            } else {
                showMessageModal(translations[currentLang].modal_pin_title, translations[currentLang].incorrect_pin);
                pinInputDeactivate.value = '';
            }
        });
        
        let lastAlertTime = 0;
        const alertCooldown = 3000; // 3 seconds cooldown.
        
        window.addEventListener('devicemotion', function(event) {
            // Reset the idle timer on every motion
            resetIdleTimer();
            
            if (!alertEnabled && !isArmed) return;

            let acc = event.accelerationIncludingGravity;
            let currentTime = Date.now();

            if ((Math.abs(acc.x) > currentThreshold.x || 
                Math.abs(acc.y) > currentThreshold.y || 
                Math.abs(acc.z) > currentThreshold.z)) {
                
                if (alertEnabled && (currentTime - lastAlertTime > alertCooldown)) {
                     // Manual activation with cooldown
                    lastAlertTime = currentTime;
                    motionStatus.textContent = '🚨 ' + translations[currentLang].motion_detected;
                    audio.play();
                    sendNotification(translations[currentLang].motion_detected);
                } else if (isArmed) {
                    // First motion after auto-arming
                    alertEnabled = true;
                    isArmed = false;
                    updateUI('active');
                    motionStatus.textContent = '🚨 ' + translations[currentLang].motion_detected;
                    audio.play();
                    sendNotification(translations[currentLang].motion_detected);
                }
            }
        });

        // ----------------------------------------------------
        // IMPORTANT: Back Button & Power Button Prevention Logic
        // ----------------------------------------------------

        // Prevent exiting via back button
        history.pushState(null, '', location.href);
        window.onpopstate = function () {
            if (alertEnabled) {
                // If the user tries to go back while active, show the PIN modal.
                pinModalDeactivate.style.display = 'flex';
                pinInputDeactivate.value = '';
                pinInputDeactivate.focus();
                
                // Re-push the state to prevent the user from exiting on the next back press.
                history.pushState(null, '', location.href);
            } else {
                // Allow normal back navigation if not active, but still re-push to handle subsequent presses.
                history.pushState(null, '', location.href);
            }
        };

        // Handle app visibility (e.g., user locks screen or switches apps)
        document.addEventListener("visibilitychange", function() {
            if (document.visibilityState === 'hidden' && alertEnabled) {
                // The app is now in the background, trigger the alarm!
                motionStatus.textContent = '🚨 ' + translations[currentLang].visibility_alert;
                audio.play();
                sendNotification(translations[currentLang].visibility_alert);
            }
        });

        // ----------------------------------------------------
        // End of Back Button & Power Button Prevention Logic
        // ----------------------------------------------------
        
        loadSettings();
        updateUI('inactive');
        requestNotificationPermission();
        resetIdleTimer(); // Start the idle timer initially
    }

    if (isVerifyPage) {
        const recoveryMobileInput = document.getElementById('recovery-mobile');
        const verifyMobileBtn = document.getElementById('verify-mobile-btn');
        const newPinContainer = document.getElementById('new-pin-container');
        const newRecoveryPinInput = document.getElementById('new-recovery-pin');
        const confirmRecoveryPinInput = document.getElementById('confirm-recovery-pin');
        const saveNewPinBtn = document.getElementById('save-new-pin-btn');
        const backBtn = document.getElementById('back-btn');
        const userNameInput = document.getElementById('recovery-username');

        verifyMobileBtn.addEventListener('click', () => {
            const recoveryMobile = recoveryMobileInput.value.trim();
            const userName = userNameInput.value.trim();
            const savedSettings = JSON.parse(localStorage.getItem('motionAlertSettings'));
            const savedMobileNumber = savedSettings.mobileNumber;
            const savedUserName = savedSettings.userName;

            if (recoveryMobile === savedMobileNumber && userName === savedUserName) {
                showMessageModal(translations[currentLang].h1_verify, translations[currentLang].verification_success);
                newPinContainer.style.display = 'block';
                verifyMobileBtn.disabled = true;
                recoveryMobileInput.disabled = true;
                userNameInput.disabled = true;
            } else {
                showMessageModal(translations[currentLang].h1_verify, translations[currentLang].verification_error);
            }
        });

        saveNewPinBtn.addEventListener('click', () => {
            const newPin = newRecoveryPinInput.value.trim();
            const confirmPin = confirmRecoveryPinInput.value.trim();

            if (!newPin || !confirmPin) {
                showMessageModal(translations[currentLang].h1_verify, translations[currentLang].fill_all_fields);
                return;
            }

            if (newPin !== confirmPin) {
                showMessageModal(translations[currentLang].h1_verify, translations[currentLang].pin_mismatch);
                return;
            }

            if (newPin.length < 4) {
                showMessageModal(translations[currentLang].h1_verify, translations[currentLang].pin_length_error);
                return;
            }

            const savedSettings = JSON.parse(localStorage.getItem('motionAlertSettings'));
            savedSettings.securityPin = newPin;
            localStorage.setItem('motionAlertSettings', JSON.stringify(savedSettings));

            showMessageModal(translations[currentLang].h1_verify, translations[currentLang].pin_save_success);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
 
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }
});
