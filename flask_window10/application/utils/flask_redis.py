from redis import StrictRedis


def get_redis_connection(option):
    # redis配置，暂时用不上
    return StrictRedis(host=option['HOST'], port=option['PORT'], db=option['DB'])
