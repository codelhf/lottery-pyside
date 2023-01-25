# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from config import config
#
# # 主应用的根目录
# app = Flask(__name__)
# # 数据库操作对象(版本必须为1.3.22)
# db = SQLAlchemy()
# # 数据库迁移对象
# migrate = Migrate()
#
#
# # 定义工厂函数，生产app
# def create_app(config_name):
#     # 加载配置文件挪到工厂函数中
#     app.config.from_object(config[config_name])
#     # 将 db (数据库操作对象) 绑定到 app 上
#     db.init_app(app)
#     # 将 migrate (数据库迁移对象) 绑定到 app 和 db (数据库操作对象) 上
#     # 先设置环境变量 FLASK_APP=xx.py
#     # flask db init
#     # flask db migrate
#     # flask db upgrade
#     migrate.init_app(app, db)
#
#     # 注册前台蓝图
#     from app.views import bp as app_bp
#     app.register_blueprint(app_bp)
#     from app.dlt.views import bp as dlt_bp
#     app.register_blueprint(dlt_bp)
#     from app.dlt_black.views import bp as dlt_black_bp
#     app.register_blueprint(dlt_black_bp)
#
#     # 最后返回当前app
#     return app
