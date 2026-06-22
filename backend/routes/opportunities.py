from fastapi import APIRouter
from fastapi import Header

from sqlalchemy.orm import Session

from database.connection import SessionLocal

from database.models import Opportunity
from database.models import Profile

from schemas.opportunity import OpportunityCreate

from routes.auth import extract_user_from_token


router = APIRouter()


@router.post("/")
def create_opportunity(
    opportunity: OpportunityCreate
):

    db: Session = SessionLocal()

    new_opportunity = Opportunity(

        title=opportunity.title,

        category=opportunity.category,

        description=opportunity.description,

        age_min=opportunity.age_min,

        age_max=opportunity.age_max,

        education_required=opportunity.education_required,

        documents_required=opportunity.documents_required,

        benefits=opportunity.benefits,

        application_start=opportunity.application_start,

        application_end=opportunity.application_end,

        official_link=opportunity.official_link,

        target_user_type=opportunity.target_user_type
    )

    db.add(new_opportunity)

    db.commit()

    return {

        "message": "Opportunity created"

    }


@router.get("/")
def get_all_opportunities():

    db: Session = SessionLocal()

    opportunities = db.query(

        Opportunity

    ).all()

    response = []

    for item in opportunities:

        response.append(

            {

                "id": item.id,

                "title": item.title,

                "category": item.category,

                "description": item.description,

                "application_end": item.application_end

            }

        )

    return response


@router.get("/recommended")
def get_recommended(

    authorization: str = Header(None)

):

    payload = extract_user_from_token(

        authorization

    )

    db: Session = SessionLocal()

    profile = db.query(

        Profile

    ).filter(

        Profile.user_id == payload["user_id"]

    ).first()

    if not profile:

        return []

    user_type = profile.user_type

    opportunities = db.query(

        Opportunity

    ).filter(

        Opportunity.target_user_type == user_type

    ).all()

    response = []

    for item in opportunities:

        response.append(

            {

                "id": item.id,

                "title": item.title,

                "category": item.category,

                "description": item.description,

                "application_end": item.application_end,

                "official_link": item.official_link

            }

        )

    return response