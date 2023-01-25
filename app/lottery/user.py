# -*- coding: utf-8 -*-

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.common.result_util import *
from app.common.snow_flake import *
from app.lottery.database import get_db
from app.lottery.models import Prize, User
from app.lottery.schemas import UserInput, UserOutput
from typing import List

app = APIRouter(prefix='/user')


@app.get(path='/list')
def list(pageNum: int = 1,
         pageSize: int = 10,
         name: str = None,
         prizeId: str = None,
         db: Session = Depends(get_db)):
    query = db.query(User)
    if name is not None:
        name = '%' + name + '%'
        query = query.filter(User.name.like(name))
    if len(prizeId.strip()) > 0:
        query = query.filter(User.prize_id == prizeId)
    # query = query.order_by(User.name.asc())

    total = query.count()
    page_lists = query.offset((pageNum - 1) * pageSize).limit(pageSize).all()
    user_lists = []
    for user in page_lists:
        user_output = UserOutput()
        user_output.id = user.id
        user_output.prizeId = user.prize_id
        # 查询奖品
        prize = db.query(Prize).filter(Prize.id == user.prize_id).first()
        if prize is not None:
            user_output.prizeImage = prize.image
            user_output.prizeName = prize.name
        user_output.avatar = user.avatar
        user_output.name = user.name
        user_output.desc = user.desc
        user_output.operateTime = user.operate_time
        user_lists.append(user_output)
    user_lists.sort(key=lambda item: item.name)
    return success_data({'list': user_lists, 'total': total})


@app.get('/all')
def all(db: Session = Depends(get_db)):
    users = db.query(User).all()
    user_lists = []
    for user in users:
        user_output = UserOutput()
        user_output.id = user.id
        user_output.prizeId = user.prize_id
        # 查询奖品
        prize = db.query(Prize).filter(Prize.id == user.prize_id).first()
        if prize is not None:
            user_output.prizeImage = prize.image
            user_output.prizeName = prize.name
        user_output.avatar = user.avatar
        user_output.name = user.name
        user_output.desc = user.desc
        user_output.operateTime = user.operate_time
        user_lists.append(user_output)
    user_lists.sort(key=lambda item: item.name)
    return success_data(user_lists)


@app.get('/{id}')
def select(id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if user is None:
        return failure_msg('查询的人员不存在')
    user_output = UserOutput()
    user_output.id = user.id
    user_output.prizeId = user.prize_id
    user_output.avatar = user.avatar
    user_output.name = user.name
    user_output.desc = user.desc
    user_output.operateTime = user.operate_time
    return success_data(user_output)


@app.post('/batch')
def batch(userList: List[UserInput], db: Session = Depends(get_db)):
    if len(userList) <= 0:
        return success()
    users = []
    for userInput in userList:
        user = User()
        user.id = get_next_id_str()
        user.prize_id = ''
        user.avatar = ''
        user.name = userInput.name
        user.desc = userInput.desc
        user.operate_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        users.append(user)
        time.sleep(1)
    # 保存
    db.add_all(users)
    db.commit()
    db.flush()
    return success_msg('导入人员成功')


@app.post('/check')
def check(userInput: UserInput, db: Session = Depends(get_db)):
    query = db.query(User) \
        .filter(User.name == userInput.name) \
        .filter(User.desc == userInput.desc)
    if userInput.id is not None:
        query = query.filter(User.id != userInput.id)
    user = query.first()
    if user is not None:
        return failure_msg('该人员已存在')
    return success()

@app.post('')
def insert(userInput: UserInput, db: Session = Depends(get_db)):
    result = check(userInput, db)
    if not is_success(result):
        return result
    user = User()
    user.id = get_next_id_str()
    user.prize_id = userInput.prizeId
    user.avatar = userInput.avatar
    user.name = userInput.name
    user.desc = userInput.desc
    user.operate_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    db.add(user)
    db.commit()
    db.flush()
    return success_msg('添加人员成功')


@app.post('/{id}')
def update(id: str, userInput: UserInput, db: Session = Depends(get_db)):
    result = check(userInput, db)
    if not is_success(result):
        return result
    user = db.query(User).filter(User.id == id).first()
    user.avatar = userInput.avatar
    user.name = userInput.name
    user.desc = userInput.desc
    user.operate_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    db.add(user)
    db.commit()
    db.flush()
    return success_msg('更新人员成功')


@app.post('/del/{ids}')
def delete(ids: str, db: Session = Depends(get_db)):
    id_arr = ids.split(',')
    if len(id_arr) <= 0:
        return failure_msg('ids 不能为空')
    users = db.query(User).filter(User.id.in_(id_arr)).all()
    for value in users:
        db.delete(value)
    db.commit()
    db.flush()
    return success_msg('删除人员成功')

