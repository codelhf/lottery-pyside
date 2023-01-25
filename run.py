# -*- coding: utf-8 -*-
# fastapi
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
# app
from app.lottery import lottery, prize, user, upload
# python
from threading import Thread
import socket
import sys
import uvicorn
# PySide6
# from PySide6.QtCore import *
# from PySide2.QtGui import *
from PySide2.QtWidgets import QApplication
from PySide2.QtWebEngineWidgets import QWebEngineView


app = FastAPI()
# 挂载静态资源
app.mount(path='/assets', app=StaticFiles(directory='./static/assets'))
# 加载子路由
app.include_router(lottery.app)
app.include_router(prize.app)
app.include_router(user.app)
app.include_router(upload.app)


@app.get("/", response_class=HTMLResponse)
def read_root():
    html_file = open('./static/index.html', 'r').read()
    return html_file


def free_port(port=1024, max_port=65535):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    while port <= max_port:
        try:
            sock.bind(('', port))
            sock.close()
            return port
        except OSError:
            port += 1
    raise IOError('no free ports')


def async_func(f):
    def inner_fun(*args, **kwargs):
        t = Thread(target=f, args=args, kwargs=kwargs)
        '''
        1、首先该线程是运行在主线程中的,c/c++的主线程销毁,子线程也会被销毁
        但是python的主线程销毁,需要等待子线程结束,因为主线程在子线程结束之前退出
        2、将子线程设置为被守护进程,主线程设置为守护进程,伴随着主线程的结束子线程结束
        所以应该这样使用t.setDaemon(True) .start() 设置子线程为守护线程，先守护线程结束后,主线程再退出
        3、是一类在后台运行的特殊进程，用于执行特定的系统任务。很多守护进程在系统引导的时候启动，
        并且一直运行直到系统关闭。另一些只在需要的时候才启动，完成任务后就自动结束
        '''
        t.daemon = True
        t.start()
    return inner_fun


@async_func
def run_app(host: str, port: int):
    uvicorn.run('run:app', host=host, port=port, reload=False, workers=1)


def web_view(title: str = '', icon: str = '', host: str = 'localhost', port: int = 8080, protocol: str = 'http'):
    # win = QMainWindow()
    # win.setWindowTitle(title)
    # win.setWindowIcon(icon)
    # win.setGeometry(0, 0, 1280, 720)
    browser = QWebEngineView()
    # 加载外部的web界面
    # file_dir = QFileInfo('./index.html').absoluteFilePath()
    # browser.load(QUrl("file:///" + file_dir))
    browser.load(protocol + "://" + host + ":" + str(port))
    browser.setWindowTitle(title)
    # browser.setWindowIcon(QIcon.addFile(icon))
    # win.setCentralWidget(browser)
    return browser


if __name__ == '__main__':
    # 获取一个空闲端口
    port = free_port(8888)
    # 异步启动后台服务
    run_app('0.0.0.0', port)
    # 启动WebView
    app = QApplication()
    win = web_view(title='LOTTERY', port=port)
    win.showMaximized()
    sys.exit(app.exec_())
