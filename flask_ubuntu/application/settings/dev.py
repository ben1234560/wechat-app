from . import Config


class DevelopementConfig(Config):
    """开发模式下的配置"""
    # 查询时会显示原始SQL语句
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = "mysql://company_info_user:123456@127.0.0.1:3306/company_info?charset=utf8"

    # redis的相关配置写在公共配置中
