from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from database.connection import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )


class Profile(Base):

    __tablename__ = "profiles"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True
    )

    full_name = Column(
        String,
        nullable=False
    )

    date_of_birth = Column(
        String,
        nullable=False
    )

    country = Column(
    String,
    nullable=False
    )

    state = Column(
    String,
    nullable=False
    )

    city = Column(
    String,
    nullable=False
    )

    user_type = Column(
        String,
        nullable=False
    )