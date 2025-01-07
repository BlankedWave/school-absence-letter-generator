import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FormData } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isLetterValid(formData: FormData): boolean {
  const requiredFields = [
    formData.parentName,
    formData.address,
    formData.postcode,
    formData.city,
    formData.state,
    formData.schoolName,
    formData.studentName,
    formData.className,
    formData.letterDate,
  ];

  // Check if all required fields are filled
  const hasAllRequiredFields = requiredFields.every(field => field.trim() !== '');

  // Check if at least one content item is filled
  const hasContent = formData.contents.some(content => content.trim() !== '');

  // Check if date is valid based on dateType
  const hasValidDate = formData.dateType === 'single' 
    ? !!formData.singleDate
    : (!!formData.startDate && !!formData.endDate);

  // If school address is included, check those fields too
  const hasValidSchoolAddress = !formData.includeSchoolAddress || (
    formData.schoolAddress.trim() !== '' &&
    formData.schoolPostcode.trim() !== '' &&
    formData.schoolCity.trim() !== '' &&
    formData.schoolState.trim() !== ''
  );

  return hasAllRequiredFields && hasContent && hasValidDate && hasValidSchoolAddress;
}
