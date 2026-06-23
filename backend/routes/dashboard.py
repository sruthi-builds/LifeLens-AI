from fastapi import APIRouter
from fastapi import Depends

from utils.auth_dependency import get_current_user

from sqlalchemy.orm import Session

from database.connection import SessionLocal

from database.models import Profile
from database.models import PlannerTask
from database.models import Opportunity


router = APIRouter()


@router.get("/")
def get_dashboard(

    payload = Depends(get_current_user)

):

    db: Session = SessionLocal()

    profile = db.query(

        Profile

    ).filter(

        Profile.user_id == payload["user_id"]

    ).first()

    planner_tasks = db.query(

        PlannerTask

    ).filter(

        PlannerTask.user_id == payload["user_id"]

    ).all()

    opportunities = db.query(

        Opportunity

    ).filter(

        Opportunity.target_user_type
        == profile.user_type

    ).all()

    quick_tools = []

    if profile.user_type == "student":

        quick_tools = [

            "Roadmap Generator",

            "Resume Analyzer",

            "Mock Interview",

            "Skill Gap Analysis",

            "Day Planner"

        ]

    elif profile.user_type == "job-seeker":

        quick_tools = [

            "Resume Analyzer",

            "Mock Interview",

            "Skill Gap Analysis",

            "Day Planner"

        ]

    elif profile.user_type == "working":

        quick_tools = [

            "Roadmap Generator",

            "Skill Gap Analysis",

            "Day Planner"

        ]

    elif profile.user_type == "senior-citizen":

        quick_tools = [

            "Medicine Reminders",

            "Medical Reports",

            "Emergency Contacts",

            "Day Planner"

        ]

    return {

        "user_type": profile.user_type,

        "recommended_opportunities":

        [

            {

                "id": item.id,

                "title": item.title,

                "category": item.category

            }

            for item in opportunities

        ],

        "planner_tasks":

        [

            {

                "title": item.title,

                "due_date": item.due_date,

                "status": item.status

            }

            for item in planner_tasks

        ],

        "quick_tools": quick_tools

    }