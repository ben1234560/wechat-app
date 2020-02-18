from redis import StrictRedis
from application.utils.flask_redis import get_redis_connection


class Config(object):
    """项目的公共配置核心类"""
    # 调试模式
    DEBUG = True
    # 日志等级
    LOG_LEVEL = "DEBUG"
    # 日志保存的路径[目录需要自己手动创建]
    LOG_FILE = "logs/log.txt"
    # 每个日志文件的最大大小
    LOG_MAX_BYTE = 1024 * 1024 * 300
    # 保存的日志文件个数上限
    LOG_COUNT = 10

    # mysql数据库的配置信息
    SQLALCHEMY_DATABASE_URI = "mysql://company_info_user:123456@127.0.0.1:3306/company_info?charset=utf8"
    # 动态追踪修改设置，如未设置只会提示警告
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # 查询时会显示原始SQL语句
    SQLALCHEMY_ECHO = False

    # # 配置redis
    # REDIS = {
    #     'default':{
    #         'HOST':'127.0.0.1',  # 项目上线以后，这个地址就会被替换成真实IP地址，mysql也是
    #         'PORT':6379,
    #         'DB': 0
    #     },
    #     'session':{
    #         'HOST': '127.0.0.1',  # 项目上线以后，这个地址就会被替换成真实IP地址，mysql也是
    #         'PORT': 6379,
    #         'DB': 1
    #     }
    # }

    # 设置密钥，可以通过 base64.b64encode(os.urandom(48)) 来生成一个指定长度的随机字符串
    SECRET_KEY = "ghhBljAa0uzw2afLqJOXrukORE4BlkTY/1vaMuDh6opQ3uwGYtsDUyxcH62Aw3ju"

    # flask_session的配置信息
    # SESSION_TYPE = "redis" # 指定 session 保存到 redis 中
    SESSION_USE_SIGNER = True  # 让 cookie 中的 session_id 被加密签名处理
    # SESSION_REDIS = get_redis_connection(REDIS['session']) # 使用 redis 的实例
    PERMANENT_SESSION_LIFETIME = 24 * 60 * 60  # session_id的有效期，单位是秒
