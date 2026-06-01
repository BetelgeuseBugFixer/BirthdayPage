import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
import uvicorn

# --- Database Class ---
class SupaBaseDB:
    def __init__(self):
        load_dotenv()
        url: str = os.environ.get("SUPABASE_URL")
        key: str = os.environ.get("SUPABASE_KEY")
        self.client: Client = create_client(url, key)

    def add_entry(self, guest_name: str, attending: bool, plus_one: int, bringing_food: str):
        response = (
            self.client.table("Guests")
            .insert({
                "guest_name": guest_name, 
                "attending": attending, 
                "plus_one": plus_one,
                "bringing_food": bringing_food
            })
            .execute()
        )
        return response

# --- FastAPI Setup ---
app = FastAPI()
db = SupaBaseDB()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (change to your Vercel URL later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Model ---
# This defines exactly what the frontend needs to send
class GuestRSVP(BaseModel):
    guest_name: str
    attending: bool
    plus_one: int
    bringing_food: str

# --- API Endpoint ---
@app.post("/api/rsvp")
def submit_rsvp(rsvp: GuestRSVP):
    try:
        # Pass the incoming data to your database function
        response = db.add_entry(
            guest_name=rsvp.guest_name,
            attending=rsvp.attending,
            plus_one=rsvp.plus_one,
            bringing_food=rsvp.bringing_food
        )
        return {"status": "success", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)