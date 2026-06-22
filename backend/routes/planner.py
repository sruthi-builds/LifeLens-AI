from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import Header

from sqlalchemy.orm import Session

from database.connection import SessionLocal

from database.models import PlannerTask

from routes.auth import extract_user_from_token

from schemas.planner import (
    PlannerTaskCreate,
    PlannerTaskUpdate
)


router = APIRouter()


@router.post("/task")
def create_task(

    task: PlannerTaskCreate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    new_task = PlannerTask(

        user_id=payload["user_id"],

        title=task.title,

        description=task.description,

        due_date=task.due_date,

        status="pending"
    )

    db.add(new_task)

    db.commit()

    return {

        "message": "Task created"
    }


@router.get("/tasks")
def get_tasks(

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    tasks = db.query(

        PlannerTask

    ).filter(

        PlannerTask.user_id
        == payload["user_id"]

    ).all()

    response = []

    for task in tasks:

        response.append(

            {

                "id": task.id,

                "title": task.title,

                "description": task.description,

                "due_date": task.due_date,

                "status": task.status
            }

        )

    return response


@router.put("/task/{task_id}")
def update_task(

    task_id: int,

    task: PlannerTaskUpdate,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    existing_task = db.query(

        PlannerTask

    ).filter(

        PlannerTask.id == task_id,

        PlannerTask.user_id
        == payload["user_id"]

    ).first()

    if not existing_task:

        raise HTTPException(

            status_code=404,

            detail="Task not found"
        )

    existing_task.title = (
        task.title
    )

    existing_task.description = (
        task.description
    )

    existing_task.due_date = (
        task.due_date
    )

    existing_task.status = (
        task.status
    )

    db.commit()

    return {

        "message": "Task updated"
    }


@router.delete("/task/{task_id}")
def delete_task(

    task_id: int,

    authorization: str = Header(None)

):

    payload = extract_user_from_token(
        authorization
    )

    db: Session = SessionLocal()

    existing_task = db.query(

        PlannerTask

    ).filter(

        PlannerTask.id == task_id,

        PlannerTask.user_id
        == payload["user_id"]

    ).first()

    if not existing_task:

        raise HTTPException(

            status_code=404,

            detail="Task not found"
        )

    db.delete(existing_task)

    db.commit()

    return {

        "message": "Task deleted"
    }