import { format } from "date-fns"
import { TemplateSection } from "@/types"

export const DEFAULT_TEMPLATE_SECTIONS: TemplateSection[] = [
  {
    id: "secondItem",
    label: { 
      malay: "Perkara Kedua", 
      english: "Second Item" 
    },
    defaultText: {
      malay: "",
      english: ""
    },
    content: "",
    paragraphs: []
  },
  {
    id: "thirdItem",
    label: { 
      malay: "Perkara Ketiga", 
      english: "Third Item" 
    },
    defaultText: {
      malay: "Saya berharap pihak sekolah dapat memberi pertimbangan dan kerjasama dalam perkara ini.",
      english: "I hope the school can give consideration and cooperation in this matter."
    },
    content: "",
    paragraphs: []
  },
  {
    id: "closing",
    label: { 
      malay: "Penutup", 
      english: "Closing" 
    },
    defaultText: {
      malay: "Kerjasama Tuan / Puan didahului dengan ucapan terima kasih.",
      english: "Thank you."
    },
    content: "",
    paragraphs: []
  }
]

export const DEFAULT_CONTENT = {
  malay: "Ini kerana anak saya mengalami demam dan sakit tekak dan memerlukan rehat di rumah.",
  english: "This is because my child has fever and sore throat and needs rest at home."
}

export const getInitialFormData = (language: "malay" | "english") => ({
  parentName: "",
  studentName: "",
  className: "",
  teacherName: "",
  schoolName: "",
  reason: "",
  dateType: "single" as const,
  singleDate: format(new Date(), "yyyy-MM-dd"),
  startDate: format(new Date(), "yyyy-MM-dd"),
  endDate: format(new Date(), "yyyy-MM-dd"),
  signature: "",
  address: "",
  postcode: "",
  city: "",
  state: "",
  schoolAddress: "",
  schoolPostcode: "",
  schoolCity: "",
  schoolState: "",
  includeSchoolAddress: false,
  letterDate: format(new Date(), "yyyy-MM-dd"),
  contents: [DEFAULT_CONTENT[language]],
  attachments: [],
}) 