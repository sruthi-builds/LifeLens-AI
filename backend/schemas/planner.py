from pydantic import BaseModel


class PlannerTaskCreate(BaseModel):

    title: str

    description: str

    due_date: str


class PlannerTaskUpdate(BaseModel):

    title: str

    description: str

    due_date: str

    status: str