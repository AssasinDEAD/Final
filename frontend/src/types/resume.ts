export interface Experience {
    company: string;
    position: string;
    duration: string;
  }
  
  export interface Skill {
    name: string;
    level: string;
  }
  
  export interface Language {
    name: string;
    proficiency: string;
  }
  
  export interface Resume {
    id?: string,
    experience: Experience[];
    skills: Skill[];
    languages: Language[];
    additionalInfo: string;
  }
  
  export interface ResumeWithUser extends Resume {
    id: string;
    User: {
      id: string;
      name: string;
      email: string;
    };
  }

  export const defaultResume: Resume = {
    experience: [],
    skills: [],
    languages: [],
    additionalInfo: "",
};
