from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from database import Base, engine
from models import Get_Connected, Contact, Annoucement, PrayerRequest, Counselling, Dob, Plan_visit, ShopNotificationEmailList
from public_route import public


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title= "CGMI-URORA",
    description= "A basic website for my church"
)

origins = [
    "http://localhost:5173",  #  frontend URL
    "https://cgmi-urora.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)
app.include_router(public)

@app.get("/")
def index():
    return {"Message": "Go to /docs for the official Documentation"}

