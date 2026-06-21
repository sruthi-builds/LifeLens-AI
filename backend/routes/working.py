from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import Header

from sqlalchemy.orm import Session

from database.connection import SessionLocal

from database.models import WorkingProfile

from routes.auth import extract_user_from_token

from schemas.profile import WorkingProfileCreate


router = APIRouter()


@router.post("/profile")
def create_working_profile(

    profile: WorkingProfileCreate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    existing_profile = db.query(
        WorkingProfile
    ).filter(

        WorkingProfile.user_id
        == payload["user_id"]

    ).first()

    if existing_profile:

        raise HTTPException(

            status_code=400,

            detail="Working profile already exists"
        )

    new_profile = WorkingProfile(

        user_id=payload["user_id"],

        job_title=profile.job_title,

        organization=profile.organization,

        experience=profile.experience,

        skills=profile.skills,

        career_goal=profile.career_goal
    )

    db.add(new_profile)

    db.commit()

    return {

        "message": "Working profile created"
    }


@router.get("/profile")
def get_working_profile(

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    profile = db.query(

        WorkingProfile

    ).filter(

        WorkingProfile.user_id
        == payload["user_id"]

    ).first()

    if not profile:

        raise HTTPException(

            status_code=404,

            detail="Working profile not found"
        )

    return {

        "job_title": profile.job_title,

        "organization": profile.organization,

        "experience": profile.experience,

        "skills": profile.skills,

        "career_goal": profile.career_goal
    }


@router.put("/profile")
def update_working_profile(

    profile: WorkingProfileCreate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    existing_profile = db.query(

        WorkingProfile

    ).filter(

        WorkingProfile.user_id
        == payload["user_id"]

    ).first()

    if not existing_profile:

        raise HTTPException(

            status_code=404,

            detail="Working profile not found"
        )

    existing_profile.job_title = (
        profile.job_title
    )

    existing_profile.organization = (
        profile.organization
    )

    existing_profile.experience = (
        profile.experience
    )

    existing_profile.skills = (
        profile.skills
    )

    existing_profile.career_goal = (
        profile.career_goal
    )

    db.commit()

    return {

        "message": "Working profile updated"
    }