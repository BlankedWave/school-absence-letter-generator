/** Translation key type representing all available translation strings */
type TranslationKey = 
  | "senderAddress"
  | "parentName"
  | "address"
  | "postcode"
  | "city"
  | "state"
  | "schoolInfo"
  | "teacherName"
  | "schoolName"
  | "includeSchoolAddress"
  | "schoolAddress"
  | "letterInfo"
  | "studentName"
  | "class"
  | "date"
  | "singleDay"
  | "dateRange"
  | "from"
  | "to"
  | "content"
  | "addContent"
  | "letterDate"
  | "attachments"
  | "uploadInstructions"
  | "optional"
  | "example"
  | "reviewPrompt"
  | "downloadDocx"
  | "downloadPdf"
  | "letterTitle"
  | "selectSignatureType"
  | "digitalSignature"
  | "manualSignature"
  | "manualSignatureNote"
  | "placeholderParentName"
  | "placeholderAddress"
  | "placeholderPostcode"
  | "placeholderCity"
  | "placeholderState"
  | "placeholderTeacherName"
  | "placeholderSchoolName"
  | "placeholderSchoolAddress"
  | "placeholderStudentName"
  | "placeholderClass"
  | "placeholderContent"
  | "schoolPostcode"
  | "schoolCity"
  | "schoolState"
  | "contentPlaceholder"
  | "additionalContentPlaceholder"
  | "fileSize"
  | "systemTitle"
  | "systemDescription"
  | "languageSelection"
  | "malayLanguage"
  | "englishLanguage"
  | "previewTitle"
  | "signature"
  | "clearSignature"
  | "saveSignature"
  | "signHere"
  | "placeholderSignature"
  | "fillRequiredFields"
  | "clearForm"
  | "privacyNotice"
  | "openSourceNotice"
  | "reportBug"

/** Translation object type with malay and english versions for each key */
type Translations = {
  [key in TranslationKey]: {
    malay: string;
    english: string;
  };
};

/** All translations for the application */
export const translations: Translations = {
  senderAddress: {
    malay: "Alamat Pengirim",
    english: "Sender's Address"
  },
  parentName: {
    malay: "Nama Ibu/Bapa",
    english: "Parent's Name"
  },
  address: {
    malay: "Alamat",
    english: "Address"
  },
  postcode: {
    malay: "Poskod",
    english: "Postcode"
  },
  city: {
    malay: "Bandar",
    english: "City"
  },
  state: {
    malay: "Negeri",
    english: "State"
  },
  schoolInfo: {
    malay: "Maklumat Sekolah",
    english: "School Information"
  },
  teacherName: {
    malay: "Nama Guru",
    english: "Teacher's Name"
  },
  schoolName: {
    malay: "Nama Sekolah",
    english: "School Name"
  },
  includeSchoolAddress: {
    malay: "Masukkan alamat sekolah dalam surat",
    english: "Include school address in letter"
  },
  schoolAddress: {
    malay: "Alamat Sekolah",
    english: "School Address"
  },
  letterInfo: {
    malay: "Maklumat Surat",
    english: "Letter Information"
  },
  studentName: {
    malay: "Nama Pelajar",
    english: "Student's Name"
  },
  class: {
    malay: "Kelas",
    english: "Class"
  },
  date: {
    malay: "Tarikh",
    english: "Date"
  },
  singleDay: {
    malay: "Satu Hari",
    english: "Single Day"
  },
  dateRange: {
    malay: "Julat Tarikh",
    english: "Date Range"
  },
  from: {
    malay: "Dari",
    english: "From"
  },
  to: {
    malay: "Hingga",
    english: "To"
  },
  content: {
    malay: "Kandungan",
    english: "Content"
  },
  addContent: {
    malay: "Tambah Kandungan",
    english: "Add Content"
  },
  letterDate: {
    malay: "Tarikh Surat",
    english: "Letter Date"
  },
  attachments: {
    malay: "Lampiran",
    english: "Attachments"
  },
  uploadInstructions: {
    malay: "Klik untuk muat naik lampiran seperti MC dan sebagainya (PDF, JPG, PNG)",
    english: "Click to upload attachments such as MC (PDF, JPG, PNG)"
  },
  optional: {
    malay: "(Pilihan)",
    english: "(Optional)"
  },
  example: {
    malay: "Contoh",
    english: "Example"
  },
  reviewPrompt: {
    malay: "Sila semak surat anda dan muat turun dalam format yang dikehendaki",
    english: "Please review your letter and download in your preferred format"
  },
  downloadDocx: {
    malay: "Muat Turun DOCX",
    english: "Download DOCX"
  },
  downloadPdf: {
    malay: "Muat Turun PDF",
    english: "Download PDF"
  },
  letterTitle: {
    malay: "Surat Tidak Hadir ke Sekolah",
    english: "School Absence Letter"
  },
  selectSignatureType: {
    malay: "Pilih jenis tandatangan",
    english: "Select signature type"
  },
  digitalSignature: {
    malay: "Tandatangan digital",
    english: "Digital signature"
  },
  manualSignature: {
    malay: "Tandatangan manual",
    english: "Manual signature"
  },
  manualSignatureNote: {
    malay: "Ruang tandatangan akan dibiarkan kosong untuk ditandatangani secara manual selepas mencetak",
    english: "Signature space will be left blank for manual signing after printing"
  },
  placeholderParentName: {
    malay: "nama ibu/bapa",
    english: "parent's name"
  },
  placeholderAddress: {
    malay: "Contoh: No 70, Jalan Sungai Isap",
    english: "Example: 70, Jalan Sungai Isap"
  },
  placeholderPostcode: {
    malay: "25150",
    english: "25150"
  },
  placeholderCity: {
    malay: "Kuantan",
    english: "Kuantan"
  },
  placeholderState: {
    malay: "Pahang Darul Makmur",
    english: "Pahang Darul Makmur"
  },
  placeholderTeacherName: {
    malay: "Contoh: Puan Aminah",
    english: "Example: Mrs. Smith"
  },
  placeholderSchoolName: {
    malay: "Contoh: SMK Bukit Rangin",
    english: "Example: SK Sungai Isap"
  },
  placeholderSchoolAddress: {
    malay: "Contoh: Jalan Permatang Badak",
    english: "Example: Permatang Badak"
  },
  placeholderStudentName: {
    malay: "Contoh: Ali bin Ahmad",
    english: "Example: John Smith Jr"
  },
  placeholderClass: {
    malay: "Contoh: 5 Bestari",
    english: "Example: 5 Bestari"
  },
  placeholderContent: {
    malay: "Contoh: Ini kerana anak saya mengalami demam dan sakit tekak dan memerlukan rehat di rumah.",
    english: "Example: This is because my child has fever and sore throat and needs rest at home."
  },
  schoolPostcode: {
    malay: "Poskod Sekolah",
    english: "School Postcode"
  },
  schoolCity: {
    malay: "Bandar Sekolah",
    english: "School City"
  },
  schoolState: {
    malay: "Negeri Sekolah",
    english: "School State"
  },
  contentPlaceholder: {
    malay: "Contoh: Ini kerana anak saya mengalami demam dan sakit tekak dan memerlukan rehat di rumah.",
    english: "Example: This is because my child has fever and sore throat and needs rest at home."
  },
  additionalContentPlaceholder: {
    malay: "[kandungan %index%]",
    english: "[content %index%]"
  },
  fileSize: {
    malay: "(%size% MB)",
    english: "(%size% MB)"
  },
  systemTitle: {
    malay: "Penjana Surat Ketidakhadiran Sekolah",
    english: "School Absence Letter Generator"
  },
  systemDescription: {
    malay: "Sila isi maklumat di bawah untuk menjana surat",
    english: "Please fill in the information below to generate your letter"
  },
  languageSelection: {
    malay: "Pilih Bahasa",
    english: "Choose Language"
  },
  malayLanguage: {
    malay: "Bahasa",
    english: "Bahasa"
  },
  englishLanguage: {
    malay: "English",
    english: "English"
  },
  previewTitle: {
    malay: "Pratonton Surat",
    english: "Letter Preview"
  },
  signature: {
    malay: "Tandatangan",
    english: "Signature"
  },
  clearSignature: {
    malay: "Padam",
    english: "Clear"
  },
  saveSignature: {
    malay: "Simpan",
    english: "Save"
  },
  signHere: {
    malay: "Tandatangan di sini",
    english: "Sign here"
  },
  placeholderSignature: {
    malay: "[tandatangan]",
    english: "[signature]"
  },
  fillRequiredFields: {
    malay: "Sila lengkapkan semua maklumat yang diperlukan untuk menjana surat",
    english: "Please fill in all required fields to generate the letter"
  },
  clearForm: {
    malay: "Kosongkan Form",
    english: "Clear Form"
  },
  privacyNotice: {
    malay: "🔒 Semua data diproses secara lokal di pelayar anda. Tiada maklumat disimpan di mana-mana pelayan.",
    english: "🔒 All data is processed locally in your browser. No information is stored on any server."
  },
  openSourceNotice: {
    malay: "Projek sumber terbuka ini boleh didapati di",
    english: "This open source project is available on"
  },
  reportBug: {
    malay: "Laporkan Pepijat",
    english: "Report Bug"
  }
};

/** 
 * Get a translated string for the given key and language
 * @param key - The translation key to look up
 * @param language - The target language (malay or english)
 * @returns The translated string
 */
export function t(key: TranslationKey, language: "malay" | "english"): string {
  return translations[key][language];
} 