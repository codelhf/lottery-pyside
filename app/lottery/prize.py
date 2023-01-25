# -*- coding: utf-8 -*-

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.common.result_util import *
from app.common.snow_flake import *
from app.lottery.database import get_db
from app.lottery.models import Prize
from app.lottery.schemas import PrizeInput, PrizeOutput
from typing import List

app = APIRouter(prefix='/prize')


@app.get(path='/list')
def list(pageNum: int = 1,
         pageSize: int = 10,
         name: str = None,
         desc: str = None,
         db: Session = Depends(get_db)):
    query = db.query(Prize)
    if name is not None:
        name = '%' + name + '%'
        query = query.filter(Prize.name.like(name))
    if desc is not None:
        desc = '%' + desc + '%'
        query = query.filter(Prize.desc.like(desc))
    # query = query.order_by(Prize.number.asc())

    total = query.count()
    page_lists = query.offset((pageNum - 1) * pageSize).limit(pageSize).all()
    prize_lists = []
    for prize in page_lists:
        prize_output = PrizeOutput()
        prize_output.id = prize.id
        prize_output.image = prize.image
        prize_output.name = prize.name
        prize_output.desc = prize.desc
        prize_output.stock = prize.stock
        prize_output.number = prize.number
        prize_output.resetStock = prize.reset_stock
        prize_output.operateTime = prize.operate_time
        prize_lists.append(prize_output)
    prize_lists.sort(key=lambda item: item.number)
    return success_data({'list': prize_lists, 'total': total})


@app.get('/all')
def all(db: Session = Depends(get_db)):
    prizes = db.query(Prize).all()
    prize_lists = []
    for prize in prizes:
        prize_output = PrizeOutput()
        prize_output.id = prize.id
        prize_output.image = prize.image
        prize_output.name = prize.name
        prize_output.desc = prize.desc
        prize_output.stock = prize.stock
        prize_output.number = prize.number
        prize_output.resetStock = prize.reset_stock
        prize_output.operateTime = prize.operate_time
        prize_lists.append(prize_output)
    prize_lists.sort(key=lambda item: item.number)
    return success_data(prize_lists)


@app.get('/{id}')
def select(id: str, db: Session = Depends(get_db)):
    if id is None:
        return failure_msg('id 不能为空')
    prize = db.query(Prize).filter(Prize.id == id).first()
    if prize is None:
        return failure_msg('查询的奖品不存在')
    prize_output = PrizeOutput()
    prize_output.id = prize.id
    prize_output.image = prize.image
    prize_output.name = prize.name
    prize_output.desc = prize.desc
    prize_output.stock = prize.stock
    prize_output.number = prize.number
    prize_output.resetStock = prize.reset_stock
    prize_output.operateTime = prize.operate_time
    return success_data(prize_output)


@app.post('/batch')
def batch(prizeList: List[PrizeInput], db: Session = Depends(get_db)):
    if len(prizeList) <= 0:
        return success()
    prizes = []
    for prizeInput in prizeList:
        prize = Prize()
        prize.id = get_next_id_str()
        prize.image = ''
        prize.name = prizeInput.name
        prize.desc = prizeInput.desc
        prize.stock = prizeInput.stock
        prize.number = prizeInput.number
        prize.reset_stock = prizeInput.stock
        prize.operate_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        prizes.append(prize)
        time.sleep(1)
    # 保存
    db.add_all(prizes)
    db.commit()
    db.flush()
    return success_msg('导入奖品成功')


@app.post('/check')
def check(prizeInput: PrizeInput, db: Session = Depends(get_db)):
    query = db.query(Prize)\
        .filter(Prize.name == prizeInput.name)
    if prizeInput.id is not None:
        query = query.filter(Prize.id != prizeInput.id)
    prize = query.first()
    if prize is not None:
        return failure_msg('该奖品已存在')
    return success()


@app.post('')
def insert(prizeInput: PrizeInput, db: Session = Depends(get_db)):
    result = check(prizeInput, db)
    if not is_success(result):
        return result
    prize = Prize()
    prize.id = get_next_id_str()
    prize.image = prizeInput.image
    prize.name = prizeInput.name
    prize.desc = prizeInput.desc
    prize.stock = prizeInput.stock
    prize.number = prizeInput.number
    prize.reset_stock = prizeInput.stock
    prize.operate_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    db.add(prize)
    db.commit()
    db.flush()
    return success_msg('添加奖品成功')


@app.post('/{id}')
def update(id: str, prizeInput: PrizeInput, db: Session = Depends(get_db)):
    if id is None:
        return failure_msg('id 不能为空')
    result = check(prizeInput, db)
    if not is_success(result):
        return result
    query = db.query(Prize)
    prize = query\
        .filter(Prize.name == prizeInput.name)\
        .filter(Prize.desc == prizeInput.desc)\
        .filter(Prize.id != prizeInput.id).first()
    if prize is not None:
        return failure_msg('该奖品已存在')
    prize = db.query(Prize).filter(Prize.id == id).first()
    prize.image = prizeInput.image
    prize.name = prizeInput.name
    prize.desc = prizeInput.desc
    prize.stock = prizeInput.stock
    prize.number = prizeInput.number
    prize.reset_stock = prizeInput.stock
    prize.operate_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    db.add(prize)
    db.commit()
    db.flush()
    return success_msg('更新奖品成功')


@app.post('/del/{ids}')
def delete(ids: str, db: Session = Depends(get_db)):
    id_arr = ids.split(',')
    if len(id_arr) <= 0:
        return failure_msg('ids 不能为空')
    prizes = db.query(Prize).filter(Prize.id.in_(id_arr)).all()
    for value in prizes:
        db.delete(value)
    db.commit()
    db.flush()
    return success_msg('删除奖品成功')
