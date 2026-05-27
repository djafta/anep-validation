export type CertificateData = {
  certificate: {
    ANEP: InstitutionInfo;
    certification: CertificationInfo;
    IEP: InstitutionInfo;
    modules: Module[];
    trainee: TraineeInfo;
  };
  generatedDate: string; // YYYYMMDD
  status: "VALID" | string;
};

export type InstitutionInfo = {
  address: string;
  addressLocale: string;
  email: string;
  id: number;
  managerName: string;
  managerPos: string;
  name: string;
  telephoneNumber: string;
};

export type CertificationInfo = {
  achievedStatus: string;
  completionYear: number;
  institution: string;
  number: string;
  qualificationLevel: string;
  title: string;
};

export type Module = {
  ects: number;
  id: string;
  order: number;
  title: string;
};

export type TraineeInfo = {
  birthDate: string; // YYYYMMDD
  birthPlace: string;
  employeeNumber: string;
  fathersName: string;
  mothersName: string;
  name: string;
  PersonID: string;
};