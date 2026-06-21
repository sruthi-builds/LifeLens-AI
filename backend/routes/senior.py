from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import Header

from sqlalchemy.orm import Session

from database.connection import SessionLocal

from database.models import SeniorProfile

from routes.auth import extract_user_from_token

from schemas.profile import SeniorProfileCreate


router = APIRouter()


@router.post("/profile")
def create_senior_profile(

    profile: SeniorProfileCreate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    existing_profile = db.query(
        SeniorProfile
    ).filter(

        SeniorProfile.user_id
        == payload["user_id"]

    ).first()

    if existing_profile:

        raise HTTPException(

            status_code=400,

            detail="Senior profile already exists"
        )

    new_profile = SeniorProfile(

        user_id=payload["user_id"],

        medicine_reminders=profile.medicine_reminders,

        emergency_contacts=profile.emergency_contacts,

        medical_reports=profile.medical_reports
    )

    db.add(new_profile)

    db.commit()

    return {

        "message": "Senior profile created"
    }


@router.get("/profile")
def get_senior_profile(

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    profile = db.query(

        SeniorProfile

    ).filter(

        SeniorProfile.user_id
        == payload["user_id"]

    ).first()

    if not profile:

        raise HTTPException(

            status_code=404,

            detail="Senior profile not found"
        )

    return {

        "medicine_reminders": profile.medicine_reminders,

        "emergency_contacts": profile.emergency_contacts,

        "medical_reports": profile.medical_reports
    }


@router.put("/profile")
def update_senior_profile(

    profile: SeniorProfileCreate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    existing_profile = db.query(

        SeniorProfile

    ).filter(

        SeniorProfile.user_id
        == payload["user_id"]

    ).first()

    if not existing_profile:

        raise HTTPException(

            status_code=404,

            detail="Senior profile not found"
        )

    existing_profile.medicine_reminders = (
        profile.medicine_reminders
    )

    existing_profile.emergency_contacts = (
        profile.emergency_contacts
    )

    existing_profile.medical_reports = (
        profile.medical_reports
    )

    db.commit()

    return {

        "message": "Senior profile updated"
    }