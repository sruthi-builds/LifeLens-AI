from pydantic import BaseModel


class OpportunityCreate(BaseModel):

    title: str

    category: str

    description: str

    age_min: int

    age_max: int

    education_required: str

    documents_required: str

    benefits: str

    application_start: str

    application_end: str

    official_link: str

    target_user_type: str