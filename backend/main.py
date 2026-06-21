from fastapi import FastAPI

from database.connection import engine
from database.connection import Base
from routes.auth import router as auth_router
from routes.student import router as student_router
from routes.jobseeker import router as jobseeker_router
from routes.working import router as working_router
from routes.senior import router as senior_router

import database.models

app = FastAPI()

app.include_router(auth_router, prefix="/auth")
app.include_router(student_router, prefix="/student")
app.include_router(jobseeker_router, prefix="/jobseeker")
app.include_router(working_router, prefix="/working")
app.include_router(senior_router, prefix="/senior")

Base.metadata.create_all(bind=engine)


@app.get("/")
def health_check():
    return {
        "status": "running",
        "service": "LifeLens Backend"
    }