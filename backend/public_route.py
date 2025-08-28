from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from typing import List, Dict, Union
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import or_

from models import (Get_Connected, Contact, Counselling, PrayerRequest, Dob, Plan_visit, 
                    Annoucement, ShopNotificationEmailList, ChurchAnoucement)
from schema import (GetConnectedCreate, GetConnectedOut, ContactCreate, ContactOut, 
                    AnnoucementCreate, AnnoucementOut, PrayerRequestCreate,
                      PrayerRequestOut, CounsellingCreate, CounsellingOut, DobCreate, 
                      DobOut, PlanVisitCreate, PlanVisitOut, ShopNotifyEmailCreate, 
                      ShopNotifyEmailOut, ChurchAnnoucementIn, ChurchAnnoucementOut)

from responses import (response_success, response_error, response_data,
                        response_created, response_already_exists)

from database import get_db

public = APIRouter(prefix="/public", tags=["Public"])

@public.post("/get_connected")
def get_connected(user: GetConnectedCreate, db: Session = Depends(get_db)):
    try:
        email_count = db.query(Get_Connected).filter(Get_Connected.email == user.email).count()
        phone_count = db.query(Get_Connected).filter(Get_Connected.phone_number == user.phone).count()

        if email_count >= 3 or phone_count >= 3:
            return JSONResponse(
                status_code=400,
                content={"message": "You have already submitted this form multiple times. Please wait or contact us directly."}
            )

        new_submission = Get_Connected(
            name=user.name,
            email=user.email,
            phone_number=user.phone,
            how_to_help=user.how_to_help,
            message=user.message
        )

        db.add(new_submission)
        db.commit()
        db.refresh(new_submission)

        return {"message": "Form submitted successfully!"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail={"message": "An unexpected error occurred", "details": str(e)})
@public.post("/contact", response_model=ContactOut, status_code=201)
def contact_church(user: ContactCreate, db: Session = Depends(get_db)):
    try:
        email = db.query(Contact).filter(Contact.email == user.email).count()
        phone = db.query(Contact).filter(Contact.phone_number == user.phone_number).count()

        if email >= 3 or phone >= 3:
            raise HTTPException(
                status_code=400,
                detail="You have already submitted this form multiple times."
            )

        new_contact = Contact(
            name=user.name,
            email=user.email,
            phone_number=user.phone_number,
            subject=user.subject,
            message=user.message
        )

        db.add(new_contact)
        db.commit()
        db.refresh(new_contact)

        return new_contact

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# Submit Annoucement
@public.post("/submit_annoucement", status_code=201, response_model=dict)
def submitting_annoucement(user: AnnoucementCreate, db: Session = Depends(get_db)):
    try:
        annoucement = db.query(Annoucement).filter(Annoucement.email_phone == user.email_phone).count()

        if annoucement >= 3:
            return response_already_exists("Annoucement")
        new_annoucement = Annoucement(
            name = user.name,
            email_phone = user.email_phone,
            annoucement = user.annoucement
        )

        db.add(new_annoucement)
        db.commit()
        db.refresh(new_annoucement)

        return JSONResponse(status_code=201, content={"message": "Annoucement Submitted"})

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
    
# Prayer Request
@public.post("/prayer_request", response_model=dict, status_code=201)
def prayer_rqst(user: PrayerRequestCreate, db: Session = Depends(get_db)):
    try:
        prayer = db.query(PrayerRequest).filter(PrayerRequest.email_phone == user.email_phone).count()  

        if prayer >= 4:
            return response_already_exists("Your prayer request")
        new_prayer_request = PrayerRequest(
            name = user.name,
            email_phone = user.email_phone,
            prayer_request = user.prayer_request
        )

        db.add(new_prayer_request)
        db.commit()
        db.refresh(new_prayer_request)

        return JSONResponse(
            status_code=201, content={"message": "Prayer request Submitted"}
        )
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )

# Counseling
@public.post("/counselling", response_model=dict, status_code=201)
def counsel(user: CounsellingCreate, db: Session = Depends(get_db)):
    try:
        counsel = db.query(Counselling).filter(Counselling.email_phone == user.email_phone).count()  

        if counsel >= 4:
            return response_already_exists("This Counselling")
        new_counsel_request = Counselling(
            name = user.name,
            email_phone = user.email_phone,
            counsel_description = user.counsel_description
        )

        db.add(new_counsel_request)
        db.commit()
        db.refresh(new_counsel_request)

        return response_created(item="Counselling", status=201)
    
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
    
# Date Of birth

@public.post("/date_of_birth", status_code=201, response_model=dict)
def user_date_of_birth(user: DobCreate, db: Session = Depends(get_db)):
    try:
        user_dob = db.query(Dob).filter(Dob.email_phone == user.email_phone).count()

        if user_dob >= 3:
            return response_error(message="You have already submitted this multiple times, wait for our feed back, Thank you", status=400)
        new_dob = Dob(
            name = user.name,
            email_phone = user.email_phone,
            dob = user.dob
        )

        db.add(new_dob)
        db.commit()
        db.refresh(new_dob)

        return response_created(status=201, item="Date of Birth")
    
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
    
# Plan visit
@public.post("/plan_visit", status_code=201, response_model=dict)
def plan_visit(user: PlanVisitCreate, db: Session = Depends(get_db)):
    try:
        user_visit_plan = db.query(Plan_visit).filter(
            or_(
                  Plan_visit.phone == user.phone,
                  Plan_visit.name  == user.name,
                  Plan_visit.email == user.email)
                  ).count()
        
        if user_visit_plan > 4:
            return response_error("You have submitted this multiple times", status=400)
        new_plan_visit = Plan_visit(
            name = user.name,
            email = user.email,
            phone = user.phone,
            plan_of_visit = user.plan_of_visit,
            how_you_heard_us = user.how_you_heard_us,
            questions_or_special_requests = user.questions_or_special_requests
        )

        db.add(new_plan_visit)
        db.commit()
        db.refresh(new_plan_visit)

        return response_success(message="Details submitted, we will reach out to you soon, Remain Blessed!")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
# Shop Notification
@public.post("/notify_me", summary="Email list to notify about the church launch shop", status_code=201, response_model=dict)
def shop_notification(user:ShopNotifyEmailCreate, db: Session = Depends(get_db)):
    try:
        user_email = db.query(ShopNotificationEmailList).filter(ShopNotificationEmailList.email == user.email).first()

        if user_email:
            return response_already_exists(item="Email")
        new_email = ShopNotificationEmailList(
            email = user.email
        )

        db.add(new_email)
        db.commit()
        db.refresh(new_email)

        return response_success(message="Email Submitted we will reach out to you soon")

    except SQLAlchemyError as e:
        db.rollback()
        print(f"{e}")
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
    except Exception as e:
        db.rollback()
        print(f"{e}")
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
@public.post(
    "/church_anoucement",
    summary="Church Anoucement that would be rendered to the users in the frontend upon refresh",
    status_code=201,
    response_model=dict
)
def church_anoucement(user: List[ChurchAnnoucementIn], db: Session = Depends(get_db)):
    try:
        if len(user) > 10:
            raise HTTPException(
                status_code=400,
                detail="You can only submit up to 10 announcements at once."
            )

        added = []
        skipped = []
        seen = set()  # To detect duplicates inside the same request batch
        new_announcements = []

        for item in user:
            announcement_text = item.annoucement.strip()

            # Skip if already in current batch
            if announcement_text in seen:
                skipped.append(announcement_text + " (duplicate in batch)")
                continue
            seen.add(announcement_text)

            # Skip if already in DB 3+ times
            count = db.query(ChurchAnoucement).filter(
                ChurchAnoucement.annoucement == announcement_text
            ).count()

            if count >= 3:
                skipped.append(announcement_text + " (already in database)")
                continue

            new_announcements.append(ChurchAnoucement(annoucement=announcement_text))
            added.append(announcement_text)

        if new_announcements:
            db.add_all(new_announcements)
            db.commit()

        return response_created(item="Annoucement")

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occurred": str(e)}
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occurred": str(e)}
        )



@public.get("/fetch_annoucement", response_model=List[ChurchAnnoucementOut], summary="List of anoucement for the week")
def fetch_church_annoucement(skip: int = 0, limit:int = 100, db: Session = Depends(get_db)):
    try:
        the_annoucment = db.query(ChurchAnoucement).offset(skip).limit(limit).all()

        if not the_annoucment:
            return response_error(message="Sorry come back later for annoucement")
        return the_annoucment
    
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail={"An Unexpected error occured": str(e)}
        )
