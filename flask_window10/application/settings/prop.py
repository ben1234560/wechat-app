from . import Config


class ProductionConfig(Config):
    """生产模式下的配置"""
    # 调试模式
    DEBUG = False
    # 日志等级
    LOG_LEVEL = "INFO"
    SQLALCHEMY_DATABASE_URI = "mysql://company_info_user:mysql@127.0.0.1:3306/company_info?charset=utf8"
