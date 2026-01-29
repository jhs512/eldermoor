package com.back.global.exceptions

import com.back.global.dto.RsData

class BusinessException(private val resultCode: String, private val msg: String) : RuntimeException(
    "$resultCode : $msg"
) {
    val rsData: RsData<Void>
        get() = RsData<Void>(resultCode, msg)
}