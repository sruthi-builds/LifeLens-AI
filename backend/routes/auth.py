from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from schemas.auth import UserRegister, UserLogin
from database.connection import SessionLocal
from database.models import User
from utils.security import hash_password, verify_password
from utils.jwt_handler import create_access_token

router = APIRouter()


@router.post("/register")
def register(user: UserRegister):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(user.password)

    new_user = User(
        email=user.email,
        password_hash=hashed_password
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "User registered successfully"
    }

@router.post("/login")
def login(user: UserLogin):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        existing_user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        data={
            "email": existing_user.email,
            "user_id": existing_user.id
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }