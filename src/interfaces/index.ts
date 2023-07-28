export interface IPatient {
  id: string | null,
  pet: string,
  owner: string,
  email: string,
  high: string,
  symptoms: string,
}

export interface IAlert {
  type: string,
  message: string
}