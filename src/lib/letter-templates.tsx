import React from 'react'

interface LetterData {
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
  // Parent address
  address: string
  postcode: string
  city: string
  state: string
  // School address
  schoolAddress: string
  schoolPostcode: string
  schoolCity: string
  schoolState: string
  includeSchoolAddress: boolean
  letterDate: string
  contents: string[]
}

interface TemplateSection {
  id: string
  label: { malay: string; english: string }
  defaultText: { malay: string; english: string }
  content: string
}

const malayMonths = [
  'Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun',
  'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'
];

const formatDate = (dateString: string, language: "malay" | "english" = "malay"): string => {
  if (!dateString) {
    return "[tarikh surat]"
  }
  const date = new Date(dateString)
  const day = date.getDate()
  const month = language === "malay" 
    ? malayMonths[date.getMonth()]
    : date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

// Helper function to handle empty fields with placeholders
const getFieldWithPlaceholder = (value: string, placeholder: string) => {
  return value.trim() ? value : `[${placeholder}]`
}

// Helper function to format absence date text
const getAbsenceDateText = (data: LetterData, language: "malay" | "english"): string => {
  if (data.dateType === "single") {
    return data.singleDate ? formatDate(data.singleDate, language) : language === "malay" ? "[tarikh]" : "[date]"
  }
  
  const startText = data.startDate ? formatDate(data.startDate, language) : language === "malay" ? "[tarikh mula]" : "[start date]"
  const endText = data.endDate ? formatDate(data.endDate, language) : language === "malay" ? "[tarikh akhir]" : "[end date]"
  const connector = language === "malay" ? "hingga" : "to"
  
  return `${startText} ${connector} ${endText}`
}

interface LetterTemplateProps {
  data: LetterData
  sections: TemplateSection[]
}

export function MalayLetterTemplate({ data, sections }: LetterTemplateProps) {
  const recipient = data.teacherName.trim() ? data.teacherName : "Guru Bertugas"
  const school = getFieldWithPlaceholder(data.schoolName, "nama sekolah")
  const closing = sections.find(s => s.id === "closing")
  
  const dateText = getAbsenceDateText(data, "malay")
  const letterDate = data.letterDate ? formatDate(data.letterDate, "malay") : "[tarikh surat]"

  return (
    <>
      <div className="address">
        <strong>{getFieldWithPlaceholder(data.parentName, "nama ibu/bapa")}</strong><br />
        {getFieldWithPlaceholder(data.address, "alamat")}<br />
        {getFieldWithPlaceholder(data.postcode, "poskod")}, {getFieldWithPlaceholder(data.city, "bandar")}<br />
        {getFieldWithPlaceholder(data.state, "negeri")}
      </div>

      <hr className="divider" />

      <div className="recipient-section">
        <div className="recipient-address">
          <strong>{recipient}</strong><br />
          {data.includeSchoolAddress ? (
            <>
              {school}<br />
              {getFieldWithPlaceholder(data.schoolAddress, "alamat sekolah")}<br />
              {getFieldWithPlaceholder(data.schoolPostcode, "poskod")}, {getFieldWithPlaceholder(data.schoolCity, "bandar")}<br />
              <div className="flex justify-between">
                <div>{getFieldWithPlaceholder(data.schoolState, "negeri")}</div>
                <div className="date">{letterDate}</div>
              </div>
            </>
          ) : (
            <div className="flex justify-between">
              <div>{school}</div>
              <div className="date">{letterDate}</div>
            </div>
          )}
        </div>
      </div>

      <div>Tuan/Puan,</div>

      <div className="subject">
        PER: TIDAK HADIR SESI PERSEKOLAHAN PADA {dateText.toUpperCase()}
      </div>

      <div className="content">
        Merujuk kepada perkara diatas, saya, <strong>{getFieldWithPlaceholder(data.parentName, "nama ibu/bapa")}</strong>, ibu/bapa/penjaga kepada <strong>{getFieldWithPlaceholder(data.studentName, "nama pelajar")}</strong> dari kelas <strong>{getFieldWithPlaceholder(data.className, "kelas")}</strong> ingin menjelaskan sebab anak jagaan saya tidak dapat menghadirkan diri ke sekolah pada {dateText}.
      </div>

      {data.contents.map((content: string, index: number) => (
        <div key={index} className="content">
          {index + 2}. {content.trim() ? content : `[kandungan ${index + 1}]`}
        </div>
      ))}

      <div className="content">
        {closing?.content || "Kerjasama Tuan/Puan amatlah saya hargai"}
      </div>

      <div className="content">
        Sekian, terima kasih.
      </div>

      <div className="signature">
        Yang benar,
      </div>
    </>
  )
}

export function EnglishLetterTemplate({ data, sections }: LetterTemplateProps) {
  const recipient = data.teacherName.trim() ? data.teacherName : "Teacher on Duty"
  const school = getFieldWithPlaceholder(data.schoolName, "school name")
  const closing = sections.find(s => s.id === "closing")
  
  const dateText = getAbsenceDateText(data, "english")
  const letterDate = data.letterDate ? formatDate(data.letterDate, "english") : "[letter date]"

  return (
    <>
      <div className="address">
        <strong>{getFieldWithPlaceholder(data.parentName, "parent's name")}</strong><br />
        {getFieldWithPlaceholder(data.address, "address")}<br />
        {getFieldWithPlaceholder(data.postcode, "postcode")}, {getFieldWithPlaceholder(data.city, "city")}<br />
        {getFieldWithPlaceholder(data.state, "state")}
      </div>

      <hr className="divider" />

      <div className="recipient-section">
        <div className="recipient-address">
          <strong>{recipient}</strong><br />
          {data.includeSchoolAddress ? (
            <>
              {school}<br />
              {getFieldWithPlaceholder(data.schoolAddress, "school address")}<br />
              {getFieldWithPlaceholder(data.schoolPostcode, "postcode")}, {getFieldWithPlaceholder(data.schoolCity, "city")}<br />
              <div className="flex justify-between">
                <div>{getFieldWithPlaceholder(data.schoolState, "state")}</div>
                <div className="date">{letterDate}</div>
              </div>
            </>
          ) : (
            <div className="flex justify-between">
              <div>{school}</div>
              <div className="date">{letterDate}</div>
            </div>
          )}
        </div>
      </div>

      <div>Sir/Madam,</div>

      <div className="subject">
        NOTIFICATION OF SCHOOL ABSENCE ON {dateText.toUpperCase()}
      </div>

      <div className="content">
        I would like to inform that my child <strong>{getFieldWithPlaceholder(data.studentName, "student's name")}</strong> from class <strong>{getFieldWithPlaceholder(data.className, "class")}</strong> will not be able to attend school on {dateText}.
      </div>

      {data.contents.map((content: string, index: number) => (
        <div key={index} className="content">
          {index + 2}. {content.trim() ? content : `[content ${index + 1}]`}
        </div>
      ))}

      <div className="content">
        {closing?.content || "Your cooperation is highly appreciated"}
      </div>

      <div className="content">
        Thank you.
      </div>

      <div className="signature">
        Yours sincerely,
      </div>
    </>
  )
} 