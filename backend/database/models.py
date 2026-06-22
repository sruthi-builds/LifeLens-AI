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

class StudentProfile(Base):

    __tablename__ = "student_profiles"

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

    education_level = Column(
        String,
        nullable=False
    )

    field_of_study = Column(
        String,
        nullable=False
    )

    current_year = Column(
        String,
        nullable=False
    )

    skills = Column(
        String,
        nullable=False
    )

    interests = Column(
        String,
        nullable=False
    )

    career_goal = Column(
        String,
        nullable=False
    )


class JobSeekerProfile(Base):

    __tablename__ = "jobseeker_profiles"

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

    qualification = Column(
        String,
        nullable=False
    )

    experience = Column(
        String,
        nullable=False
    )

    target_role = Column(
        String,
        nullable=False
    )


class WorkingProfile(Base):

    __tablename__ = "working_profiles"

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

    job_title = Column(
        String,
        nullable=False
    )

    organization = Column(
        String,
        nullable=False
    )

    experience = Column(
        String,
        nullable=False
    )

    skills = Column(
        String,
        nullable=False
    )

    career_goal = Column(
        String,
        nullable=False
    )


class SeniorProfile(Base):

    __tablename__ = "senior_profiles"

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

    medicine_reminders = Column(
        String,
        nullable=False
    )

    emergency_contacts = Column(
        String,
        nullable=False
    )

    medical_reports = Column(
        String,
        nullable=False
    )

class PlannerTask(Base):

    __tablename__ = "planner_tasks"

    id = Column(

        Integer,

        primary_key=True,

        index=True
    )

    user_id = Column(

        Integer,

        ForeignKey("users.id")
    )

    title = Column(

        String,

        nullable=False
    )

    description = Column(

        String,

        nullable=False
    )

    due_date = Column(

        String,

        nullable=False
    )

    status = Column(

        String,

        nullable=False,

        default="pending"
    )

class Opportunity(Base):

    __tablename__ = "opportunities"

    id = Column(

        Integer,

        primary_key=True,

        index=True
    )

    title = Column(

        String,

        nullable=False
    )

    category = Column(

        String,

        nullable=False
    )

    description = Column(

        String,

        nullable=False
    )

    age_min = Column(

        Integer,

        nullable=True
    )

    age_max = Column(

        Integer,

        nullable=True
    )

    education_required = Column(

        String,

        nullable=True
    )

    documents_required = Column(

        String,

        nullable=True
    )

    benefits = Column(

        String,

        nullable=True
    )

    application_start = Column(

        String,

        nullable=False
    )

    application_end = Column(

        String,

        nullable=False
    )

    official_link = Column(

        String,

        nullable=False
    )

    target_user_type = Column(

        String,

        nullable=False
    )