// Simple i18n implementation - you can replace with next-i18next or similar
export const i18n = {
  en: {
    validation: {
      required: "This field is required",
      email: "Invalid email address",
      password: {
        minLength: "Password must be at least 6 characters",
        pattern:
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      },
      confirmPassword: "Passwords do not match",
    },
    form: {
      fullname: "Full Name",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      joinNow: "JOIN NOW",
      creatingAccount: "Creating Your Elite Account...",
      alreadyHaveAccount: "Already have an account?",
      signIn: "Sign in",
      orSignInWith: "Or sign in with",
      continueWithGoogle: "Continue with Google",
    },
    messages: {
      registrationSuccess: "Registration successful! Redirecting to login...",
      registrationFailed: "Registration failed",
    },
  },
  fr: {
    validation: {
      required: "Ce champ est requis",
      email: "Adresse email invalide",
      password: {
        minLength: "Le mot de passe doit contenir au moins 6 caractères",
        pattern:
          "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule et un chiffre",
      },
      confirmPassword: "Les mots de passe ne correspondent pas",
    },
    form: {
      fullname: "Nom Complet",
      email: "Adresse Email",
      password: "Mot de Passe",
      confirmPassword: "Confirmer le Mot de Passe",
      joinNow: "REJOINDRE MAINTENANT",
      creatingAccount: "Création de votre compte élite...",
      alreadyHaveAccount: "Vous avez déjà un compte?",
      signIn: "Se connecter",
      orSignInWith: "Ou se connecter avec",
      continueWithGoogle: "Continuer avec Google",
    },
    messages: {
      registrationSuccess:
        "Inscription réussie! Redirection vers la connexion...",
      registrationFailed: "Échec de l'inscription",
    },
  },
  ar: {
    validation: {
      required: "هذا الحقل مطلوب",
      email: "عنوان بريد إلكتروني غير صالح",
      password: {
        minLength: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
        pattern:
          "يجب أن تحتوي كلمة المرور على حرف صغير وحرف كبير ورقم واحد على الأقل",
      },
      confirmPassword: "كلمات المرور غير متطابقة",
    },
    form: {
      fullname: "الاسم الكامل",
      email: "عنوان البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      joinNow: "انضم الآن",
      creatingAccount: "جاري إنشاء حسابك النخبوي...",
      alreadyHaveAccount: "هل لديك حساب بالفعل؟",
      signIn: "تسجيل الدخول",
      orSignInWith: "أو سجل الدخول باستخدام",
      continueWithGoogle: "المتابعة باستخدام Google",
    },
    messages: {
      registrationSuccess:
        "تم التسجيل بنجاح! يتم التوجيه إلى صفحة تسجيل الدخول...",
      registrationFailed: "فشل التسجيل",
    },
  },
};

export type Language = keyof typeof i18n;
export const defaultLanguage: Language = "en";

export const useTranslation = (lang: Language = defaultLanguage) => {
  return i18n[lang];
};
