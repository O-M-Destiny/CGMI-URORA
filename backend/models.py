from sqlalchemy import Column, String, Integer, Date, DateTime, func, Enum as SqlEnum
from datetime import datetime

from database import Base
from schema import Helpyou, Subject, Visiting_Plan, How_you_heard_us

from zoneinfo import ZoneInfo

def get_nigerian_time_as_utc():
    # Get Nigerian time, then convert to UTC for storing
    return datetime.now(ZoneInfo("Africa/Lagos")).replace(tzinfo=None)

class Get_Connected(Base):

    __tablename__ = "get_connected"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    email = Column(String(30), nullable=False)
    phone_number = Column(String, nullable=False)
    how_to_help = Column(SqlEnum(Helpyou), nullable=False, server_default=Helpyou.Other.value)
    message = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), default=get_nigerian_time_as_utc)



class Contact(Base):

    __tablename__ = "contact"

    id = Column(Integer, primary_key = True, index=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    email = Column(String(30), nullable=False)
    phone_number = Column(String, nullable=False)
    subject = Column(SqlEnum(Subject), nullable=False, server_default=Subject.Other.value)
    message = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_nigerian_time_as_utc)



class Annoucement(Base):
    __tablename__ = "annoucement"

    id = Column(Integer, primary_key = True, index=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    email_phone = Column(String(30), nullable=False)
    annoucement = Column(String(50), nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_nigerian_time_as_utc)

class PrayerRequest(Base):

    __tablename__ = "prayer_request"

    id = Column(Integer, primary_key = True, index=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    email_phone = Column(String(30), nullable=False)
    prayer_request = Column(String(100), nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_nigerian_time_as_utc)

class Counselling(Base):

    __tablename__ = "counselling"
    
    id = Column(Integer, primary_key = True, index=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    email_phone = Column(String(30), nullable=False)
    counsel_description = Column(String(100), nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_nigerian_time_as_utc)

class Dob(Base):

    __tablename__ = "date_of_birth"

    id = Column(Integer, primary_key = True, index=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    email_phone = Column(String(30), nullable=False)
    dob = Column(Date, nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_nigerian_time_as_utc)

class Plan_visit(Base):
    
    __tablename__ = "plan_visit"

    id = Column(Integer, primary_key = True, index=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    email = Column(String(30), nullable=True)
    phone = Column(String, nullable=False)
    plan_of_visit = Column(String(30), server_default=Visiting_Plan.Not_Sure_Yet.value)
    how_you_heard_us = Column(SqlEnum(How_you_heard_us), server_default=How_you_heard_us.Other.value)
    questions_or_special_requests = Column(String(50), nullable=True, server_default=None)
    created_at = Column(DateTime(timezone=True), default=get_nigerian_time_as_utc)

class ShopNotificationEmailList(Base):

    __tablename__ = "shop_notify_email"

    id = Column(Integer, primary_key = True, index=True, autoincrement=True)
    email = Column(String(30), nullable=True)
    created_at = Column(DateTime(timezone=True), default=get_nigerian_time_as_utc)

class ChurchAnoucement(Base):
    __tablename__ = "church_anoucement"

    id = Column(Integer, primary_key = True, index=True, autoincrement=True)
    annoucement = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_nigerian_time_as_utc)