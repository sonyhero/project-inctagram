export type LocaleType = typeof en

export const en = {
  zodSchema: {
    minNumberOfCharacters: 'Minimum number of characters: ',
    maxNumberOfCharacters: 'Maximum number of characters: ',
    userNameRegex: 'Must contain only A-Z, a-z, 0-9, dash and underscores',
    firstLastNameRegex: 'Must contain only A-Z, a-z, А-Я, а-я',
    email: 'The email must match the format example@example.com',
    passwordRegex: 'Password must contain ',
    passwordRefine: 'Passwords must match',
    termsConfirm: 'Confirm terms',
  },
  toast: {
    success: 'Success!',
    fetchError: 'Network error',
  },
  header: {
    inctagram: 'Inctagram',
    ru: 'Русский',
    en: 'English',
  },
  sidebar: {
    home: 'Home',
    create: 'Create',
    myProfile: 'My Profile',
    messenger: 'Messenger',
    search: 'Search',
    statistics: 'Statistics',
    favorites: 'Favorites',
    logout: 'Log Out',
    logoutModalDescription: 'Are you really want to log out of your account',
    yes: 'Yes',
    no: 'No',
  },
  myProfile: {
    tabs: {
      generalInformation: 'General information',
      devices: 'Devices',
      accountManagement: 'Account Management',
      myPayments: 'My payments',
    },
    generalInformation: {
      userName: 'Username',
      placeholderUserName: 'enter your username',
      firstName: 'First Name',
      placeholderFirstName: 'enter your first name',
      lastName: 'Last Name',
      placeholderLastName: 'enter your last name',
      dateOfBirth: 'Date of birth',
      month: {
        jan: 'January',
        feb: 'February',
        mar: 'March',
        apr: 'April',
        may: 'May',
        jun: 'June',
        jul: 'July',
        aug: 'August',
        sep: 'September',
        oct: 'October',
        nov: 'November',
        dec: 'December',
      },
      placeholderDateOfBirth: 'dd.mm.yyyy',
      selectYourCity: 'Select your city',
      cities: {
        minsk: 'Minsk',
        grodno: 'Grodno',
        brest: 'Brest',
      },
      placeholderCity: 'City',
      aboutMe: 'About me',
      placeholderAboutMe: 'tell us about yourself',
      saveChanges: 'Save Changes',
      addAProfilePhoto: 'Add a Profile Photo',
      photoModal: {
        addAProfilePhoto: 'Add a Profile Photo',
        errorType: 'The format of photo must be PNG or JPEG',
        errorSize: 'Photo size must be less than 10 MB',
        errorZeroSize: 'Photo size must be more than 0 MB',
        errorBrokenFile: 'Something wrong with your file, please try another one',
        selectFromComputer: 'Select from computer',
        save: 'Save',
      },
      deletePhotoModal: {
        deletePhoto: 'Delete Photo',
        areYouSure: 'Are you sure you want to delete the photo?',
        yes: 'Yes',
        no: 'No',
      },
    },
    profilePage: {
      following: 'Following',
      followers: 'Followers',
      publications: 'Publications',
      profileSettings: 'Profile Settings',
    },
  },
  auth: {
    signIn: {
      signIn: 'Sign In',
      email: 'Email',
      signInServerError: 'The email or password are incorrect. Try again please',
      password: 'Password',
      passwordPlaceholder: 'enter your password',
      forgotPassword: 'Forgot password',
      question: `Don't have an account?`,
      signUp: 'Sign Up',
    },
    signUp: {
      signUp: 'Sign Up',
      userName: 'User name',
      userNamePlaceholder: 'enter your username',
      userNameExistError: 'User with this username is already registered',
      email: 'Email',
      emailPlaceholder: 'enter your email',
      emailExistError: 'User with this email is already registered',
      password: 'Password',
      passwordPlaceholder: 'enter your password',
      passwordConfirmation: 'Password confirmation',
      passwordConfirmationPlaceholder: 'enter your password again',
      forgotPassword: 'Forgot password',
      checkboxOneChart: 'I agree to the',
      termsOfService: 'Terms of Service',
      checkboxTwoChart: 'and',
      privacyPolicy: 'Privacy Policy',
      question: `Do you have an account?`,
      signIn: 'Sign In',
      modal: 'Email sent',
      modalDescription: 'We have sent a link to confirm your email to',
    },
    forgotPassword: {
      forgotPassword: 'Forgot Password',
      email: 'Email',
      description: 'Enter your email address and we will send you further instructions',
      sendLink: 'Send Link',
      backToSignIn: 'Back to Sign In',
      modal: 'Email sent',
      modalDescription: 'We have sent a link to confirm your email to',
    },
    createNewPassword: {
      newPassword: 'New password',
      newPasswordPlaceholder: 'enter your password',
      passwordConfirmation: 'Password confirmation',
      passwordConfirmationPlaceholder: 'enter your password again',
      description: 'Your password must be between 6 and 20 characters',
      createNewPassword: 'Create new password',
    },
    badRecoveryLink: {
      linkExpired: 'Email verification link expired',
      description:
        'Looks like the verification link has expired. Not to worry, we can send the link again',
      resendLink: 'Resend link',
    },
    congratulations: {
      congratulations: 'Congratulations!',
      description: 'Your email has been confirmed',
      signIn: 'Sign In',
    },
    privacy: {
      backToSignUp: 'Back to Sign Up',
    },
    error404: {
      pageNotFound: 'Sorry! Page not found!',
      backToMain: 'Back to main',
    },
  },
}
