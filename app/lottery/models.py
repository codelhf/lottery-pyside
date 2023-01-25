# -*- coding: utf-8 -*-

from sqlalchemy import Column, String, Integer
from .database import Base


class Prize(Base):
    __tablename__ = 'lt_prizes'

    id = Column('id', String(255), primary_key=True, unique=True, nullable=False, comment='唯一标识')
    image = Column('image', String, nullable=True, comment='奖品图片')
    name = Column('name', String(255), nullable=False, comment='奖品名称')
    desc = Column('desc', String, nullable=True, comment='奖品描述')
    stock = Column('stock', Integer, nullable=False, comment='奖品数量')
    number = Column('number', Integer, nullable=False, comment='奖品顺序')
    reset_stock = Column('reset_stock', Integer, nullable=False, comment='重置数量')
    operate_time = Column('operate_time', String(255), nullable=False, comment='操作时间')

class User(Base):
    __tablename__ = 'lt_users'

    id = Column('id', String(255), primary_key=True, unique=True, nullable=False, comment='唯一标识')
    prize_id = Column('prize_id', String(225), nullable=True, comment='')
    avatar = Column('avatar', String, nullable=True, comment='人员头像')
    name = Column('name', String(255), nullable=False, comment='人员名称')
    desc = Column('desc', String, nullable=True, comment='人员描述')
    operate_time = Column('operate_time', String(255), nullable=False, comment='操作时间')
