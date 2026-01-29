package com.back.boundedContexts.member.dto

import com.fasterxml.jackson.annotation.JsonCreator
import java.time.Instant

data class MemberDto @JsonCreator constructor(
    val id: Int,
    val createdAt: Instant,
    val modifiedAt: Instant,
    val admin: Boolean,
    val name: String,
    val profileImageUrl: String,
)