from fastapi import FastAPI

from database.connection import engine
from database.connection import Base
from routes.auth import router as auth_router

import database.models

app = FastAPI()

app.include_router(auth_router, prefix="/auth")

Base.metadata.create_all(bind=engine)


@app.get("/")
def health_check():
    return {
        "status": "running",
        "service": "LifeLens Backend"
    }