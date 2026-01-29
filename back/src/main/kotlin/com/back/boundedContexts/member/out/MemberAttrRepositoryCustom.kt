package com.back.boundedContexts.member.out

import com.back.boundedContexts.member.domain.shared.Member
import com.back.boundedContexts.member.domain.shared.MemberAttr

interface MemberAttrRepositoryCustom {
    fun findBySubjectAndName(subject: Member, name: String): MemberAttr?
}