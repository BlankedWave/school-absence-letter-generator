export interface TemplateSection {
  id: string
  label: { malay: string; english: string }
  defaultText: { malay: string; english: string }
  content: string
  paragraphs: any[]
}

export interface FormData {
  parentName: string
  studentName: string
  className: string
  teacherName: string
  schoolName: string
  reason: string
  dateType: "single" | "range"
  singleDate: string
  startDate: string
  endDate: string
  signature: string
  address: string
  postcode: string
  city: string
  state: string
  schoolAddress: string
  schoolPostcode: string
  schoolCity: string
  schoolState: string
  includeSchoolAddress: boolean
  letterDate: string
  contents: string[]
  attachments: File[]
}

export type Language = "malay" | "english" 