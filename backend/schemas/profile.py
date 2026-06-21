from pydantic import BaseModel


class StudentProfileCreate(BaseModel):

    education_level: str

    field_of_study: str

    current_year: str

    skills: str

    interests: str

    career_goal: str


class JobSeekerProfileCreate(BaseModel):

    qualification: str

    experience: str

    target_role: str


class WorkingProfileCreate(BaseModel):

    job_title: str

    organization: str

    experience: str

    skills: str

    career_goal: str


class SeniorProfileCreate(BaseModel):

    medicine_reminders: str

    emergency_contacts: str

    medical_reports: str