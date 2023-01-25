# -*- coding: utf-8 -*-
import json

from .result_code import ResultCode
from .json_serialize import json_serialize


def is_success(res):
    # result = json.loads(res)
    if res['code'] == ResultCode.SUCCESS:
        return True
    else:
        return False


def success():
    return {
        'code': ResultCode.SUCCESS
    }


def success_data(data):
    return {
        'code': ResultCode.SUCCESS,
        'data': json.loads(json_serialize(data))
    }


def success_data_msg(data, msg):
    return {
        'code': ResultCode.SUCCESS,
        'data': json.loads(json_serialize(data)),
        'msg': msg
    }


def success_msg(msg):
    return {
        'code': ResultCode.SUCCESS,
        'msg': msg
    }


def failure():
    return {
        'code': ResultCode.FAILURE
    }


def failure_msg(msg):
    return {
        'code': ResultCode.FAILURE,
        'msg': msg
    }
