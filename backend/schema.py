from pydantic import BaseModel, EmailStr, field_validator, Field
from typing import Optional
from datetime import datetime, date
from enum import Enum
import re

class Helpyou(str, Enum):
    Planning_to_visit = "planning to visit"
    Prayer_Request = "Prayer Request"
    Ministry_Information = "Ministry Information"
    Other = "Other"

class Subject(str, Enum):
    General = "General"
    Prayer = "Prayer"
    Pastoral = "Pastoral"
    Membership = "Membership"
    Giving = "Giving"
    Event = "Event"
    Other = "Other"

class Visiting_Plan(str, Enum):
    This_Sunday = "This Sunday"
    Next_Sunday = "Next Sunday"
    Within_The_Next_Month = "Within The next month"
    Not_Sure_Yet = "Not sure yet"

class How_you_heard_us(str, Enum):
    Friend_or_Family = "Friend / Family"
    Online_Search = "Online Search" 
    Social_Media = "Social Media"
    Drove_by = "Drove By"
    Other = "Other"

# Base validation class with common validators
class BaseValidationModel(BaseModel):
    
    @staticmethod
    def validate_phone_number(phone: str) -> str:
        """Validate phone number for Nigerian and international formats"""
        # Remove all non-digit characters except +
        cleaned = re.sub(r'[^\d+]', '', phone.strip())
        
        # Nigerian number patterns
        nigeria_patterns = [
            r'^\+234[789]\d{9}$',  # +234 followed by 7,8,9 and 9 digits
            r'^234[789]\d{9}$',    # 234 followed by 7,8,9 and 9 digits  
            r'^0[789]\d{9}$',      # Local format: 0 followed by 7,8,9 and 9 digits
            r'^[789]\d{9}$'        # Without country code: 7,8,9 followed by 9 digits
        ]
        
        # International number pattern (very basic)
        international_pattern = r'^\+\d{7,15}$'  # + followed by 7-15 digits
        
        # Check Nigerian patterns first
        for pattern in nigeria_patterns:
            if re.match(pattern, cleaned):
                return cleaned
                
        # Check international pattern
        if re.match(international_pattern, cleaned):
            return cleaned
            
        raise ValueError(
            "Invalid phone number. Please provide a valid Nigerian number "
            "(e.g., +2348012345678, 08012345678) or international number with country code."
        )
    
    @staticmethod
    def validate_email_or_phone(value: str) -> str:
        """Validate that the field contains either a valid email or valid phone number"""
        value = value.strip()
        
        # Check if it looks like an email (contains @ and .)
        if '@' in value and '.' in value:
            # Basic email validation
            email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            if re.match(email_pattern, value):
                return value
            else:
                raise ValueError("Invalid email format")
        else:
            # Try to validate as phone number
            try:
                return BaseValidationModel.validate_phone_number(value)
            except ValueError:
                raise ValueError(
                    "Field must contain either a valid email address or a valid phone number "
                    "(Nigerian: +2348012345678, 08012345678 or International: +1234567890)"
                )

class GetConnectedCreate(BaseValidationModel):
    name: str
    email: EmailStr
    phone: str
    how_to_help: Helpyou
    message: str
    
    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v):
        return cls.validate_phone_number(v)

class GetConnectedOut(GetConnectedCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ContactCreate(BaseValidationModel):
    name: str
    email: EmailStr
    phone_number: str
    subject: Subject
    message: str
    
    @field_validator('phone_number')
    @classmethod
    def validate_phone_number_field(cls, v):
        return cls.validate_phone_number(v)

class ContactOut(ContactCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class AnnoucementCreate(BaseValidationModel):
    name: str
    email_phone: str
    annoucement: str
    
    @field_validator('email_phone')
    @classmethod
    def validate_email_or_phone_field(cls, v):
        return cls.validate_email_or_phone(v)

class AnnoucementOut(AnnoucementCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class PrayerRequestCreate(BaseValidationModel):
    name: str
    email_phone: str
    prayer_request: str
    
    @field_validator('email_phone')
    @classmethod
    def validate_email_or_phone_field(cls, v):
        return cls.validate_email_or_phone(v)

class PrayerRequestOut(PrayerRequestCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CounsellingCreate(BaseValidationModel):
    name: str
    email_phone: str
    counsel_description: str
    
    @field_validator('email_phone')
    @classmethod
    def validate_email_or_phone_field(cls, v):
        return cls.validate_email_or_phone(v)

class CounsellingOut(CounsellingCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class DobCreate(BaseValidationModel):
    name: str
    email_phone: str
    dob: date
    
    @field_validator('email_phone')
    @classmethod
    def validate_email_or_phone_field(cls, v):
        return cls.validate_email_or_phone(v)

class DobOut(DobCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class PlanVisitCreate(BaseValidationModel):
    name: str
    email: EmailStr
    phone: str
    plan_of_visit: Visiting_Plan
    how_you_heard_us: How_you_heard_us
    questions_or_special_requests: Optional[str] = None
    
    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v):
        return cls.validate_phone_number(v)

class PlanVisitOut(PlanVisitCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ShopNotifyEmailCreate(BaseModel):
    email: EmailStr

class ShopNotifyEmailOut(ShopNotifyEmailCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ChurchAnnoucementIn(BaseModel):
    annoucement: str

class ChurchAnnoucementOut(ChurchAnnoucementIn):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

