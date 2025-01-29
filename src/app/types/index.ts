// ADJUSTMENT: Added a type for the Advocates being that we are using TypeScript
export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: Array<string>;
  yearsOfExperience: number;
  phoneNumber: number;
}

export interface AdvocatePaginatedResponse {
  data: Advocate[];
  nextCursor: number | null;
}
