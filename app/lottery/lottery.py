# -*- coding: utf-8 -*-
import random

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.common.result_util import *
from app.lottery.database import get_db
from app.lottery.models import Prize, User
from app.lottery.schemas import PrizeOutput, UserOutput

app = APIRouter(prefix='/lottery')


@app.get('/prize')
def prizes(db: Session = Depends(get_db)):
    query = db.query(Prize)
    prizes = query.all()
    if prizes is None or len(prizes) == 0:
        return failure_msg('请添加奖品')
    prizeOutputs = []
    for value in prizes:
        prizeOutput = PrizeOutput()
        prizeOutput.id = value.id
        prizeOutput.image = value.image
        prizeOutput.name = value.name
        prizeOutput.desc = value.desc
        prizeOutput.stock = value.stock
        prizeOutput.number = value.number
        prizeOutput.operateTime = value.operate_time
        prizeOutputs.append(prizeOutput)
    return success_data(prizeOutputs)


@app.get('/user')
def users(db: Session = Depends(get_db)):
    query = db.query(User)
    users = query.all()
    if users is None or len(users) == 0:
        return failure_msg('请添加用户')
    userOutputs = []
    for value in users:
        userOutput = UserOutput()
        userOutput.id = value.id
        userOutput.prizeId = value.prize_id
        userOutput.avatar = value.avatar
        userOutput.name = value.name
        userOutput.desc = value.desc
        userOutput.operateTime = value.operate_time
        userOutputs.append(userOutput)
    return success_data(userOutputs)


@app.get('/startCheck')
def startCheck(prizeId: str, db: Session = Depends(get_db)):
    query = db.query(Prize)
    prize = query.filter(Prize.id == prizeId).first()
    if prize is None or prize.stock == 0:
        return failure_msg('该类奖品已抽完，请选择其他奖品')
    query2 = db.query(User)
    users = query2.filter(User.prize_id.is_('')).all()
    if users is None or len(users) <= prize.stock:
        return failure_msg('请添加更多人员并且大于奖品数量')
    userOutputs = []
    for value in users:
        userOutput = UserOutput()
        userOutput.id = value.id
        userOutput.prizeId = value.prize_id
        userOutput.avatar = value.avatar
        userOutput.name = value.name
        userOutput.desc = value.desc
        userOutput.operateTime = value.operate_time
        userOutputs.append(userOutput)
    return success_data(userOutputs)


@app.get('/startOne')
def startOne(prizeId: str, db: Session = Depends(get_db)):
    query = db.query(Prize)
    prize = query.filter(Prize.id == prizeId).first()
    if prize is None or prize.stock == 0:
        return failure_msg('该类奖品已抽完，请选择其他奖品')
    query2 = db.query(User)
    noPrizeUser = query2.filter(User.prize_id.is_('')).all()
    if noPrizeUser is None or len(noPrizeUser) <= prize.stock:
        return failure_msg('请添加更多人员并且大于奖品数量')
    # 生成和没有中奖的人数量相同的随机数,list下标从零开始--Random从零开始
    num = random.randint(0, len(noPrizeUser) - 1)
    prizeUser = noPrizeUser[num]
    # 更新数据
    prize.stock = prize.stock - 1
    db.add(prize)
    db.commit()
    db.flush()
    # 保存中奖用户
    prizeUser.prize_id = prize.id
    db.add(prizeUser)
    db.commit()
    db.flush()
    userOutput = UserOutput()
    userOutput.id = prizeUser.id
    userOutput.prizeId = prizeUser.prize_id
    userOutput.prizeName = prize.name
    userOutput.avatar = prizeUser.avatar
    userOutput.name = prizeUser.name
    userOutput.desc = prizeUser.desc
    userOutput.operateTime = prizeUser.operate_time
    return success_data(userOutput)


@app.get('/startAll')
def startAll(prizeId: str, db: Session = Depends(get_db)):
    query = db.query(Prize)
    prize = query.filter(Prize.id == prizeId).first()
    if prize is None or prize.stock == 0:
        return failure_msg('该类奖品已抽完，请选择其他奖品')
    query2 = db.query(User)
    noPrizeUser = query2.filter(User.prize_id.is_('')).all()
    if noPrizeUser is None or len(noPrizeUser) <= prize.stock:
        return failure_msg('请添加更多人员并且大于奖品数量')
    # 保存已中奖人员
    prizeUsers = []
    while prize.stock > 0:
        # 生成总人数之间的随机数,list下标从零开始--Random从零开始
        num = random.randint(0, len(noPrizeUser) - 1)
        prizeUser = noPrizeUser[num]
        if not prizeUsers.__contains__(prizeUser):
            prize.stock = prize.stock - 1
            prizeUser.prize_id = prize.id
            prizeUsers.append(prizeUser)

    # 更新数据
    db.add(prize)
    db.commit()
    db.flush()
    # 保存中奖用户 prizeUsers
    db.add_all(prizeUsers)
    db.commit()
    db.flush()
    userOutputs = []
    for value in prizeUsers:
        userOutput = UserOutput()
        userOutput.id = value.id
        userOutput.prizeId = value.prize_id
        userOutput.prizeName = prize.name
        userOutput.avatar = value.avatar
        userOutput.name = value.name
        userOutput.desc = value.desc
        userOutput.operateTime = value.operate_time
        userOutputs.append(userOutput)
    return success_data(userOutputs)


@app.post('/resetStock')
def resetStock(prizeId: str, db: Session = Depends(get_db)):
    if prizeId is None:
        return failure_msg('prizeId不能为空')
    query = db.query(Prize)
    prize = query.filter(Prize.id == prizeId).first()
    if prize is not None:
        prize.stock = prize.reset_stock
        # 重置奖品
        db.add(prize)
        db.commit()
        db.flush()
    else:
        return failure_msg('重置奖品失败')
    # 重置用户
    query2 = db.query(User)
    rows = query2.filter(User.prize_id == prizeId).all()
    if rows is not None:
        for row in rows:
            row.prize_id = ''
        db.add_all(rows)
        db.commit()
        db.flush()
    return success_msg('重置成功')
