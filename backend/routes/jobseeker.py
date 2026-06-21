from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import Header

from sqlalchemy.orm import Session

from database.connection import SessionLocal

from database.models import JobSeekerProfile

from routes.auth import extract_user_from_token

from schemas.profile import JobSeekerProfileCreate


router = APIRouter()


@router.post("/profile")
def create_jobseeker_profile(

    profile: JobSeekerProfileCreate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    existing_profile = db.query(
        JobSeekerProfile
    ).filter(

        JobSeekerProfile.user_id
        == payload["user_id"]

    ).first()

    if existing_profile:

        raise HTTPException(

            status_code=400,

            detail="Job seeker profile already exists"
        )

    new_profile = JobSeekerProfile(

        user_id=payload["user_id"],

        qualification=profile.qualification,

        experience=profile.experience,

        target_role=profile.target_role
    )

    db.add(new_profile)

    db.commit()

    return {

        "message": "Job seeker profile created"
    }


@router.get("/profile")
def get_jobseeker_profile(

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    profile = db.query(

        JobSeekerProfile

    ).filter(

        JobSeekerProfile.user_id
        == payload["user_id"]

    ).first()

    if not profile:

        raise HTTPException(

            status_code=404,

            detail="Job seeker profile not found"
        )

    return {

        "qualification": profile.qualification,

        "experience": profile.experience,

        "target_role": profile.target_role
    }


@router.put("/profile")
def update_jobseeker_profile(

    profile: JobSeekerProfileCreate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    existing_profile = db.query(

        JobSeekerProfile

    ).filter(

        JobSeekerProfile.user_id
        == payload["user_id"]

    ).first()

    if not existing_profile:

        raise HTTPException(

            status_code=404,

            detail="Job seeker profile not found"
        )

    existing_profile.qualification = (
        profile.qualification
    )

    existing_profile.experience = (
        profile.experience
    )

    existing_profile.target_role = (
        profile.target_role
    )

    db.commit()

    return {

        "message": "Job seeker profile updated"
    }