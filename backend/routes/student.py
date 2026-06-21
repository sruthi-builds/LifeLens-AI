from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import Header

from sqlalchemy.orm import Session

from database.connection import SessionLocal

from database.models import StudentProfile

from routes.auth import extract_user_from_token

from schemas.profile import StudentProfileCreate


router = APIRouter()


@router.post("/profile")
def create_student_profile(

    profile: StudentProfileCreate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    existing_profile = db.query(
        StudentProfile
    ).filter(

        StudentProfile.user_id
        == payload["user_id"]

    ).first()

    if existing_profile:

        raise HTTPException(

            status_code=400,

            detail="Student profile already exists"
        )

    new_profile = StudentProfile(

        user_id=payload["user_id"],

        education_level=profile.education_level,

        field_of_study=profile.field_of_study,

        current_year=profile.current_year,

        skills=profile.skills,

        interests=profile.interests,

        career_goal=profile.career_goal
    )

    db.add(new_profile)

    db.commit()

    return {

        "message": "Student profile created"
    }


@router.get("/profile")
def get_student_profile(

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    profile = db.query(

        StudentProfile

    ).filter(

        StudentProfile.user_id
        == payload["user_id"]

    ).first()

    if not profile:

        raise HTTPException(

            status_code=404,

            detail="Student profile not found"
        )

    return {

        "education_level": profile.education_level,

        "field_of_study": profile.field_of_study,

        "current_year": profile.current_year,

        "skills": profile.skills,

        "interests": profile.interests,

        "career_goal": profile.career_goal
    }


@router.put("/profile")
def update_student_profile(

    profile: StudentProfileCreate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    existing_profile = db.query(

        StudentProfile

    ).filter(

        StudentProfile.user_id
        == payload["user_id"]

    ).first()

    if not existing_profile:

        raise HTTPException(

            status_code=404,

            detail="Student profile not found"
        )

    existing_profile.education_level = (
        profile.education_level
    )

    existing_profile.field_of_study = (
        profile.field_of_study
    )

    existing_profile.current_year = (
        profile.current_year
    )

    existing_profile.skills = (
        profile.skills
    )

    existing_profile.interests = (
        profile.interests
    )

    existing_profile.career_goal = (
        profile.career_goal
    )

    db.commit()

    return {

        "message": "Student profile updated"
    }