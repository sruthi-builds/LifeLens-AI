from pydantic import BaseModel


class UserRegister(BaseModel):

    email: str

    password: str

    full_name: str

    date_of_birth: str

    location: str

    user_type: str


class UserLogin(BaseModel):
    email: str
    password: str