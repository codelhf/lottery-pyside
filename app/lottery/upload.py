# -*- coding: utf-8 -*-

from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.orm import Session
import os
import base64

from app.common.result_util import *
from app.lottery.database import get_db
from app.lottery.models import Prize, User

app = APIRouter(prefix='/upload')


@app.post('/file')
def upload(file: UploadFile):
    image_data = base64.b64encode(file.file.read())
    image_url = 'data:image/png;base64,' + image_data.decode('utf-8')
    return success_data(image_url)


@app.post('/clear')
def clear(db: Session = Depends(get_db)):
    # 查询所有使用中的图片
    used_images = []
    prizes = db.query(Prize).all()
    for value in prizes:
        if len(value.image.strip()) > 0:
            used_images.append(value.image)

    users = db.query(User).all()
    for value in users:
        if len(value.avatar.strip()) > 0:
            used_images.append(value.avatar)

    # 删除未使用图片
    for root, dirs, files in os.walk('./images'):
        for file in files:
            if not used_images.__contains__(file):
                os.remove(os.path.join(root, file))
    return success_msg('删除成功')
