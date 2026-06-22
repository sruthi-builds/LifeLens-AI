import random

import string
from fastapi import APIRouter, HTTPException, Header
from sqlalchemy.orm import Session

from schemas.auth import (
    UserRegister,
    UserLogin,
    ProfileUpdate
)
from database.connection import SessionLocal
from database.models import User, Profile
from utils.security import hash_password, verify_password
from utils.jwt_handler import (
    create_access_token,
    verify_token
)

router = APIRouter()


@router.post("/register")
def register(user: UserRegister):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(
        user.password
    )

    new_user = User(
        email=user.email,
        password_hash=hashed_password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    new_profile = Profile(

        user_id=new_user.id,

        full_name=user.full_name,

        date_of_birth=user.date_of_birth,

        country=user.country,

        state=user.state,

        city=user.city,

        user_type=user.user_type
    )

    db.add(new_profile)

    db.commit()

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(user: UserLogin):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        existing_user.password_hash
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        data={
            "email": existing_user.email,
            "user_id": existing_user.id
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

def extract_user_from_token(
    authorization: str
):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(token)

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return payload

@router.get("/me")
def get_current_user(
    authorization: str = Header(None)
):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(token)

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return {
        "user_id": payload["user_id"],
        "email": payload["email"]
    }

@router.get("/profile")
def get_profile(
    authorization: str = Header(None)
):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    profile = db.query(Profile).filter(

        Profile.user_id == payload["user_id"]

    ).first()

    if not profile:

        raise HTTPException(

            status_code=404,

            detail="Profile not found"
        )

    return {

        "full_name": profile.full_name,

        "date_of_birth": profile.date_of_birth,

        "country": profile.country,

        "state": profile.state,

        "city": profile.city,

        "user_type": profile.user_type
    }

@router.put("/profile")
def update_profile(

    profile_data: ProfileUpdate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    profile = db.query(Profile).filter(

        Profile.user_id == payload["user_id"]

    ).first()

    if not profile:

        raise HTTPException(

            status_code=404,

            detail="Profile not found"
        )

    profile.full_name = profile_data.full_name

    profile.country = profile_data.country

    profile.state = profile_data.state

    profile.city = profile_data.city

    profile.user_type = profile_data.user_type

    db.commit()

    return {

        "message": "Profile updated successfully"
    }

@router.post("/forgot-password")
def forgot_password(

    email: str

):

    db: Session = SessionLocal()

    user = db.query(

        User

    ).filter(

        User.email == email

    ).first()

    if not user:

        return {

            "message":

            "User not found"

        }

    temp_password = "".join(

        random.choices(

            string.ascii_letters +

            string.digits,

            k=8

        )

    )

    user.password_hash = hash_password(

        temp_password

    )

    db.commit()

    return {

        "message":

        "Temporary password generated",

        "temporary_password":

        temp_password

    }