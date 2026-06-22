from fastapi import APIRouter

from services.gemini_service import ask_gemini


router = APIRouter()


@router.get("/test")
def test_ai():

    result = ask_gemini(

        "Say Hello from Gemini AI"

    )

    return {

        "response": result

    }


@router.post("/roadmap")
def generate_roadmap(

    career_goal: str

):

    prompt = f"""

    Create a learning roadmap for:

    {career_goal}

    Divide it into:

    Beginner

    Intermediate

    Advanced

    Give practical steps.

    """

    result = ask_gemini(

        prompt

    )

    return {

        "roadmap": result

    }