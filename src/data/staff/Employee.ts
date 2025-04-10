export type Certification = {
    machineId: string,
    machineName: string,
    dateObtained: string,
}

export type Employee = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    dob: string,
    dateJoined: string,
    role: string
    certifications: Certification[],
    isActive: boolean
}