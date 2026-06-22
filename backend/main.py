from fastapi import FastAPI

from database.connection import engine
from database.connection import Base

from routes.auth import router as auth_router
from routes.student import router as student_router
from routes.jobseeker import router as jobseeker_router
from routes.working import router as working_router
from routes.senior import router as senior_router
from routes.dashboard import router as dashboard_router
from routes.planner import router as planner_router
from routes.opportunities import router as opportunities_router
from routes.ai import router as ai_router

import database.models


app = FastAPI(

    title="LifeLens AI Backend",

    description="AI-powered life assistant platform",

    version="1.0.0"

)


app.include_router(

    auth_router,

    prefix="/auth",

    tags=["Authentication"]

)

app.include_router(

    student_router,

    prefix="/student",

    tags=["Student"]

)

app.include_router(

    jobseeker_router,

    prefix="/jobseeker",

    tags=["Job Seeker"]

)

app.include_router(

    working_router,

    prefix="/working",

    tags=["Working Professional"]

)

app.include_router(

    senior_router,

    prefix="/senior",

    tags=["Senior Citizen"]

)

app.include_router(

    dashboard_router,

    prefix="/dashboard",

    tags=["Dashboard"]

)

app.include_router(

    planner_router,

    prefix="/planner",

    tags=["Planner"]

)

app.include_router(

    opportunities_router,

    prefix="/opportunities",

    tags=["Opportunities"]

)

app.include_router(

    ai_router,

    prefix="/ai",

    tags=["AI"]

)


Base.metadata.create_all(bind=engine)


@app.get("/")
def health_check():

    return {

        "status": "running",

        "service": "LifeLens Backend"

    }