# -*- coding: utf-8 -*-

from pydantic import BaseModel
from typing import Optional


class PrizeInput(BaseModel):
    id: str = ''
    image: str = ''
    name: str
    desc: str
    stock: int
    number: int


class PrizeOutput():
    id: str
    image: str
    name: str
    desc: str
    stock: int
    number: int
    resetStock: int
    operateTime: str


class UserInput(BaseModel):
    id: str = ''
    prizeId: str = ''
    avatar: str = ''
    name: str
    desc: str


class UserOutput():
    id: str
    prizeId: str
    prizeImage: str
    prizeName: str
    avatar: str
    name: str
    desc: str
    operateTime: str
