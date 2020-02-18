from flask import Flask
from .settings.dev import DevelopementConfig
from .settings.prop import ProductionConfig
from flask_wtf import CSRFProtect
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_jsonrpc import JSONRPC
import logging
from logging.handlers import RotatingFileHandler

config = {
    "dev": DevelopementConfig,
    "prop": ProductionConfig,
}

db = SQLAlchemy()

"""日志安装初始化函数"""


# 把日志相关的配置封装成一个日志初始化函数
def setup_log(Config):
    # 设置日志的记录等级
    logging.basicConfig(level=Config.LOG_LEVEL)  # 调试debug级
    # 创建日志记录器，指明日志保存的路径、每个日志文件的最大大小、保存的日志文件个数上限
    file_log_handler = RotatingFileHandler(Config.LOG_FILE, maxBytes=Config.LOG_MAX_BYTE, backupCount=Config.LOG_COUNT)
    # 创建日志记录的格式 日志等级 输入日志信息的文件名 行数 日志信息
    formatter = logging.Formatter('%(levelname)s %(filename)s:%(lineno)d %(message)s')
    # 为刚创建的日志记录器设置日志记录格式
    file_log_handler.setFormatter(formatter)
    # 为全局的日志工具对象（flaskapp使用的）添加日志记录器
    logging.getLogger().addHandler(file_log_handler)


# 创建jsonrpc实例对象
jsonrpc = JSONRPC(app=None, service_url='/api', enable_web_browsable_api=True)

"""APP的初始化函数"""


def init_app(config_name):
    """
    定义了app配置供manage.py里的run调用，所有配置在这里配置（分离）
    :param config_name: 指定目前配置的dev（里面含mysql连接配置）
    :return: 返回已配置的app
    """
    app = Flask(__name__)

    # 设置配置类1
    global Config
    Config = config.get(config_name)

    # 加载配置
    app.config.from_object(Config)

    # 开启CSRF防范功能1
    # CSRFProtect(app)

    # 配置密钥
    app.config['SESSION_TYPE'] = 'filesystem'

    # 开启session功能
    Session(app)

    # 数据库初始化
    db.init_app(app)

    # 日志安装
    setup_log(Config)

    # jsonrpc注册到app应用对象中
    jsonrpc.init_app(app)

    # 首页模块，由于现在基本用不到蓝图，所以注释掉
    # from .apps.index import index_blu
    # app.register_blueprint(index_blu, url_prefix='')

    return app
